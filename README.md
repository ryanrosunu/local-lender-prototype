# LocalLender

A high trust lending service that incentivizes lending and prevents theft.

**Live site:** [cs394locallender.web.app](https://cs394locallender.web.app/)

## About

LocalLender connects people who have things to lend with people who want to borrow them — either for free or for a small fee.

### Key features

- **Explore** — browse popular listings nearby and search for specific items
- **List an item** — add a title, description, price per day, location, and photo
- **Account** — manage your listings and view your trust profile
- **Reviews** — leave reviews for users you've interacted with

### Example

Maya wants to borrow a drill. She opens the app, finds a nearby listing, and sends a request. A neighbor accepts, Maya picks up the drill and pays a small fee. After use, she returns it.

## Tech stack

- React 19 + TypeScript
- Vite + TailwindCSS 4
- Firebase (Auth via Google, Firestore, Hosting)
- Vitest for unit testing

## Local development

Requires Node 22+.

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

## Firebase setup

This app uses Firebase for authentication and data storage. To run it locally you'll need a Firebase project with the following enabled:

- **Authentication** — Google sign-in provider
- **Firestore Database** — created in test mode

### Seeding initial data

`src/seed.ts` contains a `seedFirestore()` function that populates Firestore with the starter listings and reviews. To run it once:

1. Temporarily add these two lines to `src/main.tsx`:
   ```ts
   import { seedFirestore } from './seed';
   seedFirestore();
   ```
2. Run `npm run dev` and open the app
3. Remove those two lines — the data stays in Firestore permanently

## Scripts

| Script | Description |
| --- | --- |
| `npm run dev` | Start dev server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm test` | Run tests with UI |
| `npm run coverage` | Run tests with coverage report |

## License

[MIT](./LICENSE)
