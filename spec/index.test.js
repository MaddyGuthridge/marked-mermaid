import { describe, test } from 'node:test';
import { Marked } from 'marked';
import markedMermaid from '../src/index.ts';

describe('marked-extension-template', () => {
  test('mermaid code block renders differently to without extension', (t) => {
    const diagram = [
      '```mermaid',
      'sequenceDiagram',
      '  User->>Minifolio: Request document containing mermaid',
      '  Minifolio-->>User: Uses Marked and MermaidJS to render the document',
      '```',
    ].join('\n');
    const marked = new Marked(markedMermaid());
    const unmarked = new Marked();
    t.assert.notStrictEqual(marked.parse(diagram), unmarked.parse(diagram));
  });

  test('mermaid code block renders to HTML, ready to run mermaid', (t) => {
    const diagram = [
      '```mermaid',
      'sequenceDiagram',
      '  User->>Minifolio: Request document containing mermaid',
      '  Minifolio-->>User: Uses Marked and MermaidJS to render the document',
      '```',
    ].join('\n');
    const marked = new Marked(markedMermaid());
    t.assert.strictEqual(marked.parse(diagram).includes('<pre class="mermaid">'), true);
    t.assert.strictEqual(marked.parse(diagram).includes('</pre>'), true);
  });

  test('HTML mermaid diagrams are allowed', (t) => {
    const diagram = [
      '<pre class="mermaid">',
      'sequenceDiagram',
      '  User->>Minifolio: Request document containing mermaid',
      '  Minifolio-->>User: Uses Marked and MermaidJS to render the document',
      '</pre>',
    ].join('\n');
    const marked = new Marked(markedMermaid());
    t.assert.strictEqual(marked.parse(diagram).includes('<pre class="mermaid">'), true);
    t.assert.strictEqual(marked.parse(diagram).includes('</pre>'), true);
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
