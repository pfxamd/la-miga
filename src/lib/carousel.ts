import type { EmblaCarouselType, EmblaOptionsType } from 'embla-carousel';

/** Loaded only on sections that need touch-enabled horizontal browsing. */
export async function mountCarousel(
  root: HTMLElement,
  options: EmblaOptionsType = {},
): Promise<EmblaCarouselType> {
  const { default: EmblaCarousel } = await import('embla-carousel');
  return EmblaCarousel(root, {
    align: 'start',
    containScroll: 'trimSnaps',
    ...options,
  });
}
