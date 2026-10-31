# LA MIGA / scroll behavior

The scroll remains native on all routes; the site does **not** capture wheel/touch inputs or animate `scrollTop` in a custom engine.

- A 2px clay-red line appears on the sticky header and updates on each passive scroll through `requestAnimationFrame`.
- The sticky header gently gains a subtle shadow and higher contrast after 12px of scrolling. Its dimensions never change, so it causes no layout jump.
- Existing in-page anchors use browser-native `scroll-behavior: smooth`, with a sticky-header-safe offset on desktop and mobile.
- Major headings and selected editorial pieces enter once with a restrained 11–17px translation and opacity fade. Each observer stops watching after reveal. The page above the fold is **never hidden**.
- If scripting is disabled, all sections remain fully visible. Reduced-motion preference disables entrance animations and switches anchors to immediate navigation.
- Scrollbars use the existing clay/wheat palette (native Firefox scrollbar colors with optional Chromium/WebKit styling).

Implementation is `src/lib/scroll-experience.ts`, `src/styles/scroll-experience.css` and the shared header in `src/layouts/BaseLayout.astro`. No package was added.
