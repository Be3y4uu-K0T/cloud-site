<script lang="ts">
  import type { Snippet } from 'svelte';

  type Props = {
    children?: Snippet;
  };

  const { children }: Props = $props();
</script>

<div class="navbar m-4 w-auto rounded-box bg-base-100 shadow-xl">
  <div class="flex-1">
    <a href="/" class="btn btn-ghost text-xl">Svelte Market</a>
  </div>
  <div class="flex-none">
    {@render children?.()}
  </div>
</div>
