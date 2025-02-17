import type { ClientInit } from "@sveltejs/kit";
import { initFirebase } from "$lib/index.js";
import firebaseConfig from './config.json'

export const init: ClientInit = async () => {
  await initFirebase(firebaseConfig)
}