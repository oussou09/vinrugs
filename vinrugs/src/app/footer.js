


export default function Footer(){
    return (
        <footer className="bg-stone-900 text-stone-300 py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                    {/* <!-- Brand & Info --> */}
                    <div className="col-span-1 md:col-span-1">
                        <h2 className="serif text-2xl text-white mb-6">Rug Artisan</h2>
                        <p className="text-sm leading-relaxed opacity-70">
                            Preserving the ancient art of rug weaving while bringing timeless elegance to the modern home. 
                        </p>
                    </div>

                    {/* <!-- Shop --> */}
                    <div>
                        <h3 className="text-xs font-bold uppercase tracking-widest text-white mb-6">Shop</h3>
                        <ul className="space-y-4 text-sm">
                            <li><a href="#" className="hover:text-white transition-soft">All Rugs</a></li>
                            <li><a href="#" className="hover:text-white transition-soft">Persian Collection</a></li>
                            <li><a href="#" className="hover:text-white transition-soft">Modern Minimalist</a></li>
                            <li><a href="#" className="hover:text-white transition-soft">Vintage Finds</a></li>
                        </ul>
                    </div>

                    {/* <!-- Support --> */}
                    <div>
                        <h3 className="text-xs font-bold uppercase tracking-widest text-white mb-6">Support</h3>
                        <ul className="space-y-4 text-sm">
                            <li><a href="#" className="hover:text-white transition-soft">Shipping & Returns</a></li>
                            <li><a href="#" className="hover:text-white transition-soft">Care Guide</a></li>
                            <li><a href="#" className="hover:text-white transition-soft">Privacy Policy</a></li>
                            <li><a href="#" className="hover:text-white transition-soft">FAQ</a></li>
                        </ul>
                    </div>

                    {/* <!-- Newsletter --> */}
                    <div>
                        <h3 className="text-xs font-bold uppercase tracking-widest text-white mb-6">Provenance</h3>
                        <p className="text-sm mb-4 opacity-70">Join our newsletter for exclusive collections and weaving stories.</p>
                        <form className="flex border-b border-stone-700 pb-2">
                            <input type="email" placeholder="Email Address" className="bg-transparent border-none focus:ring-0 text-sm w-full py-1" />
                            <button type="submit" className="text-white hover:opacity-70 transition-soft">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                            </button>
                        </form>
                    </div>
                </div>

                <div className="mt-16 pt-8 border-t border-stone-800 flex flex-col md:flex-row justify-between items-center text-xs opacity-50">
                    <p>&copy; 2026 Rug Artisan. All rights reserved.</p>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        <a href="#" className="hover:text-white">Instagram</a>
                        <a href="#" className="hover:text-white">Pinterest</a>
                        <a href="#" className="hover:text-white">Journal</a>
                    </div>
                </div>
            </div>
        </footer>

    )
}