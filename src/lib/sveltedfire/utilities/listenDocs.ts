import { getFirestore, collection, doc, getDocs, Query, QueryFieldFilterConstraint, where, query, QueryCompositeFilterConstraint, type WhereFilterOp } from "firebase/firestore"
import { onSnapshot, type DocumentData } from "firebase/firestore"
import { readable } from 'svelte/store';

export const listenDocs = (...collectionPath: Array<string>) => (qOrField: QueryCompositeFilterConstraint|string|null = null, comparator: string|null = null, value: string|boolean|number|null = null) => {
  const db = getFirestore()
  let theRef;
  if (collectionPath.length > 1) {
    theRef = collection(db, collectionPath[0], ...collectionPath.slice(1))
  } else {
    theRef = collection(db, collectionPath[0])
  }
  let theQuery = query(theRef);
  if (qOrField) {
    if (comparator) {
      theQuery = query(theRef, where(qOrField as string, comparator as WhereFilterOp, value))
    } else {
      if (qOrField instanceof QueryFieldFilterConstraint) {
        theQuery = query(theRef, qOrField as QueryFieldFilterConstraint)
      } else if (qOrField instanceof QueryCompositeFilterConstraint) {
        theQuery = query(theRef, qOrField as QueryCompositeFilterConstraint)
      }
    }
  }

  const theDocs = readable<null|{docs: DocumentData[], count: number}>(null, (set) => {
    const unsubscribe = onSnapshot(theQuery, (vals) => {
      let combined: {id: string, _id: string, [k: string]: any}[] = []
      vals.forEach(val => {
        if (val.exists()) {
          combined.push({id: val.id, ...val.data(), _id: val.id})
        }
      })
      set({docs: combined, count: combined.length})
    })
    return () => unsubscribe()
  })

  return theDocs
}