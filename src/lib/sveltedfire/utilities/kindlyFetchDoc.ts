import { FirebaseError } from "firebase/app";
import { fetchDoc } from "./fetchDoc.js";

export const kindlyFetchDoc = async (...args: any[]) => {
  return await fetchDoc(...args).then(result => {
    return result
  }).catch(err => {
    if ((err instanceof FirebaseError) && (err.code == 'permission-denied')) {
      return null
    }
    throw err
  })
}