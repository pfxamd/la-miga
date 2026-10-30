# LA MIGA

**LA MIGA — Panadería Artesanal** is a fictional, modern artisan bread bakery storefront set in Tétouan, Morocco.

## Stack

- Astro (static generation), TypeScript
- Preact islands for interactive shopping-cart and ordering UI
- Nano Stores + persistent storage for cart state
- Custom CSS and brand-specific art direction
- GitHub Pages, published from `main` via GitHub Actions

## Customer journey

Browse bread varieties → add to cart → review quantities and MAD total → send a prefilled order over WhatsApp.

No server, login, checkout payment gateway, or database is required. Product content and image assets are built statically.

## Commands

```bash
npm install
npm run dev
npm run build
npm run preview
```

## Architecture

- `src/pages/`: prerendered routes
- `src/layouts/`: page shells
- `src/data/products.ts`: typed product catalog
- `src/store/cart.ts`: browser-persistent cart state
- `src/lib/whatsapp.ts`: generated order message and link
- `src/styles/`: CSS and future brand tokens
- `public/`: original brand and product imagery (to be added)

## Deployment

Set **Settings → Pages → Build and deployment → Source** to **GitHub Actions**. The configuration uses `site: https://pfxamd.github.io` and `base: /la-miga`.

The storefront design, logo integration, real product selection, prices, and WhatsApp destination are intentionally not finalized during the initial infrastructure setup.
