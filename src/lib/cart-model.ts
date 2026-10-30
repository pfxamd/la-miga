/** Pure cart operations. Store only product IDs and quantities; never trust stored prices. */
export interface CartLine {
  productId: string;
  quantity: number;
}

export const MAX_QUANTITY = 99;

export function addLine(lines: CartLine[], productId: string, quantity = 1): CartLine[] {
  if (!productId.trim() || !Number.isSafeInteger(quantity) || quantity < 1) return lines;
  const match = lines.find((line) => line.productId === productId);
  if (!match) return [...lines, { productId, quantity: Math.min(quantity, MAX_QUANTITY) }];
  return lines.map((line) => line.productId === productId
    ? { ...line, quantity: Math.min(line.quantity + quantity, MAX_QUANTITY) }
    : line);
}

export function changeQuantity(lines: CartLine[], productId: string, quantity: number): CartLine[] {
  if (!Number.isSafeInteger(quantity)) return lines;
  if (quantity <= 0) return lines.filter((line) => line.productId !== productId);
  return lines.map((line) => line.productId === productId
    ? { ...line, quantity: Math.min(quantity, MAX_QUANTITY) }
    : line);
}

export function removeLine(lines: CartLine[], productId: string): CartLine[] {
  return lines.filter((line) => line.productId !== productId);
}

export function parseStoredCart(raw: string): CartLine[] {
  try {
    const value: unknown = JSON.parse(raw);
    if (!Array.isArray(value)) return [];
    const unique = new Map<string, number>();
    for (const line of value) {
      if (
        typeof line !== 'object' || line === null ||
        !('productId' in line) || typeof line.productId !== 'string' ||
        !line.productId.trim() || !('quantity' in line) ||
        typeof line.quantity !== 'number' || !Number.isSafeInteger(line.quantity) ||
        line.quantity < 1
      ) continue;
      unique.set(line.productId, Math.min((unique.get(line.productId) ?? 0) + line.quantity, MAX_QUANTITY));
    }
    return [...unique].map(([productId, quantity]) => ({ productId, quantity }));
  } catch {
    return [];
  }
}
