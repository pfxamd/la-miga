/** Lazy load PhotoSwipe only when a gallery is actually used. */
export async function mountLightbox(gallerySelector: string): Promise<() => void> {
  const [{ default: PhotoSwipeLightbox }] = await Promise.all([
    import('photoswipe/lightbox'),
    import('photoswipe/style.css'),
  ]);

  const instance = new PhotoSwipeLightbox({
    gallery: gallerySelector,
    children: 'a[data-pswp-width][data-pswp-height]',
    pswpModule: () => import('photoswipe'),
  });

  instance.init();
  return () => instance.destroy();
}
