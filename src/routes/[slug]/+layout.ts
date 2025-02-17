import { fetchDoc } from '$lib/index.js'
import type { LayoutData } from './$types'
import { getFirestore, doc, collection, getDoc } from 'firebase/firestore'

export const load: LayoutData = async ({ params }: { params: { slug: string }}) => {
  return {
    page: fetchDoc('pages', params.slug)
  }
}
