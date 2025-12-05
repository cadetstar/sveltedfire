import { getFirestore, collection, doc, getDoc, updateDoc, setDoc, addDoc, deleteField } from "firebase/firestore"

export const handleForm = (
  { collectionName, docId = null, docIdField = null, onSubmit, beforeSubmit = null}: 
  { collectionName: string, docId?: null|string, docIdField?: null|string, onSubmit: any, beforeSubmit?: any}
) => async (ev: SubmitEvent) => {
  const db = getFirestore()
  
  console.log('Attempting to save')
  ev.preventDefault()
  const formData = new FormData(ev.target as HTMLFormElement)
  let col = collection(db, collectionName)
  let objData: {[k:string]: any} = Object.fromEntries(formData.entries())
  if (beforeSubmit) {
    objData = await beforeSubmit(objData, ev)
  }
  Object.keys(objData).forEach(k => {
    if (objData[k] === '_deleteme_') {
      if (!k.match(/\[/)) {
        objData[k] = deleteField()
      }
    }
    const parseKey = (key: string): string[] => {
      let matcher = key.match(/^(.*)\[(.*?)\]$/)
      if (matcher) {
        return [...parseKey(matcher[1]), matcher[2]]
      } else {
        return [key]
      }
    }
    const components = parseKey(k)
    if (components.length > 1) {
      let mover = objData
      while (components.length) {
        const nextOne = components.shift()
        if (!(nextOne! in mover)) {
          if (!components.length) {
            if (objData[k] === '_deleteme_') {
              mover[nextOne!] = deleteField()
            } else {
              mover[nextOne!] = objData[k]
            }
          } else {
            if (isNaN(parseInt(components[0]))) {
              mover[nextOne!] = {}
            } else {
              mover[nextOne!] = []
            }
          }
        }
        mover = mover[nextOne!]
      }
      delete objData[k]
    }
  })
  const isLiteralObject = (a: any) => (!!a) && (a.constructor === Object)
  const cleanArrays = (obj: any) => {
    if (Array.isArray(obj)) {
      obj = obj.filter(k => k !== deleteField())
    } else {
      if (isLiteralObject(obj)) {
        Object.keys(obj).forEach(k => {
          cleanArrays(obj[k])
        })
      }
    }
  }
  cleanArrays(objData)
  console.log('Object data is', objData)
  let docRefId
  if (docId) {
    await updateDoc(doc(col, docId), objData)
    docRefId = docId
  } else if (docIdField) {
    await updateDoc(doc(col, formData.get(docIdField) as string), objData)
    docRefId = formData.get(docIdField) as string
  } else {
    let docRef = await addDoc(col, objData)
    docRefId = docRef.id
  }
  onSubmit(docRefId)
}