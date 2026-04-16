import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
import { mkdtemp } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { resolve } from 'node:path';
import { resolveAchillesAgentLib } from '../../skills/achilles_specs/examples/depsLoader.mjs';
import { buildRuntimeConfig } from '../../skills/achilles_specs/examples/runtimeConfig.mjs';

async function createTempProject() {
  return mkdtemp(resolve(tmpdir(), 'acbs-'));
}

test('resolveAchillesAgentLib prefers a manual override', async () => {
  const baseDir = await createTempProject();
  await mkdir(resolve(baseDir, 'manual-lib'), { recursive: true });

  const resolution = await resolveAchillesAgentLib({
    baseDir,
    manualOverrides: {
      achillesAgentLibPath: 'manual-lib'
    }
  });

  assert.equal(resolution.strategy, 'manual-override');
  assert.equal(resolution.path, resolve(baseDir, 'manual-lib'));
});

test('resolveAchillesAgentLib resolves from the parent directory before node_modules', async () => {
  const workspace = await createTempProject();
  const baseDir = resolve(workspace, 'project');
  const parentLib = resolve(workspace, 'AchillesAgentLib');
  await mkdir(baseDir, { recursive: true });
  await mkdir(parentLib, { recursive: true });
  await writeFile(resolve(parentLib, 'package.json'), '{"name":"AchillesAgentLib"}\n');

  const resolution = await resolveAchillesAgentLib({ baseDir });

  assert.equal(resolution.strategy, 'parent-directory');
  assert.equal(resolution.path, resolve(parentLib, 'package.json'));
});

test('resolveAchillesAgentLib falls back to node_modules', async () => {
  const baseDir = await createTempProject();
  const packageDir = resolve(baseDir, 'node_modules', 'AchillesAgentLib');
  await mkdir(packageDir, { recursive: true });
  await writeFile(resolve(baseDir, 'package.json'), '{"name":"fixture-project"}\n');
  await writeFile(resolve(packageDir, 'package.json'), '{"name":"AchillesAgentLib"}\n');

  const resolution = await resolveAchillesAgentLib({ baseDir });

  assert.equal(resolution.strategy, 'node_modules');
  assert.equal(resolution.path, resolve(packageDir, 'package.json'));
});

test('buildRuntimeConfig merges manual overrides and runtime defaults', async () => {
  const baseDir = await createTempProject();
  await mkdir(resolve(baseDir, 'manual-lib'), { recursive: true });

  const config = await buildRuntimeConfig({
    baseDir,
    manualOverrides: {
      achillesAgentLibPath: 'manual-lib',
      provider: 'manual-provider',
      taskTags: {
        review: 'review'
      },
      modelTiers: {
        premium: 'manual-premium'
      }
    }
  });

  assert.equal(config.llm.provider, 'manual-provider');
  assert.equal(config.llm.taskTags.review, 'review');
  assert.equal(config.llm.modelTiers.premium, 'manual-premium');
  assert.equal(config.dependencies.achillesAgentLib.path, resolve(baseDir, 'manual-lib'));
});
