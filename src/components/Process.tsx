import { useLayoutEffect, useRef, useState } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { useLang } from '../i18n';
import RevealText from './RevealText';

export default function Process() {
  const { t } = useLang();
  const ref = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [dist, setDist] = useState(0);
  const steps = t.process.steps;

  useLayoutEffect(() => {
    const measure = () => {
      if (!track.current) return;
      setDist(Math.max(0, track.current.scrollWidth - window.innerWidth));
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [steps.length]);

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const p = useSpring(scrollYProgress, { stiffness: 160, damping: 32, mass: 0.3 });
  const x = useTransform(p, [0, 1], [0, -dist]);
  const bar = useTransform(p, [0, 1], [0, 1]);

  return (
    <section id="proceso" className="process" ref={ref} style={{ height: `calc(100svh + ${dist}px)` }}>
      <div className="process__sticky">
        <div className="container process__head">
          <div>
            <p className="kicker">{t.process.kicker}</p>
            <RevealText className="title">{t.process.title}</RevealText>
          </div>
          <div className="process__progress">
            <motion.span style={{ scaleX: bar }} />
          </div>
        </div>
        <motion.div ref={track} className="process__track" style={{ x }}>
          {steps.map((s, i) => (
            <article key={s.t} className="step" data-cursor>
              <div className="step__media">
                <img src={`/img/${s.img}.webp`} alt={s.t} loading="lazy" />
                <span className="step__num">0{i + 1}</span>
              </div>
              <h3 className="step__title">{s.t}</h3>
              <p className="step__desc">{s.d}</p>
            </article>
          ))}
          <div className="step step--end" aria-hidden>
            <span>TINTES<br />GUAYNABO</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
