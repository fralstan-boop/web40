import { memo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Flag, Swords, Handshake, Landmark, type LucideIcon } from 'lucide-react';

const BRASS = '#C9A24E';
const TEAL = '#5FA8B5';
const PARCHMENT = '#F3ECDA';

const hexToRgba = (hex: string, alpha: number) => {
    const v = parseInt(hex.replace('#', ''), 16);
    const r = (v >> 16) & 255, g = (v >> 8) & 255, b = v & 255;
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

const fadeUp = (reduced: boolean, delay = 0) => ({
    hidden: { opacity: 0, y: reduced ? 0 : 30 },
    visible: { opacity: 1, y: 0, transition: { duration: reduced ? 0.3 : 0.8, ease: 'easeOut' as const, delay } },
});

const octagonClip = 'polygon(16px 0, calc(100% - 16px) 0, 100% 16px, 100% calc(100% - 16px), calc(100% - 16px) 100%, 16px 100%, 0 calc(100% - 16px), 0 16px)';
const innerOctagonClip = 'polygon(15px 0, calc(100% - 15px) 0, 100% 15px, 100% calc(100% - 15px), calc(100% - 15px) 100%, 15px 100%, 0 calc(100% - 15px), 0 15px)';
const hexClip = 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)';

interface SystemCard {
    id: number;
    icon: LucideIcon;
    heading: string;
    body: string;
    accent: string;
}

const CARDS: SystemCard[] = [
    {
        id: 1,
        icon: Flag,
        heading: 'Claim Nations',
        body: 'Choose a country. Raise your flag. Build your civilization from the ground up.',
        accent: BRASS,
    },
    {
        id: 2,
        icon: Swords,
        heading: 'Global Wars',
        body: 'Expand through strategy and conflict. Every border is a battlefield waiting to be drawn.',
        accent: TEAL,
    },
    {
        id: 3,
        icon: Handshake,
        heading: 'Diplomacy',
        body: 'Create alliances, broker treaties, and outmaneuver your rivals without firing a shot.',
        accent: BRASS,
    },
    {
        id: 4,
        icon: Landmark,
        heading: 'Governments',
        body: 'Run your country your way — monarchy, democracy, empire. The constitution is yours to write.',
        accent: TEAL,
    },
];

