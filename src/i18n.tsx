import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { CONTENT, type Content, type Lang } from './content';

interface LangCtx {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: Content;
}

const Ctx = createContext<LangCtx | null>(null);

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(() => {
    try {
      const saved = localStorage.getItem('bs-lang');
      if (saved === 'es' || saved === 'en') return saved;
    } catch {}
    return 'es';
  });

  useEffect(() => {
    document.documentElement.lang = lang;
    try {
      localStorage.setItem('bs-lang', lang);
    } catch {}
  }, [lang]);

  return <Ctx.Provider value={{ lang, setLang, t: CONTENT[lang] }}>{children}</Ctx.Provider>;
}

export function useLang() {
  const c = useContext(Ctx);
  if (!c) throw new Error('useLang outside provider');
  return c;
}
