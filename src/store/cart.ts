import { persistentAtom } from '@nanostores/persistent';

export interface CartLine {
  productId: string;
  quantity: number;
}

export const $cart = persistentAtom<CartLine[]>('la-miga:cart:v1', [], {
  encode: JSON.stringify,
  decode: JSON.parse,
});

export function addToCart(productId: string, quantity = 1) {
  if (!productId || !Number.isSafeInteger(quantity) || quantity < 1) return;
  const current = $cart.get();
  const existing = current.find((item) => item.productId === productId);
  const next = existing
    ? current.map((item) => item.productId === productId
        ? { ...item, quantity: Math.min(item.quantity + quantity, 99) }
        : item)
    : [...current, { productId, quantity: Math.min(quantity, 99) }];
  $cart.set(next);
}

export function setCartQuantity(productId: string, quantity: number) {
  if (!Number.isSafeInteger(quantity)) return;
  $cart.set(
    $cart.get()
      .map((item) => item.productId === productId ? { ...item, quantity } : item)
      .filter((item) => item.quantity > 0 && item.quantity <= 99),
  );
}

export function clearCart() {
  $cart.set([]);
}