const SystemCardItem = memo(({ card, index }: { card: SystemCard; index: number }) => {
    const Icon = card.icon;
    const reduced = !!useReducedMotion();
    
    return (
        <motion.div
            variants={fadeUp(reduced, 0.1 * index)}
            className="group relative w-full h-[380px] sm:h-[420px] flex-1 min-w-[260px] max-w-[340px] transition-transform duration-500 hover:-translate-y-2"
        >
            {/* Top Hexagon Badge */}
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-14 h-14 z-20 flex items-center justify-center bg-[#05070A] transition-all duration-500 group-hover:scale-110" style={{ clipPath: hexClip, border: `1px solid ${card.accent}`, boxShadow: `0 0 20px ${hexToRgba(card.accent, 0.4)}` }}>
                <div className="w-full h-full flex items-center justify-center transition-colors duration-500" style={{ background: hexToRgba(card.accent, 0.1) }}>
                    <div className="w-[85%] h-[85%] flex items-center justify-center bg-[#05070A]" style={{ clipPath: hexClip, border: `1px solid ${hexToRgba(card.accent, 0.5)}` }}>
                        <Icon className="w-5 h-5" style={{ color: card.accent }} />
                    </div>
                </div>
            </div>

            {/* Bottom Diamond Badge */}
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 z-20 bg-[#05070A] rotate-45 transition-all duration-500 group-hover:scale-125 group-hover:rotate-45 group-hover:shadow-[0_0_15px_rgba(255,255,255,0.5)]" style={{ border: `1px solid ${card.accent}`, boxShadow: `0 0 10px ${hexToRgba(card.accent, 0.4)}` }}>
                <div className="w-full h-full" style={{ background: hexToRgba(card.accent, 0.2) }} />
            </div>

            {/* Outer Octagon Border */}
            <div className="relative w-full h-full p-[1px] transition-all duration-500 group-hover:shadow-[0_0_40px_rgba(255,255,255,0.1)]" style={{ background: hexToRgba(card.accent, 0.4), clipPath: octagonClip }}>
                {/* Inner Card Area */}
                <div className="relative w-full h-full flex flex-col justify-end p-8 text-center bg-[#05070A] overflow-hidden group-hover:bg-[#070A11] transition-colors duration-500" style={{ clipPath: innerOctagonClip }}>
                    
                    {/* Placeholder Background Image / Gradient */}
                    <div className="absolute inset-0 z-0 pointer-events-none opacity-40 group-hover:opacity-60 transition-opacity duration-700 mix-blend-screen" style={{ background: `radial-gradient(circle at 50% 30%, ${hexToRgba(card.accent, 0.15)} 0%, transparent 70%)` }} />
                    <div className="absolute inset-0 z-0 pointer-events-none opacity-20" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 0H0v20' fill='none' stroke='${encodeURIComponent(hexToRgba(card.accent, 0.2))}' stroke-width='0.5'/%3E%3C/svg%3E")` }} />
                    
                    {/* Dark gradient to ensure text readability at the bottom */}
                    <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-[#020305] via-[#020305]/80 to-transparent z-10 pointer-events-none" />

                    {/* Card Content */}
                    <div className="relative z-20 flex flex-col items-center gap-4 mt-auto">
                        <h3 className="text-lg sm:text-xl font-medium tracking-[0.15em] uppercase" style={{ fontFamily: "'Playfair Display', serif", color: card.accent, textShadow: `0 0 12px ${hexToRgba(card.accent, 0.4)}` }}>
                            {card.heading}
                        </h3>
                        <p className="font-body text-[11px] sm:text-[12px] leading-relaxed max-w-[240px]" style={{ color: hexToRgba(PARCHMENT, 0.6) }}>
                            {card.body}
                        </p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
});

const Rules = () => {
    const reduced = !!useReducedMotion();

    return (
        <section id="rules" className="relative w-full px-4 pt-16 pb-24 overflow-hidden flex justify-center bg-[#020305]" aria-labelledby="rules-heading">
            
            {/* Full section background image */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <img src="/assets/rules-bg.jpg" onError={(e) => { e.currentTarget.src = '/assets/cinematic-background.png'; }} alt="" className="w-full h-full object-cover opacity-60 mix-blend-screen" />
                {/* Gradient fades at top and bottom to blend into surrounding sections */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#020305] via-transparent to-[#020305]" />
            </div>

            <div className="max-w-[1400px] mx-auto relative z-10 flex flex-col items-center w-full">
                
                {/* ── Heading ── */}
                <motion.div className="mb-8 flex flex-col items-center text-center gap-3" initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={fadeUp(reduced)}>
                    <div className="flex items-center gap-4 mb-2">
                        <div className="h-px w-12" style={{ background: `linear-gradient(to right, transparent, ${hexToRgba(BRASS, 0.6)})` }} />
                        <span className="font-body text-[10px] sm:text-[11px] uppercase tracking-[0.4em] font-semibold" style={{ color: BRASS }}>The World System</span>
                        <div className="h-px w-12" style={{ background: `linear-gradient(to left, transparent, ${hexToRgba(BRASS, 0.6)})` }} />
                    </div>
                    
                    <h2 id="rules-heading" className="text-4xl sm:text-5xl md:text-[4rem] lg:text-[4.5rem] tracking-wide uppercase mt-1 flex flex-col items-center leading-[1.1]" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 400 }}>
                        <span className="text-white drop-shadow-[0_2px_12px_rgba(255,255,255,0.2)]">How the World</span>
                        <span className="mt-2" style={{ background: `linear-gradient(90deg, ${BRASS} 0%, #E8B820 40%, ${TEAL} 100%)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', filter: 'drop-shadow(0 4px 16px rgba(0,0,0,0.5))' }}>
                            Is Ruled
                        </span>
                    </h2>
                    
                    <p className="font-body text-xs sm:text-sm tracking-[0.05em] text-white/60 max-w-[500px] mt-6 leading-relaxed">
                        Power is in the hands of those who build, conquer, and lead. Everything you do shapes the world.
                    </p>
                </motion.div>

                {/* ── Cards Grid ── */}
                <motion.div 
                    className="flex flex-col lg:flex-row justify-center items-center lg:items-stretch gap-8 lg:gap-6 xl:gap-8 w-full mt-16 px-4"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-100px' }}
                >
                    {CARDS.map((card, index) => (
                        <SystemCardItem key={card.id} card={card} index={index} />
                    ))}
                </motion.div>

            </div>
        </section>
    );
};

export default Rules;
