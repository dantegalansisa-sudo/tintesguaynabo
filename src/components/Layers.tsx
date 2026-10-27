import { useRef, useState } from 'react';
import { motion, useMotionValueEvent, useScroll, useSpring, useTransform, type MotionValue } from 'framer-motion';
import { useLang } from '../i18n';
import RevealText from './RevealText';

function Plate({ i, n, progress }: { i: number; n: number; progress: MotionValue<number> }) {
  // 0 = top coat (highest), n-1 = paint (base)
  const lift = n - 1 - i;
  const z = useTransform(progress, [0.1, 0.75], [lift * 8, lift * 64]);
  return <motion.div className={`plate plate--${i}`} style={{ z }} />;
}

export default function Layers() {
  const { t } = useLang();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const p = useSpring(scrollYProgress, { stiffness: 140, damping: 30 });
  const rot = useTransform(p, [0, 1], [-38, -28]);
  const [active, setActive] = useState(0);
  const items = t.layers.items;

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    setActive(Math.min(items.length - 1, Math.max(0, Math.floor(((v - 0.08) / 0.8) * items.length))));
  });

  return (
    <section className="layers" ref={ref}>
      <div className="layers__sticky">
        <div className="container layers__grid">
          <div className="layers__copy">
            <p className="kicker">{t.layers.kicker}</p>
            <RevealText className="title">{t.layers.title}</RevealText>
            <p className="lead">{t.layers.intro}</p>
            <ol className="layers__list">
              {items.map((it, i) => (
                <li key={it.name} className={i <= active ? 'is-on' : ''}>
                  <span className="layers__idx">0{i + 1}</span>
                  <div>
                    <strong>{it.name}</strong>
                    <span>{it.desc}</span>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <div className="layers__visual" aria-hidden>
            <motion.div className="layers__iso" style={{ rotateX: 58, rotateZ: rot }}>
              {items.map((_, i) => (
                <Plate key={i} i={i} n={items.length} progress={p} />
              ))}
            </motion.div>
            <div className="layers__glow" />
          </div>
        </div>
      </div>
    </section>
  );
}
