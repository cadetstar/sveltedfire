import { getFirestore, collection, doc, getDoc } from "firebase/firestore"

export const fetchDoc = async (...docPath: Array<string>) => {
  const db = getFirestore()
  let theRef;
  if (docPath.length > 2) {
    theRef = doc(collection(db, docPath[0], ...docPath.slice(1, -1)), docPath[-1])
  } else {
    theRef = doc(collection(db, docPath[0]), docPath[-1])
  }
  const theDoc = await getDoc(theRef)
  if (!theDoc.exists()) {
    return null
  }
  return { // Return ID twice, the first can be overridden by the splat from .data() which we want, so force the second just in case.
    id: theDoc.id,
    ...theDoc.data(),
    _id: theDoc.id
  }
}