import { getFirestore, collection, getDocs, QueryFieldFilterConstraint, where, query, QueryCompositeFilterConstraint, type QueryNonFilterConstraint, type WhereFilterOp, QueryConstraint, QueryOrderByConstraint, QueryLimitConstraint, QueryStartAtConstraint, QueryEndAtConstraint } from "firebase/firestore"

type QueryFieldsType = QueryCompositeFilterConstraint|QueryFieldFilterConstraint|QueryNonFilterConstraint
type TheFieldsType = string|QueryFieldsType|WhereFilterOp|number|boolean

export const fetchDocs = (...collectionPath: Array<string>) => async (...fields: TheFieldsType[]) => {
  const db = getFirestore()
  let theRef;
  if (collectionPath.length > 1) {
    theRef = collection(db, collectionPath[0], ...collectionPath.slice(1))
  } else {
    theRef = collection(db, collectionPath[0])
  }
  let theQuery = query(theRef);
  if (fields.length > 0) {
    if ((fields.length === 3) && (typeof fields[1] === "string")) {
      theQuery = query(theRef, where(fields[0] as string, fields[1] as WhereFilterOp, fields[2]))
    } else {
      const builtFields: QueryConstraint[] = []
      let compositeConstraint = null
      fields.forEach(k => {
        if (k instanceof QueryCompositeFilterConstraint) {
          compositeConstraint = k as QueryCompositeFilterConstraint
        } else if (k instanceof QueryFieldFilterConstraint) {
          builtFields.push(k as QueryFieldFilterConstraint)
        } else if (k instanceof QueryOrderByConstraint) {
          builtFields.push(k as QueryOrderByConstraint)
        } else if (k instanceof QueryLimitConstraint) {
          builtFields.push(k as QueryLimitConstraint)
        } else if (k instanceof QueryStartAtConstraint) {
          builtFields.push(k as QueryStartAtConstraint)
        } else if (k instanceof QueryEndAtConstraint) {
          builtFields.push(k as QueryEndAtConstraint)
        }
      })

      if (compositeConstraint) {
        theQuery = query(theRef, compositeConstraint, ...builtFields)
      } else {
        theQuery = query(theRef, ...builtFields)
      }
    }
  }

  const theDocs = await getDocs(theQuery)
  
  return {
    docs: theDocs.docs.map(d => ({ id: d.id, ...d.data(), _id: d.id })),
    count: theDocs.docs.length
  }
}