import { motion, useInView } from 'framer-motion';
import { useRef, type ReactNode } from 'react';

/* ─────────────────────────────────────────────
   ScrollReveal — A gold-frame container where:
   1. The border "draws" itself via SVG pathLength
   2. Content fades in after the border finishes
   ───────────────────────────────────────────── */

interface ScrollRevealProps {
    children: ReactNode;
    className?: string;
    /** Extra inline styles for the outer wrapper */
    style?: React.CSSProperties;
}

export const ScrollReveal = ({ children, className = '', style }: ScrollRevealProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, amount: 0.25 });

    return (
        <div ref={ref} className={`relative ${className}`} style={style}>
            {/* SVG Drawing Border — sits on top of the container */}
            <svg
                className="absolute inset-0 w-full h-full pointer-events-none z-30 rounded"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                fill="none"
            >
                {/* Outer gold border trace */}
                <motion.rect
                    x="0.5"
                    y="0.5"
                    width="99"
                    height="99"
                    rx="1"
                    stroke="#F4C430"
                    strokeWidth="0.8"
                    vectorEffect="non-scaling-stroke"
                    style={{ strokeWidth: '3px' }}
                    initial={{ pathLength: 0, opacity: 0.8 }}
                    animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0.8 }}
                    transition={{ duration: 1.5, ease: 'easeInOut' }}
                />
                {/* Inner darker border for depth */}
                <motion.rect
                    x="2"
                    y="2"
                    width="96"
                    height="96"
                    rx="0.5"
                    stroke="#b8860b"
                    strokeWidth="0.3"
                    vectorEffect="non-scaling-stroke"
                    style={{ strokeWidth: '1px' }}
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={isInView ? { pathLength: 1, opacity: 0.5 } : { pathLength: 0, opacity: 0 }}
                    transition={{ duration: 1.5, ease: 'easeInOut', delay: 0.2 }}
                />
            </svg>

            {/* Content — fades in after border draws */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.8, ease: 'easeOut', delay: 0.6 }}
            >
                {children}
            </motion.div>
        </div>
    );
};


/* ─────────────────────────────────────────────
   AnimatedDivider — Draws from center outward
   ───────────────────────────────────────────── */

export const AnimatedDivider = () => {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, amount: 0.5 });

    return (
        <div ref={ref} className="max-w-5xl mx-auto px-4 py-2 flex items-center justify-center">
            {/* Left line — draws from center to left */}
            <motion.div
                className="flex-1 h-[2px] origin-right"
                style={{ background: 'linear-gradient(to left, #F4C430, transparent)' }}
                initial={{ scaleX: 0, opacity: 0 }}
                animate={isInView ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
            />

            {/* Center diamond */}
            <motion.div
                className="mx-4 relative"
                initial={{ scale: 0, rotate: 0 }}
                animate={isInView ? { scale: 1, rotate: 45 } : { scale: 0, rotate: 0 }}
                transition={{ duration: 0.4, ease: 'backOut', delay: 0.3 }}
            >
                <div className="w-6 h-6 border-2 border-[#F4C430] bg-[#0D0D0D] flex items-center justify-center shadow-[0_0_10px_rgba(244,196,48,0.3)]">
                    <div className="w-2 h-2 bg-[#F4C430]" />
                </div>
            </motion.div>

            {/* Right line — draws from center to right */}
            <motion.div
                className="flex-1 h-[2px] origin-left"
                style={{ background: 'linear-gradient(to right, #F4C430, transparent)' }}
                initial={{ scaleX: 0, opacity: 0 }}
                animate={isInView ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
            />
        </div>
    );
};
