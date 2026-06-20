import { memo, useMemo, useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion, type Variants } from 'framer-motion';
import { Compass, Check, Map } from 'lucide-react';
import { useServerStatus, ServerHeartbeat } from './ServerHeartbeat';
import { siteConfig } from '../config/siteConfig';

// ─────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────
const SERVER_IP = siteConfig.javaIp;
const GOLD = '#F4C430';
const TEAL = '#5FA8B5';

// ─────────────────────────────────────────────
// Deterministic pseudo-random (no Math.random in render)
// ─────────────────────────────────────────────
function seededRand(seed: number) {
    const x = Math.sin(seed + 1) * 10000;
    return x - Math.floor(x);
}

// ─────────────────────────────────────────────
// Framer Motion shared variants
// ─────────────────────────────────────────────
const fadeUp: Variants = {
    hidden: { opacity: 0, y: 28 },
    visible: (delay = 0) => ({ opacity: 1, y: 0, transition: { duration: 1, ease: 'easeOut', delay } }),
};

const fadeIn: Variants = {
    hidden: { opacity: 0 },
    visible: (delay = 0) => ({ opacity: 1, transition: { duration: 0.9, ease: 'easeOut', delay } }),
};

// ─────────────────────────────────────────────
// Stars
// ─────────────────────────────────────────────
interface StarData {
    id: number; left: number; top: number;
    size: number; delay: number; duration: number;
}

const buildStars = (count: number): StarData[] =>
    Array.from({ length: count }, (_, i) => ({
        id: i,
        left: seededRand(i * 7) * 100,
        top: seededRand(i * 13) * 68,
        size: 1 + seededRand(i * 3) * 1.5,
        delay: seededRand(i * 5) * 7,
        duration: 2.5 + seededRand(i * 11) * 4,
    }));

const Stars = memo(({ reduced }: { reduced: boolean }) => {
    const [count, setCount] = useState(70);
    useEffect(() => { setCount(window.innerWidth < 640 ? 25 : 70); }, []);
    const stars = useMemo(() => buildStars(count), [count]);

    if (reduced) return null;

    return (
        <div aria-hidden className="absolute inset-0 overflow-hidden pointer-events-none z-10">
            {stars.map(s => (
                <motion.div
                    key={s.id}
                    className="absolute rounded-full bg-white"
                    style={{ left: `${s.left}%`, top: `${s.top}%`, width: s.size, height: s.size, willChange: 'opacity' }}
                    animate={{ opacity: [0.1, 0.9, 0.1] }}
                    transition={{ duration: s.duration, repeat: Infinity, delay: s.delay, ease: 'easeInOut' }}
                />
            ))}
            {/* Shooting stars — CSS only, transform + opacity */}
            <div className="shooting-star shooting-star-1" aria-hidden />
            <div className="shooting-star shooting-star-2" aria-hidden />
            <div className="shooting-star shooting-star-3" aria-hidden />
        </div>
    );
});
Stars.displayName = 'Stars';

// ─────────────────────────────────────────────
// Earth
// ─────────────────────────────────────────────
const Earth = memo(({ reduced }: { reduced: boolean }) => {
    const floatAnim = reduced
        ? {}
        : { y: [0, -10, 0] };
    const floatTrans = reduced
        ? {}
        : { duration: 7, repeat: Infinity, ease: 'easeInOut' as const };

    return (
        <motion.div
            aria-hidden
            className="absolute left-1/2 z-[2] pointer-events-none"
            style={{
                bottom: '-62%',
                // Desktop: 900px, Mobile: 150vw
                width: 'min(900px, 150vw)',
                aspectRatio: '1',
                x: '-50%',
            }}
            initial={{ y: 120, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: reduced ? 0 : 2.2, ease: 'easeOut', delay: reduced ? 0 : 0.3 }}
        >
            {/* Slow orbit illusion: very gentle continuous rotation */}
            <motion.div
                className="w-full h-full"
                animate={reduced ? {} : { rotate: [0, 3, 0, -3, 0] }}
                transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
                style={{ willChange: 'transform' }}
            >
                <motion.div
                    className="w-full h-full"
                    animate={floatAnim}
                    transition={floatTrans}
                    style={{ willChange: 'transform' }}
                >
                    {/* Atmospheric outer glow (behind globe) */}
                    <div
                        className="absolute inset-0 rounded-full"
                        style={{
                            background: 'radial-gradient(ellipse at 50% -10%, rgba(244,196,48,0.2) 0%, rgba(95,168,181,0.15) 45%, transparent 80%)',
                            filter: 'blur(200px)',
                            transform: 'scale(1.2)'
                        }}
                    />
                    {/* Atmospheric rim glow — box-shadow, zero blur filter */}
                    <div
                        className="absolute inset-0 rounded-full"
                        style={{
                            boxShadow: [
                                `0 0 0 1px rgba(${95},${168},${181},0.08)`,
                                `0 0 80px 25px rgba(95,168,181,0.12)`,
                                `0 0 160px 55px rgba(95,168,181,0.07)`,
                                `0 -40px 80px 20px rgba(244,196,48,0.09)`,
                            ].join(', '),
                        }}
                    />
                    {/* Sunrise edge highlight — top-left arc */}
                    <div
                        className="absolute inset-0 rounded-full"
                        style={{
                            background:
                                'radial-gradient(ellipse at 25% 15%, rgba(244,196,48,0.13) 0%, transparent 55%)',
                        }}
                    />
                    <picture>
                        <source srcSet="/assets/earth-globe.webp" type="image/webp" />
                        <img
                            src="/assets/earth-globe.png"
                            alt="HayaSMP Earth — the living world map"
                            loading="eager"
                            decoding="async"
                            className="w-full h-full object-cover rounded-full"
                            style={{ clipPath: 'circle(50% at 50% 50%)', willChange: 'transform' }}
                        />
                    </picture>
                </motion.div>
            </motion.div>
        </motion.div>
    );
});
Earth.displayName = 'Earth';

