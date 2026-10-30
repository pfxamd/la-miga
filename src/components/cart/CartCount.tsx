import { useStore } from '@nanostores/preact';
import { $cart } from '../../store/cart';

/** Hydrate this island with client:load wherever the final header uses a cart count. */
export default function CartCount() {
  const cart = useStore($cart, { ssr: 'initial' });
  const quantity = cart.reduce((sum, line) => sum + line.quantity, 0);
  return <span role="status" aria-label={`Productos en la cesta: ${quantity}`}>{quantity}</span>;
}
