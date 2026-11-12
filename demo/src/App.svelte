<script lang="ts">
  import markedMermaid from '@maddyguthridge/marked-mermaid';
  import { Marked } from 'marked';
  import mermaid from 'mermaid';
  import { onMount } from 'svelte';
  import source from './example.md?raw';

  let markdownRender: HTMLDivElement | undefined = $state();

  const marked = new Marked(markedMermaid());

  onMount(() => {
    mermaid.initialize({});
    setTimeout(() => {
      if (!markdownRender) return;
      void mermaid.run();
    });
  });
</script>

{@html marked.parse(source)}
