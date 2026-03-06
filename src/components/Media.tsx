import { ExternalLink, Play } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

const Media = () => {
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
                            {/* YouTube Placeholder (until valid URL is provided) */}
                            <a
                                href="https://youtube.com/@hayanura"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full aspect-video rounded overflow-hidden relative group block border-2 border-stone-800 hover:border-[#F4C430]/40 transition-colors duration-500 bg-stone-900 cursor-pointer"
                            >
                                {/* Dark cinematic background */}
                                <div className="absolute inset-0 bg-gradient-to-br from-stone-800 via-stone-900 to-black" />

                                {/* Server branding overlay */}
                                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 z-10">
                                    <img
                                        src="/assets/h-block.png"
                                        alt="HayaSMP"
                                        className="w-16 h-16 object-contain opacity-40 group-hover:opacity-70 transition-opacity"
                                    />
                                    {/* Play button */}
                                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-[#8B0000] rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(139,0,0,0.5)] group-hover:bg-[#a00000] group-hover:scale-110 transition-all">
                                        <Play className="w-5 h-5 sm:w-7 sm:h-7 text-white ml-1" fill="white" />
                                    </div>
                                    <span className="font-minecraft text-sm text-gray-400 uppercase tracking-widest group-hover:text-[#F4C430] transition-colors">
                                        Watch on YouTube
                                    </span>
                                </div>
                            </a>

                            {/* Live World Map text + button */}
                            <div className="flex flex-col gap-3 bg-stone-900/50 border border-stone-800 rounded p-5">
                                <h3 className="font-minecraft text-xl text-[#F4C430] uppercase tracking-wider golden-bloom">
                                    Live World Map
                                </h3>
                                <p className="font-body text-sm text-gray-400 leading-relaxed">
                                    Wreaking havoc? Check the live BlueMap to find bases, watch the chaos unfold, and plan your next raid.
                                </p>
                                <a
                                    href="http://mc.hayanura.fun:25576/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn-artifact btn-discord !text-sm !py-2 !px-5 self-start flex items-center gap-2 mt-2"
                                >
                                    Open Fullscreen Map <ExternalLink className="w-4 h-4" />
                                </a>
                            </div>
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
