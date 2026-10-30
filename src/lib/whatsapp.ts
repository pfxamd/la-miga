export interface WhatsAppOrderLine {
  name: string;
  quantity: number;
  unitPriceMAD: number;
}

/**
 * Uses the official wa.me deep link: no WhatsApp API credentials, server,
 * payment gateway, or order database is needed.
 * Only pass lines resolved from the authoritative product catalog.
 */
export function createWhatsAppOrderUrl(phoneE164: string, lines: WhatsAppOrderLine[]): string {
  const phone = phoneE164.replace(/\D/g, '');
  if (!/^[1-9]\d{7,14}$/.test(phone)) throw new Error('Set a valid WhatsApp business number.');
  if (
    lines.length === 0 ||
    lines.some((line) =>
      !line.name.trim() ||
      !Number.isSafeInteger(line.quantity) || line.quantity < 1 || line.quantity > 99 ||
      !Number.isSafeInteger(line.unitPriceMAD) || line.unitPriceMAD < 0
    )
  ) throw new Error('Cart is empty or contains invalid products.');

  const message = formatOrderMessage(lines);
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

/** One source of truth for the preview text and the actual WhatsApp order link. */
export function formatOrderMessage(lines: WhatsAppOrderLine[]): string {
  const total = lines.reduce((sum, item) => sum + item.quantity * item.unitPriceMAD, 0);
  return [
    'Hola, LA MIGA. Quiero hacer este pedido:',
    '',
    ...lines.map((item) => `• ${item.name} × ${item.quantity} — ${item.quantity * item.unitPriceMAD} MAD`),
    '',
    `Total: ${total} MAD`,
    '',
    '¿Podéis confirmar la disponibilidad y el horario de recogida?',
  ].join('\n');
}
