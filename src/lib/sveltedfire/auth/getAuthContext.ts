import { getContext } from "svelte";
import { AUTH_CONTEXT_NAME } from '../constants.js'
import { type AuthSig } from "./AuthSig.js";

export const getAuthContext = () => getContext<AuthSig>(AUTH_CONTEXT_NAME)