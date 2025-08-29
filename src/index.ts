// node:coverage ignore next
import type { MarkedExtension } from 'marked';
import mermaid from 'mermaid';

// Init mermaid on import
mermaid.initialize({
  startOnLoad: false,
});

export default function markedMermaid(): MarkedExtension {
  return {
    renderer: {
      code: (code) => {
        // Use default render for other languages
        if (code.lang !== 'mermaid') {
          return false;
        }

        // Use Mermaid to render the diagram
        return `<pre class="mermaid">${code.text}</pre>`
      }
    }
  };
}
