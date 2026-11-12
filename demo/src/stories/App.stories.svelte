<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';

  import App from '../App.svelte';

  const { Story } = defineMeta({
    component: App,
  });
</script>

<Story
  name="App"
  args={{
  }}
/>
