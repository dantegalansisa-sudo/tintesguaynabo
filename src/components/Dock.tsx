import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useLang } from '../i18n';
import { EASINGS, scrollToId } from '../easings';
import { PHONE_TEL } from '../content';
import { Home, Grid, Spark, Phone, Plus } from './Icons';

const SECTIONS = ['top', 'servicios', 'trabajo', 'cotiza'];

export default function Dock({ ready }: { ready: boolean }) {
  const { t } = useLang();
  const [active, setActive] = useState('top');

  useEffect(() => {
    const els = SECTIONS.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [ready]);

  const items = [
    { id: 'top', label: t.dock.home, icon: <Home /> },
    { id: 'servicios', label: t.dock.services, icon: <Grid /> },
    { id: 'cotiza', label: t.dock.quote, icon: <Plus />, main: true },
    { id: 'trabajo', label: t.dock.work, icon: <Spark /> },
  ];

  return (
    <motion.nav
      className="dock"
      initial={{ y: 120 }}
      animate={ready ? { y: 0 } : {}}
      transition={{ duration: 0.8, delay: 1.4, ease: EASINGS.premium }}
      aria-label="Quick navigation"
    >
      {items.map((it) => (
        <button
          key={it.id}
          className={`dock__item${it.main ? ' dock__item--main' : ''}${active === it.id ? ' is-active' : ''}`}
          onClick={() => scrollToId(it.id)}
        >
          {active === it.id && !it.main && <motion.span layoutId="dock-pill" className="dock__pill" transition={{ type: 'spring', stiffness: 380, damping: 30 }} />}
          <span className="dock__icon">{it.icon}</span>
          <span className="dock__label">{it.label}</span>
        </button>
      ))}
      <a className="dock__item" href={`tel:${PHONE_TEL}`}>
        <span className="dock__icon"><Phone /></span>
        <span className="dock__label">{t.dock.call}</span>
      </a>
    </motion.nav>
  );
}
