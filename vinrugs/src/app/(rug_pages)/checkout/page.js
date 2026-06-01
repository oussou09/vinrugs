





export default function Checkout(){
    return(
        // <!-- Checkout Page -->
        <section className="py-12 md:py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row gap-20">
                    {/* <!-- Checkout Form --> */}
                    <div className="flex-grow lg:w-3/5">
                        <h1 className="serif text-4xl mb-12">Checkout</h1>
                        
                        <form className="space-y-12">
                            {/* <!-- Section: Shipping --> */}
                            <div>
                                <h3 className="text-xs font-bold uppercase tracking-widest border-b border-stone-200 pb-4 mb-8">1. Shipping Information</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="col-span-1">
                                        <label className="block text-xs font-medium text-stone-500 uppercase tracking-wider mb-2">First Name</label>
                                        <input type="text" className="w-full bg-white border border-stone-200 p-3 text-sm focus:ring-1 focus:ring-stone-900 focus:border-stone-900 transition-soft outline-none" />
                                    </div>
                                    <div className="col-span-1">
                                        <label className="block text-xs font-medium text-stone-500 uppercase tracking-wider mb-2">Last Name</label>
                                        <input type="text" className="w-full bg-white border border-stone-200 p-3 text-sm focus:ring-1 focus:ring-stone-900 focus:border-stone-900 transition-soft outline-none" />
                                    </div>
                                    <div className="col-span-2">
                                        <label className="block text-xs font-medium text-stone-500 uppercase tracking-wider mb-2">Address</label>
                                        <input type="text" className="w-full bg-white border border-stone-200 p-3 text-sm focus:ring-1 focus:ring-stone-900 focus:border-stone-900 outline-none" />
                                    </div>
                                    <div className="col-span-1">
                                        <label className="block text-xs font-medium text-stone-500 uppercase tracking-wider mb-2">City</label>
                                        <input type="text" className="w-full bg-white border border-stone-200 p-3 text-sm focus:ring-1 focus:ring-stone-900 focus:border-stone-900 outline-none" />
                                    </div>
                                    <div className="col-span-1">
                                        <label className="block text-xs font-medium text-stone-500 uppercase tracking-wider mb-2">Postal Code</label>
                                        <input type="text" className="w-full bg-white border border-stone-200 p-3 text-sm focus:ring-1 focus:ring-stone-900 focus:border-stone-900 outline-none" />
                                    </div>
                                </div>
                            </div>

                            {/* <!-- Section: Payment --> */}
                            <div>
                                <h3 className="text-xs font-bold uppercase tracking-widest border-b border-stone-200 pb-4 mb-8">2. Payment Method</h3>
                                <div className="bg-stone-50 p-6 space-y-6">
                                    <div className="flex items-center justify-between border-b border-stone-200 pb-4">
                                        <span className="text-sm font-medium">Credit / Debit Card</span>
                                        <div className="flex space-x-2">
                                            <div className="w-8 h-5 bg-white border border-stone-200 rounded"></div>
                                            <div className="w-8 h-5 bg-white border border-stone-200 rounded"></div>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="col-span-2">
                                            <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-wider mb-1">Card Number</label>
                                            <input type="text" placeholder="XXXX XXXX XXXX XXXX" className="w-full bg-white border border-stone-200 p-3 text-sm outline-none" />
                                        </div>
                                        <div className="col-span-1">
                                            <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-wider mb-1">Expiry</label>
                                            <input type="text" placeholder="MM/YY" className="w-full bg-white border border-stone-200 p-3 text-sm outline-none" />
                                        </div>
                                        <div className="col-span-1">
                                            <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-wider mb-1">CVC</label>
                                            <input type="text" placeholder="XXX" className="w-full bg-white border border-stone-200 p-3 text-sm outline-none" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <button type="submit" className="w-full bg-stone-900 text-white py-6 text-sm font-bold uppercase tracking-widest hover:opacity-90 transition-soft">
                                Complete Order & Review
                            </button>
                            <p className="text-center text-[10px] text-stone-400 uppercase tracking-widest">
                                Your transaction is encrypted and secured by ArtisanPay
                            </p>
                        </form>
                    </div>

                    {/* <!-- Order Sidebar --> */}
                    <div className="lg:w-2/5">
                        <div className="bg-white border border-stone-100 p-8">
                            <h2 className="text-xs font-bold uppercase tracking-widest mb-8">Review Order</h2>
                            <ul className="space-y-6 mb-12">
                                <li className="flex gap-4">
                                    <div className="w-16 h-20 bg-stone-100 flex-shrink-0">
                                        <img src="https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?auto=format&fit=crop&q=80&w=200" className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex-grow">
                                        <p className="text-xs font-bold uppercase text-stone-900">Isfahan Runner</p>
                                        <p className="text-[10px] text-stone-400 mt-1">Quantity: 1</p>
                                    </div>
                                    <span className="text-xs font-bold">$1,280</span>
                                </li>
                            </ul>
                            
                            <div className="border-t border-stone-100 pt-8 space-y-4">
                                <div className="flex justify-between text-sm">
                                    <span className="text-stone-400">Shipment</span>
                                    <span className="font-medium">$45.00</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-stone-400">Insurance</span>
                                    <span className="font-medium text-emerald-600">Included</span>
                                </div>
                                <div className="flex justify-between text-lg font-bold border-t border-stone-100 pt-6">
                                    <span>Total</span>
                                    <span>$1,325.00</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    )
}