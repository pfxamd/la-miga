import { persistentAtom } from '@nanostores/persistent';
import {
  addLine, changeQuantity, parseStoredCart, removeLine,
  type CartLine,
} from '../lib/cart-model';

export const $cart = persistentAtom<CartLine[]>('la-miga:cart:v1', [], {
  encode: JSON.stringify,
  decode: parseStoredCart,
});

export function addToCart(productId: string, quantity = 1): void {
  $cart.set(addLine($cart.get(), productId, quantity));
}

export function setCartQuantity(productId: string, quantity: number): void {
  $cart.set(changeQuantity($cart.get(), productId, quantity));
}

export function removeFromCart(productId: string): void {
  $cart.set(removeLine($cart.get(), productId));
}

export function clearCart(): void {
  $cart.set([]);
}
