import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useLang } from '../i18n';
import { EASINGS, containerVariants, cardVariants } from '../easings';
import { useParallax } from '../hooks/useParallax';
import RevealText from './RevealText';
import AnimatedCounter from './AnimatedCounter';

const IMGS = ['car0', 'car8', 'car5', 'car7', 'car1', 'car4'];

function Tile({ img, caption, i }: { img: string; caption: string; i: number }) {
  const { ref, y } = useParallax(i % 2 ? 40 : 24);
  // The frame is the observed element; the clip-path animates a child so it never hides the target.
  const inView = useInView(ref, { once: true, amount: 0.2 });
  return (
    <figure className={`tile tile--${i}`} data-cursor>
      <div ref={ref} className="tile__frame">
        <motion.div
          className="tile__clip"
          initial={{ clipPath: 'inset(100% 0 0 0)' }}
          animate={inView ? { clipPath: 'inset(0% 0 0 0)' } : undefined}
          transition={{ duration: 1.1, ease: EASINGS.premium, delay: (i % 2) * 0.12 }}
        >
          <motion.img src={`/img/${img}${i === 0 ? '' : '-sm'}.webp`} alt={caption} style={{ y, scale: 1.2 }} loading="lazy" />
        </motion.div>
      </div>
      <figcaption>
        <span>0{i + 1}</span> {caption}
      </figcaption>
    </figure>
  );
}

export default function Work() {
  const { t } = useLang();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const bigX = useTransform(scrollYProgress, [0, 1], ['10%', '-35%']);

  return (
    <section id="trabajo" className="work section" ref={ref}>
      <motion.div className="work__ghost" style={{ x: bigX }} aria-hidden>
        CERAMIC · CARBON · SUNTEK · GUAYNABO
      </motion.div>
      <div className="container">
        <div className="section-head section-head--row">
          <div>
            <p className="kicker">{t.work.kicker}</p>
            <RevealText className="title">{t.work.title}</RevealText>
          </div>
        </div>
        <div className="work__grid">
          {IMGS.map((img, i) => (
            <Tile key={img} img={img} caption={t.work.captions[i]} i={i} />
          ))}
        </div>
        <motion.div className="stats" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
          {t.work.stats.map((s) => (
            <motion.div key={s.l} className="stat" variants={cardVariants}>
              <span className="stat__n">
                {s.n === 0 ? s.s : <AnimatedCounter target={s.n} suffix={s.s} />}
              </span>
              <span className="stat__l">{s.l}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
