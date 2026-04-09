# LocalLender

A high-trust community lending app — borrow useful things from people nearby.

**Live site:** [cs394locallender.web.app](https://cs394locallender.web.app/)

## About

LocalLender connects people who have things to lend with people who want to borrow them — either for free or for a small fee. Lenders post items, borrowers send requests, and both parties build trust through reviews.

### Key features

- **Explore** — browse and search available items nearby
- **List an item** — add a title, description, price, location, and photo
- **Request to borrow** — send a dated borrow request directly from an item listing
- **Account** — manage your listings, accept/reject incoming requests, track your borrow requests
- **Reviews** — leave reviews tied to completed transactions

## Tech stack

- React 19 + TypeScript
- Vite + Tailwind CSS v4
- Firebase Auth (Google sign-in)
- **Firebase Data Connect** — typed GraphQL API backed by Cloud SQL (PostgreSQL)
- TanStack Query — data fetching and cache invalidation via generated React hooks
- Vitest for unit testing

## Local development

Requires Node 22+ and the Firebase CLI.

```bash
npm install
npm run dev
```

Create a `.env` file in the project root with your Firebase config:

```
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
```

## Firebase Data Connect setup

This app uses **Firebase Data Connect** (not Firestore) for all data persistence. Data Connect uses a PostgreSQL backend with a typed GraphQL SDK generated from the schema.

### First-time setup for a new Firebase project

1. **Install the Firebase CLI**

   ```bash
   npm install -g firebase-tools
   firebase login
   ```

2. **Initialize Data Connect** in your Firebase project

   ```bash
   firebase init dataconnect
   ```

   Select your Firebase project when prompted. This creates `firebase.json` and updates `dataconnect/dataconnect.yaml` with your project's service ID and Cloud SQL instance.

3. **Deploy the schema and connectors**

   ```bash
   firebase deploy --only dataconnect
   ```

   This provisions the PostgreSQL schema in Cloud SQL and deploys the GraphQL connector.

4. **Regenerate the TypeScript SDK** (after any schema or connector changes)

   ```bash
   firebase dataconnect:sdk:generate
   ```

   The generated SDK lives in `src/dataconnect/` and is committed to the repo. Do not edit it manually.

### Run production environment

1. **TypeScript check + production build**

   ```bash
   npm run build
   ```

2. **Deploy schema + connectors + hosting to production**

   ```bash
   firebase deploy
   ```

### Project structure

```
dataconnect/
  dataconnect.yaml          # Data Connect service config (project ID, region, Cloud SQL instance)
  schema/
    schema.gql              # GraphQL schema — User, Item, LendingRequest, Review
  example/
    connector.yaml          # SDK generation config (output path, package name)
    queries.gql             # All read operations
    mutations.gql           # All write operations
src/
  dataconnect/              # Auto-generated TypeScript SDK — DO NOT EDIT
  firebase.ts               # Firebase app + Auth + DataConnect initialization
```

### Data model

| Table | Key fields |
|---|---|
| `User` | `displayName`, `email`, `photoUrl`, `location` |
| `Item` | `title`, `description`, `status` (available/lent/unavailable), `price`, `lender → User` |
| `LendingRequest` | `status` (pending/accepted/rejected/completed/cancelled), `borrowerNotes`, `startDate`, `endDate`, `item → Item`, `borrower → User`, `lender → User` |
| `Review` | `rating`, `comment`, `reviewer → User`, `reviewedUser → User`, `lendingRequest → LendingRequest` |

### Auth

All queries and mutations use Firebase Auth automatically — no security rules to write. The `@auth(level: USER)` directive on mutations ensures only signed-in users can write data, and server-side `auth.uid` expressions are used for ownership.

### Using the Data Connect emulator locally

```bash
firebase emulators:start --only dataconnect,auth
```

Then add the emulator connection to `src/firebase.ts`:

```ts
import { connectDataConnectEmulator } from 'firebase/data-connect';
connectDataConnectEmulator(dc, 'localhost', 9399);
```

## Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start Vite dev server |
| `npm run build` | TypeScript check + production build |
| `npm run preview` | Preview production build |
| `npm test` | Run tests with UI |
| `npm run coverage` | Run tests with coverage |
| `firebase dataconnect:sdk:generate` | Regenerate TypeScript SDK after schema changes |
| `firebase deploy --only dataconnect` | Deploy schema + connectors to production |
| `firebase deploy` | Deploy schema + connectors + hosting to production |

## License

[MIT](./LICENSE)
