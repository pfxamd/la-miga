# Editing LA MIGA

The site is a small static Astro storefront with no unused carousel or icon framework. Keep changes focused; avoid rebuilding existing sections to update a single detail.

| Task | Edit here |
| --- | --- |
| Bread catalog (name, category, price, weight, ingredients, photo, availability) | `src/data/products.ts` |
| Homepage headline, featured product | `src/components/home/Hero.astro` |
| Product grid and filters | `src/components/home/BreadCatalog.astro` |
| Workshop process | `src/components/home/BakeryProcess.astro` |
| Brand story | `src/components/home/BrandStory.astro` |
| Navbar, brand logo, footer, creator link | `src/layouts/BaseLayout.astro` |
| Add-to-cart buttons | `src/components/cart/AddToCart.astro` (shared native handler) |
| Cart drawer UI | `src/components/cart/CartDrawer.tsx` |
| Cart rules, totals, WhatsApp message | `src/store/`, `src/lib/` |
| Product detail template | `src/pages/pan/[slug].astro` |
| Colors and typography | `src/styles/base.css` |
| Section design | Corresponding file under `src/styles/` |
| Responsive adjustments | `src/styles/responsive.css` |
| Original WebP product photos | `public/assets/bread/` |
| Original logo | `public/assets/brand/` |

The homepage imports four independent sections from `src/components/home/`. The stylesheet entry `src/styles/global.css` only imports other CSS modules. Maintain existing class names when editing to avoid unintended layout changes.

## Before publishing

1. Keep product IDs stable: customer carts store IDs, not prices. Changes to slugs change URLs.
2. Build image URLs with `withBase()` and navigation URLs with `siteBase` for GitHub Pages.
3. Run `npm run verify` (types, tests, production build, broken-link/image-path audit).
4. Check the hero and catalog on phone and desktop; open a product and its image gallery; add/remove quantities; verify the PFXAMD footer signature and link.
5. Push changes to `main`; GitHub Actions publishes GitHub Pages.

## Order flow

Prices and availability are resolved against the static catalog. WhatsApp handoff only works after the real `PUBLIC_WHATSAPP_NUMBER` is configured. Until then, the cart supports copying the message; it never silently sends an order.

## Real bread source notes

See [PRODUCT_RESEARCH.md](PRODUCT_RESEARCH.md). Bread types and base ingredients are documented from Spanish food authorities and commercial bakeries. Prices, stock and presented formulations belong to the LA MIGA concept, not a certified operating bakery.
