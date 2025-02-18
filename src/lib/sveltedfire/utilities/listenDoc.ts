import { getFirestore, collection, doc, onSnapshot, type DocumentData } from "firebase/firestore"
import { readable } from 'svelte/store';

export const listenDoc = (...docPath: Array<string>) => {
  const db = getFirestore()
  let theRef;
  if (docPath.length > 2) {
    theRef = doc(collection(db, docPath[0], ...docPath.slice(1, -1)), docPath.slice(-1)[0])
  } else {
    theRef = doc(collection(db, docPath[0]), docPath.slice(-1)[0])
  }
  console.log(theRef)
  const theDoc = readable<null|DocumentData>(null, (set) => {
    const unsubscribe = onSnapshot(theRef, (val) => {
      if (!val.exists()) {
        set(null)
      } else {
        set({id: val.id, ...val.data(), _id: val.id})
      }
    })
    return () => unsubscribe()
  })

  return theDoc
}