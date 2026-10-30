import { describe, expect, it } from 'vitest';
import { createWhatsAppOrderUrl } from './whatsapp';

describe('WhatsApp ordering', () => {
  it('encodes multiple bread lines and a correct MAD total', () => {
    const url = new URL(createWhatsAppOrderUrl('+212600000000', [
      { name: 'Pan de masa madre', quantity: 2, unitPriceMAD: 20 },
      { name: 'Baguette', quantity: 1, unitPriceMAD: 7 },
    ]));
    expect(url.origin).toBe('https://wa.me');
    expect(url.pathname).toBe('/212600000000');
    expect(url.searchParams.get('text')).toContain('Total: 47 MAD');
  });

  it('rejects invalid phone or empty cart', () => {
    expect(() => createWhatsAppOrderUrl('', [{ name: 'Pan', quantity: 1, unitPriceMAD: 10 }])).toThrow();
    expect(() => createWhatsAppOrderUrl('+212600000000', [])).toThrow();
  });
});
