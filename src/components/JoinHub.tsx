import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle, Copy } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

const JoinHub = () => {
    const [toastMsg, setToastMsg] = useState('');

    const copyText = (text: string, label: string) => {
        navigator.clipboard.writeText(text);
        setToastMsg(`${label} copied!`);
        setTimeout(() => setToastMsg(''), 3000);
    };

    return (
        <section id="join-hub" className="max-w-5xl mx-auto w-full px-4 py-4">
            {/* Toast */}
            <AnimatePresence>
                {toastMsg && (
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 bg-stone-900 border-l-4 border-[#F4C430] text-white px-6 py-4 rounded shadow-[0_0_40px_rgba(244,196,48,0.4)]"
                    >
                        <CheckCircle className="text-[#F4C430]" />
                        <span className="font-minecraft text-lg text-[#F4C430]">{toastMsg}</span>
                    </motion.div>
                )}
            </AnimatePresence>

            <ScrollReveal>
                <div className="gold-frame rounded bg-black/80 p-4 sm:p-6 md:p-10">
                    {/* Header */}
                    <div className="flex flex-wrap items-baseline justify-between mb-6 sm:mb-8 gap-2">
                        <h2 className="font-minecraft text-xl sm:text-2xl md:text-3xl text-[#F4C430] uppercase tracking-wider golden-bloom">
                            How to Join
                        </h2>
                        <span className="font-minecraft text-xs sm:text-sm text-gray-500 uppercase tracking-widest hidden sm:inline">
                            (For the Socially Challenged)
                        </span>
                    </div>

                    {/* Row: Medallion + Cards */}
                    <div className="flex flex-col md:flex-row gap-8 items-center md:items-stretch">

                        {/* Decorative Medallion — hidden on mobile */}
                        <div className="flex-shrink-0 hidden md:flex items-center justify-center">
                            <img
                                src="/assets/1000090550.png"
                                alt="Medallion"
                                className="w-24 h-24 md:w-32 md:h-32 object-contain opacity-80 drop-shadow-[0_0_15px_rgba(139,0,0,0.4)]"
                                onError={(e) => { (e.target as HTMLImageElement).src = '/assets/h-block.png'; }}
                            />
                        </div>

                        {/* Cards */}
                        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-6">

                            {/* Java Players Card */}
                            <div className="bg-stone-900/80 border border-[#F4C430]/20 rounded p-5 flex flex-col gap-4">
                                <div>
                                    <h3 className="font-minecraft text-xl text-[#F4C430] uppercase tracking-wider">Java Players</h3>
                                    <p className="font-body text-xs text-gray-500 uppercase tracking-widest mt-1">(The Elitists)</p>
                                </div>

                                {/* IP Only — Large prominent clickable block */}
                                <div
                                    className="bg-black/70 rounded p-5 flex items-center justify-between gap-4 border-2 border-[#F4C430]/20 hover:border-[#F4C430]/50 transition-colors cursor-pointer group mt-auto"
                                    onClick={() => copyText('mc.hayanura.fun', 'Java IP')}
                                    title="Click to copy IP"
                                >
                                    <div className="flex flex-col gap-1">
                                        <span className="text-[10px] text-gray-600 uppercase tracking-[0.3em]">Server Address</span>
                                        <span className="font-minecraft text-lg sm:text-2xl md:text-3xl text-white select-all tracking-wide break-all">mc.hayanura.fun</span>
                                        <span className="text-[10px] text-gray-600 mt-1">Default port · Just paste the IP</span>
                                    </div>
                                    <div className="p-3 bg-stone-800 rounded group-hover:bg-[#F4C430] group-hover:text-black text-[#F4C430] transition-colors">
                                        <Copy className="w-5 h-5" />
                                    </div>
                                </div>
                            </div>

                            {/* Bedrock Players Card */}
                            <div className="bg-stone-900/80 border border-[#F4C430]/20 rounded p-5 flex flex-col gap-4">
                                <div>
                                    <h3 className="font-minecraft text-xl text-[#F4C430] uppercase tracking-wider">Bedrock Players</h3>
                                    <p className="font-body text-xs text-gray-500 uppercase tracking-widest mt-1">(Mobile Warriors)</p>
                                </div>

                                {/* IP Row — Copyable */}
                                <div className="bg-black/60 rounded p-3 flex items-center justify-between gap-3 border border-stone-800">
                                    <div>
                                        <span className="text-[10px] text-gray-600 uppercase tracking-widest block mb-1">Server IP</span>
                                        <span className="font-minecraft text-lg text-white select-all">mc.hayanura.fun</span>
                                    </div>
                                    <button
                                        onClick={() => copyText('mc.hayanura.fun', 'Bedrock IP')}
                                        className="p-2 bg-stone-800 rounded hover:bg-[#F4C430] hover:text-black text-[#F4C430] transition-colors cursor-pointer"
                                        title="Copy IP"
                                    >
                                        <Copy className="w-4 h-4" />
                                    </button>
                                </div>

                                {/* Port Row — Copyable */}
                                <div className="bg-black/60 rounded p-3 flex items-center justify-between gap-3 border border-stone-800">
                                    <div>
                                        <span className="text-[10px] text-gray-600 uppercase tracking-widest block mb-1">Port</span>
                                        <span className="font-minecraft text-xl text-[#F4C430] select-all">25565</span>
                                    </div>
                                    <button
                                        onClick={() => copyText('25565', 'Bedrock Port')}
                                        className="p-2 bg-stone-800 rounded hover:bg-[#F4C430] hover:text-black text-[#F4C430] transition-colors cursor-pointer"
                                        title="Copy Port"
                                    >
                                        <Copy className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bottom: Full-width Copy All button */}
                    <div className="mt-8 flex justify-center">
                        <button
                            onClick={() => copyText('mc.hayanura.fun:25565', 'Full IP:Port')}
                            className="btn-artifact btn-getip !text-sm sm:!text-base !py-3 !px-6 sm:!px-10 w-full sm:w-auto"
                        >
                            [Copy Full IP]
                        </button>
                    </div>
                </div>
            </ScrollReveal>
        </section>
    );
};

export default JoinHub;
