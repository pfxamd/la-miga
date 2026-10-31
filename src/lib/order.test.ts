import { describe, expect, it } from 'vitest';
import { resolveOrder } from './order';
import type { BreadProduct } from '../data/products';

describe('catalog-driven cart', () => {
  const catalog: BreadProduct[] = [{
    id: 'bread-a', slug: 'bread-a', name: 'Pan A', subtitle: 'Buen pan', description: 'Pan fresco', ingredients: 'Trigo y agua',
    category: 'hogazas', weightGrams: 400, priceMAD: 18,
    image: '/bread-a.webp', available: true,
  }];

  it('uses prices from the catalog, not the browser storage', () => {
    expect(resolveOrder([{ productId: 'bread-a', quantity: 2 }], catalog))
      .toMatchObject({ totalMAD: 36, unavailable: [] });
  });

  it('reports discontinued products instead of silently ordering them', () => {
    expect(resolveOrder([{ productId: 'unknown', quantity: 1 }], catalog))
      .toEqual({ lines: [], totalMAD: 0, unavailable: ['unknown'] });
  });
});
