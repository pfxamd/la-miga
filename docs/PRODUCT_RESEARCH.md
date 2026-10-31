# LA MIGA — real bread research

The catalog is built around documented Spanish bread varieties. These are **example formulations for a fictional storefront**, not a claim that products were actually baked, certified, or sold. Individual artisanal bakers may use different proportions, starter cultures or supporting ingredients.

| Bread on site | Physical identity | Sources |
| --- | --- | --- |
| Pan estilo payés | Rounded rustic loaf; wheat flour, water, starter/fermented dough, baker's yeast, salt | [European Commission / EUR-Lex](https://eur-lex.europa.eu/eli/C/2024/6593/oj/eng) |
| Barra rústica | Long rustic wheat bar; wheat flour, water, cultivated starter, salt, baker's yeast | [Panetier Pan de Pueblo](https://www.panetier.es/producto/pan-de-pueblo/); [Levaduramadre Barra Rústica](https://levaduramadre.es/producto/barra-rustica/) |
| Pan candeal | Dense/low-hydration wheat bread; refined using cylinders; wheat flour, water, yeast, salt | [Spanish bread-quality standard](https://www.boe.es/eli/es/rd/2019/04/26/308/con/20260227); [Miga Bakery](https://migabakery.es/producto/pan-candeal/) |
| Mollete andaluz | Pale, soft, low-baked and flattened wheat roll; flour, water, biological yeast and salt | [Official Mollete de Antequera product specification](https://www.mapa.gob.es/dam/mapa/contenido/alimentacion/temas/calidad-agroalimentaria/2017-calidad-diferenciada/nuevo_denominaciones/pliegos-de-condiciones/pliego-condiciones-agroalimentarios/mollete_antequera_2020_11_17.pdf); [Andalucian government](https://www.juntadeandalucia.es/organismos/agriculturapescaaguaydesarrollorural/servicios/actualidad/noticias/detalle/178497.html) |
| Bollo sevillano | Oval small Andalusian wheat loaf; flour, water, yeast and salt | [Mondat Baker ingredients](https://www.aecoctrade.es/es/producto/GtehSFgMdfeB1YB0ZGXfsF); [Sevilla gastronomy](https://visitasevilla.es/materiales/sevilla-gastronomica.pdf) |
| Rosca de pan | Ring-shaped firm bread with sesame; flour, water, yeast, salt, sesame | [Andalusian Cultural Heritage Institute — traditional Benamejí roscas](https://www.iaph.es/paisajes-culturales-conocimientos-tradicionales-cambio-climatico/atlas/elaboracion-de-roscas-y-roscos-de-san-blas/) |

## Naming and labeling

- `Pan estilo payés` identifies a bread style, **not** a certified `Pa de Pagès Català IGP` product.
- `Mollete andaluz` identifies the bread style, **not** a certified `Mollete de Antequera IGP` product.
- Ingredient lists describe the concept's intended recipes, not nutritional laboratory testing. When this demo becomes a real business, replace the catalog with each baker's actual formula, allergen handling, measured weight and real price.
- Sample weights and MAD prices in `src/data/products.ts` are design fixtures. No claim of verified local pricing or real-world stock is made.
- Every new product image is a generated original concept asset, not documentation of a particular actual bakery's product.

## Asset workflow

Keep one original transparent cutout for each bread and an optimized WebP copy under `public/assets/bread/`. Photos are square 800×800px with consistent centering and padding; use the same image in cards, details and cart. Check visual fidelity to the bread's recognized physical shape; don't relabel a mismatched loaf.
