import { useState } from 'react';
import { motion } from 'framer-motion';
import { useLang } from '../i18n';
import { EASINGS } from '../easings';
import RevealText from './RevealText';
import { useParallax } from '../hooks/useParallax';

const LEVELS = [70, 50, 35, 20, 5];

export default function TintLab() {
  const { t } = useLang();
  const [idx, setIdx] = useState(2);
  const vlt = LEVELS[idx];
  const darkness = (100 - vlt) / 100;
  const { ref, y } = useParallax(40);

  return (
    <section className="tint section section--dark">
      <div className="container tint__grid">
        <div className="tint__copy">
          <p className="kicker kicker--light">{t.tint.kicker}</p>
          <RevealText className="title title--light">{t.tint.title}</RevealText>
          <p className="lead lead--light">{t.tint.intro}</p>

          <div className="tint__picker" role="radiogroup" aria-label="VLT">
            {LEVELS.map((l, i) => (
              <button key={l} role="radio" aria-checked={i === idx} className={i === idx ? 'is-active' : ''} onClick={() => setIdx(i)}>
                {i === idx && <motion.span layoutId="tint-pill" className="tint__pill" transition={{ type: 'spring', stiffness: 380, damping: 30 }} />}
                <span className="tint__swatch" style={{ background: `rgba(10,10,12,${0.15 + darkness * 0.85})` }} />
                <span>{l}%</span>
              </button>
            ))}
          </div>

          <div className="tint__meters">
            <div className="tint__meter">
              <div className="tint__meter-head">
                <span>{t.tint.privacy}</span>
                <strong>{t.tint.levels[idx]}</strong>
              </div>
              <div className="tint__bar"><motion.span animate={{ scaleX: (idx + 1) / LEVELS.length }} transition={{ duration: 0.6, ease: EASINGS.premium }} /></div>
            </div>
            <div className="tint__meter">
              <div className="tint__meter-head">
                <span>{t.tint.uv}</span>
                <strong>99%</strong>
              </div>
              <div className="tint__bar"><motion.span initial={{ scaleX: 0 }} whileInView={{ scaleX: 0.99 }} viewport={{ once: true }} transition={{ duration: 1.2, ease: EASINGS.premium }} /></div>
            </div>
          </div>
          <p className="tint__note">{t.tint.note}</p>
        </div>

        <div ref={ref} className="tint__view">
          <motion.img src="/img/studio.webp" alt="" style={{ y, scale: 1.18 }} loading="lazy" />
          <motion.div className="tint__glass" animate={{ opacity: 0.08 + darkness * 0.86 }} transition={{ duration: 0.7, ease: EASINGS.premium }} />
          <div className="tint__reflect" />
          <div className="tint__frame" />
          <motion.span key={vlt} className="tint__big" initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5, ease: EASINGS.premium }}>
            {vlt}<small>% VLT</small>
          </motion.span>
        </div>
      </div>
    </section>
  );
}
