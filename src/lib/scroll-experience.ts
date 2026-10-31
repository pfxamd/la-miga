/**
 * LA MIGA / scroll experience.
 *
 * Native scrolling and touch inertia are intentionally preserved. A passive,
 * requestAnimationFrame-throttled listener only updates a small progress line
 * and sticky-header state. IntersectionObserver performs one-time entrance
 * transitions; there are no scroll hijackers or runtime animation libraries.
 */
export function initScrollExperience(): void {
  const root = document.documentElement;
  const header = document.querySelector<HTMLElement>('.site-header');
  const progress = document.querySelector<HTMLElement>('.site-header__progress');

  let scheduled = false;

  const updateScrollState = (): void => {
    scheduled = false;
    const distance = Math.max(0, window.scrollY);
    const available = Math.max(0, root.scrollHeight - window.innerHeight);
    const fraction = available > 0 ? Math.min(1, distance / available) : 0;

    if (progress) progress.style.transform = `scaleX(${fraction})`;
    if (header) header.classList.toggle('site-header--scrolled', distance > 12);
  };

  const scheduleUpdate = (): void => {
    if (scheduled) return;
    scheduled = true;
    window.requestAnimationFrame(updateScrollState);
  };

  scheduleUpdate();
  window.addEventListener('scroll', scheduleUpdate, { passive: true });
  window.addEventListener('resize', scheduleUpdate, { passive: true });
  window.addEventListener('pageshow', scheduleUpdate);

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (reducedMotion.matches || !('IntersectionObserver' in window)) return;

  const targets = document.querySelectorAll<HTMLElement>([
    '.section-heading',
    '.product-card',
    '.process-step',
    '.story-section__badge',
    '.story-section__text',
    '.about-story__copy',
    '.about-story__visual',
    '.obrador-equipment__item',
    '.obrador-moments__item',
    '.values-grid article',
    '.contact-steps li',
    '.contact-facts',
    '.detail-craft__grid > div',
    '.detail-related__item',
    '.footer__lead-copy',
    '.footer__channel',
    '.shop-intro__copy',
  ].join(','));

  if (targets.length === 0) return;

  const observer = new IntersectionObserver((entries, instance) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      const element = entry.target as HTMLElement;
      element.classList.add('is-revealed');
      instance.unobserve(element);
    }
  }, {
    rootMargin: '0px 0px -28px 0px',
    threshold: 0.08,
  });

  let count = 0;
  const viewport = window.innerHeight;

  targets.forEach((element) => {
    const bounds = element.getBoundingClientRect();

    // Never hide the first visible screen or content above a restored position.
    if (bounds.top <= viewport * 0.91 || bounds.bottom <= 0) return;

    element.classList.add('scroll-rise');
    observer.observe(element);
    count++;
  });

  // Enable entrance transitions only after all targets are measured.
  // Without JS, every section is rendered fully visible.
  if (count > 0) root.classList.add('scroll-motion-ready');
}
