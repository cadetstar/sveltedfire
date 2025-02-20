import { fetchDoc } from '$lib/index.js'
import type { LayoutData } from './$types'

export const load: LayoutData = async ({ params }: { params: { slug: string }}) => {
  return {
    page: await fetchDoc('pages', params.slug)
  }
}
