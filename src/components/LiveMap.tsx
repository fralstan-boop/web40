import { ExternalLink } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

const LiveMap = () => {
    return (
        <section id="live-map" className="max-w-5xl mx-auto w-full px-4 py-4">
            <ScrollReveal>
                <div className="gold-frame rounded bg-black/80 p-4 sm:p-6 md:p-10 relative overflow-hidden">
                    {/* Background overlay blend */}
                    <div
                        className="absolute inset-0 pointer-events-none z-0"
                        style={{
                            backgroundImage: 'url("/assets/third-overlay.png")',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat',
                            opacity: 0.30,
                            mixBlendMode: 'soft-light',
                        }}
                    />
                    <h2 className="relative z-10 font-minecraft text-2xl md:text-3xl text-[#F4C430] uppercase tracking-wider golden-bloom mb-6">
                        Live World Map
                    </h2>
                    <p className="relative z-10 font-body text-sm text-gray-400 mb-6 max-w-2xl leading-relaxed">
                        Pan, zoom, and explore the chaos in real-time. Find bases, track raids, and plan your next move on the live BlueMap.
                    </p>

                    {/* Interactive Map Iframe */}
                    <div className="relative z-10 w-full aspect-[4/3] sm:aspect-video rounded overflow-hidden border-2 border-stone-800 hover:border-[#F4C430]/50 transition-colors duration-500 relative bg-stone-900">
                        <iframe
                            src="http://mc.hayanura.fun:25598/"
                            title="HayaSMP BlueMap"
                            className="absolute inset-0 w-full h-full border-none"
                            sandbox="allow-scripts allow-same-origin allow-popups"
                        />
                    </div>

                    {/* Open Fullscreen Button */}
                    <div className="relative z-10 mt-6 flex justify-center">
                        <a
                            href="http://mc.hayanura.fun:25598/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-artifact btn-discord !text-sm !py-3 !px-8 flex items-center gap-2"
                        >
                            Open Fullscreen Map <ExternalLink className="w-4 h-4" />
                        </a>
                    </div>
                </div>
            </ScrollReveal>
        </section>
    );
};

export default LiveMap;
