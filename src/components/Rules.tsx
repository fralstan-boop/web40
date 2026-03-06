import { ScrollReveal } from './ScrollReveal';

const rules = [
    { id: 1, title: "No Hacking", text: "No lag machines, your walls are your walls. Cowards." },
    { id: 2, title: "No Lag Machines", text: "The server runs on a potato and a dream. Don't break it." },
    { id: 3, title: "Raiding Is Allowed", text: "If your base gets griefed, don't cry. Build better walls." },
    { id: 4, title: "Respect the Admin", text: "I am the only one here. If I'm grumpy, you earned it." },
];

const gallery = [1, 2, 3, 4, 5, 6];

const Rules = () => {
    return (
        <section className="max-w-5xl mx-auto w-full px-4 py-4">
            <ScrollReveal>
                <div className="gold-frame rounded bg-black/80 p-4 sm:p-6 md:p-10">
                    <h2 className="font-minecraft text-xl sm:text-2xl md:text-4xl text-[#F4C430] uppercase tracking-wider golden-bloom mb-6 sm:mb-8">
                        Laws of HayaSMP
                    </h2>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* LEFT: Rule Boxes */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {rules.map((rule) => (
                                <div
                                    key={rule.id}
                                    className="bg-[#8B0000]/30 border border-[#F4C430]/30 rounded p-4 flex flex-col gap-2 hover:border-[#F4C430] transition-colors duration-300"
                                >
                                    <h3 className="font-minecraft text-base text-[#F4C430] uppercase tracking-wider">
                                        {rule.id}. {rule.title}
                                    </h3>
                                    <p className="font-body text-sm text-gray-300 leading-relaxed">
                                        {rule.text}
                                    </p>
                                </div>
                            ))}
                        </div>

                        {/* RIGHT: Screenshot Gallery Grid */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                            {gallery.map((img) => (
                                <div
                                    key={img}
                                    className="aspect-video bg-stone-900 border border-[#F4C430]/10 rounded overflow-hidden group cursor-pointer hover:border-[#F4C430]/50 transition-all duration-300 relative"
                                >
                                    {/* Placeholder — replace with actual screenshots */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-stone-800 to-stone-900 group-hover:scale-110 transition-transform duration-500" />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <span className="font-minecraft text-xs text-[#F4C430]/40 uppercase tracking-widest group-hover:text-[#F4C430] transition-colors">
                                            Screenshot {img}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </ScrollReveal>
        </section>
    );
};

export default Rules;
