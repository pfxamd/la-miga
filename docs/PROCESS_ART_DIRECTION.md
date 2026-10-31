# LA MIGA / El arte de hacer pan — process section

A compact, four-stage continuous editorial narrative replaces the former four identical boxed icon columns on the home page.

- Original hand-coded SVGs accurately illustrate the mixing bowl, rising dough in a banneton, an elongated scored loaf, and a stone oven with heat and a small loaf. There are no image files, icon libraries, 3D or canvas/WebGL.
- The artisan process progression is defined by one delicate clay-colored guide line on desktop, with four stage registration marks.
- Each illustration has different geometry and density so it appears as a visual story rather than a set of generic UI icons.
- The dark chocolate background is retained; burnt clay and warm flour lines tie the art to the Tinta & Corteza brand.
- Stronger hierarchy: oversize Fraunces headline, miniature studio / chapter labels, hand-drawn objects, compact explanatory copy and an editorial CTA to the existing `/obrador/` route.
- The order of stages (kneading, fermentation, shaping, baking) stays the same. No new sections or giant padding.
- Desktop renders four stages as one strip, tablet two by two, narrow phone as four compact paired image-and-text rows. Hover is subtle and disabled for reduced motion.

Markup: `src/components/home/BakeryProcess.astro`.
Isolated CSS: `src/styles/process-atelier.css`.
The shared `showLink` interface is maintained for the existing callers.
