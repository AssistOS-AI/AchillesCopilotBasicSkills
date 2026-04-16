import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { resolve } from 'node:path';
import { spawn } from 'node:child_process';

function runNode(args, cwd) {
  return new Promise((resolvePromise, rejectPromise) => {
    const child = spawn(process.execPath, args, { cwd, stdio: ['ignore', 'pipe', 'pipe'] });
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

test('verify_static_site validates a minimal generated docs folder', async () => {
  const docsDir = await mkdtemp(resolve(tmpdir(), 'acbs-docs-'));
  await mkdir(resolve(docsDir, 'partials'), { recursive: true });
  await mkdir(resolve(docsDir, 'specs'), { recursive: true });
  await writeFile(resolve(docsDir, 'index.html'), '<!DOCTYPE html><html><body>Home page</body></html>\n');
  await writeFile(resolve(docsDir, 'styles.css'), 'body { color: #111; }\n');
  await writeFile(resolve(docsDir, 'specsLoader.html'), '<!DOCTYPE html><html><body>Specification Matrix</body></html>\n');
  await writeFile(resolve(docsDir, 'specs', 'matrix.md'), '# Matrix\n');

  const result = await runNode([
    'skills/gamp_specs/scripts/verify_static_site.js',
    docsDir,
    '--path',
    '/',
    '--path',
    '/styles.css',
    '--path',
    '/specsLoader.html',
    '--expect',
    '/=Home page',
    '--expect',
    '/specsLoader.html=Specification Matrix'
  ], resolve('.'));

  assert.match(result.stdout, /OK\s+\/$/m);
  assert.match(result.stdout, /OK\s+\/styles\.css/m);
  assert.match(result.stdout, /OK\s+\/specsLoader\.html/m);
});
