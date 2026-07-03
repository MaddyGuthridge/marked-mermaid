// node:coverage ignore next
import type { MarkedExtension } from 'marked';
import mermaid from 'mermaid';

/** Marked-mermaid's options */
export type MarkedMermaidOptions = {
  /**
   * Whether to convert mermaid code blocks (`ie ```mermaid ...`) to rendered mermaid. Defaults to
   * `true`.
   */
  enableCodeBlockRender: boolean,
};

const defaultMarkedMermaidOptions: MarkedMermaidOptions = {
  enableCodeBlockRender: true,
};

// Init mermaid on import
mermaid.initialize({});

export default function markedMermaid(options: Partial<MarkedMermaidOptions> = {}): MarkedExtension {
  const opts = { ...defaultMarkedMermaidOptions, ...options };
  return {
    renderer: {
      code: (code) => {
        // Use default render for other languages, or if code block render is not supported.
        if (code.lang !== 'mermaid' || !opts.enableCodeBlockRender) {
          return false;
        }

        // Use Mermaid to render the diagram
        return `<pre class="mermaid">${code.text}</pre>`;
      },
    },
  };
}
