import { atom } from 'nanostores';
import { persistentAtom } from '@nanostores/persistent';
import {
  addLine, changeQuantity, parseStoredCart, removeLine,
  type CartLine,
} from '../lib/cart-model';

export const $cart = persistentAtom<CartLine[]>('la-miga:cart:v1', [], {
  encode: JSON.stringify,
  decode: parseStoredCart,
});
export const $cartOpen = atom(false);

export function openCart(): void { $cartOpen.set(true); }
export function closeCart(): void { $cartOpen.set(false); }
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
