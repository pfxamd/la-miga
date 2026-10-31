# LA MIGA — footer contact channels

The global footer uses handmade Astro/SVG icons, letterpress-type decoration and editorial composition, without icon fonts or runtime dependencies.

## Included channels

- Instagram, Facebook, TikTok: visual placeholder profiles marked DEMO; no destination URLs until verified or supplied by the site owner.
- WhatsApp: visible order journey links to the real local `/contacto/` page; never sends to a made-up phone number.
- Email: `hola@lamiga.example` reserved-domain example, not a real inbox; intentionally not a `mailto:` link.
- Telephone: `+212 5XX XX XX XX` illustrative typography only; intentionally not `tel:`.
- General Google Maps link: only Tetuán, Morocco. The footer does not claim to provide a storefront address.
- Site navigation and PFXAMD creator credit stay linked.

Set actual phone, email, and verified profile destinations in `src/data/contact.ts` before making those channels actionable. Do not replace an example with somebody else's existing social username, phone number, address or inbox.

The footer is shared in `src/layouts/BaseLayout.astro`; its CSS lives in `src/styles/footer.css`, and hand-coded accessible icons in `src/components/ui/SocialIcon.astro`.
