KENAKATA

KENAKATA is a production-style storefront built with Next.js App Router, TypeScript, Tailwind CSS, and the Platzi Fake API.
## Features

- Responsive home page with hero, featured products, categories, and theme toggle
- Product search, category filtering, price filtering, sorting, pagination, loading, empty, and error states

- Product details with image gallery, related products, and add-to-cart actions
- Persistent cart with quantity controls, removal, totals, and empty-cart handling

- Authenticated checkout with client and server validation and a mock payment flow
- Login, registration, logout, session cookies, profile page, and protected account/checkout routes

- Focused Vitest coverage for checkout validation and product sorting

## Tech Stack

- Next.js 16 App Router
- React 19 and TypeScript

- Tailwind CSS 4
- Platzi Fake API

- Vitest

## Getting Started

Requirements: Node.js 20 or newer and npm.
```bash
npm install
cp .env.example .env
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).
### Environment Variables

| Variable | Required | Description |
| --- | --- | --- |
| `API_URL` | Yes | Platzi API base URL, normally `https://api.escuelajs.co/api/v1` |
The API URL is server-only and must not be exposed as a `NEXT_PUBLIC_` variable.

## Scripts
```bash
npm run dev       # Start the development server
npm run lint      # Run ESLint
npm test          # Run Vitest once
npm run build     # Create a production build
npm start         # Start the production server
```
## Architecture

The project follows the App Router structure:
- `app/`: routes, layouts, loading/error boundaries, and API route handlers
- `components/`: reusable feature and layout components
- `lib/api/`: server-side Platzi API clients
- `lib/auth/`: cookie-backed session lookup
- `lib/checkout/`: checkout validation
- `lib/utils/`: reusable domain utilities such as product sorting
- `store/`: client-side cart state and localStorage persistence
- `types/`: shared TypeScript contracts
- `tests/`: focused unit tests

Server Components own data fetching and page composition. Client Components are limited to interactive concerns such as search controls, the gallery, cart actions, forms, theme state, and mobile navigation.

## Rendering Strategy

- Product listing and product detail pages are server-rendered because their data comes from the external API and depends on URL parameters.
- Search, filters, sorting, and pagination are represented in the URL so requests are shareable and navigable.
- Account and checkout use request cookies and are rendered dynamically.
- Loading and error boundaries provide route-level feedback while server data is loading or fails.
- The product list uses API pagination for the default order. When a user selects a sort order, matching products are fetched in pages, sorted on the server, and then paginated so the ordering is correct across pages.

## Tradeoffs
- The cart uses localStorage to keep the assignment self-contained. A real store would persist carts server-side for cross-device access.
- Checkout creates a mock order and does not charge a real payment method. The server recalculates product prices from the API rather than trusting client totals.
- The Platzi API is used as the source of truth for products and users, so availability and response behavior depend on the external service.
- Middleware uses an optimistic cookie check for early redirects; the checkout API performs a second token verification before creating an order.

## Performance and Quality
- Remote product and category data is fetched on the server.
- Product images use `next/image` where possible, with stable aspect-ratio containers to reduce layout shift.
- The cart is persisted only after hydration to avoid overwriting stored client state during the first render.
- Interactive controls are kept in client components instead of making entire pages client-rendered.
- ESLint, TypeScript production builds, and Vitest tests are part of the local verification workflow.

## Challenges
- Keeping URL-driven filters and pagination synchronized with server-rendered results
- Sorting the complete filtered result set while retaining efficient default pagination
- Verifying checkout prices server-side when cart state originates in localStorage
- Handling authentication across server components, route handlers, and Next.js 16 Proxy

## Future Improvements
- Persist orders and add order history to the account page
- Add refresh-token rotation and session expiration handling
- Add wishlist and product reviews
- Add admin product/category management
- Add Playwright E2E coverage for login, cart, and checkout
- Add observability, rate limiting, and a real payment provider
