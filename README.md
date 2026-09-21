# Neurogine: Product Catalog

A small product catalog app built for the Neurogine Junior Mobile Developer technical assessment.
It uses the free [DummyJSON](https://dummyjson.com) API (no key required).

> Work in progress. See [Progress](#progress) for what is done and what is still to do.

## Stack

- React Native with Expo (SDK 57)
- TypeScript
- React Navigation (planned, for the detail screen)

## How to run

Requirements: a recent Node.js LTS (developed on Node 24) and the Expo Go app on your phone (same Wi-Fi as your computer).

```bash
npm install
npm start
```

Scan the QR code with Expo Go. If it can't connect, use `npx expo start --tunnel`.

Check the data layer against the live API (no phone needed):

```bash
npm run check:data
```

## Architecture

The code is split into layers. Each layer only depends on the ones below it:

```
screens/  →  hooks/  →  data/
   ↓           ↓
components/  utils/
```

```
src/
  data/        Talks to the internet. No React in here.
    types.ts       Product and ProductsResponse types
    client.ts      request<T>(): one helper that fetches, checks for errors and parses JSON
    productApi.ts  getProducts, getProductById, searchProducts
  hooks/       State and logic (loading, error, pagination, search). Calls data/.
  components/  Small reusable UI pieces
  screens/     Full screens that combine components and hooks
  utils/       Constants and pure helpers
scripts/
  check-data.ts  Smoke test that calls the real API through the data layer
```

### Decisions

- **Shared `request<T>()` helper.** Every endpoint goes through one function so the error handling lives in one place.
  `fetch` does not throw on 404/500 responses, so the helper checks `response.ok` and throws with the status code.
- **Data layer has no React.** It can be tested and reused without a screen, and the UI never calls `fetch` directly.
- **Search (planned): server-side, using `/products/search`.** The list is paginated, so a client-side filter would only
  see the items already loaded and would miss results. The endpoint searches every product and also supports `skip`.
- **One `status` value per screen (planned)** (`loading`, `error`, `empty`, `success`) instead of separate booleans, so the UI can never be in two states at once.

## Progress

- [x] Phase 0: Expo TypeScript project and folder structure
- [x] Phase 1: data layer (types, request helper, product API functions)
- [ ] Phase 2: product list screen with loading and error (retry) states
- [ ] Phase 3: pagination (`skip`)
- [ ] Phase 4: product detail screen
- [ ] Phase 5: debounced search and empty state
- [ ] Phase 6: pull-to-refresh, image placeholders
- [ ] Phase 7: unit test
- [ ] Phase 8: final README, walkthrough video

## Git workflow

One feature branch per phase (`feature/phase-N-...`), merged into `main` with a merge commit so the commit history stays visible.
`main` always holds the latest working version.

## AI usage

AI (Claude) was used for guidance and learning support only, and each use is listed here:

- Planned the phase breakdown and the layered folder structure with me (I chose the four layers).
- Explained concepts (fetch, async/await, generics, React state) and wrote a learning course for me.
- Phase 1: provided file skeletons with TODO hints and a smoke-test script (`scripts/check-data.ts`).
  I wrote the logic in the data layer files myself, and AI reviewed it and pointed out bugs.

## Not done yet / TODO

Everything from Phase 2 onwards. This section will be updated as each phase is merged.
