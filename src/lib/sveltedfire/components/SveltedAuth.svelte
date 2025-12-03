<script lang="ts">
  import { setContext } from 'svelte'
  import { getAuth, type User } from 'firebase/auth'
  import { signOut } from '../auth/signOut.js'
  import { signInWithGoogle } from '../auth/signInWithGoogle.js'
  import { type AuthSig } from '../auth/AuthSig.js';
  import { AUTH_CONTEXT_NAME } from '../constants.js'

  const { children, ...rest } = $props()

  let additionalKeys: {[k: string]: any} = {}
  Object.keys(rest).forEach(k => {
    if (k.startsWith('extra_')) {
      const actualKey = k.replace(new RegExp('^extra_'), '')
      additionalKeys[actualKey] = k
    }
  })

  const auth = getAuth()

  let fullAuth = $state<AuthSig>({
    currentUser: null,
    signOut,
    signInWithGoogle
  })

  auth.onAuthStateChanged(user => {
    fullAuth.currentUser = user
    Object.keys(additionalKeys).forEach((k: string) => {
      fullAuth[k] = rest[additionalKeys[k]](null, null)
    })
    user?.getIdTokenResult().then(token => {
      Object.keys(additionalKeys).forEach((k: string) => {
        fullAuth[k] = rest[additionalKeys[k]](user, token)
      })
    })
  })

  setContext<AuthSig>(AUTH_CONTEXT_NAME, fullAuth)

</script>

{@render children()}