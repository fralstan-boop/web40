import { motion, AnimatePresence } from 'framer-motion';
import { Compass, Check } from 'lucide-react';
import { useMemo, useState, useCallback } from 'react';
import { useServerStatus, ServerHeartbeat } from './ServerHeartbeat';

/* ── Ember Particle System — tiny, drifting, varied speeds ── */
const Embers = () => {
    const particles = useMemo(
        () =>
            Array.from({ length: typeof window !== 'undefined' && window.innerWidth < 640 ? 15 : 30 }, (_, i) => ({
                id: i,
                left: Math.random() * 100,
                delay: Math.random() * 10,
                duration: 6 + Math.random() * 10, // varied slow speeds
                size: 1 + Math.random() * 1.5,    // 1–2.5px
                drift: (Math.random() - 0.5) * 80,
                opacity: 0.3 + Math.random() * 0.5,
            })),
        []
    );

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
            {particles.map((p) => (
                <motion.div
                    key={p.id}
                    className="absolute rounded-full"
                    style={{
                        left: `${p.left}%`,
                        bottom: '-3%',
                        width: p.size,
                        height: p.size,
                        background: `radial-gradient(circle, #ffb347, #ff6a00)`,
                        boxShadow: `0 0 ${p.size * 2}px rgba(255,140,0,0.6)`,
                        willChange: 'transform, opacity',
                    }}
                    animate={{
                        y: [0, -(typeof window !== 'undefined' ? window.innerHeight * 1.15 : 1000)],
                        x: [0, p.drift],
                        opacity: [0, p.opacity, p.opacity * 0.6, 0],
                    }}
                    transition={{
                        duration: p.duration,
                        repeat: Infinity,
                        delay: p.delay,
                        ease: 'linear',
                    }}
                />
            ))}
        </div>
    );
};

/* ── Rotating Energy Ring SVG ── */
const EnergyRing = () => (
    <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{ rotate: 360 }}
        transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
        style={{ willChange: 'transform' }}
    >
        <svg viewBox="0 0 200 200" className="w-full h-full" style={{ filter: 'drop-shadow(0 0 8px rgba(255,140,0,0.5))' }}>
            <defs>
                <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FFD700" stopOpacity="0.8" />
                    <stop offset="50%" stopColor="#FF8C00" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#FFD700" stopOpacity="0" />
                </linearGradient>
            </defs>
            <ellipse cx="100" cy="100" rx="88" ry="32" fill="none" stroke="url(#ringGrad)" strokeWidth="1.5" />
        </svg>
    </motion.div>
);

/* ── Diamond Divider ── */
const DiamondDivider = () => (
    <div className="flex items-center gap-3 w-full max-w-md mx-auto my-4 opacity-50">
        <div className="flex-1 h-px bg-gradient-to-r from-transparent to-[#F4C430]" />
        <div className="w-2 h-2 bg-[#F4C430] rotate-45 shadow-[0_0_6px_rgba(244,196,48,0.5)]" />
        <div className="flex-1 h-px bg-gradient-to-l from-transparent to-[#F4C430]" />
    </div>
);

/* ── Particle Burst Generator ── */
const generateParticles = () =>
    Array.from({ length: 18 }, (_, i) => {
        const angle = (Math.PI * 2 * i) / 18 + (Math.random() - 0.5) * 0.6;
        const velocity = 60 + Math.random() * 80;
        const size = 3 + Math.random() * 3;
        return {
            id: i,
            x: Math.cos(angle) * velocity,
            y: Math.sin(angle) * velocity + 30, // gravity pull
            size,
            color: Math.random() > 0.5 ? '#F4C430' : '#FF4500',
            isDiamond: Math.random() > 0.6,
            rotation: Math.random() * 360,
        };
    });