// ─────────────────────────────────────────────
// ParticleBurst
// ─────────────────────────────────────────────
interface Particle { id: number; x: number; y: number; size: number; color: string; isDiamond: boolean; rotation: number; }

function buildParticles(): Particle[] {
    const count = 14;
    return Array.from({ length: count }, (_, i) => {
        const angle = (Math.PI * 2 * i) / count + (seededRand(i * 17) - 0.5) * 0.6;
        const velocity = 55 + seededRand(i * 23) * 70;
        return {
            id: i,
            x: Math.cos(angle) * velocity,
            y: Math.sin(angle) * velocity + 25,
            size: 3 + seededRand(i * 31) * 3,
            color: seededRand(i * 41) > 0.5 ? GOLD : TEAL,
            isDiamond: seededRand(i * 53) > 0.6,
            rotation: seededRand(i * 61) * 360,
        };
    });
}

const PARTICLES = buildParticles(); // static — built once at module load

interface ParticleBurstProps { isExploding: boolean; }
const ParticleBurst = memo(({ isExploding }: ParticleBurstProps) => (
    <AnimatePresence>
        {isExploding && PARTICLES.map(p => (
            <motion.div
                key={p.id}
                className="absolute pointer-events-none z-50"
                style={{
                    left: '50%', top: '50%',
                    width: p.size, height: p.size,
                    background: p.color,
                    borderRadius: p.isDiamond ? '1px' : '50%',
                    rotate: p.isDiamond ? `${p.rotation}deg` : '0deg',
                    boxShadow: `0 0 ${p.size * 2}px ${p.color}`,
                }}
                initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                animate={{ x: p.x, y: p.y, opacity: 0, scale: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
            />
        ))}
    </AnimatePresence>
));
ParticleBurst.displayName = 'ParticleBurst';

// ─────────────────────────────────────────────
// HeroButton
// ─────────────────────────────────────────────
interface HeroButtonProps {
    onClick: () => void;
    variant: 'gold' | 'teal';
    label: string;
    icon: React.ReactNode;
    suffix?: React.ReactNode;
    disabled?: boolean;
    children?: React.ReactNode;
}
const HeroButton = memo(({ onClick, variant, label, icon, suffix, disabled, children }: HeroButtonProps) => {
    const isGold = variant === 'gold';
    const base = isGold ? GOLD : TEAL;
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            aria-label={label}
            className="group relative flex items-center justify-center gap-2.5 px-7 py-3 rounded-sm font-minecraft text-xs sm:text-sm tracking-[0.18em] uppercase border overflow-hidden w-full sm:w-auto transition-colors duration-300 cursor-pointer"
            style={{
                background: isGold ? 'rgba(244,196,48,0.05)' : 'rgba(95,168,181,0.05)',
                borderColor: isGold ? 'rgba(244,196,48,0.35)' : 'rgba(95,168,181,0.35)',
                color: isGold ? 'rgba(244,196,48,0.9)' : 'rgba(95,168,181,0.9)',
                boxShadow: `0 0 22px ${isGold ? 'rgba(244,196,48,0.14)' : 'rgba(95,168,181,0.14)'}`,
            }}
            onFocus={() => {/* accessible */}}
        >
            {/* Hover fill sweep */}
            <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: isGold ? 'rgba(244,196,48,0.07)' : 'rgba(95,168,181,0.07)' }}
            />
            {/* Shimmer sweep on hover */}
            <div
                className="absolute inset-0 bg-gradient-to-r from-transparent to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"
                style={{ backgroundImage: `linear-gradient(90deg, transparent, ${base}18, transparent)` }}
            />
            <span className="relative z-10 flex items-center gap-2.5">
                {icon}
                {children}
                {suffix}
            </span>
            {/* Border glow on hover */}
            <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 rounded-sm transition-opacity duration-300"
                style={{ boxShadow: `inset 0 0 0 1px ${base}55, 0 0 35px ${base}25` }}
            />
        </button>
    );
});
HeroButton.displayName = 'HeroButton';

