import { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { useLang } from '../i18n';
import { EASINGS, scrollToId } from '../easings';
import { useIsMobile } from '../hooks/useMedia';
import { useFitText } from '../hooks/useFitText';
import { PHONE_DISPLAY, PHONE_TEL } from '../content';
import MagneticButton from './MagneticButton';
import { Arrow, ArrowDown } from './Icons';

function FitWord({ text, className, ready, delay }: { text: string; className: string; ready: boolean; delay: number }) {
  const ref = useFitText<HTMLSpanElement>([text]);
  return (
    <div className={`hero__word ${className}`} aria-label={text}>
      <span ref={ref} className="hero__word-inner" aria-hidden>
        {text.split('').map((c, i) => (
          <motion.span
            key={`${text}-${i}`}
            className="hero__char"
            initial={{ y: '105%', skewX: -8 }}
            animate={ready ? { y: '0%', skewX: 0 } : {}}
            transition={{ duration: 1, delay: delay + i * 0.045, ease: EASINGS.premium }}
          >
            {c}
          </motion.span>
        ))}
      </span>
    </div>
  );
}

export default function Hero({ ready }: { ready: boolean }) {
  const { t } = useLang();
  const mobile = useIsMobile();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const p = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });

  const topX = useTransform(p, [0, 1], ['0%', mobile ? '-30%' : '-18%']);
  const botX = useTransform(p, [0, 1], ['0%', mobile ? '30%' : '18%']);
  const carY = useTransform(p, [0, 1], mobile ? ['0vh', '-55vh'] : ['0vh', '22vh']);
  const carScale = useTransform(p, [0, 1], mobile ? [1, 1.08] : [1, 0.82]);
  const carRot = useTransform(p, [0, 1], mobile ? [0, 0] : [0, -6]);
  const fade = useTransform(p, [0, 0.6], [1, 0]);

  const car = mobile ? '/img/car-top-v-sm.webp' : '/img/car-top.webp';
  const after = 1.15;

  return (
    <section id="top" ref={ref} className="hero">
      <div className="hero__grain" aria-hidden />
      <div className="hero__stage">
        <motion.div style={{ x: topX }} className="hero__row hero__row--top">
          <FitWord text={t.hero.top} className="hero__word--accent" ready={ready} delay={0.1} />
        </motion.div>

        <motion.div className="hero__car" style={{ y: carY, scale: carScale, rotate: carRot }}>
          <motion.div
            className="hero__car-drive"
            initial={mobile ? { y: '110vh', filter: 'blur(6px)' } : { x: '90vw', filter: 'blur(8px)' }}
            animate={ready ? (mobile ? { y: 0, filter: 'blur(0px)' } : { x: 0, filter: 'blur(0px)' }) : {}}
            transition={{ duration: 1.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            <img src={car} alt="Porsche 911 en el estudio de KC Tintes Guaynabo" className="hero__car-img" draggable={false} />
            <div className="hero__shine" style={{ WebkitMaskImage: `url(${car})`, maskImage: `url(${car})` }} aria-hidden />
          </motion.div>
        </motion.div>

        <motion.div style={{ x: botX }} className="hero__row hero__row--bottom">
          <FitWord text={t.hero.bottom} className="hero__word--grey" ready={ready} delay={0.35} />
        </motion.div>

        <motion.div
          className="hero__tagline"
          style={{ opacity: fade }}
          initial={{ opacity: 0 }}
          animate={ready ? { opacity: 1 } : {}}
        >
          <p className="hero__lead">
            {t.hero.tagline.map((l, i) => (
              <span key={l} className="hero__mask">
                <motion.span
                  initial={{ y: '110%' }}
                  animate={ready ? { y: 0 } : {}}
                  transition={{ duration: 0.8, delay: after + i * 0.08, ease: EASINGS.premium }}
                >
                  {l}
                </motion.span>
              </span>
            ))}
          </p>
          <motion.p
            className="hero__sub"
            initial={{ opacity: 0, y: 10 }}
            animate={ready ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: after + 0.35 }}
          >
            {t.hero.sub}
          </motion.p>
        </motion.div>

        <motion.div
          className="hero__side"
          initial={{ opacity: 0, x: 20 }}
          animate={ready ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: after + 0.2, ease: EASINGS.premium }}
        >
          <span className="hero__side-line" />
          <p>{t.hero.side.join(' ')}</p>
        </motion.div>
      </div>

      <motion.div
        className="hero__bottom"
        initial={{ opacity: 0, y: 24 }}
        animate={ready ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: after + 0.3, ease: EASINGS.premium }}
      >
        <div className="hero__ctas">
          <MagneticButton className="btn btn--dark" onClick={() => scrollToId('cotiza')}>
            {t.hero.cta} <Arrow width={16} height={16} />
          </MagneticButton>
          <button className="btn btn--ghost" onClick={() => scrollToId('servicios')}>
            {t.hero.ghost}
          </button>
        </div>
        <div className="hero__meta">
          <span className="hero__scroll">
            <ArrowDown width={14} height={14} /> {t.hero.scroll}
          </span>
          <a href={`tel:${PHONE_TEL}`} className="hero__phone">{PHONE_DISPLAY}</a>
        </div>
      </motion.div>

      <div className="hero__strip">
        {t.hero.strip.map((s, i) => (
          <motion.button
            key={s}
            className="hero__strip-item"
            onClick={() => scrollToId('servicios')}
            initial={{ opacity: 0, y: 16 }}
            animate={ready ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: after + 0.45 + i * 0.08, ease: EASINGS.premium }}
          >
            {s}
          </motion.button>
        ))}
      </div>
    </section>
  );
}
