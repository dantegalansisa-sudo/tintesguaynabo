import { useRef } from 'react';
import { motion, useAnimationFrame, useMotionValue, useScroll, useSpring, useTransform, useVelocity } from 'framer-motion';
import { useLang } from '../i18n';

function Row({ items, dir, speed = 40 }: { items: string[]; dir: 1 | -1; speed?: number }) {
  const x = useMotionValue(0);
  const { scrollY } = useScroll();
  const vel = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 });
  const factor = useTransform(vel, [-2000, 0, 2000], [-4, 1, 4], { clamp: false });
  const skew = useTransform(vel, [-2000, 2000], [8, -8]);
  const track = useRef<HTMLDivElement>(null);

  useAnimationFrame((_, delta) => {
    const w = (track.current?.scrollWidth ?? 0) / 2;
    if (!w) return;
    const f = Math.abs(factor.get());
    let next = x.get() - dir * speed * (delta / 1000) * Math.max(1, f);
    if (next <= -w) next += w;
    if (next > 0) next -= w;
    x.set(next);
  });

  const list = [...items, ...items];
  return (
    <motion.div className="marquee__row" style={{ skewX: skew }}>
      <motion.div ref={track} className="marquee__track" style={{ x }}>
        {[...list, ...list].map((s, i) => (
          <span key={i} className="marquee__item">
            {s}
            <svg width="22" height="24" viewBox="0 0 26 28" fill="none" aria-hidden>
              <path d="M13 1.6 24 5.8v8.1c0 6.4-4.6 10.9-11 12.6C6.6 24.8 2 20.3 2 13.9V5.8z" fill="currentColor" />
            </svg>
          </span>
        ))}
      </motion.div>
    </motion.div>
  );
}

export default function Marquee() {
  const { t } = useLang();
  return (
    <section className="marquee" aria-label="Services">
      <Row items={t.marquee} dir={1} />
      <Row items={[...t.marquee].reverse()} dir={-1} speed={30} />
    </section>
  );
}
