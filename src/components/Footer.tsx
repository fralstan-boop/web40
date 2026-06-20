import { Youtube } from 'lucide-react';
import { useState } from 'react';
import { siteConfig } from '../config/siteConfig';

const SocialCoin = ({
    href,
    icon,
    tooltip,
}: {
    href: string;
    icon: React.ReactNode;
    tooltip: string;
}) => {
    const [hovered, setHovered] = useState(false);

    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="relative group"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            {/* Tooltip */}
            <span
                className="absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] uppercase tracking-[0.2em] px-3 py-1 rounded bg-black/90 border border-[#F4C430]/30 text-[#F4C430] pointer-events-none transition-all duration-300"
                style={{
                    opacity: hovered ? 1 : 0,
                    transform: `translateX(-50%) translateY(${hovered ? 0 : 4}px)`,
                }}
            >
                {tooltip}
            </span>
            {/* Coin */}
            <div
                className="w-12 h-12 rounded-full flex items-center justify-center border-2 border-[#F4C430]/40 transition-all duration-500 cursor-pointer"
                style={{
                    background: hovered
                        ? 'radial-gradient(circle, rgba(244,196,48,0.2) 0%, rgba(139,0,0,0.3) 100%)'
                        : 'radial-gradient(circle, rgba(244,196,48,0.05) 0%, rgba(0,0,0,0.4) 100%)',
                    borderColor: hovered ? '#F4C430' : 'rgba(244,196,48,0.3)',
                    boxShadow: hovered
                        ? '0 0 20px rgba(244,196,48,0.4), inset 0 0 12px rgba(244,196,48,0.1)'
                        : '0 0 8px rgba(244,196,48,0.1), inset 0 0 8px rgba(0,0,0,0.3)',
                }}
            >
                {icon}
            </div>
        </a>
    );
};

const Footer = () => {
    return (
        <footer className="w-full mt-8 relative overflow-hidden">
            {/* ── Top Gold Border with upward glow ── */}
            <div
                className="absolute top-0 left-0 right-0 h-1 z-20"
                style={{
                    background: 'linear-gradient(to right, transparent, #F4C430, #b8860b, #F4C430, transparent)',
                    boxShadow: '0 -10px 30px rgba(244, 196, 48, 0.25), 0 0 15px rgba(244, 196, 48, 0.3)',
                }}
            />

            {/* ── Background: Burgundy-to-Black gradient ── */}
            <div
                className="absolute inset-0 z-0"
                style={{
                    background: 'linear-gradient(180deg, #3d0c0c 0%, #1a0505 40%, #0a0000 100%)',
                }}
            />

            {/* ── Tapestry watermark overlay ── */}
            <div
                className="absolute inset-0 pointer-events-none z-[1]"
                style={{
                    backgroundImage: 'url("/assets/footer-overlay.webp")',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    opacity: 0.05,
                    mixBlendMode: 'soft-light',
                }}
            />

            {/* ── Vignette edges ── */}
            <div
                className="absolute inset-0 pointer-events-none z-[2]"
                style={{
                    background: 'radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.6) 100%)',
                }}
            />

            {/* ── Content ── */}
            <div className="relative z-10 py-10 sm:py-14 px-4 sm:px-6">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">

                    {/* LEFT: Seal of Authority */}
                    <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 text-center sm:text-left">
                        <img
                            loading="lazy"
                            src="/assets/hayaland-emblem.png"
                            alt="Hayaland Emblem"
                            className="flex-shrink-0 w-14 h-14 sm:w-18 sm:h-18 md:w-22 md:h-22 object-contain"
                            style={{
                                filter: 'brightness(0) invert(1) drop-shadow(0 0 15px rgba(255,255,255,0.25))',
                            }}
                        />
                        <div>
                            <h3
                                className="text-xl sm:text-2xl md:text-3xl text-white uppercase tracking-[0.15em] mb-1"
                                style={{ fontFamily: "'Cinzel', serif", fontWeight: 400 }}
                            >
                                Management of Hayaland
                            </h3>
                            <p className="font-body text-xs sm:text-sm text-white/40 tracking-widest uppercase">
                                Managed and Owned by HAYANURA
                            </p>
                        </div>
                    </div>

                    {/* CENTER: Gold Coin Socials */}
                    <div className="flex gap-4 items-center flex-shrink-0">
                        <SocialCoin
                            href="https://youtube.com/@hayanura"
                            tooltip="Watch the Madness"
                            icon={<Youtube className="w-5 h-5 text-[#F4C430]/80 group-hover:text-[#F4C430]" />}
                        />
                        <SocialCoin
                            href={siteConfig.discordInvite}
                            tooltip="Join the Chaos"
                            icon={
                                <svg className="w-5 h-5 text-[#F4C430]/80" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                                </svg>
                            }
                        />
                    </div>

                    {/* RIGHT: HayanuraCorp Corporate Watermark */}
                    <div className="hidden md:flex flex-col items-end gap-1 text-right flex-shrink-0">
                        <img
                            loading="lazy"
                            src="/assets/hayanuracorp.webp"
                            alt="HayanuraCorp"
                            className="w-48 lg:w-56 object-contain mb-1 opacity-60"
                        />
                        <p
                            className="text-white/25 italic tracking-[0.15em]"
                            style={{ fontSize: '10px', fontFamily: "'Playfair Display', serif" }}
                        >
                            Nailing Animating Precisions since 2022 — All Rights Reserved
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
