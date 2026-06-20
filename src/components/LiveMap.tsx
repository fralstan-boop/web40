import { useState } from 'react';
import { 
    Crosshair, ShieldCheck, ShieldAlert, Shield, Landmark, Tent, Swords, Skull, Flame
} from 'lucide-react';
import { siteConfig } from '../config/siteConfig';

const BRASS = '#C9A24E';
const TEAL = '#5FA8B5';
const RED = '#D32F2F';

const LEGEND_ITEMS = [
    { icon: ShieldCheck, label: 'ALLIED BASE', color: TEAL },
    { icon: ShieldAlert, label: 'ENEMY BASE', color: RED },
    { icon: Shield, label: 'NEUTRAL BASE', color: '#888' },
    { icon: Landmark, label: 'TOWN / CITY', color: BRASS },
    { icon: Tent, label: 'OUTPOST', color: TEAL },
    { icon: Swords, label: 'RAID ACTIVITY', color: BRASS },
    { icon: Skull, label: 'DANGER ZONE', color: RED },
    { icon: Flame, label: 'NETHER PORTAL', color: BRASS },
];

const LiveMap = () => {
    const [isInteractive, setIsInteractive] = useState(false);

    return (
        <section id="live-map" className="relative w-full px-4 pt-16 pb-16 bg-[#020305] flex flex-col items-center justify-center">
            
            <div className="w-full max-w-[1400px] h-[80vh] min-h-[600px] max-h-[800px] relative flex flex-col">
                
                {/* ── Ornate Premium Frame ── */}
                <div 
                    className="relative w-full flex-1 p-2 rounded-sm"
                    style={{ 
                        background: 'linear-gradient(180deg, #1A1A1A 0%, #0A0A0A 100%)',
                        boxShadow: '0 0 0 1px rgba(201,162,78,0.1), inset 0 0 0 1px #000, 0 20px 50px rgba(0,0,0,0.8)'
                    }}
                    onMouseEnter={() => setIsInteractive(true)}
                    onMouseLeave={() => setIsInteractive(false)}
                    onTouchStart={() => setIsInteractive(true)}
                >
                    {/* Inner Gold Border */}
                    <div className="relative w-full h-full p-[2px]" style={{ background: `linear-gradient(135deg, ${hexToRgba(BRASS, 0.4)}, transparent 30%, transparent 70%, ${hexToRgba(BRASS, 0.2)})` }}>
                        
                        {/* Map Container */}
                        <div className="relative w-full h-full bg-[#020305] overflow-hidden">
                            
                            {/* Live Iframe with Medieval Map Filter */}
                            <iframe
                                src={siteConfig.liveMapUrl}
                                title="HayaSMP BlueMap"
                                className="absolute inset-0 w-full h-full border-none transition-all duration-700"
                                style={{ 
                                    filter: 'sepia(0.6) hue-rotate(-15deg) brightness(0.6) contrast(1.25) saturate(1.2)',
                                    opacity: 0.9,
                                    pointerEvents: isInteractive ? 'auto' : 'none' 
                                }}
                                sandbox="allow-scripts allow-same-origin allow-popups"
                            />

                            {/* Soft Vignette to keep text readable but allow native UI to be visible */}
                            <div className="absolute inset-0 pointer-events-none z-10" style={{ boxShadow: 'inset 0 0 80px 30px rgba(2,3,5,0.5)' }} />
                            <div className="absolute inset-0 pointer-events-none z-10 bg-gradient-to-br from-[#020305]/80 via-transparent to-transparent" />

                            {/* ── UI OVERLAYS ── */}
                            <div className="absolute inset-0 pointer-events-none z-20 p-6 sm:p-10 flex flex-col justify-between">
                                
                                {/* Top Row */}
                                <div className="flex justify-between items-start w-full gap-4">
                                    {/* Top Left Header */}
                                    <div className="flex flex-col gap-2 max-w-sm drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]">
                                        <h2 className="text-3xl sm:text-4xl font-medium tracking-widest uppercase flex gap-3" style={{ fontFamily: "'Playfair Display', serif" }}>
                                            <span style={{ color: BRASS, textShadow: '0 0 20px rgba(201,162,78,0.5)' }}>Live</span>
                                            <span className="text-white">World Map</span>
                                        </h2>
                                        <p className="font-body text-[11px] sm:text-xs text-white/70 leading-relaxed mt-2 hidden sm:block">
                                            Pan, zoom, and explore the chaos in real-time. Find bases, track raids, and plan your next move on the live BlueMap.
                                        </p>
                                    </div>

                                </div>


                            </div>
                            
                            {/* Interactive Zone instruction */}
                            {!isInteractive && (
                                <div className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none bg-black/20 backdrop-blur-[1px] transition-all duration-500">
                                    <div className="px-6 py-3 bg-[#0A0D14]/90 border rounded-sm flex items-center gap-3 drop-shadow-[0_0_20px_rgba(201,162,78,0.3)]" style={{ borderColor: BRASS }}>
                                        <Crosshair className="w-4 h-4 animate-pulse" style={{ color: BRASS }} />
                                        <span className="text-xs uppercase tracking-widest font-body" style={{ color: BRASS }}>Click to Interact</span>
                                    </div>
                                </div>
                            )}
                            
                        </div>
                    </div>
                </div>

                {/* ── Bottom Legend ── */}
                <div className="w-full mt-6 flex flex-wrap justify-center items-center gap-x-6 sm:gap-x-10 gap-y-4 px-4 pb-4">
                    {LEGEND_ITEMS.map((item, idx) => {
                        const Icon = item.icon;
                        return (
                            <div key={idx} className="flex items-center gap-2 group cursor-default">
                                <Icon className="w-4 h-4 transition-transform group-hover:scale-110 drop-shadow-[0_0_8px_rgba(201,162,78,0.3)]" style={{ color: item.color }} />
                                <span className="font-body text-[9px] sm:text-[10px] uppercase tracking-[0.2em] font-medium text-white/50 group-hover:text-white/80 transition-colors">
                                    {item.label}
                                </span>
                            </div>
                        );
                    })}
                </div>

            </div>
        </section>
    );
};

// Helper for alpha colors since we removed it from the top
const hexToRgba = (hex: string, alpha: number) => {
    const v = parseInt(hex.replace('#', ''), 16);
    const r = (v >> 16) & 255, g = (v >> 8) & 255, b = v & 255;
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

export default LiveMap;
