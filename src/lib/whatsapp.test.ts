import { describe, expect, it } from 'vitest';
import { createWhatsAppOrderUrl, formatOrderMessage } from './whatsapp';

const example = [
  { name: 'Pan de masa madre', quantity: 2, unitPriceMAD: 20 },
  { name: 'Baguette', quantity: 1, unitPriceMAD: 7 },
];

describe('WhatsApp ordering', () => {
  it('uses the same formatted summary for copying and WhatsApp', () => {
    const url = new URL(createWhatsAppOrderUrl('+212600000000', example));
    expect(url.origin).toBe('https://wa.me');
    expect(url.pathname).toBe('/212600000000');
    expect(url.searchParams.get('text')).toBe(formatOrderMessage(example));
    expect(formatOrderMessage(example)).toContain('Total: 47 MAD');
  });

  it('rejects invalid phone or empty cart', () => {
    expect(() => createWhatsAppOrderUrl('', [example[0]])).toThrow();
    expect(() => createWhatsAppOrderUrl('+212600000000', [])).toThrow();
  });
});
