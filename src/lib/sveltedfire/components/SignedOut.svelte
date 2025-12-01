<script lang="ts">
  const { children } = $props()
  import { getContext } from 'svelte';
  import { type AuthSig } from '../auth/AuthSig.js';

  let fullAuth = getContext<AuthSig>('sveltedAuth')
</script>

{#if fullAuth && !fullAuth!.currentUser}
  {@render children()}
{/if}