import { getFirestore, collection, doc, getDocs, Query, QueryFieldFilterConstraint, where, query, QueryCompositeFilterConstraint, type WhereFilterOp } from "firebase/firestore"

export const fetchDocs = (...collectionPath: Array<string>) => async (qOrField: QueryCompositeFilterConstraint|string|null = null, comparator: string|null = null, value: string|boolean|number|null = null) => {
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
  const theDocs = await getDocs(theQuery)
  
  return {
    docs: theDocs.docs.map(d => ({id: d.id, ...d.data(), _id: d.id})),
    count: theDocs.docs.length
  }
}