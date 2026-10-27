import { motion } from 'framer-motion';
import { useLang } from '../i18n';
import { EASINGS, scrollToId } from '../easings';
import { BRAND, INSTAGRAM, INSTAGRAM_HANDLE, MAPS, PHONE_DISPLAY, PHONE_TEL, WHATSAPP } from '../content';
import { useFitText } from '../hooks/useFitText';
import { Logo, Instagram, Whatsapp, ArrowDown } from './Icons';

export default function Footer() {
  const { t } = useLang();
  const fit = useFitText<HTMLSpanElement>([]);
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <div className="footer__brand">
            <Logo />
            <p>{t.footer.line}</p>
          </div>
          <div className="footer__cols">
            <div>
              <h4>{t.footer.contact}</h4>
              <a href={`tel:${PHONE_TEL}`}>{PHONE_DISPLAY}</a>
              <a href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noopener noreferrer">WhatsApp</a>
            </div>
            <div>
              <h4>{t.footer.visit}</h4>
              {t.footer.address.map((l) => (
                <span key={l}>{l}</span>
              ))}
              <a href={MAPS} target="_blank" rel="noopener noreferrer" className="footer__link">{t.footer.directions} ↗</a>
            </div>
            <div>
              <h4>{t.footer.follow}</h4>
              <div className="footer__social">
                <a href={INSTAGRAM} target="_blank" rel="noopener noreferrer" aria-label="Instagram"><Instagram /></a>
                <a href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"><Whatsapp /></a>
              </div>
              <a href={INSTAGRAM} target="_blank" rel="noopener noreferrer">{INSTAGRAM_HANDLE}</a>
            </div>
          </div>
        </div>
        <nav className="footer__nav">
          {t.nav.links.map((l) => (
            <a key={l.id} href={`#${l.id}`} onClick={(e) => { e.preventDefault(); scrollToId(l.id); }}>{l.label}</a>
          ))}
        </nav>
        <div className="footer__big" aria-hidden>
          <motion.span
            ref={fit}
            initial={{ y: '60%', opacity: 0 }}
            whileInView={{ y: '0%', opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.1, ease: EASINGS.premium }}
          >
            {t.footer.big}
          </motion.span>
        </div>
        <div className="footer__bottom">
          <span>© {year} {BRAND}. {t.footer.rights}</span>
          <button onClick={() => scrollToId('top')}>
            {t.footer.top} <ArrowDown width={14} height={14} style={{ transform: 'rotate(180deg)' }} />
          </button>
        </div>
      </div>
    </footer>
  );
}
