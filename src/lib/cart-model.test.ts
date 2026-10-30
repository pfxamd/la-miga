import { describe, expect, it } from 'vitest';
import { addLine, changeQuantity, parseStoredCart, removeLine } from './cart-model';

describe('cart operations', () => {
  it('adds and merges quantities without exceeding the limit', () => {
    const initial = addLine([], 'pan-1', 3);
    expect(addLine(initial, 'pan-1', 200)).toEqual([{ productId: 'pan-1', quantity: 99 }]);
  });

  it('updates quantities and removes zero-count items', () => {
    const initial = [{ productId: 'pan-1', quantity: 2 }];
    expect(changeQuantity(initial, 'pan-1', 4)[0].quantity).toBe(4);
    expect(changeQuantity(initial, 'pan-1', 0)).toEqual([]);
    expect(removeLine(initial, 'pan-1')).toEqual([]);
  });

  it('defensively parses browser storage and removes malformed data', () => {
    expect(parseStoredCart('invalid')).toEqual([]);
    expect(parseStoredCart(JSON.stringify([
      { productId: 'pan-1', quantity: 2 },
      { productId: 'pan-1', quantity: 3 },
      { productId: 'pan-2', quantity: -2 },
      { arbitrary: true },
    ]))).toEqual([{ productId: 'pan-1', quantity: 5 }]);
  });
});
