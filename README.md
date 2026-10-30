# LA MIGA — Panadería Artesanal

A fictional, modern bread-only bakery storefront based in Tétouan, Morocco. The site is designed like a real bakery business, with bespoke original imagery and a distinctive brand identity.

## Tech stack

Astro (static), TypeScript, Preact islands, Nano Stores persisted cart, PhotoSwipe, Embla Carousel, Lucide Preact and GitHub Pages. See [open-source decisions](docs/OPEN_SOURCE.md) for licenses and deployment rationale.

## Shopping flow

Bread catalog → choose quantities → cart → WhatsApp message containing selected products and MAD total. No database, account, payment gateway or server.

## Development

Requires Node 24.

```bash
npm install
npm run dev
npm run check
npm run test
npm run build
```

A combined quality gate is available via `npm run verify`.

## WhatsApp configuration

Copy `.env.example` to `.env` and provide a legitimate `PUBLIC_WHATSAPP_NUMBER` before activating the checkout button. Do not put a placeholder number into a live ordering link.

## Deployment

Push to `main`. The workflow builds and tests the site, then uploads static files to GitHub Pages. Configure **Settings → Pages → Source: GitHub Actions** first. Default path is `https://pfxamd.github.io/la-miga/`.

## Project state

The infrastructure and reusable utilities are prepared. Final visual design, logo integration, real product photos, product catalog, cart UI and business contact details are intentionally pending.
