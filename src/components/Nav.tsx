import { useState } from 'react';
import { Menu, X, Youtube } from 'lucide-react';
import { useServerStatus } from './ServerHeartbeat';
import { siteConfig } from '../config/siteConfig';

const NAV_LINKS = [
    { label: 'Home', href: '#' },
    { label: 'World Map', href: '#live-map' },
    { label: 'Nations', href: '#' },
    { label: 'Features', href: '#world-system' },
    { label: 'About', href: '#' },
    { label: 'Store', href: '#' },
];

const Nav = () => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const serverStatus = useServerStatus();

    // Custom discord icon using SVG since lucide doesn't have a perfect brand match
    const DiscordIcon = ({ className }: { className?: string }) => (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
            <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z" />
        </svg>
    );

    return (
        <nav
            className="fixed top-0 left-0 right-0 z-[100] transition-colors duration-300"
            style={{
                background: 'linear-gradient(180deg, rgba(2,3,5,0.98) 0%, rgba(10,13,20,0.95) 100%)',
                backdropFilter: 'blur(12px)',
                borderBottom: '1px solid rgba(201,162,78,0.2)',
                boxShadow: '0 10px 40px rgba(0,0,0,0.8)'
            }}
        >
            {/* Center Diamond Ornament on Bottom Border */}
            <div className="absolute -bottom-[6px] left-1/2 -translate-x-1/2 w-3 h-3 rotate-45 z-10" style={{ background: '#0A0D14', border: '1px solid rgba(201,162,78,0.4)', boxShadow: '0 0 10px rgba(201,162,78,0.5)' }} />
            <div className="absolute -bottom-[3px] left-1/2 -translate-x-1/2 w-1.5 h-1.5 rotate-45 z-20" style={{ background: '#C9A24E', boxShadow: '0 0 5px #C9A24E' }} />

            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 sm:h-20">
                    
                    {/* ── LEFT: Logo & Brand ── */}
                    <div className="flex-shrink-0 flex items-center gap-4 group cursor-pointer">
                        <div className="relative flex items-center justify-center w-10 h-10 border border-dashed rounded-sm" style={{ borderColor: 'rgba(201,162,78,0.4)', background: 'rgba(201,162,78,0.05)' }}>
                            <img 
                                src="/assets/h-block.png" 
                                alt="" 
                                className="w-7 h-7 object-contain transition-transform duration-500 group-hover:scale-110"
                                style={{ filter: 'drop-shadow(0 0 10px rgba(201,162,78,0.5))', imageRendering: 'pixelated' }}
                            />
                        </div>
                        <div className="flex flex-col justify-center leading-none">
                            <span 
                                className="text-white font-medium tracking-[0.25em] uppercase text-sm sm:text-base drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]"
                                style={{ fontFamily: "'Playfair Display', serif" }}
                            >
                                HayaSMP
                            </span>
                            <span 
                                className="text-[#5FA8B5] text-[9px] sm:text-[10px] tracking-[0.4em] uppercase font-bold mt-1 drop-shadow-[0_0_8px_rgba(95,168,181,0.5)]"
                                style={{ fontFamily: "'Cinzel', serif" }}
                            >
                                Earth
                            </span>
                        </div>
                    </div>

                    {/* ── CENTER: Desktop Links ── */}
                    <div className="hidden md:flex items-center justify-center gap-10 lg:gap-14 flex-1 px-8">
                        {NAV_LINKS.map((link) => {
                            const isActive = link.label === 'World Map'; // Hardcode World Map as active for preview
                            return (
                                <a
                                    key={link.label}
                                    href={link.href}
                                    className="relative py-2 text-[11px] lg:text-xs font-body tracking-[0.2em] uppercase transition-all duration-300 group"
                                    style={{
                                        color: isActive ? '#C9A24E' : 'rgba(255,255,255,0.5)',
                                        fontWeight: isActive ? 600 : 500,
                                        textShadow: isActive ? '0 0 15px rgba(201,162,78,0.5)' : 'none'
                                    }}
                                >
                                    <span className="group-hover:text-white transition-colors duration-300">{link.label}</span>
                                    {isActive && (
                                        <span 
                                            className="absolute -bottom-[26px] sm:-bottom-[30px] left-1/2 -translate-x-1/2 w-[150%] h-[1px]"
                                            style={{ background: 'linear-gradient(90deg, transparent, #C9A24E, transparent)', boxShadow: '0 -2px 10px rgba(201,162,78,0.8)' }}
                                        />
                                    )}
                                </a>
                            );
                        })}
                    </div>

                    {/* ── RIGHT: Status & Socials ── */}
                    <div className="hidden md:flex items-center gap-6 flex-shrink-0">
                        {/* Live Status Pill */}
                        <div 
                            className="flex items-center gap-2.5 px-4 py-2 rounded-sm border backdrop-blur-md"
                            style={{
                                background: 'rgba(10,13,20,0.8)',
                                borderColor: 'rgba(201,162,78,0.2)',
                                boxShadow: 'inset 0 0 15px rgba(0,0,0,0.6)'
                            }}
                        >
                            <span className="relative flex h-1.5 w-1.5">
                                {serverStatus.isOnline && (
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#5FA8B5] opacity-50"></span>
                                )}
                                <span className={`relative inline-flex rounded-full h-1.5 w-1.5 ${serverStatus.isOnline ? 'bg-[#5FA8B5]' : 'bg-[#D32F2F]'}`} style={{ boxShadow: serverStatus.isOnline ? '0 0 8px #5FA8B5' : 'none' }}></span>
                            </span>
                            <span className="font-body text-[9px] uppercase tracking-[0.2em] font-medium" style={{ color: 'rgba(255,255,255,0.5)' }}>
                                {serverStatus.isOnline ? (
                                    <><span className="text-[#C9A24E] font-bold">{serverStatus.playerCount}</span> PLAYERS ONLINE</>
                                ) : (
                                    'SERVER OFFLINE'
                                )}
                            </span>
                        </div>

                        {/* Social Icons */}
                        <div className="flex items-center gap-4 border-l pl-6" style={{ borderColor: 'rgba(201,162,78,0.15)' }}>
                            <a href={siteConfig.discordUrl || "#"} target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-[#C9A24E] transition-all duration-300 hover:scale-110 hover:drop-shadow-[0_0_8px_rgba(201,162,78,0.5)]">
                                <span className="sr-only">Discord</span>
                                <DiscordIcon className="w-4 h-4" />
                            </a>
                            <a href={siteConfig.youtubeUrl || "#"} target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-[#C9A24E] transition-all duration-300 hover:scale-110 hover:drop-shadow-[0_0_8px_rgba(201,162,78,0.5)]">
                                <span className="sr-only">YouTube</span>
                                <Youtube className="w-4 h-4" />
                            </a>
                        </div>
                    </div>

                    {/* ── MOBILE: Hamburger Toggle ── */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setMobileOpen(!mobileOpen)}
                            className="p-2 text-white/70 hover:text-white transition-colors"
                            aria-label="Toggle menu"
                        >
                            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* ── MOBILE: Dropdown Menu ── */}
            {mobileOpen && (
                <div 
                    className="md:hidden border-t"
                    style={{ 
                        background: 'rgba(5,8,14,0.95)',
                        borderColor: 'rgba(244,196,48,0.15)',
                    }}
                >
                    <div className="px-4 pt-2 pb-6 space-y-1">
                        {NAV_LINKS.map((link) => {
                            const isActive = link.label === 'Home';
                            return (
                                <a
                                    key={link.label}
                                    href={link.href}
                                    onClick={() => setMobileOpen(false)}
                                    className="block px-3 py-3 rounded-sm text-sm font-body tracking-wider uppercase transition-colors"
                                    style={{
                                        color: isActive ? '#F4C430' : 'rgba(255,255,255,0.8)',
                                        background: isActive ? 'rgba(244,196,48,0.05)' : 'transparent',
                                    }}
                                >
                                    {link.label}
                                </a>
                            );
                        })}
                        
                        <div className="mt-6 pt-6 border-t border-white/10 flex items-center justify-between px-3">
                            <div className="flex items-center gap-2">
                                <span className={`h-2 w-2 rounded-full ${serverStatus.isOnline ? 'bg-green-500' : 'bg-red-500'}`}></span>
                                <span className="font-minecraft text-xs text-white/70 tracking-[0.1em] pt-0.5">
                                    {serverStatus.isOnline ? `${serverStatus.playerCount} Online` : 'Offline'}
                                </span>
                            </div>
                            <div className="flex gap-4">
                                <a href={siteConfig.discordInvite} target="_blank" rel="noreferrer" className="text-white/65 hover:text-[#5FA8B5] transition-colors">
                                    <DiscordIcon className="w-[18px] h-[18px]" />
                                </a>
                                <a href="https://youtube.com/@hayanura" target="_blank" rel="noreferrer" className="text-white/65 hover:text-[#5FA8B5] transition-colors">
                                    <Youtube className="w-[18px] h-[18px]" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Nav;
