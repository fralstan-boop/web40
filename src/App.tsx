import { useEffect, useState } from 'react';
import Hero from './components/Hero';
import JoinHub from './components/JoinHub';
import LiveMap from './components/LiveMap';
import Rules from './components/Rules';
import Media from './components/Media';
import Footer from './components/Footer';
import { AnimatedDivider } from './components/ScrollReveal';
import LootDrop from './components/LootDrop';

function App() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <main className="w-full min-h-screen overflow-x-hidden flex flex-col relative">
      {/* Fixed top gold accent bar */}
      <div className="fixed top-0 w-full h-[2px] bg-[#F4C430] z-50 shadow-[0_0_10px_#F4C430]" />

      {/* Parallax Design Illustration Overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage:
            'url("https://github.com/fralstan-boop/etwf/blob/main/1000073956_upscayl_4x.png?raw=true")',
          backgroundSize: 'cover',
          backgroundPosition: `center ${-scrollY * 0.15}px`,
          backgroundRepeat: 'no-repeat',
          opacity: 0.06,
          mixBlendMode: 'screen',
        }}
      />

      {/* Content (above overlay) */}
      <div className="relative z-10 flex flex-col">
        <Hero />
        <AnimatedDivider />
        <JoinHub />
        <AnimatedDivider />
        <LiveMap />
        <AnimatedDivider />
        <Rules />
        <AnimatedDivider />
        <Media />
        <Footer />
      </div>

      {/* Loot-Drop Back to Top */}
      <LootDrop />
    </main>
  );
}

export default App;
