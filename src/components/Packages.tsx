import { motion } from 'framer-motion';
import { useLang } from '../i18n';
import { containerVariants, cardVariants, scrollToId } from '../easings';
import RevealText from './RevealText';
import { Arrow, Check } from './Icons';

export default function Packages({ onPick }: { onPick: (name: string) => void }) {
  const { t } = useLang();
  return (
    <section id="paquetes" className="packages section">
      <div className="container">
        <div className="section-head">
          <p className="kicker">{t.packages.kicker}</p>
          <RevealText className="title">{t.packages.title}</RevealText>
        </div>
        <motion.div className="pkg__grid" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }}>
          {t.packages.items.map((p, i) => {
            const featured = i === 1;
            return (
              <motion.article
                key={p.name}
                className={`pkg${featured ? ' pkg--featured' : ''}`}
                variants={cardVariants}
                whileHover={{ y: -8, transition: { duration: 0.25 } }}
                data-cursor
              >
                {featured && <span className="pkg__badge">{t.packages.popular}</span>}
                <div className="pkg__shields" aria-hidden>
                  {Array.from({ length: 3 }).map((_, k) => (
                    <svg key={k} width="18" height="20" viewBox="0 0 26 28" className={k <= i ? 'on' : ''}>
                      <path d="M13 1.6 24 5.8v8.1c0 6.4-4.6 10.9-11 12.6C6.6 24.8 2 20.3 2 13.9V5.8z" />
                    </svg>
                  ))}
                </div>
                <h3 className="pkg__name">{p.name}</h3>
                <p className="pkg__sub">{p.sub}</p>
                <ul className="pkg__list">
                  {p.features.map((f) => (
                    <li key={f}>
                      <Check width={16} height={16} /> {f}
                    </li>
                  ))}
                </ul>
                <button
                  className={`btn ${featured ? 'btn--accent' : 'btn--outline'} pkg__btn`}
                  onClick={() => {
                    onPick(p.name);
                    scrollToId('cotiza');
                  }}
                >
                  {t.packages.cta} <Arrow width={16} height={16} />
                </button>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
