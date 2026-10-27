import { useScroll, useTransform, type MotionValue } from 'framer-motion';
import { useRef } from 'react';

export function useParallax<T extends HTMLElement = HTMLDivElement>(distance = 80): {
  ref: React.RefObject<T>;
  y: MotionValue<number>;
} {
  const ref = useRef<T>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [-distance, distance]);
  return { ref, y };
}
