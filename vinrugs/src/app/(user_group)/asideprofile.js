'use client';
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useAppUser } from "../lib/AppContext";
import { apiClient } from "../lib/api";
import { useRouter } from "next/navigation";
import toast from 'react-hot-toast';



export default function Asideprofile() {
    
    const router = useRouter()
    const {user, token, checkLogout} = useAppUser()

    const onSubmit = async () => {
        try {
            await checkLogout();
            router.push('/rugs')
            toast.success('Logout successfully');

        } catch (error) {
            console.error(error);
            toast.error(error,'Something went wrong');
        }
    }

    const rpath = usePathname()
    const displayName = user ? `${user.first_name ?? ''} ${user.last_name ?? ''}`.trim() : 'Guest'

    console.log('rpath:', rpath);
    return(
        <aside className="lg:w-1/4 flex-shrink-0">
            <div className="flex items-center space-x-6 mb-12">
                <div className="w-16 h-16 bg-[#7B542F] rounded-full flex items-center justify-center text-white serif text-2xl italic">JD</div>
                <div>
                <h2 className="text-lg font-medium text-[#7B542F]">{displayName}</h2>
                <p className="text-xs text-stone-400 uppercase tracking-widest">Patron since 2024</p>
                </div>
            </div>

            <nav className="space-y-1">
                <Link href="/profile"
                className={`flex items-center px-4 py-3 text-sm uppercase tracking-widest transition-colors
                ${rpath === '/profile' ? 'font-bold bg-[#7B542F] text-white' : 'text-stone-500 hover:bg-stone-50 hover:text-[#7B542F]'}`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-3"><path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z"/><path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9"/></svg>
                Order History
                </Link>
                <Link href="/wishlist"
                className={`flex items-center px-4 py-3 text-sm uppercase tracking-widest transition-colors
                ${rpath === '/wishlist' ? 'font-bold bg-[#FF9D00] text-white' : 'text-stone-500 hover:bg-stone-50 hover:text-[#7B542F]'}`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-3"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
                Wishlist
                </Link>
                <Link href="/security"
                className={`flex items-center px-4 py-3 text-sm uppercase tracking-widest transition-colors
                ${rpath === '/security' ? 'font-bold bg-[#7B542F] text-white' : 'text-stone-500 hover:bg-stone-50 hover:text-[#7B542F]'}`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-3"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
                Security
                </Link>
                <div className="pt-6">
                <button onClick={onSubmit} type="submit" className="px-4 text-xs font-bold uppercase tracking-widest text-red-400 hover:text-red-600 transition-colors">Sign Out</button>
                </div>
            </nav>
        </aside>
    )
}