// ─────────────────────────────────────────────
// Main Hero
// ─────────────────────────────────────────────
const Hero = () => {
    const [copied, setCopied] = useState(false);
    const [isExploding, setIsExploding] = useState(false);
    const serverStatus = useServerStatus();
    const reduced = useReducedMotion() ?? false;

    const handleCopyIP = useCallback(() => {
        navigator.clipboard.writeText(SERVER_IP);
        setCopied(true);
        setIsExploding(true);
        const t1 = setTimeout(() => setIsExploding(false), 900);
        const t2 = setTimeout(() => setCopied(false), 3000);
        return () => { clearTimeout(t1); clearTimeout(t2); };
    }, []);

    const scrollToMap = useCallback(() => {
        document.getElementById('world-map')?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' });
    }, [reduced]);

    return (
        <>
            {/* Shooting star CSS injected once */}
            <style>{SHOOTING_STAR_CSS}</style>

            <motion.section
                className="relative w-full min-h-[100svh] flex flex-col items-center justify-center overflow-hidden"
                initial="hidden"
                animate="visible"
                aria-label="HayaSMP Earth — Hero"
                style={{
                    background: [
                        'radial-gradient(ellipse at 50% 0%, #0D1F2D 0%, #060C12 45%, #020507 100%)',
                    ].join(', '),
                }}
            >
                {/* ── BG: Rim-light atmospheric glow behind the earth ── */}
                <div
                    aria-hidden
                    className="absolute left-1/2 bottom-0 z-[1] pointer-events-none"
                    style={{
                        transform: 'translateX(-50%)',
                        width: 'min(1100px, 160vw)',
                        height: '45vh',
                        background: [
                            'radial-gradient(ellipse at 50% 100%, rgba(244,196,48,0.16) 0%, rgba(95,168,181,0.12) 30%, transparent 65%)',
                        ].join(', '),
                    }}
                />

                {/* ── LAYER: Earth ── */}
                <Earth reduced={reduced} />

                {/* ── LAYER: Stars ── */}
                <Stars reduced={reduced} />

                {/* ── LAYER: Bottom fade (space → earth seamline) ── */}
                <div
                    aria-hidden
                    className="absolute bottom-0 left-0 right-0 z-[3] pointer-events-none"
                    style={{ height: '38%', background: 'linear-gradient(to top, #020507 0%, transparent 100%)' }}
                />

                {/* ── LAYER: Lower hero darkening for CTA legibility ── */}
                <div
                    aria-hidden
                    className="absolute inset-x-0 bottom-0 z-[4] pointer-events-none"
                    style={{ height: '55%', background: 'linear-gradient(to bottom, transparent 0%, rgba(5,8,14,0.5) 100%)' }}
                />



                {/* ── LAYER: Content ── */}
                <div className="relative z-20 flex flex-col items-center px-4 sm:px-6 w-full max-w-5xl">

                    {/* Headline: One World. */}
                    <motion.h1
                        className="text-white text-[2.6rem] xs:text-5xl sm:text-6xl md:text-8xl lg:text-[6.5rem] uppercase leading-[0.9] tracking-wide text-center mt-20 sm:mt-28 md:mt-32"
                        variants={fadeUp}
                        custom={0.45}
                        style={{
                            fontFamily: "'Playfair Display', serif",
                            fontWeight: 400,
                            textShadow: '0 4px 16px rgba(0,0,0,0.7), 0 1px 4px rgba(0,0,0,0.9)',
                        }}
                    >
                        One World.
                    </motion.h1>

                    {/* Headline: Infinite Empires. */}
                    <motion.h2
                        className="text-[2.4rem] xs:text-5xl sm:text-6xl md:text-8xl lg:text-[6.5rem] leading-[0.9] -mt-1 sm:-mt-2 text-center"
                        variants={fadeUp}
                        custom={0.65}
                        style={{
                            fontFamily: "'Playfair Display', serif",
                            fontWeight: 700,
                            fontStyle: 'italic',
                            background: `linear-gradient(100deg, ${GOLD} 0%, #E8B820 40%, ${TEAL} 100%)`,
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                            filter: 'drop-shadow(0 4px 16px rgba(0,0,0,0.7)) drop-shadow(0 1px 4px rgba(0,0,0,0.9))',
                            paddingRight: '0.15em',
                            paddingBottom: '0.2em',
                            marginBottom: '-0.2em',
                        }}
                    >
                        Infinite Empires.
                    </motion.h2>

                    {/* CTA buttons */}
                    <motion.div
                        className="mt-8 sm:mt-9 flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto items-center"
                        style={{
                            background: 'rgba(2,5,10,0.60)',
                            borderRadius: '999px',
                            padding: '10px 18px',
                        }}
                        variants={fadeIn}
                        custom={1.1}
                    >
                        {/* Primary: Join Server */}
                        <div className="relative w-full sm:w-auto">
                            <HeroButton
                                onClick={handleCopyIP}
                                variant="gold"
                                label="Copy server IP and join HayaSMP Earth"
                                icon={
                                    copied
                                        ? <Check className="w-4 h-4 text-[#F4C430]" aria-hidden />
                                        : <Compass className="w-4 h-4" aria-hidden />
                                }
                                suffix={!copied ? <span className="opacity-40 group-hover:opacity-100 transition-opacity">›</span> : undefined}
                            >
                                {copied ? 'IP Copied!' : 'Join Server'}
                            </HeroButton>
                            <ParticleBurst isExploding={isExploding} />
                        </div>

                        {/* Secondary: Explore World Map */}
                        <HeroButton
                            onClick={scrollToMap}
                            variant="teal"
                            label="Explore the live world map"
                            icon={<Map className="w-4 h-4" aria-hidden />}
                        >
                            Explore World Map
                        </HeroButton>
                    </motion.div>

                    {/* Server Heartbeat */}
                    <motion.div
                        className="mt-4"
                        style={{
                            background: 'rgba(2,5,10,0.60)',
                            borderRadius: '999px',
                            padding: '5px 18px',
                        }}
                        variants={fadeIn}
                        custom={1.35}
                    >
                        <ServerHeartbeat status={serverStatus} />
                    </motion.div>



                    {/* Scroll chevrons */}
                    <motion.div
                        className="mt-8 flex flex-col items-center cursor-pointer"
                        style={{ opacity: 0.45, filter: 'drop-shadow(0 0 8px rgba(0,0,0,0.9))' }}
                        animate={reduced ? {} : { y: [0, 9, 0] }}
                        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                        onClick={() => document.getElementById('world-system')?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' })}
                        role="button"
                        aria-label="Scroll to world system"
                        tabIndex={0}
                        onKeyDown={e => e.key === 'Enter' && document.getElementById('world-system')?.scrollIntoView({ behavior: 'smooth' })}
                        whileHover={{ opacity: 0.75 }}
                    >
                        <svg width="26" height="13" viewBox="0 0 26 13" fill="none" aria-hidden>
                            <path d="M1 1L13 11L25 1" stroke={GOLD} strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                        <svg width="26" height="13" viewBox="0 0 26 13" fill="none" aria-hidden className="-mt-2 opacity-45">
                            <path d="M1 1L13 11L25 1" stroke={GOLD} strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                    </motion.div>
                </div>
            </motion.section>
        </>
    );
};

// ─────────────────────────────────────────────
// Shooting star CSS (injected once, no extra requests)
// ─────────────────────────────────────────────
const SHOOTING_STAR_CSS = `
.shooting-star {
    position: absolute;
    width: 90px;
    height: 1px;
    background: linear-gradient(to right, transparent, rgba(255,255,255,0.85), transparent);
    border-radius: 999px;
    opacity: 0;
    transform-origin: right center;
    will-change: transform, opacity;
}
@keyframes shoot {
    0%   { opacity: 0; transform: translateX(0)   translateY(0)   rotate(-28deg); }
    5%   { opacity: 0.8; }
    100% { opacity: 0; transform: translateX(-420px) translateY(220px) rotate(-28deg); }
}
@media (prefers-reduced-motion: no-preference) {
    .shooting-star-1 { top: 12%; left: 65%; animation: shoot 5.5s ease-in 2.5s infinite; }
    .shooting-star-2 { top: 8%;  left: 40%; animation: shoot 5.5s ease-in 8.0s infinite; }
    .shooting-star-3 { top: 18%; left: 80%; animation: shoot 5.5s ease-in 14s  infinite; }
}
`;

export default Hero;
