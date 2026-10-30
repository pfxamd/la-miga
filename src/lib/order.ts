import type { BreadProduct } from '../data/products';
import type { CartLine } from './cart-model';
import type { WhatsAppOrderLine } from './whatsapp';

/** Resolve cart IDs against catalog values. Never send a locally stored price. */
export function resolveOrder(
  cart: CartLine[],
  catalog: BreadProduct[],
): { lines: WhatsAppOrderLine[]; totalMAD: number; unavailable: string[] } {
  const byId = new Map(catalog.map((product) => [product.id, product]));
  const lines: WhatsAppOrderLine[] = [];
  const unavailable: string[] = [];

  for (const item of cart) {
    const product = byId.get(item.productId);
    if (!product?.available || !Number.isSafeInteger(item.quantity) || item.quantity < 1 || item.quantity > 99) {
      unavailable.push(item.productId);
      continue;
    }
    lines.push({ name: product.name, quantity: item.quantity, unitPriceMAD: product.priceMAD });
  }

  return {
    lines,
    totalMAD: lines.reduce((sum, line) => sum + line.quantity * line.unitPriceMAD, 0),
    unavailable,
  };
}
