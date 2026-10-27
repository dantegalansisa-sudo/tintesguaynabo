type Bezier = [number, number, number, number];

export const EASINGS: Record<'premium' | 'smooth' | 'bounce' | 'snappy' | 'cinematic', Bezier> = {
  premium: [0.76, 0, 0.24, 1],
  smooth: [0.25, 0.8, 0.25, 1],
  bounce: [0.34, 1.56, 0.64, 1],
  snappy: [0.4, 0, 0.2, 1],
  cinematic: [0.86, 0, 0.07, 1],
};

export const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
};

export const cardVariants = {
  hidden: { opacity: 0, y: 48, scale: 0.96 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.65, ease: EASINGS.premium } },
};

export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const lenis = (window as unknown as { __lenis?: { scrollTo: (t: HTMLElement, o?: object) => void } }).__lenis;
  if (lenis) lenis.scrollTo(el, { offset: -10, duration: 1.4 });
  else el.scrollIntoView({ behavior: 'smooth' });
}
