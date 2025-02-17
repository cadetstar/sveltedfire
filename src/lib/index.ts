// Reexport your entry components here
export { initFirebase } from "./sveltedfire/init.js";
export { fetchDoc } from './sveltedfire/utilities/fetchDoc.js'
export { fetchDocs } from './sveltedfire/utilities/fetchDocs.js'
export { signInWithGoogle } from './sveltedfire/auth/signInWithGoogle.js'
export { signOut } from './sveltedfire/auth/signOut.js'

import SignedIn from './sveltedfire/components/SignedIn.svelte'
import SignedOut from './sveltedfire/components/SignedOut.svelte'

export { 
  SignedIn,
  SignedOut
}