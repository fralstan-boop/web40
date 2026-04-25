import { useState, useEffect } from 'react';
import { ExternalLink, Play } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

const Media = () => {
    const [subCount, setSubCount] = useState<string>('Loading...');

    useEffect(() => {
        const fetchSubs = async () => {
            try {
                const res = await fetch('https://api.allorigins.win/get?url=' + encodeURIComponent('https://www.youtube.com/@hayanura'));
                if (!res.ok) throw new Error('Network response was not ok');
                const data = await res.json();
                const html = data.contents;
                const match = html.match(/"subscriberCountText":\{"accessibility":\{"accessibilityData":\{"label":"([^"]+)"/);
                if (match && match[1]) {
                    setSubCount(match[1].replace(/subscribers?/i, '').trim());
                } else {
                    setSubCount('286K+');
                }
            } catch (err) {
                console.error('Failed to fetch subs:', err);
                setSubCount('286K+');
            }
        };
        fetchSubs();
    }, []);

    return (
        <section id="media" className="max-w-5xl mx-auto w-full px-4 py-4">
            <ScrollReveal>
                <div className="gold-frame rounded bg-black/80 p-4 sm:p-6 md:p-10 relative overflow-hidden">
                    {/* Background overlay blend */}
                    <div
                        className="absolute inset-0 pointer-events-none z-0"
                        style={{
                            backgroundImage: 'url("/assets/second-overlay.png")',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat',
                            opacity: 0.30,
                            mixBlendMode: 'soft-light',
                        }}
                    />
                    <h2 className="relative z-10 font-minecraft text-2xl md:text-3xl text-[#F4C430] uppercase tracking-wider golden-bloom mb-8 flex items-center gap-3">
                        <span className="text-[#8B0000]">▶</span> Media & Community
                    </h2>

                    <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8">

                        {/* LEFT: YouTube + Live World Map */}
                        <div className="flex flex-col gap-6">
                            {/* YouTube Channel Card */}
                            <a
                                href="https://youtube.com/@hayanura"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex flex-col items-center justify-center w-full h-full rounded-xl overflow-hidden relative group border border-[#FF0000]/20 hover:border-[#FF0000]/60 transition-all duration-500 bg-gradient-to-b from-[#1a0a0a] to-black cursor-pointer"
                                style={{
                                    boxShadow: 'inset 0 0 40px rgba(0,0,0,0.8), 0 0 20px rgba(255,0,0,0.05)',
                                    minHeight: '350px',
                                }}
                            >
                                {/* YouTube Banner Background */}
                                <div className="absolute top-0 left-0 w-full h-36 bg-black overflow-hidden">
                                    <div className="absolute inset-0 bg-[url('/assets/cinematic-background.png')] bg-cover bg-center opacity-30 group-hover:opacity-50 group-hover:scale-105 transition-all duration-700" />
                                    <div className="absolute inset-0 bg-gradient-to-b from-[#FF0000]/10 via-transparent to-[#1a0a0a]" />
                                </div>

                                {/* Avatar & Info */}
                                <div className="relative z-10 flex flex-col items-center gap-5 mt-6">
                                    {/* Profile Avatar */}
                                    <div className="relative">
                                        <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-4 border-[#1a0a0a] shadow-[0_0_30px_rgba(255,0,0,0.3)] overflow-hidden bg-black flex items-center justify-center group-hover:scale-105 group-hover:border-[#FF0000]/50 transition-all duration-500">
                                            <img
                                                src="https://yt3.googleusercontent.com/AFMstISP-UIj8bMl9FAper9zC-YeHUXVdtad8bcbYiTUQT29sO9BckS_EosLIoMx7e9zdiZ9JSg=s900-c-k-c0x00ffffff-no-rj"
                                                alt="Hayanura"
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                                onError={(e) => { (e.target as HTMLImageElement).src = '/assets/h-block.png'; }}
                                            />
                                        </div>
                                        {/* Play icon badge */}
                                        <div className="absolute bottom-1 right-1 bg-[#FF0000] w-8 h-8 rounded-full border-2 border-[#1a0a0a] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                                            <Play className="w-4 h-4 text-white ml-0.5" fill="white" />
                                        </div>
                                    </div>

                                    {/* Channel Name */}
                                    <div className="text-center flex flex-col gap-1.5 mt-1">
                                        <h3 className="font-body font-bold text-2xl sm:text-3xl text-white tracking-wide group-hover:text-[#FF0000] transition-colors drop-shadow-md">
                                            HAYANURA
                                        </h3>
                                        <div className="flex items-center justify-center gap-2">
                                            <p className="font-body font-medium text-gray-400 text-sm sm:text-base group-hover:text-gray-200 transition-colors">
                                                @hayanura
                                            </p>
                                            <span className="text-gray-600 text-xs">•</span>
                                            <p className="font-body font-medium text-gray-300 text-sm sm:text-base">
                                                {subCount} subscribers
                                            </p>
                                        </div>
                                    </div>

                                    {/* Action Button */}
                                    <div className="mt-3 px-8 py-2.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full font-body font-semibold text-sm sm:text-base text-white group-hover:bg-[#FF0000] group-hover:border-[#FF0000] group-hover:shadow-[0_0_25px_rgba(255,0,0,0.5)] transition-all duration-300 flex items-center gap-2">
                                        <Play className="w-4 h-4 group-hover:hidden" />
                                        <span className="hidden group-hover:block mr-1">▶</span>
                                        Subscribe
                                    </div>
                                </div>
                            </a>

                            {/* Live World Map text + button (Temporarily hidden) */}
                            {/* 
                            <div className="flex flex-col gap-3 bg-stone-900/50 border border-stone-800 rounded p-5">
                                <h3 className="font-minecraft text-xl text-[#F4C430] uppercase tracking-wider golden-bloom">
                                    Live World Map
                                </h3>
                                <p className="font-body text-sm text-gray-400 leading-relaxed">
                                    Wreaking havoc? Check the live BlueMap to find bases, watch the chaos unfold, and plan your next raid.
                                </p>
                                <a
                                    href="http://mc.hayanura.fun:25598/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn-artifact btn-discord !text-sm !py-2 !px-5 self-start flex items-center gap-2 mt-2"
                                >
                                    Open Fullscreen Map <ExternalLink className="w-4 h-4" />
                                </a>
                            </div>
                            */}
                        </div>

                        {/* RIGHT: Discord Widget — Correct Server ID with gold frame */}
                        <div
                            className="rounded overflow-hidden relative border-2 border-[#F4C430]/30 bg-stone-900/50"
                            style={{
                                boxShadow:
                                    'inset 0 0 40px rgba(0,0,0,0.7), 0 0 15px rgba(244,196,48,0.1)',
                                minHeight: '350px',
                            }}
                        >
                            <iframe
                                src="https://discord.com/widget?id=1215288512392200252&theme=dark"
                                width="100%"
                                height="100%"
                                allowTransparency={true}
                                className="w-full border-none"
                                style={{ minHeight: '350px', height: '100%' }}
                                sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
                            />
                        </div>
                    </div>
                </div>
            </ScrollReveal>
        </section>
    );
};

export default Media;
