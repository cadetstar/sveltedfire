<script lang="ts">
  import { SignedIn } from '$lib'
  let { data } = $props()
</script>

<h1>{data.page.name}</h1>

{#each data.posts as post}
  <h3>{post.name}</h3>
{/each}

<SignedIn>
  <h3>Hello! This is nice!</h3>
</SignedIn>