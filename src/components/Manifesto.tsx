import { useRef } from 'react';
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { useLang } from '../i18n';
import { useParallax } from '../hooks/useParallax';

function Word({ children, range, progress }: { children: string; range: [number, number]; progress: MotionValue<number> }) {
  const opacity = useTransform(progress, range, [0.12, 1]);
  const y = useTransform(progress, range, [6, 0]);
  return (
    <span className="manifesto__word">
      <motion.span style={{ opacity, y, display: 'inline-block' }}>{children}</motion.span>
    </span>
  );
}

export default function Manifesto() {
  const { t } = useLang();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.45'] });
  const words = t.manifesto.text.split(' ');
  const img = useParallax(50);

  return (
    <section className="manifesto section">
      <div className="container">
        <p className="kicker">{t.manifesto.kicker}</p>
        <div ref={ref} className="manifesto__text">
          {words.map((w, i) => {
            const s = i / words.length;
            return (
              <Word key={`${w}-${i}`} progress={scrollYProgress} range={[s, s + 1 / words.length]}>
                {w}
              </Word>
            );
          })}
        </div>
        <div className="manifesto__foot">
          <div ref={img.ref} className="manifesto__img">
            <motion.img src="/img/studio.webp" alt="" style={{ y: img.y, scale: 1.25 }} loading="lazy" />
          </div>
          <p className="manifesto__sign">— {t.manifesto.sign}</p>
        </div>
      </div>
    </section>
  );
}
