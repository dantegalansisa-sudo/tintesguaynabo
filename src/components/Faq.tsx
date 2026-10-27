import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useLang } from '../i18n';
import { EASINGS } from '../easings';
import RevealText from './RevealText';
import { Plus } from './Icons';

export default function Faq() {
  const { t } = useLang();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="faq section">
      <div className="container faq__grid">
        <div className="faq__head">
          <p className="kicker">{t.faq.kicker}</p>
          <RevealText className="title">{t.faq.title}</RevealText>
        </div>
        <div className="faq__list">
          {t.faq.items.map((it, i) => {
            const isOpen = open === i;
            return (
              <motion.div
                key={it.q}
                className={`faq__item${isOpen ? ' is-open' : ''}`}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.06, ease: EASINGS.premium }}
              >
                <button className="faq__q" onClick={() => setOpen(isOpen ? null : i)} aria-expanded={isOpen}>
                  <span>{it.q}</span>
                  <motion.span className="faq__icon" animate={{ rotate: isOpen ? 45 : 0 }} transition={{ duration: 0.35, ease: EASINGS.snappy }}>
                    <Plus width={18} height={18} />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      className="faq__a"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.45, ease: EASINGS.premium }}
                    >
                      <p>{it.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
