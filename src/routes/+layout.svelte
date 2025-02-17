<script lang="ts">
  import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
  import { SignedIn, SignedOut, signInWithGoogle, signOut } from '$lib'

  const { children } = $props()
</script>

<div>
  <SignedIn>
    <button onclick={signOut}>Sign Out</button>
  </SignedIn>
  <SignedOut>
    <button onclick={signInWithGoogle}>Sign In</button>
  </SignedOut>
</div>

{@render children()}