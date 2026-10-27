import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { EASINGS } from '../easings';
import { useLang } from '../i18n';

export default function Loader({ onDone }: { onDone: () => void }) {
  const { t } = useLang();
  const [n, setN] = useState(0);

  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const dur = 1500;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / dur);
      setN(Math.round(100 * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
      else setTimeout(onDone, 250);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onDone]);

  return (
    <motion.div
      className="loader"
      initial={{ clipPath: 'inset(0 0 0% 0)' }}
      exit={{ clipPath: 'inset(0 0 100% 0)' }}
      transition={{ duration: 0.9, ease: EASINGS.cinematic }}
    >
      <div className="loader__center">
        <motion.img
          src="/logo.png"
          alt="KC Tintes Guaynabo"
          className="loader__logo"
          initial={{ clipPath: 'inset(0 100% 0 0)', scale: 1.08, filter: 'blur(6px)' }}
          animate={{ clipPath: 'inset(0 0% 0 0)', scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: 1.3, ease: EASINGS.premium }}
        />
        <motion.span
          className="loader__sweep"
          initial={{ x: '-120%' }}
          animate={{ x: '220%' }}
          transition={{ duration: 1.1, delay: 0.7, ease: EASINGS.smooth }}
        />
      </div>
      <div className="loader__foot">
        <span>{t.loader}</span>
        <span className="loader__num">{String(n).padStart(3, '0')}</span>
      </div>
      <motion.div className="loader__bar" style={{ scaleX: n / 100 }} />
    </motion.div>
  );
}
