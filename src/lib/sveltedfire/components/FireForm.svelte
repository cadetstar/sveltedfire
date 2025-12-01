<script lang="ts">
  import { getFirestore, collection, doc, getDoc, updateDoc, setDoc, addDoc, deleteField } from "firebase/firestore"

  let { collectionName, docId = null, docIdField = null, onSubmit, children, beforeSubmit = null, ...rest } = $props()
  const db = getFirestore()

  const submitTheForm = async (ev: SubmitEvent) => {
    console.log('Attempting to save')
    ev.preventDefault()
    const formData = new FormData(ev.target as HTMLFormElement)
    let col = collection(db, collectionName)
    let objData = Object.fromEntries(formData.entries())
    if (beforeSubmit) {
      objData = beforeSubmit(objData, ev)
    }
    Object.keys(objData).forEach(k => {
      if (objData[k] === '_deleteme_') {
        if (!k.match(/\[/)) {
          objData[k] = deleteField()
        }
      }
      let matcher = k.match(/^(.*)\[(.*)\]$/)
      if (matcher) {
        if (!(matcher[1] in objData)) {
          objData[matcher[1]] = []
        }
        if (objData[k] === '_deleteme_') {
          console.log('Deletion override')
          objData[matcher[1]] = deleteField()
        } else {
          objData[matcher[1]][parseInt(matcher[2], 10)] = objData[k]
        }
        delete objData[k]
      }
    })
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
</script>

<form onsubmit={submitTheForm} {...rest}>
  {@render children()}
</form>