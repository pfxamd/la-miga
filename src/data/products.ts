/** Product data is authored locally and prerendered at build time. */
export interface BreadProduct {
  id: string;
  slug: string;
  name: string;
  description: string;
  category: 'masa-madre' | 'baguettes' | 'integrales' | 'especiales';
  weightGrams: number;
  priceMAD: number;
  image: string;
  available: boolean;
}

// Product names, photos and prices will be populated together.
export const products: BreadProduct[] = [];
