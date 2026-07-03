import { describe, test } from 'node:test';
import { Marked } from 'marked';
import markedMermaid from '../src/index.ts';

const codeBlock = [
  '```mermaid',
  'sequenceDiagram',
  '  User->>Minifolio: Request document containing mermaid',
  '  Minifolio-->>User: Uses Marked and MermaidJS to render the document',
  '```',
].join('\n');

const html = [
  '<pre class="mermaid">',
  'sequenceDiagram',
  '  User->>Minifolio: Request document containing mermaid',
  '  Minifolio-->>User: Uses Marked and MermaidJS to render the document',
  '</pre>',
].join('\n');

describe('marked-extension-template', () => {
  test('mermaid code block renders differently to without extension', (t) => {
    const marked = new Marked(markedMermaid());
    const unmarked = new Marked();
    t.assert.notStrictEqual(marked.parse(codeBlock), unmarked.parse(codeBlock));
  });

  test('mermaid code block renders to HTML, ready to run mermaid', (t) => {
    const marked = new Marked(markedMermaid());
    const parsed = marked.parse(codeBlock);
    t.assert.strictEqual(parsed.includes('<pre class="mermaid">'), true);
    t.assert.strictEqual(parsed.includes('</pre>'), true);
  });

  test('HTML mermaid diagrams are allowed', (t) => {
    const marked = new Marked(markedMermaid());
    const parsed = marked.parse(html);
    t.assert.strictEqual(parsed.includes('<pre class="mermaid">'), true);
    t.assert.strictEqual(parsed.includes('</pre>'), true);
  });

  test('mermaid code block is rendered normally when enableCodeBlockRender is disabled', (t) => {
    const marked = new Marked(markedMermaid({ enableCodeBlockRender: false }));
    const parsed = marked.parse(codeBlock);
    t.assert.strictEqual(parsed.includes('<pre><code class="language-mermaid">'), true);
    t.assert.strictEqual(parsed.includes('<pre class="mermaid">'), false);
    t.assert.strictEqual(parsed.includes('</pre>'), true);
  });

  test('Other code blocks are unaffected', (t) => {
    const js = [
      '```js',
      'console.log(typeof NaN);  // Number',
      '```',
    ].join('\n');
    const marked = new Marked(markedMermaid());
    const unmarked = new Marked();
    t.assert.strictEqual(marked.parse(js), unmarked.parse(js));
  });

  test('markdown not using this extension', (t) => {
    const marked = new Marked(markedMermaid());
    t.assert.snapshot(marked.parse('not example markdown'));
  });
});
