# LA MIGA — ACTO 01 / El amasado
## Photorealistic composable image pilot

**Status:** Art direction and asset contract only. Image creation was attempted 2026-10-31 but rejected by the connected image provider ("Requires basic plan or higher"). No real master photograph, alpha assets, or live-site modification exists yet.

**Goal:** Produce one camera-locked editorial photographic master, approve its object geometry, then extract ten transparent assets for the scroll-controlled first chapter of `El arte de hacer pan`.

## Camera, lighting and visual identity

- Camera: 3/4 view approximately 30 degrees above table; centered; apparent portrait/product lens 80–85 mm. Do not vary focal length or perspective between state images.
- Key: large diffuse warm-white light from upper left, soft shadows and dark cocoa right-side fill. No inconsistent light directions.
- Art direction: handmade low broad cream stoneware mixing bowl with a coherent thick rim; authentic naturally fermented wheat dough, off-white sticky gluten membranes; partial baker's hands cropped at wrists, no face.
- Palette: cacao `#2D1815`, harina `#F6F2E9`, subtle rojo arcilla `#963F35`. Keep these colors in the scene and ambient light, not as artificial gradients on objects.
- Quality: true photographic realism, detailed microtexture, correctly sized fingers, natural hand anatomy, convincing sticky dough connections. Avoid plastic CGI look, extra fingers, excessive flour and staged stock-photo props.
- Position: bowl center and lower area, clean edges and room around objects. Master can have dark background; deliverable assets must have true transparency.
- Master output: ideally >= 2400x3000, standard sRGB. Final in-browser derivatives WebP with transparent alpha and multiple sizes, not base64 embedded in source.

## Master image prompt (English)

Create one extraordinarily photorealistic luxury editorial food photograph for LA MIGA, a bespoke contemporary Spanish artisan bakery website. A low, wide slightly irregular aged cream stoneware mixing bowl on a flour-dusted dark walnut worktop. Inside it a cohesive ball of moist elastic naturally fermented wheat dough, visibly sticky and textured, its upper edge lifted and gently stretched between two realistic human hands entering from the upper left and right frame edges, cut off at the wrists. No visible face, upper body or identifiable person. Three-quarter perspective from thirty degrees above the worktop; stationary camera, centered frame, 80mm product-photography appearance, f/8 crisp microtextures. One generous soft ivory key light high upper-left, warm natural specular highlights on translucent stretched gluten, subtle cacao-brown fill on right, realistic contact shadows and dust. Deep matte cocoa `#2D1815` background, ample negative space near the upper margin, no visible kitchen scenery. Superbly realistic food texture, accurate hand anatomy, meaningful overlaps of back rim, dough, hands and front rim. All parts should be separable into future independently animated transparent layers with an unchanging camera. No text, badges, watermarks, 3D render appearance, vector shapes, stylized illustration, extra props or logos.

## Asset manifest for the pilot

All assets share exactly one image coordinate system and anchor points. These filenames describe intended deliverables, **not files that already exist**.

| # | Asset | Filename | Notes |
|---|---|---|---|
| 1 | Rear half of ceramic bowl | `bowl-back.webp` | Only rear bowl and rim, transparent |
| 2 | Front half of ceramic bowl | `bowl-front.webp` | Occludes the dough correctly, transparent |
| 3 | Resting dough | `dough-rest.webp` | Native unstretched state |
| 4 | Folded dough | `dough-fold.webp` | Same wheat composition and lighting |
| 5 | Stretched raised dough | `dough-stretch.webp` | Geometry connects to hand grip |
| 6 | Baker's partial hands | `hands-pose.webp` | Tested against each dough state; if pose fails, revise asset strategy to matched hand states |
| 7 | Back flour particles | `flour-back.webp` | Natural random distribution, separated from objects |
| 8 | Front flour particles | `flour-front.webp` | Coherent particle scale and lighting |
| 9 | Grounding/contact shadow | `bowl-shadow.webp` | No shadow should be baked into bowl cutouts |
| 10 | Flour traces on worktop | `surface-flour.webp` | Dust and small smears only |

Source masters should also be retained separately in lossless PNG or source-editable format; manifest counts only the ten runtime assets.

## Compositing order and scroll behavior

Scene back to front: `flour-back`, `bowl-shadow`, `surface-flour`, `bowl-back`, current dough state, `hands-pose`, `bowl-front`, `flour-front`. Check hand/dough overlap: the correct stacking may require separately masked portions of the hands. Maintain a single stacking order except where a deliberate overlap changes.

Use native scroll; run section-specific progress calculations with passive scroll and requestAnimationFrame or progressive enhancement. Animate only opacity and GPU-friendly transforms on layers. Stage 0–0.3 resting, 0.3–0.65 folding, 0.65–1 stretched, paired with parallax flour drift and realistic ease. Do not imply that simple alpha crossfade physically morphs dough: where registration fails, use a short masked wipe or a matched intermediate photograph. For reduced motion and low-memory devices show a single completed still.

## Acceptance criteria before integrating into website

- Physically consistent bowl ellipse/rim and the same camera perspective for each state.
- Real transparent alpha verified on light and dark backgrounds (no halo, checkerboard or flat painted backdrop).
- Hands anatomically believable and grip matches whichever dough state is shown.
- Photographic details visible without grain banding or generation artifacts.
- Desktop and mobile fit tests before merging.
- Compressed images and delayed loading for non-visible scene states; no displacement of regular page scroll.
- Never replace the four existing inline SVG illustrations until pilot assets and composite preview are approved.
- Merge to `main` only when image + runtime rendering has been tested.
