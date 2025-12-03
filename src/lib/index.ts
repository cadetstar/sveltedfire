// Reexport your entry components here
export { initFirebase } from "./sveltedfire/init.js";
export { fetchDoc } from './sveltedfire/utilities/fetchDoc.js'
export { fetchDocs } from './sveltedfire/utilities/fetchDocs.js'
export { signInWithGoogle } from './sveltedfire/auth/signInWithGoogle.js'
export { signOut } from './sveltedfire/auth/signOut.js'
export { listenDoc } from './sveltedfire/utilities/listenDoc.js'
export { listenDocs } from './sveltedfire/utilities/listenDocs.js'
export { kindlyFetchDoc } from './sveltedfire/utilities/kindlyFetchDoc.js'
export { kindlyFetchDocs } from './sveltedfire/utilities/kindlyFetchDocs.js'
export { type AuthSig } from './sveltedfire/auth/AuthSig.js'
export { getAuthContext } from './sveltedfire/auth/getAuthContext.js'
export { handleForm } from './sveltedfire/utilities/handleForm.js'

import SignedIn from './sveltedfire/components/SignedIn.svelte'
import SignedOut from './sveltedfire/components/SignedOut.svelte'
import SveltedAuth from "./sveltedfire/components/SveltedAuth.svelte";
import FireForm from "./sveltedfire/components/FireForm.svelte";

export { 
  SignedIn,
  SignedOut,
  SveltedAuth,
  FireForm
}