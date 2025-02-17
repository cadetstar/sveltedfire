# SveltedFire

Inspired by Sveltefire, but taking a slightly different approach. Due to several changes in Svelte 5, I decided to build this package from the ground up.

SveltedFire is a client-side library intended to facilitate communication with Firebase services (currently Firestore and Firebase Auth). It consists of helper utilities for common tasks and components to handle authentication states. SveltedFire has *not* been tested for use as a server-side library.

This is still a work in progress. Suggestions are welcome. Note that tests are currently *not* configured.

## Usage

### Initializing

In your `hooks.client.ts` file, import initFirebase and initialize with your Firebase configuration:

```typescript
import type { ClientInit } from "@sveltejs/kit";
import { initFirebase } from "sveltedfire";
import firebaseConfig from './config.json'

export const init: ClientInit = async () => {
  await initFirebase(firebaseConfig)
}
```

This guarantees that firebase has been initialized prior to any data loading calls.

### Authentication

You can use the SignedIn/SignoutOut components to selectively render based on the user's authentication state. In addition, the `signOut` and `signInWithGoogle` helpers are available. Note that the signInWithGoogle automatically performs a signInWithPopup. If you would rather use signInWithRedirect, you will need to implement that manually.

### Fetching/Querying

To fetch a single document, use the `fetchDoc` method which accepts the document path as arguments. E.g., 

```typescript
fetchDoc('pages', params.slug)
fetchDoc('pages', 'home', 'posts', params.postId)
```

To perform a query for one or more documents, use the `fetchDocs` method. This is a double-invoked function. The first invocation sets the collection path. The second invocation accepts either three arguments (field name, comparator, value), no arguments for a simple collection fetch, or a single argument of an already formed QueryFieldFilterConstraint or a QueryCompositeFilterConstraint. E.g., 
```typescript
fetchDocs('pages')() // fetch all pages
fetchDocs('pages')('public', '==', true) // fetch all public pages
fetchDocs('pages')(and(where('published_at', '>=', '2025-01-01'), where('published_at', '<=', '2025-01-31'))) // fetch all pages published in the month of January
```

In the case of both `fetchDoc` and `fetchDocs`, the documents are returned as bare objects with the ID field injected into both the `id` and `_id` fields. If your data already defines an `id` field, it will be returned as-is; the `_id` field will always reference the actual ID of the object.


--------------

## Building

To build your library:

```bash
npm run package
```

To create a production version of your showcase app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.

## Publishing

Go into the `package.json` and give your package the desired name through the `"name"` option. Also consider adding a `"license"` field and point it to a `LICENSE` file which you can create from a template (one popular option is the [MIT license](https://opensource.org/license/mit/)).

To publish your library to [npm](https://www.npmjs.com):

```bash
npm publish
```
