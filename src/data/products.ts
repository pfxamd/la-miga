export type BreadCategory = 'masa-madre' | 'clasicos' | 'integrales' | 'especiales';

export interface BreadProduct {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  description: string;
  category: BreadCategory;
  ingredients: string;
  weightGrams: number;
  priceMAD: number;
  image: string;
  available: boolean;
}

export const categoryLabels: Record<BreadCategory, string> = {
  'masa-madre': 'Masa madre',
  clasicos: 'Clásicos',
  integrales: 'Integrales',
  especiales: 'Especiales',
};

/** All prices are illustrative for this fictitious bakery concept. */
export const products: BreadProduct[] = [
  {
    id: 'masa-madre',
    slug: 'pan-de-masa-madre',
    name: 'Pan de masa madre',
    subtitle: 'El de siempre, pero mejor.',
    description: 'Una corteza dorada y crujiente, una miga suave y el sabor que solo da el tiempo.',
    category: 'masa-madre',
    ingredients: 'Harina de trigo, agua, masa madre natural y sal.',
    weightGrams: 650,
    priceMAD: 28,
    image: 'assets/bread/masa-madre.webp',
    available: true,
  },
  {
    id: 'baguette',
    slug: 'baguette-artesana',
    name: 'Baguette artesana',
    subtitle: 'Crujiente por fuera.',
    description: 'Fina, ligera y recién hecha. Perfecta para compartir o acompañar la comida.',
    category: 'clasicos',
    ingredients: 'Harina de trigo, agua, levadura y sal.',
    weightGrams: 280,
    priceMAD: 9,
    image: 'assets/bread/baguette.webp',
    available: true,
  },
  {
    id: 'semillas',
    slug: 'pan-de-semillas',
    name: 'Pan de semillas',
    subtitle: 'Pequeños detalles, gran sabor.',
    description: 'Un pan de carácter, con una corteza generosa en semillas y una miga tierna.',
    category: 'integrales',
    ingredients: 'Harina de trigo, agua, semillas variadas, masa madre y sal.',
    weightGrams: 550,
    priceMAD: 24,
    image: 'assets/bread/semillas.webp',
    available: true,
  },
  {
    id: 'centeno',
    slug: 'pan-de-centeno',
    name: 'Pan de centeno',
    subtitle: 'Intenso y auténtico.',
    description: 'Sabor profundo, textura firme y un toque rústico para disfrutar sin prisas.',
    category: 'integrales',
    ingredients: 'Harina de centeno, harina de trigo, agua, masa madre y sal.',
    weightGrams: 600,
    priceMAD: 27,
    image: 'assets/bread/centeno.webp',
    available: true,
  },
  {
    id: 'ciabatta',
    slug: 'ciabatta',
    name: 'Ciabatta',
    subtitle: 'Ligera. Aireada. Irresistible.',
    description: 'Miga abierta, corteza fina y sabor delicado: una pieza para todos los días.',
    category: 'clasicos',
    ingredients: 'Harina de trigo, agua, aceite de oliva, levadura y sal.',
    weightGrams: 350,
    priceMAD: 15,
    image: 'assets/bread/ciabatta.webp',
    available: true,
  },
  {
    id: 'focaccia',
    slug: 'focaccia-de-romero',
    name: 'Focaccia de romero',
    subtitle: 'Un poco de Mediterráneo.',
    description: 'Esponjosa, aromática y terminada con aceite de oliva, romero y aceitunas.',
    category: 'especiales',
    ingredients: 'Harina de trigo, agua, aceite de oliva, romero, aceitunas, levadura y sal.',
    weightGrams: 450,
    priceMAD: 23,
    image: 'assets/bread/focaccia.webp',
    available: true,
  },
];

export function productBySlug(slug: string) {
  return products.find((product) => product.slug === slug);
}

export const siteBase = `${import.meta.env.BASE_URL.replace(/\\/+$/, '')}/`;
export const withBase = (asset: string): string =>
  `${siteBase}${asset.replace(/^\\/+/, '')}`;
