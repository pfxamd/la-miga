# LA MIGA — Open-source toolkit

The aim is a fast, mostly static bakery storefront. Libraries are only bundled on pages where used.

| Purpose | Project | Version family | License | Decision |
| --- | --- | --- | --- | --- |
| Static site, routes and image generation | [Astro](https://astro.build/) | 7.x | MIT | Core |
| Cart island and small interactive components | [Preact](https://preactjs.com/) | 10.x | MIT | Core |
| Shared cart state | [Nano Stores](https://github.com/nanostores/nanostores) | 1.x | MIT | Core |
| Browser persistence | [Nano Stores Persistent](https://github.com/nanostores/persistent) | 1.x | MIT | Core |
| Preact reactive hook | [Nano Stores Preact](https://github.com/nanostores/preact) | 1.x | MIT | Core |
| Product-image lightbox | [PhotoSwipe](https://photoswipe.com/) | 5.x | MIT | Prepared, lazy-loaded |
| Swipeable featured-bread carousel | [Embla Carousel](https://www.embla-carousel.com/) | 8.x stable | MIT | Prepared, lazy-loaded |
| Interface icons | [Lucide Preact](https://lucide.dev/) | 1.x | ISC | Prepared, tree-shaken |
| Search-engine sitemap | [Astro Sitemap](https://docs.astro.build/en/guides/integrations-guide/sitemap/) | 3.x | MIT | Core |
| Type checking | [Astro Check](https://docs.astro.build/en/guides/typescript/) | 0.9.x | MIT | Development |
| Unit tests | [Vitest](https://vitest.dev/) | 5.x | MIT | Development |

## Deliberate omissions

- No commerce platform or backend: checkout is a client-side cart with a WhatsApp deep link.
- No large React app, component theme, CSS framework, or animation package.
- No third-party stock-image CDN or generated-on-request product imagery. Bread photos will be original images in the repository, optimized at build time.
- No client-side search library until catalog scale justifies it.
- No paid fonts or proprietary gallery SDKs. Only use appropriately licensed fonts.
- No fictitious phone number or hard-coded customer contact.

## Image rules

1. Generate one consistent photographic set for products, preferably with transparency and the same lighting/angle.
2. Preserve high-resolution PNG originals offline; publish compressed AVIF/WebP variants with suitable dimensions.
3. Keep actual image backgrounds transparent when products must sit on a brand-colored card.
4. Use native Astro `<Picture>` or `<Image>`, width and height, descriptive alt text, lazy loading below the fold.
5. PhotoSwipe is only initialized for true detail galleries; Embla is only initialized for actual carousels.

## Ordering rules

- Store only product IDs and quantities; resolve prices using the local catalog.
- Show unavailable products before handing off to WhatsApp.
- Use `PUBLIC_WHATSAPP_NUMBER` only when a real destination has been provided.
- At WhatsApp handoff, the customer sends the message themselves; the site does not claim the order is placed before that.

## Hosting

GitHub Pages static build, base path `/la-miga/` under `https://pfxamd.github.io`. Ensure GitHub Pages is enabled with **GitHub Actions** as its source. Private repositories may require a paid GitHub plan for Pages.
