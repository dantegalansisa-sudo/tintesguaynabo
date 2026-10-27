import { useRef } from 'react';
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { useLang } from '../i18n';
import { EASINGS, scrollToId } from '../easings';
import type { Content } from '../content';
import RevealText from './RevealText';
import { Arrow, Check } from './Icons';

type Item = Content['services']['items'][number];

function Card({ item, i, n, progress, cta }: { item: Item; i: number; n: number; progress: MotionValue<number>; cta: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'start start'] });
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.35, 1]);
  const target = 1 - (n - i) * 0.04;
  const scale = useTransform(progress, [i / n, 1], [1, target]);
  const dim = useTransform(progress, [i / n, Math.min(1, (i + 1) / n)], [0, i === n - 1 ? 0 : 0.35]);

  return (
    <div ref={ref} className="svc__sticky" style={{ top: `calc(var(--stack-top) + ${i * 14}px)` }}>
      <motion.article className="svc" style={{ scale }} data-cursor>
        <div className="svc__media">
          <motion.img src={`/img/${item.img}.webp`} alt={item.long} style={{ scale: imgScale }} loading="lazy" />
          <span className="svc__tag">{item.tag}</span>
        </div>
        <div className="svc__body">
          <div className="svc__head">
            <span className="svc__num">0{i + 1}</span>
            <h3 className="svc__name">{item.name}</h3>
            <span className="svc__long">{item.long}</span>
          </div>
          <p className="svc__desc">{item.desc}</p>
          <ul className="svc__list">
            {item.bullets.map((b) => (
              <li key={b}>
                <Check width={16} height={16} /> {b}
              </li>
            ))}
          </ul>
          <button className="svc__cta" onClick={() => scrollToId('cotiza')}>
            {cta} {item.long} <Arrow width={16} height={16} />
          </button>
        </div>
        <motion.div className="svc__dim" style={{ opacity: dim }} />
      </motion.article>
    </div>
  );
}

export default function Services() {
  const { t } = useLang();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const items = t.services.items;

  return (
    <section id="servicios" className="services section section--dark">
      <div className="container">
        <div className="section-head">
          <p className="kicker kicker--light">{t.services.kicker}</p>
          <RevealText className="title title--light">{t.services.title}</RevealText>
          <motion.p
            className="lead lead--light"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3, ease: EASINGS.premium }}
          >
            {t.services.intro}
          </motion.p>
        </div>
        <div ref={ref} className="svc__stack">
          {items.map((it, i) => (
            <Card key={it.key} item={it} i={i} n={items.length} progress={scrollYProgress} cta={t.services.more} />
          ))}
        </div>
      </div>
    </section>
  );
}
