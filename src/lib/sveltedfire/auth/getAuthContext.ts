import { getContext } from "svelte";
import { AUTH_CONTEXT_NAME } from '../constants.js'

export const getAuthContext = () => getContext(AUTH_CONTEXT_NAME)