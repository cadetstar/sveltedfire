<script lang="ts">
	import { handleForm } from "../utilities/handleForm.js";

  let { collectionName, docId = null, docIdField = null, onSubmit, children, beforeSubmit = null, ...rest } = $props()
  
  const submitTheForm = handleForm({ collectionName, docId, docIdField, onSubmit, beforeSubmit })
</script>

<form onsubmit={submitTheForm} {...rest}>
  {@render children()}
</form>