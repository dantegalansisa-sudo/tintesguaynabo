import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { EASINGS } from '../easings';

interface RevealTextProps {
  children: string;
  className?: string;
  delay?: number;
  tag?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
}

export default function RevealText({ children, className = '', delay = 0, tag: Tag = 'h2' }: RevealTextProps) {
  // Observe the (unclipped) heading itself; the words start hidden inside their masks.
  const ref = useRef<HTMLHeadingElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const words = children.split(' ');

  return (
    <Tag ref={ref} className={`reveal-text ${className}`} aria-label={children}>
      {words.map((word, i) => (
        <span key={`${word}-${i}`} className="reveal-text__mask" aria-hidden>
          <motion.span
            className="reveal-text__word"
            initial={{ y: '110%', rotate: 3 }}
            animate={inView ? { y: 0, rotate: 0 } : undefined}
            transition={{ duration: 0.85, delay: delay + i * 0.07, ease: EASINGS.premium }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
