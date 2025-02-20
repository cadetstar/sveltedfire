import { FirebaseError } from "firebase/app";
import { fetchDocs } from "./fetchDocs.js";

export const kindlyFetchDocs = (...initialArgs: any[]) => async (...args: any[]) => {
  return await fetchDocs(...initialArgs)(...args).then(result => {
    return result
  }).catch(err => {
    if ((err instanceof FirebaseError) && (err.code == 'permission-denied')) {
      return { docs: [], count: 0}
    }
    throw err
  })
}