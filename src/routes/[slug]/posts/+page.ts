import type { PageLoad } from './$types'
import { fetchDocs, kindlyFetchDoc, kindlyFetchDocs } from '$lib/index.js'

export const load: PageLoad = async ({ params }: { params: { slug: string }}) => {
  return {
    posts: (await fetchDocs('pages', params.slug, 'posts')()).docs,
    nonexistent: (await kindlyFetchDoc('cogs', 'tester')),
    nonexistcollection: ( await kindlyFetchDocs('elements')() ).docs
  }
}