import { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useLang } from '../i18n';
import { containerVariants, cardVariants } from '../easings';
import { INSTAGRAM, INSTAGRAM_HANDLE } from '../content';
import RevealText from './RevealText';
import MagneticButton from './MagneticButton';
import { Arrow, Instagram } from './Icons';

const REELS = ['reel1', 'reel2', 'reel3', 'reel4'];

function Reel({ id, i }: { id: string; i: number }) {
  const ref = useRef<HTMLVideoElement>(null);
  const visible = useInView(ref, { amount: 0.4 });

  // Only the reels on screen play, to keep mobile data and battery in check.
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (visible) v.play().catch(() => {});
    else v.pause();
  }, [visible]);

  return (
    <motion.a
      href={INSTAGRAM}
      target="_blank"
      rel="noopener noreferrer"
      className={`reel reel--${i}`}
      variants={cardVariants}
      whileHover={{ y: -8, transition: { duration: 0.25 } }}
    >
      <video ref={ref} src={`/video/${id}.mp4`} poster={`/img/${id}.webp`} muted loop playsInline preload="metadata" />
      <span className="reel__tag">
        <Instagram width={14} height={14} /> {INSTAGRAM_HANDLE}
      </span>
    </motion.a>
  );
}

export default function Reels() {
  const { t } = useLang();
  return (
    <section className="reels section section--dark">
      <div className="container">
        <div className="section-head section-head--row reels__head">
          <div>
            <p className="kicker kicker--light">{t.reels.kicker}</p>
            <RevealText className="title title--light">{t.reels.title}</RevealText>
          </div>
          <MagneticButton href={INSTAGRAM} target="_blank" className="btn btn--accent">
            {t.reels.cta} <Arrow width={16} height={16} />
          </MagneticButton>
        </div>
      </div>
      <motion.div
        className="reels__track"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {REELS.map((r, i) => (
          <Reel key={r} id={r} i={i} />
        ))}
      </motion.div>
    </section>
  );
}
