import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useCallback } from 'react';

/* ── Ender Particle Burst ── */
const generateEnderParticles = () =>
    Array.from({ length: 16 }, (_, i) => {
        const angle = (Math.PI * 2 * i) / 16 + (Math.random() - 0.5) * 0.5;
        const velocity = 40 + Math.random() * 60;
        const size = 3 + Math.random() * 3;
        return {
            id: i,
            x: Math.cos(angle) * velocity,
            y: Math.sin(angle) * velocity - 20,
            size,
            color: Math.random() > 0.4 ? '#a347ff' : '#7b2fff',
        };
    });

const LootDrop = () => {
    const [visible, setVisible] = useState(false);
    const [isExploding, setIsExploding] = useState(false);
    const [shrunk, setShrunk] = useState(false);
    const [particles, setParticles] = useState<ReturnType<typeof generateEnderParticles>>([]);

    useEffect(() => {
        const onScroll = () => {
            const past600 = window.scrollY > 600;
            setVisible(past600);
            if (past600 && shrunk) setShrunk(false);
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, [shrunk]);

    const handleClick = useCallback(() => {
        setParticles(generateEnderParticles());
        setIsExploding(true);
        setShrunk(true);
        setTimeout(() => {
            setIsExploding(false);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 400);
    }, []);

    return (
        <AnimatePresence>
            {visible && !shrunk && (
                <motion.div
                    className="fixed z-[999]"
                    style={{ bottom: 30, right: 30 }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                    {/* Floating container */}
                    <motion.div
                        className="relative cursor-pointer"
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={handleClick}
                    >
                        {/* Purple pulsing glow behind */}
                        <motion.div
                            className="absolute inset-0 rounded-full"
                            style={{
                                background: 'radial-gradient(circle, rgba(163,71,255,0.3) 0%, transparent 70%)',
                                filter: 'blur(12px)',
                            }}
                            animate={{
                                scale: [1, 1.3, 1],
                                opacity: [0.4, 0.7, 0.4],
                            }}
                            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                        />

                        {/* Glass-morphism circle */}
                        <div
                            className="w-[60px] h-[60px] rounded-full flex items-center justify-center relative overflow-hidden group"
                            style={{
                                backdropFilter: 'blur(8px)',
                                background: 'rgba(0, 0, 0, 0.4)',
                                border: '1.5px solid #F4C430',
                                boxShadow: '0 0 20px rgba(163,71,255,0.35), inset 0 0 12px rgba(0,0,0,0.5)',
                            }}
                        >
                            {/* The Netherite Sword */}
                            <img
                                src="/assets/h-block.png"
                                alt="Back to Top"
                                className="w-8 h-8 object-contain"
                                style={{
                                    filter: 'drop-shadow(0 0 8px rgba(163, 71, 255, 0.5))',
                                    imageRendering: 'pixelated',
                                }}
                            />

                            {/* Enchanted Glint — diagonal shimmer */}
                            <div
                                className="absolute inset-0 pointer-events-none rounded-full"
                                style={{
                                    background: 'linear-gradient(135deg, transparent 30%, rgba(255,255,255,0.35) 48%, rgba(255,255,255,0.15) 52%, transparent 70%)',
                                    backgroundSize: '250% 250%',
                                    animation: 'enchantGlint 4s ease-in-out infinite',
                                }}
                            />
                        </div>
                    </motion.div>

                    {/* Ender Particle Burst */}
                    <AnimatePresence>
                        {isExploding && particles.map((p) => (
                            <motion.div
                                key={p.id}
                                className="absolute pointer-events-none"
                                style={{
                                    left: '50%',
                                    top: '50%',
                                    width: p.size,
                                    height: p.size,
                                    background: p.color,
                                    borderRadius: '50%',
                                    boxShadow: `0 0 ${p.size * 3}px ${p.color}`,
                                }}
                                initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                                animate={{ x: p.x, y: p.y, opacity: 0, scale: 0 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.7, ease: 'easeOut' }}
                            />
                        ))}
                    </AnimatePresence>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default LootDrop;
