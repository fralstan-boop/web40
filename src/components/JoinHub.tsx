import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { CheckCircle, Copy, Check, Globe, Monitor, Smartphone, Users, Flag, Swords, Clock } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';
import { useServerStatus } from './ServerHeartbeat';

const BRASS = '#C9A24E';
const TEAL = '#5FA8B5';
const VERDIGRIS = '#5FB592';
const PARCHMENT = '#F3ECDA';

const hexToRgba = (hex: string, alpha: number) => {
    const v = parseInt(hex.replace('#', ''), 16);
    const r = (v >> 16) & 255, g = (v >> 8) & 255, b = v & 255;
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

const fadeUp = (reduced: boolean, delay = 0) => ({
    hidden: { opacity: 0, y: reduced ? 0 : 22 },
    visible: { opacity: 1, y: 0, transition: { duration: reduced ? 0.25 : 0.75, ease: 'easeOut' as const, delay } },
});

const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1, ease: 'easeOut' as const } },
};

const octagonClip = 'polygon(16px 0, calc(100% - 16px) 0, 100% 16px, 100% calc(100% - 16px), calc(100% - 16px) 100%, 16px 100%, 0 calc(100% - 16px), 0 16px)';
const innerOctagonClip = 'polygon(15px 0, calc(100% - 15px) 0, 100% 15px, 100% calc(100% - 15px), calc(100% - 15px) 100%, 15px 100%, 0 calc(100% - 15px), 0 15px)';
const hexClip = 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)';
const leftArrowClip = 'polygon(20px 0, 100% 0, 100% 100%, 20px 100%, 0 50%)';
const rightArrowClip = 'polygon(0 0, calc(100% - 20px) 0, 100% 50%, calc(100% - 20px) 100%, 0 100%)';

interface CopiedState { javaIp: boolean; bedrockIp: boolean; bedrockPort: boolean; fullIp: boolean; }

const AddressField = ({ label, value, copied, onCopy, accent }: { label: string; value: string; copied: boolean; onCopy: () => void; accent: string }) => (
    <div className="flex flex-col gap-1.5 relative w-full">
        <span className="font-body uppercase tracking-[0.2em] text-[9px] font-medium" style={{ color: hexToRgba(accent, 0.7) }}>{label}</span>
        <div className="flex items-center justify-between px-4 py-3 border rounded-sm group transition-colors" style={{ background: '#020305', borderColor: hexToRgba(accent, 0.15) }}>
            <span className="font-mono text-sm tracking-wide" style={{ color: PARCHMENT }}>{value}</span>
            <button onClick={onCopy} title={`Copy ${label}`} className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded transition-all duration-200 opacity-60 hover:opacity-100 outline-none" style={{ background: copied ? hexToRgba(VERDIGRIS, 0.1) : 'transparent', border: `1px solid ${copied ? VERDIGRIS : hexToRgba(accent, 0.3)}`, color: copied ? VERDIGRIS : accent }}>
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
        </div>
    </div>
);

const StatBlock = ({ icon: Icon, label, value, accent }: { icon: any, label: string, value: string | number, accent: string }) => (
    <div className="flex-1 flex items-center gap-3 px-4 py-3 border" style={{ borderColor: hexToRgba(accent, 0.15), background: hexToRgba(accent, 0.02), clipPath: 'polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)' }}>
        <Icon className="w-5 h-5" style={{ color: accent }} />
        <div className="flex flex-col">
            <span className="font-body text-[9px] uppercase tracking-wider leading-none mb-1 font-medium" style={{ color: hexToRgba(PARCHMENT, 0.5) }}>{label}</span>
            <span className="font-mono text-sm font-bold leading-none" style={{ color: PARCHMENT }}>{value}</span>
        </div>
    </div>
);

const Toast = ({ text }: { text: string }) => (
    <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 14 }} className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-6 py-3.5 rounded-sm shadow-[0_12px_32px_rgba(0,0,0,0.4)]" style={{ background: '#0B0D11', border: `1px solid ${hexToRgba(VERDIGRIS, 0.4)}` }}>
        <CheckCircle className="w-4 h-4 flex-shrink-0" style={{ color: VERDIGRIS }} />
        <span style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', fontSize: '15px', color: PARCHMENT }}>{text}</span>
    </motion.div>
);

