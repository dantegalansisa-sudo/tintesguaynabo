import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { useLang } from '../i18n';
import { EASINGS, scrollToId } from '../easings';
import { INSTAGRAM, PHONE_DISPLAY, PHONE_TEL } from '../content';
import { Logo, Arrow, Instagram, Phone } from './Icons';
import MagneticButton from './MagneticButton';

export function LangToggle({ dark = false }: { dark?: boolean }) {
  const { lang, setLang } = useLang();
  return (
    <div className={`lang${dark ? ' lang--dark' : ''}`} role="group" aria-label="Language">
      {(['es', 'en'] as const).map((l) => (
        <button key={l} className={lang === l ? 'is-active' : ''} onClick={() => setLang(l)} aria-pressed={lang === l}>
          {lang === l && <motion.span layoutId={`lang-pill-${dark}`} className="lang__pill" transition={{ type: 'spring', stiffness: 400, damping: 32 }} />}
          <span>{l.toUpperCase()}</span>
        </button>
      ))}
    </div>
  );
}

export default function Header({ ready }: { ready: boolean }) {
  const { t } = useLang();
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setSolid(y > 40);
    setHidden(y > 300 && y > prev && !open);
  });

  useEffect(() => {
    document.documentElement.classList.toggle('menu-open', open);
    const lenis = (window as unknown as { __lenis?: { stop: () => void; start: () => void } }).__lenis;
    if (open) lenis?.stop();
    else lenis?.start();
  }, [open]);

  const go = (id: string) => {
    setOpen(false);
    setTimeout(() => scrollToId(id), open ? 450 : 0);
  };

  return (
    <>
      <motion.header
        className={`header${solid ? ' header--solid' : ''}`}
        initial={{ y: -100, opacity: 0 }}
        animate={ready ? { y: hidden ? -110 : 0, opacity: 1 } : {}}
        transition={{ duration: 0.6, ease: EASINGS.premium, delay: hidden ? 0 : 0.1 }}
      >
        <div className="header__inner">
          <a href="#top" onClick={(e) => { e.preventDefault(); go('top'); }} aria-label="KC Tintes Guaynabo">
            <Logo />
          </a>
          <nav className="header__nav">
            {t.nav.links.slice(0, 4).map((l) => (
              <a key={l.id} href={`#${l.id}`} onClick={(e) => { e.preventDefault(); go(l.id); }} className="header__link">
                <span data-text={l.label}>{l.label}</span>
              </a>
            ))}
          </nav>
          <div className="header__right">
            <LangToggle />
            <div className="header__cta">
              <MagneticButton className="btn btn--outline btn--sm" onClick={() => go('cotiza')}>
                {t.nav.cta}
              </MagneticButton>
            </div>
            <button className={`burger${open ? ' is-open' : ''}`} onClick={() => setOpen((o) => !o)} aria-label={open ? t.nav.close : t.nav.menu} aria-expanded={open}>
              <span />
              <span />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="menu"
            initial={{ clipPath: 'circle(0% at calc(100% - 40px) 36px)' }}
            animate={{ clipPath: 'circle(150% at calc(100% - 40px) 36px)' }}
            exit={{ clipPath: 'circle(0% at calc(100% - 40px) 36px)' }}
            transition={{ duration: 0.7, ease: EASINGS.premium }}
          >
            <div className="menu__top">
              <Logo />
              <LangToggle dark />
            </div>
            <nav className="menu__links">
              {[...t.nav.links, { id: 'cotiza', label: t.dock.quote }].map((l, i) => (
                <div key={l.id} className="menu__mask">
                  <motion.a
                    href={`#${l.id}`}
                    onClick={(e) => { e.preventDefault(); go(l.id); }}
                    initial={{ y: '110%' }}
                    animate={{ y: 0 }}
                    exit={{ y: '110%', transition: { duration: 0.3 } }}
                    transition={{ duration: 0.7, delay: 0.2 + i * 0.06, ease: EASINGS.premium }}
                  >
                    <span className="menu__idx">0{i + 1}</span>
                    {l.label}
                    <Arrow className="menu__arrow" />
                  </motion.a>
                </div>
              ))}
            </nav>
            <motion.div className="menu__foot" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
              <a href={`tel:${PHONE_TEL}`} className="menu__phone"><Phone /> {PHONE_DISPLAY}</a>
              <div className="menu__row">
                <span>{t.nav.menuFoot}</span>
                <a href={INSTAGRAM} target="_blank" rel="noopener noreferrer" aria-label="Instagram"><Instagram /></a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
