import { useLayoutEffect, useRef } from 'react';

/** Scales an inline-block, nowrap element so it exactly fills its parent's width. */
export function useFitText<T extends HTMLElement>(deps: unknown[] = [], ratio = 1) {
  const ref = useRef<T>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || !el.parentElement) return;
    const parent = el.parentElement;
    const fit = () => {
      el.style.fontSize = '100px';
      const w = el.scrollWidth;
      const pw = parent.clientWidth;
      if (w > 0) el.style.fontSize = `${(100 * pw * ratio) / w}px`;
    };
    fit();
    document.fonts?.ready.then(fit);
    const ro = new ResizeObserver(fit);
    ro.observe(parent);
    return () => ro.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return ref;
}
