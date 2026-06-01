




export default function About(){
    return (
        <div>
            <section className="py-24 md:py-48 bg-stone-900 text-white overflow-hidden relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <span className="text-xs font-bold uppercase tracking-widest text-stone-500 mb-8 block">Our Provenance</span>
                    <h1 className="serif text-5xl md:text-8xl mb-12 italic font-light">Woven for generations.</h1>
                    <div className="max-w-2xl mx-auto">
                        <p className="text-xl md:text-2xl font-light text-stone-300 leading-relaxed italic">
                            “Every knot is a pulse, every pattern is a prayer, and every rug is a piece of home that outlives the builder.”
                        </p>
                    </div>
                </div>
                <div className="absolute inset-0 z-0 opacity-20">
                    <img src="https://images.unsplash.com/photo-1600166898405-da9535204843?auto=format&fit=crop&q=80&w=2000" className="w-full h-full object-cover" />
                </div>
            </section>

            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                        <div className="aspect-square bg-stone-50 relative p-8">
                            <img src="https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover shadow-2xl skew-y-3" />
                            <div className="absolute -bottom-10 -right-10 w-2/3 aspect-video bg-stone-100 hidden md:block border-8 border-white p-2 shadow-xl">
                                <img src="https://images.unsplash.com/photo-1533486121401-447551066042?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover grayscale" />
                            </div>
                        </div>
                        <div>
                            <h2 className="serif text-4xl mb-8 leading-tight">Preserving the heartbeat of the looms.</h2>
                            <div className="space-y-6 text-stone-600 font-light leading-relaxed">
                                <p>Rug Artisan was founded in 1924, but our story begins centuries ago in the high mountains where the wool is harvested and the dyes are gathered from the earth.</p>
                                <p>We work directly with master weavers in three continents, ensuring that the ancient knowledge of knotting is not just remembered, but practiced with the same rigor and devotion as it was during the Golden Age of Textiles.</p>
                                <p>When you choose a Rug Artisan piece, you are not simply buying floor covering; you are becoming the steward of a cultural artifact that will age beautifully alongside your family.</p>
                            </div>
                            <div className="mt-12 flex space-x-12">
                                <div>
                                    <span className="block text-4xl serif italic mb-1">102</span>
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-stone-400">Years of History</span>
                                </div>
                                <div>
                                    <span className="block text-4xl serif italic mb-1">12</span>
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-stone-400">Master Guilds</span>
                                </div>
                                <div>
                                    <span className="block text-4xl serif italic mb-1">0</span>
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-stone-400">Machined Pieces</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}