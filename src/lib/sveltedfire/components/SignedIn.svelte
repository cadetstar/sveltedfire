<script lang="ts">
  const { children } = $props()
  import { getContext } from 'svelte';
  import { AuthSig } from '../auth/AuthSig.js';

  let fullAuth = getContext<AuthSig>('sveltedAuth')
</script>

{#if fullAuth!.currentUser}
  {@render children()}
{/if}