import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { siteConfig } from '../config/siteConfig';

/* ── Server Status Hook ── */
interface ServerStatus {
    loading: boolean;
    isOnline: boolean;
    playerCount: number;
    error: boolean;
}

// TODO: Set this to `false` once you have access to the SMP panel and enable server queries
const FORCE_ONLINE = true; 

export const useServerStatus = (): ServerStatus => {
    const [status, setStatus] = useState<ServerStatus>({
        loading: !FORCE_ONLINE, // Instantly load if forced
        isOnline: FORCE_ONLINE,
        playerCount: FORCE_ONLINE ? 14 : 0, // Fake player count if forced
        error: false,
    });

    const fetchStatus = useCallback(async () => {
        if (FORCE_ONLINE) return; // Bypass API fetch completely if forced
        try {
            // Using mcstatus.io for more reliable real-time data and better SRV resolution
            const res = await fetch(`https://api.mcstatus.io/v2/status/java/${siteConfig.statusQueryHost}`);
            if (!res.ok) throw new Error('API error');
            const data = await res.json();
            setStatus({
                loading: false,
                isOnline: !!data.online,
                playerCount: data.players?.online ?? 0,
                error: false,
            });
        } catch {
            setStatus((prev) => ({
                ...prev,
                loading: false,
                isOnline: true,
                playerCount: 0,
                error: true,
            }));
        }
    }, []);

    useEffect(() => {
        fetchStatus();
        const interval = setInterval(fetchStatus, 60000);
        return () => clearInterval(interval);
    }, [fetchStatus]);

    return status;
};

/* ── Heartbeat Component ── */
interface HeartbeatProps {
    status: ServerStatus;
    className?: string;
}

export const ServerHeartbeat = ({ status, className = '' }: HeartbeatProps) => {
    const [showTooltip, setShowTooltip] = useState(false);
    const [ipCopied, setIpCopied] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleCopyIP = (e: React.MouseEvent) => {
        e.stopPropagation();
        navigator.clipboard.writeText(siteConfig.javaIp);
        setIpCopied(true);
        setTimeout(() => setIpCopied(false), 2000);
    };

    const dotColor = status.loading
        ? '#888'
        : status.isOnline
            ? '#00FF41'
            : '#FF0000';

    const text = status.loading
        ? 'Scanning Frequencies...'
        : status.error
            ? 'World Active'
            : status.isOnline
                ? `${status.playerCount} Ruler${status.playerCount !== 1 ? 's' : ''} Online`
                : 'Server Sleeping';

    return (
        <div
            ref={containerRef}
            className={`relative inline-flex items-center gap-2.5 cursor-default ${className}`}
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
        >
            {/* Pulsing Dot */}
            <div className="relative flex items-center justify-center">
                <motion.div
                    className="absolute w-[10px] h-[10px] rounded-full"
                    style={{ background: dotColor }}
                    animate={{
                        scale: [1, 1.4, 1],
                        opacity: [0.8, 0.2, 0.8],
                    }}
                    transition={{
                        duration: status.isOnline ? 2 : 3,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                />
                <div
                    className="w-[10px] h-[10px] rounded-full relative z-10"
                    style={{
                        background: dotColor,
                        boxShadow: `0 0 8px ${dotColor}`,
                    }}
                />
            </div>

            {/* Status Text */}
            <span
                className="uppercase tracking-[0.2em] text-xs"
                style={{
                    fontFamily: "'Cinzel', serif",
                    color: status.loading ? '#888' : '#fff',
                    textShadow: '0 1px 3px rgba(0,0,0,0.8)',
                }}
            >
                {text}
            </span>

            {/* Intel Tooltip */}
            <AnimatePresence>
                {showTooltip && !status.loading && (
                    <motion.div
                        className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-64 z-50"
                        initial={{ opacity: 0, y: 8, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                    >
                        <div
                            className="rounded-lg p-4 font-body text-xs"
                            style={{
                                backdropFilter: 'blur(12px)',
                                background: 'rgba(0,0,0,0.7)',
                                border: '1px solid rgba(244,196,48,0.4)',
                                boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
                            }}
                        >
                            {/* Row 1: Network */}
                            <div className="flex items-center gap-2 mb-2.5">
                                <div className="w-2 h-2 rounded-full bg-[#00FF41] shadow-[0_0_4px_#00FF41]" />
                                <span className="text-white/70 uppercase tracking-widest">Network:</span>
                                <span className="text-white font-medium ml-auto">
                                    {status.isOnline ? 'Stable' : 'Offline'}
                                </span>
                            </div>

                            {/* Row 2: Version */}
                            <div className="flex items-center gap-2 mb-2.5">
                                <div className="w-2 h-2 rounded-sm bg-[#F4C430]/50" />
                                <span className="text-white/70 uppercase tracking-widest">Version:</span>
                                <span className="text-white font-medium ml-auto">1.20.x – 1.21</span>
                            </div>

                            {/* Row 3: Uptime */}
                            <div className="flex items-center gap-2 mb-2.5">
                                <div className="w-2 h-2 rounded-sm bg-[#a347ff]/50" />
                                <span className="text-white/70 uppercase tracking-widest">Uptime:</span>
                                <span className="text-white font-medium ml-auto">99.9%</span>
                            </div>

                            {/* Row 4: Copy IP */}
                            <div
                                className="flex items-center gap-2 pt-2 border-t border-white/10 cursor-pointer group"
                                onClick={handleCopyIP}
                            >
                                <svg className="w-3 h-3 text-[#F4C430]/60 group-hover:text-[#F4C430] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <rect x="9" y="9" width="13" height="13" rx="2" />
                                    <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
                                </svg>
                                <span className="text-white/70 uppercase tracking-widest group-hover:text-white transition-colors">
                                    {ipCopied ? 'Copied!' : 'Copy IP'}
                                </span>
                                <span className="text-[#F4C430]/60 ml-auto font-minecraft text-[10px] group-hover:text-[#F4C430] transition-colors">
                                    {siteConfig.javaIp}
                                </span>
                            </div>
                        </div>

                        {/* Arrow */}
                        <div className="absolute left-1/2 -translate-x-1/2 -bottom-1.5 w-3 h-3 rotate-45 bg-black/70 border-r border-b border-[#F4C430]/40" />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
