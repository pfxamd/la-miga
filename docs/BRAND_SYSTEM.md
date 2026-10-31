# LA MIGA — Tinta & Corteza

**Status:** approved working brand direction for the Spanish-language bakery concept in Tétouan.  
**Positioning:** A small contemporary *panadería artesanal*, founded by a young woman, making real breads with a clear product-led storefront.

## Identity rationale

The existing LA MIGA wordmark is the anchor. Its dark cocoa lettering and fired-copper flour/flame detail define the hue family. The website extends those hues with an editorial, warm-mediterranean system; **the original logo artwork is not recolored**.

There are only two strong chromatic ideas: **fired earth** (Rojo Arcilla and copper) and a softer derived **rose clay**. Flour, crumb and wheat tones are neutrals grounded in bakery ingredients. No unrelated blue, green, bright yellow, candy pink, or gradient effects.

## Brand colors

| Token | Name | Hex | Use |
| --- | --- | --- | --- |
| `--ink` | Tinta | `#381B14` | Headlines, wordmarks, high-contrast text |
| `--heat` | Rojo Arcilla | `#963F35` | Primary CTAs, active states, key editorial accents |
| `--flour` | Harina | `#F6F2E9` | Main canvas, navbar, logo-background match |
| `--paper` | Miga | `#FFFCF7` | Reading surfaces, cart, light panels |
| `--wheat` | Trigo | `#E9D8C5` | Bread photography and product cards |
| `--rose` | Rosa Arcilla | `#E6C2B5` | Restrained handcrafted details and soft editorial shapes |
| `--dark` | Cacao Oscuro | `#2D1815` | Footer and oven-process section |
| `--mute` | Tinta Suave | `#746158` | Secondary text, product descriptions |
| `--line` | Lino | `#DBCBBC` | Rules, borders and subtle structural lines |
| `--oven` | Horno | `#DDBEA3` | Hero product art stage |
| `--copper` | Cobre del logo | `#A8502C` | Logo-associated decorative detail only |

Derived neutral card-stage colors live in `src/styles/tokens.css`. They should never be presented as additional brand accents.

## Composition and usage rules

- **About 65% warm flour**, 20% wheat/paper surfaces, 10% dark ink, up to 5% red-clay emphasis. Rose clay stays editorial, not the background for every section.
- Use **white `#FFFFFF` on Rojo Arcilla** for interactive buttons; their approximate contrast is 6.9:1. Tinta/Harina is above 14:1; secondary text on Harina is above 5:1.
- Use flat color surfaces, tactile paper-like neutrals and extremely restrained code-drawn scoring/heat lines. Avoid heavy gradients and glossy generic 3D graphics.
- Product images are original isolated bread packshots on warm neutral cards; no photograph background, fake labels or props. Keep an equal visual scale and let each bread silhouette communicate the variety.
- Headings: expressive high-contrast serif editorial hierarchy. Body and interface: compact, precise sans serif. Headings and product names use Fraunces (variable open-source display serif), loaded from Google Fonts with font-display swap; all body text remains system sans to limit font transfer. Logo is always the original image, not recreated with the font.
- Preserve a clear path: catalog → quantity → cart → WhatsApp. Visual flourishes may not obscure names, weights, prices, ingredients or buttons.
- The website's visual femininity is in careful composition, typography and soft tonal contrast, **not** obvious pink/flowers/bows.
- For dark process sections, use `--dark` with flour/rose foregrounds. For light mode, never insert unrelated dark sections; the process and footer are intentional branded dark zones.

## Editing source

All canonical values live at `src/styles/tokens.css`, imported once by `src/styles/global.css`. **Do not scatter fresh hex values** across components: if a new functional color is necessary, create a named token first and document its semantic use.

Logo: `public/assets/brand/la-miga-logo.webp`. Do not replace the approved mark with a font approximation.  
Storefront: [LA MIGA](https://pfxamd.github.io/la-miga/).  
Design authorship footer: [PFXAMD](https://pfxamd.com/).

## Current editorial hero

The leading headline is `Pan de verdad.` in a two-line Fraunces treatment. The framed bread stage is deliberately asymmetric and contains original hand-authored SVG contours echoing scoring cuts and fermentation. The old oversized circular `100% AMOR POR EL PAN` badge and decorative large LA MIGA ghost text were removed in favor of a small product identification label. All motion is CSS-only and honors reduced-motion settings.

## Product presentation — PAN EN EL AIRE

The `Los favoritos` section on the homepage treats the three real-bread WebP cutouts as floating editorial objects rather than enclosing them in cream photo boxes. The images sit directly over the flour-colored page, use responsive radial ground shadows, slightly different fixed angles, and small inline SVG scoring lines. This is an aesthetic treatment of existing transparent assets, not a new runtime animation system. A subtle hover lift appears only on hover-enabled devices and respects reduced-motion preferences.

Keep three columns on desktop and two on small phones (one only below 350px). Product titles, MAD prices, cart controls and detail links remain in their existing locations. Hide ingredient preview **only in the home featured section**; show it in the full catalog and individual detail pages.
