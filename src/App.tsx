import { lazy, Suspense, useEffect, useState, useRef, useCallback } from 'react';
import Hero from './components/Hero';
import { AnimatedDivider } from './components/ScrollReveal';
import LootDrop from './components/LootDrop';

/* ── Lazy-load below-fold sections ── */
const JoinHub = lazy(() => import('./components/JoinHub'));
// const LiveMap = lazy(() => import('./components/LiveMap'));
const Rules = lazy(() => import('./components/Rules'));
const Media = lazy(() => import('./components/Media'));
const Footer = lazy(() => import('./components/Footer'));

function App() {
  const [scrollY, setScrollY] = useState(0);
  const rafRef = useRef(0);

  /* Throttled scroll via requestAnimationFrame — fires at most once per frame */
  const handleScroll = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      setScrollY(window.scrollY);
    });
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, [handleScroll]);

  return (
    <main className="w-full min-h-screen overflow-x-hidden flex flex-col relative">
      {/* Fixed top gold accent bar */}
      <div className="fixed top-0 w-full h-[2px] bg-[#F4C430] z-50 shadow-[0_0_10px_#F4C430]" />

      {/* Parallax Design Illustration Overlay — GPU-accelerated with transform */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage:
            'url("https://github.com/fralstan-boop/etwf/blob/main/1000073956_upscayl_4x.png?raw=true")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          opacity: 0.06,
          mixBlendMode: 'screen',
          transform: `translate3d(0, ${-scrollY * 0.15}px, 0)`,
          willChange: 'transform',
        }}
      />

      {/* Content (above overlay) */}
      <div className="relative z-10 flex flex-col">
        <Hero />
        <Suspense fallback={null}>
          <AnimatedDivider />
          <JoinHub />
          <AnimatedDivider />
          {/* <LiveMap />
          <AnimatedDivider /> */}
          <Rules />
          <AnimatedDivider />
          <Media />
          <Footer />
        </Suspense>
      </div>

      {/* Loot-Drop Back to Top */}
      <LootDrop />
    </main>
  );
}

export default App;
