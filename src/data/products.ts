export type BreadCategory = 'barras' | 'hogazas' | 'tradicionales' | 'panecillos';

export interface BreadProduct {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  description: string;
  category: BreadCategory;
  ingredients: string;
  /** Describes the defining traditional technique, not an audited production claim. */
  method?: string;
  shape?: string;
  allergens?: string;
  weightGrams: number;
  priceMAD: number;
  image: string;
  available: boolean;
}

export const categoryLabels: Record<BreadCategory, string> = {
  barras: 'Barras',
  hogazas: 'Hogazas',
  tradicionales: 'Tradicionales',
  panecillos: 'Panecillos',
};

/**
 * Authentic bread varieties with realistic example recipes.
 * Brand, weights, prices and stock are illustrative: LA MIGA is a concept store.
 * Historical and ingredient references: docs/PRODUCT_RESEARCH.md.
 */
export const products: BreadProduct[] = [
  {
    id: 'payes',
    slug: 'pan-estilo-payes',
    name: 'Pan estilo payés',
    subtitle: 'Hogaza redonda de fermentación lenta.',
    description: 'Pan de estilo campesino, de corteza gruesa y crujiente, miga tierna y aroma de fermentación tradicional.',
    category: 'hogazas',
    ingredients: 'Harina de trigo, agua, masa madre de trigo, levadura de panadería y sal.',
    method: 'Amasado, fermentación con masa madre, formado redondo y cocción sobre solera.',
    shape: 'Hogaza grande y redonda, con greñado natural.',
    allergens: 'Contiene trigo (gluten).',
    weightGrams: 750,
    priceMAD: 29,
    image: 'assets/bread/payes.webp',
    available: true,
  },
  {
    id: 'barra',
    slug: 'barra-rustica',
    name: 'Barra rústica',
    subtitle: 'Corteza crujiente, miga ligera.',
    description: 'Barra alargada con cortes oblicuos, exterior dorado y miga aireada. Un clásico para acompañar la mesa.',
    category: 'barras',
    ingredients: 'Harina de trigo, agua, masa madre de trigo, levadura de panadería y sal.',
    method: 'Amasado, fermentación, formado alargado, greñado y cocción.',
    shape: 'Barra larga de extremos afinados y cortes diagonales.',
    allergens: 'Contiene trigo (gluten).',
    weightGrams: 300,
    priceMAD: 10,
    image: 'assets/bread/barra.webp',
    available: true,
  },
  {
    id: 'candeal',
    slug: 'pan-candeal',
    name: 'Pan candeal',
    subtitle: 'Miga prieta, corteza fina.',
    description: 'Pan español de masa poco hidratada, interior compacto y suave, y una corteza más fina que la de una hogaza rústica.',
    category: 'tradicionales',
    ingredients: 'Harina de trigo, agua, levadura de panadería y sal.',
    method: 'Masa de baja hidratación refinada con cilindros, formada, marcada y horneada.',
    shape: 'Hogaza compacta con cortes decorativos.',
    allergens: 'Contiene trigo (gluten).',
    weightGrams: 500,
    priceMAD: 19,
    image: 'assets/bread/candeal.webp',
    available: true,
  },
  {
    id: 'mollete',
    slug: 'mollete-andaluz',
    name: 'Mollete andaluz',
    subtitle: 'Blando, plano y delicado.',
    description: 'Panecillo ovalado y aplanado, de color pálido, corteza muy fina y miga esponjosa. Ideal para tostar.',
    category: 'panecillos',
    ingredients: 'Harina de trigo, agua, levadura de panadería y sal.',
    method: 'Fermentación, formado ovalado y cocción breve para conservar su corteza clara.',
    shape: 'Pieza pequeña, ovalada y ligeramente aplanada.',
    allergens: 'Contiene trigo (gluten).',
    weightGrams: 120,
    priceMAD: 7,
    image: 'assets/bread/mollete.webp',
    available: true,
  },
  {
    id: 'bollo',
    slug: 'bollo-sevillano',
    name: 'Bollo sevillano',
    subtitle: 'Pequeño pan de miga consistente.',
    description: 'Panecillo tradicional andaluz, de forma ovalada, miga consistente y corteza suave, pensado para el desayuno.',
    category: 'panecillos',
    ingredients: 'Harina de trigo, agua, levadura de panadería y sal.',
    method: 'Amasado, fermentación, formado de bollo alargado y horneado.',
    shape: 'Pieza ovalada y alargada con apertura longitudinal.',
    allergens: 'Contiene trigo (gluten).',
    weightGrams: 125,
    priceMAD: 8,
    image: 'assets/bread/bollo.webp',
    available: true,
  },
  {
    id: 'rosca',
    slug: 'rosca-de-pan',
    name: 'Rosca de pan',
    subtitle: 'Crujiente, en forma de anillo.',
    description: 'Rosca tradicional de masa firme y forma circular, terminada con ajonjolí tostado. No es un rosco dulce.',
    category: 'tradicionales',
    ingredients: 'Harina de trigo, agua, levadura de panadería, sal y ajonjolí (sésamo).',
    method: 'Amasado firme, formado manual en anillo y cocción hasta dorar la corteza.',
    shape: 'Anillo de pan con un hueco central.',
    allergens: 'Contiene trigo (gluten) y sésamo.',
    weightGrams: 200,
    priceMAD: 13,
    image: 'assets/bread/rosca.webp',
    available: true,
  },
];

export function productBySlug(slug: string) {
  return products.find((product) => product.slug === slug);
}

export const siteBase = import.meta.env.BASE_URL.endsWith('/')
  ? import.meta.env.BASE_URL
  : `${import.meta.env.BASE_URL}/`;

export const withBase = (asset: string): string =>
  `${siteBase}${asset.startsWith('/') ? asset.slice(1) : asset}`;
