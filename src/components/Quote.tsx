import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useLang } from '../i18n';
import { EASINGS } from '../easings';
import { PHONE_DISPLAY, PHONE_TEL, WHATSAPP } from '../content';
import RevealText from './RevealText';
import MagneticButton from './MagneticButton';
import { Check, Whatsapp } from './Icons';

export default function Quote({ pkg, clearPkg }: { pkg: string | null; clearPkg: () => void }) {
  const { t } = useLang();
  const q = t.quote;
  const [vehicle, setVehicle] = useState(0);
  const [svc, setSvc] = useState<number[]>([0]);
  const [name, setName] = useState('');
  const [model, setModel] = useState('');

  const toggle = (i: number) => setSvc((s) => (s.includes(i) ? s.filter((x) => x !== i) : [...s, i].sort()));
  const chosen = svc.map((i) => q.serviceList[i]);
  const valid = chosen.length > 0 || !!pkg;

  const message = [
    q.msgHello,
    name && `${q.msgName}: ${name}`,
    `${q.msgVehicle}: ${q.vehicles[vehicle]}`,
    model && `${q.msgModel}: ${model}`,
    pkg && `${q.msgPackage}: ${pkg}`,
    chosen.length > 0 && `${q.msgServices}: ${chosen.join(', ')}`,
  ]
    .filter(Boolean)
    .join('\n');
  const href = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(message)}`;

  return (
    <section id="cotiza" className="quote section">
      <div className="container quote__grid">
        <div className="quote__copy">
          <p className="kicker kicker--light">{q.kicker}</p>
          <RevealText className="title title--light title--xl">{q.title}</RevealText>
          <p className="lead lead--light">{q.intro}</p>
          <a className="quote__phone" href={`tel:${PHONE_TEL}`}>
            {q.call} <strong>{PHONE_DISPLAY}</strong>
          </a>
        </div>

        <motion.div
          className="quote__card"
          initial={{ opacity: 0, y: 60, rotate: 2 }}
          whileInView={{ opacity: 1, y: 0, rotate: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.9, ease: EASINGS.premium }}
        >
          <fieldset className="quote__field">
            <legend>{q.vehicle}</legend>
            <div className="chips">
              {q.vehicles.map((v, i) => (
                <button key={v} className={`chip${vehicle === i ? ' is-on' : ''}`} onClick={() => setVehicle(i)} aria-pressed={vehicle === i}>
                  {v}
                </button>
              ))}
            </div>
          </fieldset>

          <fieldset className="quote__field">
            <legend>{q.services}</legend>
            <div className="chips">
              {pkg && (
                <button className="chip is-on chip--pkg" onClick={clearPkg}>
                  {pkg} ×
                </button>
              )}
              {q.serviceList.map((s, i) => {
                const on = svc.includes(i);
                return (
                  <button key={s} className={`chip${on ? ' is-on' : ''}`} onClick={() => toggle(i)} aria-pressed={on}>
                    <AnimatePresence initial={false}>
                      {on && (
                        <motion.span className="chip__check" initial={{ width: 0, opacity: 0 }} animate={{ width: 16, opacity: 1 }} exit={{ width: 0, opacity: 0 }}>
                          <Check width={14} height={14} />
                        </motion.span>
                      )}
                    </AnimatePresence>
                    {s}
                  </button>
                );
              })}
            </div>
          </fieldset>

          <div className="quote__inputs">
            <label className="input">
              <input value={name} onChange={(e) => setName(e.target.value)} placeholder=" " autoComplete="given-name" />
              <span>{q.name}</span>
            </label>
            <label className="input">
              <input value={model} onChange={(e) => setModel(e.target.value)} placeholder=" " />
              <span>{q.model}</span>
            </label>
          </div>

          <div className="quote__summary">
            <span>{q.summary}</span>
            <p>
              {q.vehicles[vehicle]}
              {model && ` · ${model}`}
              {' — '}
              {[pkg, ...chosen].filter(Boolean).join(' + ') || q.none}
            </p>
          </div>

          <MagneticButton className={`btn btn--accent btn--block${valid ? '' : ' is-disabled'}`} href={valid ? href : undefined} target="_blank" magnetStrength={0.15}>
            <Whatsapp width={18} height={18} /> {q.send}
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
}
