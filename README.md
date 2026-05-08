# WORN

A fashion e-commerce store built with React and Node.js. Browse clothing by category, add items to your cart, and place orders — cart state persists across sessions via localStorage.

---

## What's in the app

- **Navbar** — category filters (ALLA / DAM / HERR / BARN), search, cart icon with live count. Responsive: hamburger drawer on mobile, inline links on desktop. Logo click resets all filters.
- **Hero section** — auto-advancing image carousel with a "Shop now" CTA that scrolls down to the product grid.
- **Product grid** — displays all products or a filtered/searched subset. Updates instantly on filter change.
- **Product detail page** — individual product view at `/products/:id` with add-to-cart.
- **Cart** — quantity controls, remove items, running total. Entirely client-side via localStorage.
- **Checkout** — POST order to backend. UI updates optimistically before server confirms.
- **Order confirmation** — displays the real Firestore order ID returned from the backend.
- **Order history** — lists all past orders.

---

## Tech stack

**Frontend** — React 18, React Router v6, TanStack React Query, CSS

**Backend** — Node.js, Express, Firebase Admin SDK

**Database** — Firestore (products + orders)

---

## Technical decisions worth noting

**React Query for all server state** — every GET uses `useQuery` (automatic caching, loading states, background refetch). Every write uses `useMutation`.

**Optimistic updates on checkout** — when an order is placed, the cache is updated immediately with a temporary entry. If the POST fails, React Query rolls back to the previous state via `onError`. On success, `onSettled` invalidates and re-fetches the real data.

**localStorage for cart** — cart lives entirely on the client. No auth required, no DB writes on every cart change. Synced on every add/remove/quantity update via `cartUtils`.

**Derived filter state** — `products` (raw API data) and `filteredProducts` (what's displayed) are kept separate. Filtering never mutates the original list — always a new array via `.filter()`.

**Shared router navigation pattern** — any filter or logo click always calls `navigate('/')` after updating state, so the user always lands on the product grid to see the result regardless of which page they were on.

**orderId passed via router state** — after a successful order POST, the backend returns a Firestore-generated ID. It's passed to the confirmation page via `navigate('/order-confirmation', { state: { orderId } })` and read with `useLocation()` — no URL params, no global state needed.

---

## Run it locally

You need Node.js 18+ and a Firebase project with Firestore enabled.

```bash
git clone https://github.com/your-username/worn.git
cd worn
```

**Backend**

```bash
cd server
npm install
```

Create a `.env` file in `/server`:

```
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_PRIVATE_KEY=your-private-key
FIREBASE_CLIENT_EMAIL=your-client-email
```

```bash
npm run dev        # runs on http://localhost:3000
```

**Frontend**

```bash
cd client
npm install
npm run dev        # runs on http://localhost:5173
```

Open `http://localhost:5173`.

---

_Built as a school group project._
