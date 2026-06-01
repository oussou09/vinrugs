







export default function Card(){
    return(
        // <!-- Shopping Cart Page -->
        <section className="py-12 md:py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="serif text-5xl mb-16">Your Bag</h1>

                <div className="flex flex-col lg:flex-row gap-16">
                    {/* <!-- Cart Items --> */}
                    <div className="flex-grow lg:w-2/3">
                        <div className="border-t border-stone-200">
                            {/* <!-- Item 1 --> */}
                            <div className="py-10 border-b border-stone-100 flex gap-8">
                                <div className="w-24 h-32 md:w-40 md:h-52 bg-stone-100 flex-shrink-0">
                                    <img src="https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?auto=format&fit=crop&q=80&w=400" alt="Rug Thumbnail" className="w-full h-full object-cover" />
                                </div>
                                <div className="flex-grow flex flex-col justify-between">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="text-lg font-medium text-stone-900 leading-tight">Isfahan Medallion Runner</h3>
                                            <p className="text-sm text-stone-500 mt-1 italic">Size: 4' x 6'</p>
                                            <p className="text-sm text-stone-500 italic">Color: Crimson / Gold</p>
                                        </div>
                                        <span className="text-lg font-bold text-stone-900">$1,280.00</span>
                                    </div>
                                    <div className="flex justify-between items-end mt-4">
                                        <div className="flex items-center border border-stone-200">
                                            <button className="p-2 hover:bg-stone-50 transition-soft">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" x2="19" y1="12" y2="12"/></svg>
                                            </button>
                                            <span className="px-4 text-sm font-medium">1</span>
                                            <button className="p-2 hover:bg-stone-50 transition-soft">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" x2="12" y1="5" y2="19"/><line x1="5" x2="19" y1="12" y2="12"/></svg>
                                            </button>
                                        </div>
                                        <button className="text-xs uppercase tracking-widest text-stone-400 hover:text-stone-900 transition-soft underline">Remove</button>
                                    </div>
                                </div>
                            </div>

                            {/* <!-- Item 2 --> */}
                            <div className="py-10 border-b border-stone-100 flex gap-8">
                                <div className="w-24 h-32 md:w-40 md:h-52 bg-stone-100 flex-shrink-0">
                                    <img src="https://images.unsplash.com/photo-1574730314821-33560e8ea321?auto=format&fit=crop&q=80&w=400" alt="Rug Thumbnail" className="w-full h-full object-cover grayscale" />
                                </div>
                                <div className="flex-grow flex flex-col justify-between">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="text-lg font-medium text-stone-900 leading-tight">Vintage Oushak Fragment</h3>
                                            <p className="text-sm text-stone-500 mt-1 italic">Size: 2' x 3'</p>
                                            <p className="text-sm text-stone-500 italic">Material: Highland Wool</p>
                                        </div>
                                        <span className="text-lg font-bold text-stone-900">$450.00</span>
                                    </div>
                                    <div className="flex justify-between items-end mt-4">
                                        <div className="flex items-center border border-stone-200">
                                            <button className="p-2">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" x2="19" y1="12" y2="12"/></svg>
                                            </button>
                                            <span className="px-4 text-sm font-medium">1</span>
                                            <button className="p-2">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" x2="12" y1="5" y2="19"/><line x1="5" x2="19" y1="12" y2="12"/></svg>
                                            </button>
                                        </div>
                                        <button className="text-xs uppercase tracking-widest text-stone-400 hover:text-stone-900 underline">Remove</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* <!-- Summary Panel --> */}
                    <div className="lg:w-1/3">
                        <div className="bg-stone-50 p-8 sticky top-24">
                            <h2 className="text-xs font-bold uppercase tracking-widest border-b border-stone-200 pb-4 mb-6">Order Summary</h2>
                            <div className="space-y-4 text-sm mb-8 border-b border-stone-200 pb-8">
                                <div className="flex justify-between">
                                    <span className="text-stone-500">Subtotal</span>
                                    <span className="font-medium">$1,730.00</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-stone-500">Shipping (Insured)</span>
                                    <span className="font-medium">$45.00</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-stone-500">Taxes</span>
                                    <span className="font-medium font-mono text-[10px] tracking-tight uppercase">Calculated at checkout</span>
                                </div>
                            </div>
                            <div className="flex justify-between text-lg font-bold mb-8">
                                <span>Total</span>
                                <span>$1,775.00</span>
                            </div>
                            
                            <a href="/checkout" className="block w-full bg-stone-900 text-white text-center py-5 text-sm font-bold uppercase tracking-widest hover:opacity-90 transition-soft">
                                Proceed to Checkout
                            </a>
                            
                            <div className="mt-8">
                                <p className="text-[10px] uppercase tracking-widest text-stone-400 text-center leading-relaxed">
                                    Complimentary professional cleaning kit included with every order over $1,000
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    )
}