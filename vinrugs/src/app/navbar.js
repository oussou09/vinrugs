import Link from "next/link";
import { useEffect, useState } from "react";
import { useAppUser } from "./lib/AppContext";

export default function Navbar(){

    const [isLogin , setIsLogin] = useState(false);

    const [isOpen, setIsOpen] = useState(false);
    
    const {user, token} = useAppUser();



    // console.log('token nav: ',token)

    return (

        <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-stone-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">

                {/* Brand */}
                <div className="flex-shrink-0 flex items-center">
                    <Link href="/" className="serif text-3xl font-semibold tracking-tight text-stone-900">
                    Rug Artisan
                    </Link>
                </div>

                {/* Desktop Menu */}
                <div className="hidden md:flex space-x-10 items-center">
                    <Link href="/rugs" className="text-sm font-medium text-stone-600 hover:text-stone-900 transition-soft">Collections</Link>
                    <Link href="/about" className="text-sm font-medium text-stone-600 hover:text-stone-900 transition-soft">Our Story</Link>
                    <Link href="/contact" className="text-sm font-medium text-stone-600 hover:text-stone-900 transition-soft">Contact</Link>
                </div>

                {/* Icons — دايماً على desktop، يتحكم فيه isOpen على موبايل */}
                <div className={`${isOpen ? 'flex' : 'hidden'} md:flex items-center space-x-6`}>

                    {/* Search */}
                    <button className="p-2 text-stone-600 hover:text-stone-900 transition-soft">
                    <img src="/svgs/search-with-magnifier-sketch.svg" className="h-6 w-6" alt="search" />
                    </button>

                    {token ? (
                    <>
                        {/* Account */}
                        <Link href="/profile" className="p-2 text-stone-600 hover:text-stone-900 transition-soft">
                            <img src="/svgs/user-avatar-profile-person.svg" className="h-10 w-10" alt="profile" />
                        </Link>

                        {/* Wishlist */}
                        <Link href="/wishlist" className="p-2 text-stone-600 hover:text-stone-900 transition-soft relative">
                            <img src="/svgs/love-or-like-heart-sketched.svg" className="h-6 w-6" alt="wishlist" />
                        </Link>

                        {/* Cart */}
                        <Link href="/cart" className="p-2 text-stone-600 hover:text-stone-900 transition-soft relative">
                            <img src="/svgs/shopping-cart-sketch.svg" className="h-6 w-6" alt="cart" />
                        <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white bg-stone-900 rounded-full transform translate-x-1/2 -translate-y-1/2">
                            {user?.cart_shopping?.length}
                        </span>
                        </Link>
                    </>
                    ) : (
                        <Link href="/login" className="p-2 text-stone-600 hover:text-stone-900 transition-soft relative">
                            <img src="/svgs/login-sketch.svg" className="h-6 w-6" alt="login" />
                        </Link>
                    )}
                </div>

                {/* Hamburger — موبايل فقط */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="md:hidden p-2 text-stone-600"
                >
                    {isOpen ? (
                    // X icon عند الفتح
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                    </svg>
                    ) : (
                    // Hamburger icon
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/>
                    </svg>
                    )}
                </button>

                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            {isOpen && (
                <div className="md:hidden border-t border-stone-200 bg-white px-4 py-4 flex flex-col space-y-4">
                <Link href="/rugs" onClick={() => setIsOpen(false)} className="text-sm font-medium text-stone-600 hover:text-stone-900">Collections</Link>
                <Link href="/about" onClick={() => setIsOpen(false)} className="text-sm font-medium text-stone-600 hover:text-stone-900">Our Story</Link>
                <Link href="/contact" onClick={() => setIsOpen(false)} className="text-sm font-medium text-stone-600 hover:text-stone-900">Contact</Link>
                </div>
            )}
        </nav>
    )
}