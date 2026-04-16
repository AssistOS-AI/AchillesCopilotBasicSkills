import test from 'node:test';
import assert from 'node:assert/strict';
import { cp, mkdtemp, readFile, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { resolve } from 'node:path';
import { loadReferenceCatalog } from '../../skills/article_build/referenceCatalog.mjs';
import { renderMarkdown } from '../../skills/article_build/renderHtml.mjs';
import { runArticleBuildSkill } from '../../skills/article_build/skill.mjs';
import { validateSvgFile } from '../../skills/article_build/svgValidation.mjs';

const fixtureRoot = resolve('tests/article_build/fixtures/article-template');

test('loadReferenceCatalog parses bibliography entries with support profiles', async () => {
  const references = await loadReferenceCatalog(resolve(fixtureRoot, 'plan/bibliography.md'));

  assert.equal(Object.keys(references).length, 1);
  assert.equal(references['REF-ONE'].verificationMode, 'manual-waived');
  assert.equal(references['REF-ONE'].supportProfiles[0].id, 'deterministic-build');
});

test('renderMarkdown renders citations, tables, and figures', () => {
  const html = renderMarkdown(
    '# Heading\n\nA claim [REF-ONE].\n\n| A | B |\n| --- | --- |\n| 1 | 2 |\n\n![Diagram](assets/figure.svg)\n*Figure 1. Test figure.*',
    {
      'REF-ONE': {
        authors: 'Author',
        title: 'Reference',
        year: '2026',
        url: 'https://example.com'
      }
    }
  );

  assert.match(html, /<h2>Heading<\/h2>/);
  assert.match(html, /class="citation"/);
  assert.match(html, /<table>/);
  assert.match(html, /<figure>/);
});

test('validateSvgFile rejects overlapping labels', async () => {
  const tempDir = await mkdtemp(resolve(tmpdir(), 'acbs-svg-'));
  const invalidSvgPath = resolve(tempDir, 'invalid.svg');
  await writeFile(
    invalidSvgPath,
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 80"><text x="10" y="30" font-size="20">Alpha</text><text x="12" y="30" font-size="20">Beta</text></svg>\n'
  );

  await assert.rejects(() => validateSvgFile(invalidSvgPath), /Text labels overlap/);
});

test('runArticleBuildSkill generates deterministic outputs and incremental rebuild status', async () => {
  const tempRoot = await mkdtemp(resolve(tmpdir(), 'acbs-article-'));
  const articleRoot = resolve(tempRoot, 'article');
  await cp(fixtureRoot, articleRoot, { recursive: true });

  const firstRun = await runArticleBuildSkill({
    baseDir: tempRoot,
    articleRoot: 'article'
  });
  const secondRun = await runArticleBuildSkill({
    baseDir: tempRoot,
    articleRoot: 'article'
  });
  const outputHtml = await readFile(resolve(articleRoot, 'index.html'), 'utf8');
  const chapterMarkdown = await readFile(resolve(articleRoot, 'plan/chapters/chapter-1.md'), 'utf8');

  assert.equal(firstRun.chapters[0].refreshed, true);
  assert.equal(firstRun.assets[0].refreshed, true);
  assert.equal(firstRun.html.refreshed, true);
  assert.equal(secondRun.chapters[0].refreshed, false);
  assert.equal(secondRun.assets[0].refreshed, false);
  assert.equal(secondRun.html.refreshed, false);
  assert.match(chapterMarkdown, /self-contained article build pipeline/);
  assert.match(outputHtml, /Print \/ Save PDF/);
  assert.match(outputHtml, /Reference One/);
});
