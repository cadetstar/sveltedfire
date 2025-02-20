<script lang="ts">
  import { SignedIn } from '$lib'
  let { data } = $props()

  import { listenDoc } from '$lib';
  const val = listenDoc('pages', 'tester', 'posts', 'w4DvzffpU5UChIvuXoRd')
</script>

<h1>{data.page.name}</h1>

{#each data.posts as post}
  <h3>{post.name}</h3>
{/each}

<div>
  {#if $val}
    Special Post: {$val.name}
  {/if}
</div>

<SignedIn>
  <h3>Hello! This is nice!</h3>
</SignedIn>