<script lang="ts">
  const { children } = $props()
  import { getAuth } from 'firebase/auth'

  const auth = getAuth()
  let user = $state(null)
  auth.onAuthStateChanged(u => {
    console.log('User is', u)
    user = u
  })
</script>

{#if !user}
  {@render children()}
{/if}