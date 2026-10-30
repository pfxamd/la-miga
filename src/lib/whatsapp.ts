export interface WhatsAppOrderLine {
  name: string;
  quantity: number;
  unitPriceMAD: number;
}

/** Generate WhatsApp text from a cart without any backend or payment processing. */
export function createWhatsAppOrderUrl(
  phoneE164: string,
  lines: WhatsAppOrderLine[],
): string {
  const phone = phoneE164.replace(/\D/g, '');
  if (!phone || !lines.length) throw new Error('Missing WhatsApp destination or order lines.');
  const total = lines.reduce((sum, item) => sum + item.quantity * item.unitPriceMAD, 0);
  const text = [
    'Hola LA MIGA, me gustaría hacer un pedido:',
    ...lines.map((item) => `• ${item.name} × ${item.quantity} — ${item.unitPriceMAD * item.quantity} MAD`),
    `Total: ${total} MAD`,
    '¿Podéis confirmar la disponibilidad y la recogida?'
  ].join('\n');
  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
}
