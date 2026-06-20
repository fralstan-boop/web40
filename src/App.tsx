import { lazy, Suspense, useEffect, useState } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import Hero from './components/Hero';
import Nav from './components/Nav';
import LootDrop from './components/LootDrop';

/* ── Lazy-load below-fold sections ── */
const JoinHub = lazy(() => import('./components/JoinHub'));
const LiveMap = lazy(() => import('./components/LiveMap'));
const Rules = lazy(() => import('./components/Rules'));
const Media = lazy(() => import('./components/Media'));
const Footer = lazy(() => import('./components/Footer'));

function App() {
  useEffect(() => {
    // Initialize Lenis for smooth "butter" scrolling with slight overshoot
    const lenis = new Lenis({
      autoRaf: true,
      duration: 1.2, // Sweet spot for butter-smooth scrolling
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
    });

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <main className="w-full min-h-screen overflow-x-hidden flex flex-col relative">
      {/* Fixed top gold accent bar */}
      <div className="fixed top-0 w-full h-[2px] bg-[#F4C430] z-50 shadow-[0_0_10px_#F4C430]" />

      {/* Base overlay removed to allow clean section-to-section flow */}

      {/* Content (above overlay) */}
      <div className="relative z-10 flex flex-col">
        <Nav />
        <Hero />
        <Suspense fallback={null}>
          <JoinHub />
          <LiveMap />
          <Rules />
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