const Hero = () => {
    const [isExploding, setIsExploding] = useState(false);
    const [copied, setCopied] = useState(false);
    const [particles, setParticles] = useState<ReturnType<typeof generateParticles>>([]);
    const serverStatus = useServerStatus();

    const handleCopyIP = useCallback(() => {
        navigator.clipboard.writeText('mc.hayanura.fun:25554');
        setCopied(true);
        setParticles(generateParticles());
        setIsExploding(true);
        setTimeout(() => setIsExploding(false), 900);
        setTimeout(() => setCopied(false), 3000);
    }, []);
    return (
        <motion.section
            className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
        >
            {/* ── LAYER 1: Cinematic Background ── */}
            <div
                className="absolute inset-0 z-0"
                style={{
                    backgroundImage: 'url("/assets/cinematic-background.png")',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center center',
                    backgroundRepeat: 'no-repeat',
                }}
            />
            <div className="absolute inset-0 z-[1] bg-gradient-to-t from-black via-black/50 to-transparent" />
            <div className="absolute inset-0 z-[1] bg-gradient-to-b from-black/50 via-transparent to-transparent" />

            {/* ── LAYER 2: Embers ── */}
            <Embers />

            {/* ── LAYER 3: Content ── */}
            <div className="relative z-20 flex flex-col items-center gap-0 px-3 sm:px-4 py-10 sm:py-16 w-full max-w-5xl">

                {/* ── ARTIFACT CUBE with Pulsing Glow + Energy Ring ── */}
                <motion.div
                    className="relative w-36 h-36 md:w-48 md:h-48 mb-6"
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                >
                    {/* Pulsing glow behind cube */}
                    <motion.div
                        className="absolute inset-0 rounded-full"
                        style={{
                            background: 'radial-gradient(circle, rgba(255,140,0,0.3) 0%, transparent 70%)',
                            filter: 'blur(20px)',
                        }}
                        animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.8, 0.5] }}
                        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                    />
                    <EnergyRing />
                    <img
                        src="/assets/floating-cube-core.png"
                        alt="HayaSMP Artifact Cube"
                        className="absolute inset-0 w-full h-full object-contain z-10"
                        style={{ filter: 'drop-shadow(0 0 40px rgba(255,140,0,0.4))' }}
                        onError={(e) => { (e.target as HTMLImageElement).src = '/assets/h-block.png'; }}
                    />
                </motion.div>

                {/* ── "H A Y A  S M P" — Cinzel light, wide spacing ── */}
                <motion.div
                    className="flex items-center gap-4 w-full max-w-lg"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 1 }}
                >
                    <div className="flex-1 h-px bg-gradient-to-r from-transparent to-[#F4C430]/70" />
                    <p
                        className="text-white/90 uppercase text-sm md:text-base font-normal whitespace-nowrap"
                        style={{ fontFamily: "'Cinzel', serif", letterSpacing: '0.5rem' }}
                    >
                        H A Y A &nbsp;&nbsp; S M P
                    </p>
                    <div className="flex-1 h-px bg-gradient-to-l from-transparent to-[#F4C430]/70" />
                </motion.div>

                {/* ── "WELCOME TO THE" — Playfair Display, thin, elegant ── */}
                <motion.h1
                    className="text-white text-3xl sm:text-5xl md:text-7xl lg:text-8xl uppercase leading-none tracking-wide text-center mt-3"
                    style={{ fontFamily: "'Playfair Display', serif", fontWeight: 400 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7, duration: 1 }}
                >
                    Welcome to the
                </motion.h1>

                {/* ── "CHAOS" — Gradient text + soft blur glow, pulsing ── */}
                <motion.h2
                    className="text-5xl sm:text-6xl md:text-8xl lg:text-[9rem] leading-none -mt-1 md:-mt-3"
                    style={{
                        fontFamily: "'BlowBrush', cursive",
                        background: 'linear-gradient(to right, #FFD700, #FF8C00)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                        filter: 'drop-shadow(0 0 20px rgba(255, 140, 0, 0.6))',
                    }}
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.9, duration: 0.8, ease: 'easeOut' }}
                >
                    CHAOS
                </motion.h2>
                {/* Pulsing underline glow for CHAOS */}
                <motion.div
                    className="w-48 md:w-72 h-[2px] rounded-full -mt-2"
                    style={{ background: 'linear-gradient(to right, transparent, #FF8C00, transparent)' }}
                    animate={{ opacity: [0.3, 0.8, 0.3], scaleX: [0.8, 1, 0.8] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                />

                <DiamondDivider />

                {/* ── Sub-headline ── */}
                <motion.p
                    className="font-minecraft text-sm md:text-base text-white/50 uppercase tracking-[0.25em] sm:tracking-[0.35em] text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2, duration: 1 }}
                >
                    Semi-Anarchy &nbsp;•&nbsp; Total Madness &nbsp;•&nbsp; One Overworked Admin
                </motion.p>

                {/* ── Glass Artifact Buttons ── */}
                <motion.div
                    className="flex flex-col sm:flex-row gap-4 mt-10"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.4, duration: 0.8 }}
                >
                    {/* Join Discord */}
                    <a
                        href="https://discord.gg/Q6tBHmqzJf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative flex items-center justify-center gap-3 px-5 sm:px-7 py-2.5 rounded font-minecraft text-xs sm:text-sm tracking-[0.15em] sm:tracking-[0.2em] text-white/80 uppercase border border-[#8B0000]/60 hover:border-[#ff4444] transition-all duration-500 cursor-pointer overflow-hidden w-full sm:w-auto"
                        style={{
                            backdropFilter: 'blur(4px)',
                            background: 'rgba(139,0,0,0.08)',
                            boxShadow: '0 0 12px rgba(139,0,0,0.25), inset 0 0 12px rgba(139,0,0,0.1)',
                        }}
                    >
                        <svg className="w-4 h-4 text-white/60 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                        </svg>
                        Join Discord
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                    </a>

                    {/* Get Server IP — with Particle Burst */}
                    <div className="relative w-full sm:w-auto">
                        <button
                            onClick={handleCopyIP}
                            className="group relative flex items-center justify-center gap-3 px-5 sm:px-7 py-2.5 rounded font-minecraft text-xs sm:text-sm tracking-[0.15em] sm:tracking-[0.2em] uppercase border transition-all duration-500 cursor-pointer overflow-hidden w-full sm:w-auto"
                            style={{
                                backdropFilter: 'blur(4px)',
                                background: copied ? 'rgba(244,196,48,0.12)' : 'rgba(244,196,48,0.04)',
                                borderColor: copied ? '#F4C430' : 'rgba(244,196,48,0.3)',
                                color: copied ? '#F4C430' : 'rgba(244,196,48,0.8)',
                                boxShadow: copied
                                    ? '0 0 25px rgba(244,196,48,0.4), inset 0 0 15px rgba(244,196,48,0.1)'
                                    : '0 0 12px rgba(244,196,48,0.12), inset 0 0 12px rgba(244,196,48,0.05)',
                                filter: !serverStatus.isOnline ? 'grayscale(50%)' : 'none',
                            }}
                        >
                            {copied ? (
                                <Check className="w-4 h-4 text-[#F4C430]" />
                            ) : (
                                <Compass className="w-4 h-4 text-[#F4C430]/60 group-hover:text-[#F4C430] transition-colors" />
                            )}
                            {copied ? 'Copied to Clipboard!' : 'Get Server IP'}
                            {!copied && <span className="text-[#F4C430]/40 group-hover:text-[#F4C430] transition-colors ml-1">›</span>}
                            {/* Shimmer */}
                            <div
                                className="absolute inset-0 bg-gradient-to-r from-transparent via-[#F4C430]/10 to-transparent transition-transform duration-500"
                                style={{
                                    transform: copied ? 'translateX(100%)' : 'translateX(-100%)',
                                }}
                            />
                            {/* Hover shimmer */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#F4C430]/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                        </button>

                        {/* Particle Burst Overlay */}
                        <AnimatePresence>
                            {isExploding && particles.map((p) => (
                                <motion.div
                                    key={p.id}
                                    className="absolute pointer-events-none z-50"
                                    style={{
                                        left: '50%',
                                        top: '50%',
                                        width: p.size,
                                        height: p.size,
                                        background: p.color,
                                        borderRadius: p.isDiamond ? '1px' : '50%',
                                        rotate: p.isDiamond ? `${p.rotation}deg` : '0deg',
                                        boxShadow: `0 0 ${p.size * 2}px ${p.color}`,
                                    }}
                                    initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                                    animate={{
                                        x: p.x,
                                        y: p.y,
                                        opacity: 0,
                                        scale: 0,
                                    }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.8, ease: 'easeOut' }}
                                />
                            ))}
                        </AnimatePresence>
                    </div>
                </motion.div>

                {/* ── Live Server Heartbeat ── */}
                <motion.div
                    className="mt-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.7, duration: 0.8 }}
                >
                    <ServerHeartbeat status={serverStatus} />
                </motion.div>

                {/* ── Bouncing double-down chevrons ── */}
                <motion.div
                    className="mt-10 flex flex-col items-center cursor-pointer opacity-30 hover:opacity-60 transition-opacity"
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                    onClick={() => document.getElementById('join-hub')?.scrollIntoView({ behavior: 'smooth' })}
                >
                    <svg width="28" height="14" viewBox="0 0 28 14" fill="none">
                        <path d="M2 2L14 12L26 2" stroke="#F4C430" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                    <svg width="28" height="14" viewBox="0 0 28 14" fill="none" className="-mt-2 opacity-50">
                        <path d="M2 2L14 12L26 2" stroke="#F4C430" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                </motion.div>
            </div>
        </motion.section>
    );
};

export default Hero;
