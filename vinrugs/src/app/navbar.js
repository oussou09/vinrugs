import Link from "next/link";
import { useEffect, useState } from "react";
import { useApp } from "./lib/AppContext";

export default function Navbar(){

    const [isLogin , setIsLogin] = useState(false)
    
    const {user, token} = useApp()



    // console.log('token nav: ',token)

    return (
        <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-stone-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    {/* <!-- Brand --> */}
                    <div className="flex-shrink-0 flex items-center">
                        <Link href="/" className="serif text-3xl font-semibold tracking-tight text-stone-900">Rug Artisan</Link>
                    </div>

                    {/* <!-- desktop Menu --> */}
                    <div className="hidden md:flex space-x-10 items-center">
                        <Link href="/rugs" className="text-sm font-medium text-stone-600 hover:text-stone-900 transition-soft">Collections</Link>
                        <Link href="/about" className="text-sm font-medium text-stone-600 hover:text-stone-900 transition-soft">Our Story</Link>
                        <Link href="/contact" className="text-sm font-medium text-stone-600 hover:text-stone-900 transition-soft">Contact</Link>
                    </div>

                    {/* <!-- Icons --> */}
                    <div className="flex items-center space-x-6">
                        {/* <!-- Search --> */}
                        <button className="p-2 text-stone-600 hover:text-stone-900 transition-soft">
                            <img src="/svgs/search-with-magnifier-sketch.svg" className="h-6 w-6" alt="search-with-magnifier-sketch.svg" />
                        </button>
                        
                        {token ?
                        (<>
                            {/* <!-- Account --> */}
                            <Link href="/profile" className="p-2 text-stone-600 hover:text-stone-900 transition-soft">
                                <img src="/svgs/user-avatar-profile-person.svg" className="h-10 w-10" alt="user-avatar-profile-person" />
                            </Link>

                            {/* <!-- Wishlist --> */}
                            <Link href="/wishlist" className="p-2 text-stone-600 hover:text-stone-900 transition-soft relative">
                                <img src="/svgs/love-or-like-heart-sketched.svg" className="h-6 w-6" alt="Heart icon" />
                            </Link>

                            {/* <!-- Cart --> */}
                            <Link href="/cart" className="p-2 text-stone-600 hover:text-stone-900 transition-soft relative">
                                <img src="/svgs/shopping-cart-sketch.svg" className="h-6 w-6" alt="shopping-cart-sketch.svg" />
                                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white bg-stone-900 rounded-full transform translate-x-1/2 -translate-y-1/2">{user?.cart_shopping?.length}</span>
                            </Link>
                        </>)
                        :
                        (<>
                            {/* <!-- login --> */}
                            <Link href="/login" className="p-2 text-stone-600 hover:text-stone-900 transition-soft relative">
                                <img src="/svgs/login-sketch.svg" className="h-6 w-6" alt="shopping-cart-sketch.svg" />
                            </Link>
                        </>)
                        }

                        {/* <!-- Mobile menu toggle --> */}
                        <button className="md:hidden p-2 text-stone-600">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-menu"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
                        </button>
                    </div>
                </div>
            </div>
        </nav>

    )
}