const JoinHub = () => {
    const reduced = !!useReducedMotion();
    const serverStatus = useServerStatus();
    const [toast, setToast] = useState('');
    const [copied, setCopied] = useState<CopiedState>({ javaIp: false, bedrockIp: false, bedrockPort: false, fullIp: false });

    const copyField = (key: keyof CopiedState, value: string, label: string) => {
        navigator.clipboard.writeText(value);
        setCopied(prev => ({ ...prev, [key]: true }));
        setToast(`${label} copied`);
        setTimeout(() => { setCopied(prev => ({ ...prev, [key]: false })); setToast(''); }, 2200);
    };

    return (
        <section id="join-hub" className="relative w-full px-4 pt-8 pb-16 overflow-hidden" aria-labelledby="join-hub-heading" style={{ background: '#020305' }}>
            <AnimatePresence>{toast && <Toast key="toast" text={toast} />}</AnimatePresence>

            {/* Premium Medieval Background Overlay */}
            <div className="absolute inset-0 pointer-events-none z-0 opacity-20 mix-blend-overlay" style={{ backgroundImage: 'url("/assets/cinematic-background.webp")', backgroundSize: 'cover', backgroundPosition: 'center' }} />
            <div className="absolute inset-0 pointer-events-none z-0" style={{ boxShadow: 'inset 0 0 150px 80px #020305' }} />

            <div className="max-w-6xl mx-auto relative z-10 flex flex-col items-center">
                
                {/* ── Heading ── */}
                <motion.div className="mb-8 flex flex-col items-center text-center gap-3" initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={fadeUp(reduced)}>
                    <div className="flex items-center gap-4 mb-2">
                        <div className="h-px w-8" style={{ background: `linear-gradient(to right, transparent, ${hexToRgba(BRASS, 0.6)})` }} />
                        <Globe className="w-4 h-4" style={{ color: BRASS }} />
                        <div className="h-px w-8" style={{ background: `linear-gradient(to left, transparent, ${hexToRgba(BRASS, 0.6)})` }} />
                    </div>
                    <span className="font-body text-[10px] sm:text-xs uppercase tracking-[0.5em] font-semibold text-white/50">Haya SMP Earth</span>
                    
                    <h2 id="join-hub-heading" className="text-4xl sm:text-5xl md:text-7xl tracking-wide uppercase mt-2 mb-2 drop-shadow-[0_0_30px_rgba(201,162,78,0.3)]" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 400, background: `linear-gradient(90deg, ${BRASS} 0%, #E8B820 40%, ${TEAL} 100%)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                        How To Join
                    </h2>
                    <p className="font-body text-[10px] sm:text-xs uppercase tracking-[0.2em] font-medium text-white/40 max-w-lg">Choose your edition and begin your journey across the Earth.</p>
                </motion.div>

                {/* ── Cards Section ── */}
                <div className="relative w-full flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12">
                    
                    {/* Left Cube */}
                    <div className="hidden xl:flex absolute left-0 top-1/2 -translate-y-1/2 w-48 h-48 -ml-16 pointer-events-none justify-center items-center">
                        <div className="absolute inset-0 top-[-200px] w-full bg-gradient-to-b from-transparent to-transparent pointer-events-none" style={{ background: `linear-gradient(to bottom, transparent, ${hexToRgba(BRASS, 0.15)} 50%, transparent)` }} />
                        <img src="/assets/h-block.png" alt="Java Edition Cube" className="w-40 h-40 object-contain drop-shadow-[0_0_24px_rgba(201,162,78,0.3)] relative z-10" />
                    </div>

                    {/* Java Plate */}
                    <motion.div className="relative w-full max-w-[420px]" initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} variants={fadeUp(reduced, 0.1)}>
                        {/* Floating Top Hexagon */}
                        <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-10 h-10 z-20 flex items-center justify-center bg-[#05070A]" style={{ clipPath: hexClip, border: `1px solid ${BRASS}`, boxShadow: `0 0 12px ${hexToRgba(BRASS, 0.3)}` }}>
                            <div className="w-full h-full flex items-center justify-center" style={{ background: hexToRgba(BRASS, 0.1) }}>
                                <Monitor className="w-4 h-4" style={{ color: BRASS }} />
                            </div>
                        </div>

                        {/* Outer Octagon Border Container */}
                        <div className="relative p-[2px] transition-all duration-500 hover:shadow-[0_0_50px_rgba(201,162,78,0.2)] drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)]" style={{ background: `linear-gradient(135deg, ${hexToRgba(BRASS, 0.6)}, transparent 30%, transparent 70%, ${hexToRgba(BRASS, 0.4)})`, clipPath: octagonClip }}>
                            {/* Inner Background */}
                            <div className="relative w-full h-full px-6 pt-10 pb-6 flex flex-col gap-5" style={{ background: 'linear-gradient(180deg, #151515 0%, #0A0D14 100%)', clipPath: innerOctagonClip }}>
                                <div className="text-center">
                                    <h3 className="text-xl sm:text-2xl font-medium tracking-wide mb-1" style={{ fontFamily: "'Playfair Display', serif", color: BRASS }}>JAVA <span style={{ color: PARCHMENT }}>EDITION</span></h3>
                                    <p className="font-body text-[9px] uppercase tracking-[0.2em] font-medium" style={{ color: hexToRgba(BRASS, 0.7) }}>The Elitists</p>
                                </div>
                                <div className="w-full h-px" style={{ background: `linear-gradient(to right, transparent, ${hexToRgba(BRASS, 0.2)}, transparent)` }} />
                                
                                <AddressField label="Server Address" value={siteConfig.javaIp} copied={copied.javaIp} onCopy={() => copyField('javaIp', siteConfig.javaIp, 'Java address')} accent={BRASS} />
                                <p className="font-body text-[10px] text-white/30 text-center -mt-3">Default port • Just paste the IP</p>

                                <div className="flex gap-3 mt-2">
                                    <StatBlock icon={Globe} label="Version" value="1.20+" accent={BRASS} />
                                    <StatBlock icon={Users} label="Players" value={serverStatus.playerCount} accent={BRASS} />
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Bedrock Plate */}
                    <motion.div className="relative w-full max-w-[420px]" initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} variants={fadeUp(reduced, 0.2)}>
                        {/* Floating Top Hexagon */}
                        <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-10 h-10 z-20 flex items-center justify-center bg-[#05070A]" style={{ clipPath: hexClip, border: `1px solid ${TEAL}`, boxShadow: `0 0 12px ${hexToRgba(TEAL, 0.3)}` }}>
                            <div className="w-full h-full flex items-center justify-center" style={{ background: hexToRgba(TEAL, 0.1) }}>
                                <Smartphone className="w-4 h-4" style={{ color: TEAL }} />
                            </div>
                        </div>

                        {/* Outer Octagon Border Container */}
                        <div className="relative p-[2px] transition-all duration-500 hover:shadow-[0_0_50px_rgba(95,168,181,0.2)] drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)]" style={{ background: `linear-gradient(135deg, ${hexToRgba(TEAL, 0.6)}, transparent 30%, transparent 70%, ${hexToRgba(TEAL, 0.4)})`, clipPath: octagonClip }}>
                            {/* Inner Background */}
                            <div className="relative w-full h-full px-6 pt-10 pb-6 flex flex-col gap-5" style={{ background: 'linear-gradient(180deg, #151515 0%, #0A0D14 100%)', clipPath: innerOctagonClip }}>
                                <div className="text-center">
                                    <h3 className="text-xl sm:text-2xl font-medium tracking-wide mb-1" style={{ fontFamily: "'Playfair Display', serif", color: TEAL }}>BEDROCK <span style={{ color: PARCHMENT }}>EDITION</span></h3>
                                    <p className="font-body text-[9px] uppercase tracking-[0.2em] font-medium" style={{ color: hexToRgba(TEAL, 0.7) }}>Mobile Warriors</p>
                                </div>
                                <div className="w-full h-px" style={{ background: `linear-gradient(to right, transparent, ${hexToRgba(TEAL, 0.2)}, transparent)` }} />
                                
                                <AddressField label="Server Address" value={siteConfig.bedrockIp} copied={copied.bedrockIp} onCopy={() => copyField('bedrockIp', siteConfig.bedrockIp, 'Bedrock IP')} accent={TEAL} />
                                <AddressField label="Port" value={siteConfig.bedrockPort} copied={copied.bedrockPort} onCopy={() => copyField('bedrockPort', siteConfig.bedrockPort, 'Bedrock Port')} accent={TEAL} />

                                <div className="flex gap-3 mt-2">
                                    <StatBlock icon={Globe} label="Version" value="Latest" accent={TEAL} />
                                    <StatBlock icon={Users} label="Players" value={serverStatus.playerCount} accent={TEAL} />
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Cube */}
                    <div className="hidden xl:flex absolute right-0 top-1/2 -translate-y-1/2 w-48 h-48 -mr-16 pointer-events-none justify-center items-center">
                        <div className="absolute inset-0 top-[-200px] w-full bg-gradient-to-b from-transparent to-transparent pointer-events-none" style={{ background: `linear-gradient(to bottom, transparent, ${hexToRgba(TEAL, 0.15)} 50%, transparent)` }} />
                        <img src="/assets/h-block.png" alt="Bedrock Edition Cube" className="w-40 h-40 object-contain drop-shadow-[0_0_24px_rgba(95,168,181,0.3)] relative z-10" style={{ filter: 'hue-rotate(145deg) brightness(1.1)' }} />
                    </div>

                </div>

                {/* ── CTA Bar ── */}
                <motion.div className="relative mt-8 w-full max-w-3xl flex justify-center items-center z-30" initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-40px' }} variants={fadeUp(reduced, 0.3)}>
                    
                    {/* Left Half (Gold) */}
                    <div className="flex-1 p-[1px]" style={{ background: `linear-gradient(90deg, transparent, ${BRASS})`, clipPath: leftArrowClip }}>
                        <button onClick={() => copyField('fullIp', siteConfig.javaIp, 'Server address')} className="w-full flex items-center justify-end pr-10 pl-6 py-4 bg-[#080A0F] hover:bg-[#0A0D14] transition-colors cursor-pointer outline-none group" style={{ clipPath: leftArrowClip }}>
                            <div className="flex items-center gap-4">
                                <Copy className="w-5 h-5 opacity-60 group-hover:opacity-100 transition-opacity" style={{ color: BRASS }} />
                                <div className="flex flex-col items-start leading-none text-left">
                                    <span className="font-body font-bold text-sm sm:text-base tracking-widest" style={{ color: PARCHMENT }}>COPY</span>
                                    <span className="font-body text-[10px] uppercase tracking-[0.25em] font-medium mt-1" style={{ color: BRASS }}>Full IP</span>
                                </div>
                            </div>
                        </button>
                    </div>

                    {/* Center Globe */}
                    <div className="relative w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0 z-20 shadow-[0_0_30px_rgba(0,0,0,0.8)] -mx-6 bg-[#05070A]" style={{ border: `2px solid ${hexToRgba(PARCHMENT, 0.15)}`, boxShadow: `0 0 20px ${hexToRgba(BRASS, 0.2)}, inset 0 0 10px rgba(0,0,0,0.8)` }}>
                        {copied.fullIp ? <Check className="w-6 h-6" style={{ color: VERDIGRIS }} /> : <Globe className="w-6 h-6" style={{ color: BRASS }} />}
                        {/* Glow rings */}
                        <div className="absolute inset-[-4px] rounded-full pointer-events-none" style={{ border: `1px solid ${hexToRgba(BRASS, 0.4)}`, clipPath: 'polygon(0 0, 50% 0, 50% 100%, 0 100%)' }} />
                        <div className="absolute inset-[-4px] rounded-full pointer-events-none" style={{ border: `1px solid ${hexToRgba(TEAL, 0.4)}`, clipPath: 'polygon(50% 0, 100% 0, 100% 100%, 50% 100%)' }} />
                    </div>

                    {/* Right Half (Teal) */}
                    <div className="flex-1 p-[1px]" style={{ background: `linear-gradient(270deg, transparent, ${TEAL})`, clipPath: rightArrowClip }}>
                        <button onClick={() => copyField('fullIp', siteConfig.javaIp, 'Server address')} className="w-full flex items-center justify-start pl-10 pr-6 py-4 bg-[#080A0F] hover:bg-[#0A0D14] transition-colors cursor-pointer outline-none group" style={{ clipPath: rightArrowClip }}>
                            <div className="flex items-center gap-4">
                                <div className="flex flex-col items-end leading-none text-right">
                                    <span className="font-body font-bold text-sm sm:text-base tracking-widest" style={{ color: TEAL }}>JOIN THE WORLD</span>
                                    <span className="font-body text-[10px] uppercase tracking-[0.25em] font-medium mt-1 text-white/40">Start your journey</span>
                                </div>
                                <span className="text-xl font-light opacity-60 group-hover:opacity-100 transition-opacity translate-x-0 group-hover:translate-x-1" style={{ color: TEAL }}>→</span>
                            </div>
                        </button>
                    </div>

                </motion.div>

                {/* ── Stats Bar (Moved from Hero) ── */}
                <motion.div className="mt-10 w-full max-w-4xl grid grid-cols-2 md:grid-cols-4 gap-4 px-4 relative z-20" variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                    <div className="flex items-center gap-3 px-4 py-3 rounded-lg border bg-[#05070A]/80 backdrop-blur-md" style={{ borderColor: hexToRgba(BRASS, 0.15) }}>
                        <Users className="w-5 h-5 text-[#F4C430]" />
                        <div className="flex flex-col">
                            <span className="font-mono text-sm sm:text-base font-bold text-[#F4C430] leading-none mb-1">{serverStatus.playerCount}</span>
                            <span className="font-body text-[8px] sm:text-[9px] uppercase tracking-wider text-white/50 leading-none">Rulers Online<br/><span className="opacity-60">Leading their nations</span></span>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 px-4 py-3 rounded-lg border bg-[#05070A]/80 backdrop-blur-md" style={{ borderColor: hexToRgba(TEAL, 0.15) }}>
                        <Flag className="w-5 h-5 text-[#5FA8B5]" />
                        <div className="flex flex-col">
                            <span className="font-mono text-sm sm:text-base font-bold text-[#5FA8B5] leading-none mb-1">{siteConfig.stats.nationsClaimed}</span>
                            <span className="font-body text-[8px] sm:text-[9px] uppercase tracking-wider text-white/50 leading-none">Nations Claimed<br/><span className="opacity-60">And expanding</span></span>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 px-4 py-3 rounded-lg border bg-[#05070A]/80 backdrop-blur-md" style={{ borderColor: hexToRgba(BRASS, 0.15) }}>
                        <Swords className="w-5 h-5 text-[#C06C5D]" />
                        <div className="flex flex-col">
                            <span className="font-mono text-sm sm:text-base font-bold text-[#C06C5D] leading-none mb-1">{siteConfig.stats.warsActive}</span>
                            <span className="font-body text-[8px] sm:text-[9px] uppercase tracking-wider text-white/50 leading-none">Wars Active<br/><span className="opacity-60">Across the world</span></span>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 px-4 py-3 rounded-lg border bg-[#05070A]/80 backdrop-blur-md" style={{ borderColor: hexToRgba(TEAL, 0.15) }}>
                        <Clock className="w-5 h-5 text-[#5FA8B5]" />
                        <div className="flex flex-col">
                            <span className="font-mono text-sm sm:text-base font-bold text-[#5FA8B5] leading-none mb-1">Day {siteConfig.stats.seasonDay}</span>
                            <span className="font-body text-[8px] sm:text-[9px] uppercase tracking-wider text-white/50 leading-none">Season Progress<br/><span className="opacity-60">The world evolves</span></span>
                        </div>
                    </div>
                </motion.div>

            </div>
        </section>
    );
};

export default JoinHub;