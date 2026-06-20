import { Play } from 'lucide-react';

const BRASS = '#C9A24E';

const Media = () => {
    const subCount = '286K+';

    return (
        <section id="media" className="relative w-full px-4 pt-32 pb-32 overflow-hidden" aria-labelledby="media-heading" style={{ background: '#020305' }}>
            
            {/* Cinematic Background Overlay */}
            <div className="absolute inset-0 pointer-events-none z-0 opacity-10 mix-blend-screen" style={{ backgroundImage: 'url("https://github.com/fralstan-boop/etwf/blob/main/1000073956_upscayl_4x.png?raw=true")', backgroundSize: 'cover', backgroundPosition: 'center' }} />
            <div className="absolute inset-0 pointer-events-none z-0" style={{ boxShadow: 'inset 0 0 150px 80px #020305' }} />

            <div className="max-w-[1200px] mx-auto relative z-10 flex flex-col items-center">
                
                {/* ── Heading ── */}
                <div className="mb-16 flex flex-col items-center text-center w-full">
                    <div className="flex items-center justify-center gap-4 w-full mb-4 drop-shadow-[0_0_15px_rgba(201,162,78,0.5)]">
                        <div className="hidden sm:block flex-1 h-[2px] max-w-[200px]" style={{ background: `linear-gradient(to left, ${BRASS}, transparent)` }} />
                        <div className="w-2.5 h-2.5 rotate-45 border-2" style={{ borderColor: BRASS, background: '#020305', boxShadow: '0 0 10px rgba(201,162,78,0.6)' }} />
                        
                        <h2 id="media-heading" className="text-4xl sm:text-5xl md:text-6xl tracking-widest uppercase mx-6 drop-shadow-[0_0_20px_rgba(201,162,78,0.8)]" style={{ fontFamily: "'Playfair Display', serif", color: BRASS }}>
                            Media & Community
                        </h2>
                        
                        <div className="w-2.5 h-2.5 rotate-45 border-2" style={{ borderColor: BRASS, background: '#020305', boxShadow: '0 0 10px rgba(201,162,78,0.6)' }} />
                        <div className="hidden sm:block flex-1 h-[2px] max-w-[200px]" style={{ background: `linear-gradient(to right, ${BRASS}, transparent)` }} />
                    </div>
                    
                    <p className="font-body text-[10px] sm:text-xs uppercase tracking-[0.4em] font-medium text-[#C9A24E]/60 drop-shadow-md">
                        Stay connected. Join the community. Be part of the journey.
                    </p>
                </div>

                {/* ── Cards Grid ── */}
                <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">
                    
                    {/* LEFT: YouTube Card */}
                    <div className="relative w-full rounded-lg transition-all duration-500 hover:shadow-[0_0_40px_rgba(201,162,78,0.3)] group" 
                         style={{ 
                            boxShadow: '0 0 0 1px #C9A24E, 0 0 0 4px #05070A, 0 0 0 5px rgba(201,162,78,0.4), 0 30px 60px rgba(0,0,0,0.9)'
                         }}>
                        
                        <div className="relative w-full h-full rounded-lg overflow-hidden flex flex-col items-center justify-center p-10 min-h-[450px]">
                            
                            {/* Full Background Image */}
                            <div className="absolute inset-0 w-full h-full">
                                <div className="absolute inset-0 bg-[url('/assets/cinematic-background.webp')] bg-cover bg-center opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-1000" />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#020305] via-[#020305]/80 to-transparent" />
                                <div className="absolute inset-0" style={{ boxShadow: 'inset 0 0 60px 20px #020305' }} />
                            </div>

                            {/* Content */}
                            <div className="relative z-10 flex flex-col items-center text-center">
                                {/* Avatar */}
                                <div className="relative mb-6">
                                    <div className="w-36 h-36 rounded-full border-[3px] p-1 flex items-center justify-center bg-[#05070A] drop-shadow-[0_0_40px_rgba(201,162,78,0.6)] group-hover:scale-105 transition-transform duration-500" style={{ borderColor: BRASS }}>
                                        <div className="w-full h-full rounded-full overflow-hidden bg-black/50">
                                            <img
                                                src="https://yt3.googleusercontent.com/AFMstISP-UIj8bMl9FAper9zC-YeHUXVdtad8bcbYiTUQT29sO9BckS_EosLIoMx7e9zdiZ9JSg=s900-c-k-c0x00ffffff-no-rj"
                                                alt="Hayanura"
                                                className="w-full h-full object-cover"
                                                loading="lazy"
                                                onError={(e) => { (e.target as HTMLImageElement).src = '/assets/h-block.png'; }}
                                            />
                                        </div>
                                    </div>
                                    {/* YouTube Play Badge */}
                                    <div className="absolute bottom-2 right-2 w-10 h-10 bg-[#FF0000] rounded-full flex items-center justify-center border-[3px] border-[#0A0D14] shadow-[0_0_20px_rgba(255,0,0,0.6)] group-hover:scale-110 transition-transform">
                                        <Play className="w-5 h-5 text-white ml-0.5" fill="white" />
                                    </div>
                                </div>

                                <h3 className="text-4xl font-bold tracking-widest uppercase mb-2 drop-shadow-[0_0_10px_rgba(201,162,78,0.5)]" style={{ fontFamily: "'Playfair Display', serif", color: BRASS }}>
                                    Hayanura
                                </h3>
                                <div className="flex items-center gap-3 font-body text-sm font-medium mb-6">
                                    <span className="text-white/80">@hayanura</span>
                                    <span className="text-white/30">•</span>
                                    <span style={{ color: BRASS, textShadow: '0 0 10px rgba(201,162,78,0.4)' }}>{subCount} subscribers</span>
                                </div>
                                <p className="font-body text-xs text-white/50 max-w-sm leading-relaxed mb-8 drop-shadow-md">
                                    Official YouTube channel of HayaSMP. Epic wars, nation stories, events, and everything that happens across the Earth.
                                </p>
                                
                                <a 
                                    href="https://youtube.com/@hayanura"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-3 px-12 py-3.5 rounded-sm border hover:bg-[#C9A24E]/10 hover:shadow-[0_0_20px_rgba(201,162,78,0.3)] transition-all duration-300 group/btn"
                                    style={{ borderColor: BRASS }}
                                >
                                    <Play className="w-4 h-4 group-hover/btn:scale-110 transition-transform" style={{ color: BRASS }} />
                                    <span className="font-body text-xs tracking-[0.25em] uppercase font-bold" style={{ color: BRASS }}>Subscribe</span>
                                </a>
                            </div>

                        </div>
                    </div>

                    {/* RIGHT: Discord Card */}
                    <div className="relative w-full rounded-lg transition-all duration-500 hover:shadow-[0_0_40px_rgba(88,101,242,0.2)] group" 
                         style={{ 
                            boxShadow: '0 0 0 1px #5865F2, 0 0 0 4px #05070A, 0 0 0 5px rgba(88,101,242,0.3), 0 30px 60px rgba(0,0,0,0.9)'
                         }}>
                        
                        <div className="relative w-full h-full rounded-lg overflow-hidden" style={{ background: '#0A0D14', minHeight: '450px' }}>
                            <iframe
                                src="https://discord.com/widget?id=1255855071197495390&theme=dark"
                                width="100%"
                                height="100%"
                                allowTransparency={true}
                                sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
                                title="Discord Server"
                                className="absolute inset-0 w-full h-full border-0"
                                style={{
                                    border: 'none',
                                    backgroundColor: 'transparent'
                                }}
                            />
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Media;
