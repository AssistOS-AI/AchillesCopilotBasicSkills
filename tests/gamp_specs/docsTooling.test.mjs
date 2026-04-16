import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { spawn } from 'node:child_process';

const repoRoot = resolve('.');

function runNode(args) {
  return new Promise((resolvePromise, rejectPromise) => {
    const child = spawn(process.execPath, args, { cwd: repoRoot, stdio: ['ignore', 'pipe', 'pipe'] });
    let stdout = '';
    let stderr = '';

    child.stdout.on('data', (chunk) => {
      stdout += chunk;
    });
    child.stderr.on('data', (chunk) => {
      stderr += chunk;
    });
    child.on('error', rejectPromise);
    child.on('close', (code) => {
      if (code === 0) {
        resolvePromise({ stdout, stderr });
        return;
      }

      rejectPromise(new Error(stderr || stdout || `Command failed with code ${code}`));
    });
  });
}

test('specification matrix is generated from DS metadata', async () => {
  await runNode(['skills/gamp_specs/scripts/generate_specs_matrix.mjs']);
  const matrix = await readFile(resolve(repoRoot, 'docs/specs/matrix.md'), 'utf8');

  assert.match(matrix, /Generated from DS frontmatter/);
  assert.match(matrix, /\[DS000\]\(specsLoader\.html\?spec=DS000-vision\.md\)/);
  assert.match(matrix, /\[\[status:implemented\]\]/);
  assert.doesNotMatch(matrix, /## Introduction/);
  assert.doesNotMatch(matrix, /## Core Content/);
  assert.doesNotMatch(matrix, /## Conclusion/);
});

test('documentation link verifier succeeds on current docs', async () => {
  const result = await runNode(['skills/gamp_specs/scripts/verify_docs_links.mjs']);
  assert.match(result.stdout, /Verified/);
});
