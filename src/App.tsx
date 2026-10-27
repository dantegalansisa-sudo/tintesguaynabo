import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Lenis from 'lenis';
import { LangProvider } from './i18n';
import CustomCursor from './components/CustomCursor';
import Loader from './components/Loader';
import Header from './components/Header';
import Dock from './components/Dock';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import Manifesto from './components/Manifesto';
import Services from './components/Services';
import Layers from './components/Layers';
import TintLab from './components/TintLab';
import Process from './components/Process';
import Work from './components/Work';
import Reels from './components/Reels';
import Packages from './components/Packages';
import Faq from './components/Faq';
import Quote from './components/Quote';
import Footer from './components/Footer';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [pkg, setPkg] = useState<string | null>(null);
  const done = useCallback(() => setLoading(false), []);

  useEffect(() => {
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true });
    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;
    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('is-loading', loading);
    const lenis = (window as unknown as { __lenis?: Lenis }).__lenis;
    if (loading) lenis?.stop();
    else lenis?.start();
  }, [loading]);

  return (
    <LangProvider>
      <CustomCursor />
      <AnimatePresence>{loading && <Loader onDone={done} />}</AnimatePresence>
      <Header ready={!loading} />
      <main>
        <Hero ready={!loading} />
        <Marquee />
        <Manifesto />
        <Services />
        <Layers />
        <TintLab />
        <Process />
        <Work />
        <Reels />
        <Packages onPick={setPkg} />
        <Faq />
        <Quote pkg={pkg} clearPkg={() => setPkg(null)} />
      </main>
      <Footer />
      <Dock ready={!loading} />
    </LangProvider>
  );
}
