import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { readSkillCatalog, validateSkillCatalog } from '../../skills/gamp_specs/examples/skillCatalog.mjs';

const repoRoot = resolve('.');

test('skill catalog matches the expected repository baseline', async () => {
  const catalog = await readSkillCatalog(repoRoot);
  const ids = catalog.map((skill) => skill.id);

  assert.deepEqual(ids, [
    'achilles_specs',
    'antropic_skill_build',
    'article_build',
    'cskill_build',
    'dgskill_build',
    'gamp_specs',
    'oskill_build'
  ]);
  assert.deepEqual(validateSkillCatalog(catalog), []);
});

test('repository guidance mentions every skill and every skill page exists', async () => {
  const catalog = await readSkillCatalog(repoRoot);
  const [readme, agent, agents, indexHtml, matrix, specsLoader, assetLoader, rootSizeCheck, assetSizeCheck] = await Promise.all([
    readFile(resolve(repoRoot, 'README.md'), 'utf8'),
    readFile(resolve(repoRoot, 'AGENT.md'), 'utf8'),
    readFile(resolve(repoRoot, 'AGENTS.md'), 'utf8'),
    readFile(resolve(repoRoot, 'docs/index.html'), 'utf8'),
    readFile(resolve(repoRoot, 'docs/specs/matrix.md'), 'utf8'),
    readFile(resolve(repoRoot, 'docs/specsLoader.html'), 'utf8'),
    readFile(resolve(repoRoot, 'skills/gamp_specs/assets/specsLoader.html'), 'utf8'),
    readFile(resolve(repoRoot, 'fileSizesCheck.sh'), 'utf8'),
    readFile(resolve(repoRoot, 'skills/gamp_specs/assets/fileSizesCheck.sh'), 'utf8')
  ]);

  assert.equal(specsLoader, assetLoader);
  assert.equal(rootSizeCheck, assetSizeCheck);
  assert.doesNotMatch(agent, /Bootstrap utilities:\s*`src\/`/);
  assert.doesNotMatch(agents, /Bootstrap utilities:\s*`src\/`/);

  for (const skill of catalog) {
    const skillPage = await readFile(resolve(repoRoot, 'docs', `${skill.id}.html`), 'utf8');
    assert.match(readme, new RegExp(skill.id));
    assert.match(agent, new RegExp(skill.id));
    assert.match(agents, new RegExp(skill.id));
    assert.match(indexHtml, new RegExp(skill.id));
    assert.match(matrix, new RegExp(skill.id, 'i'));
    assert.match(skillPage, new RegExp(skill.id));
  }
});
