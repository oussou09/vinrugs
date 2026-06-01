"use client";
import Link from "next/link";
import Asideprofile from "../asideprofile";
import { useApp } from "@/app/lib/AppContext";





export default function Profile(){

    const {user, loadingAuth} = useApp()

    

    return (
        // <!-- User Profile Dashboard -->
        <section className="py-12 md:py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row gap-16">
                    {/* <!-- Navigation Sidebar --> */}
                    <Asideprofile/>

                    {/* <!-- Main Content Area --> */}
                    <div className="flex-grow">
                        <h1 className="serif text-4xl mb-12 italic">Order Archive</h1>
                        
                        <div className="space-y-8">
                            {/* <!-- Order Item --> */}

                            {loadingAuth ? (
                                // Loading skeleton
                                <div className="border border-[#eddcc9] p-8 flex flex-col md:flex-row md:items-center justify-between gap-12 animate-pulse">
                                    <div className="flex gap-6">
                                        <div className="w-20 h-24 bg-[#f0e4d3] flex-shrink-0 rounded" />
                                        <div className="space-y-2">
                                        <div className="h-3 w-24 bg-[#f0e4d3] rounded" />
                                        <div className="h-4 w-36 bg-[#e7d7c1] rounded" />
                                        <div className="h-5 w-16 bg-[#f0e4d3] rounded-full mt-2" />
                                        </div>
                                    </div>
                                    <div className="flex flex-col md:items-end space-y-2">
                                        <div className="h-4 w-20 bg-[#e7d7c1] rounded" />
                                        <div className="h-3 w-32 bg-[#f0e4d3] rounded" />
                                        <div className="flex space-x-6 mt-4">
                                        <div className="h-3 w-16 bg-[#f0e4d3] rounded" />
                                        <div className="h-3 w-14 bg-[#f0e4d3] rounded" />
                                        </div>
                                    </div>
                                </div>
                            )
                            : !user?.card_user || user.card_user.length === 0 ?
                            (
                                <div className="border border-[#eddcc9] p-8 flex flex-col items-center justify-center gap-4 text-center">
                                    <svg className="w-16 h-16 text-[#d4c4a8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 13h6" />
                                    </svg>
                                    <div>
                                        <h3 className="text-sm font-bold uppercase tracking-widest text-[#7B542F] mb-1">No Orders Yet</h3>
                                        <p className="text-xs text-stone-400 max-w-xs">You haven&apos;t placed any orders. Start exploring our vintage rug collection.</p>
                                    </div>
                                    <Link href="/rugs" className="mt-2 px-6 py-2.5 bg-[#FF9D00] text-white text-xs font-bold uppercase tracking-widest rounded-lg hover:bg-[#b8871a] transition-colors">
                                        Browse Collection
                                    </Link>
                                </div>
                            )
                            :
                            (
                                <>
                                {user?.card_user?.map((product) => (
                                    <div key={product.id} className="border border-stone-100 p-8 flex flex-col md:flex-row md:items-center justify-between gap-12">
                                        <div className="flex gap-6">
                                            <div className="w-20 h-24 bg-stone-100 flex-shrink-0">
                                                <img src="https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?auto=format&fit=crop&q=80&w=200" className="w-full h-full object-cover grayscale" />
                                            </div>
                                            <div>
                                                <h3 className="text-xs font-bold uppercase tracking-widest mb-1">Order #RA-1092-B</h3>
                                                <p className="text-sm font-medium text-stone-900 mb-2 italic">Isfahan Runner (Large)</p>
                                                <span className="bg-emerald-50 text-emerald-700 text-[10px] font-bold uppercase tracking-tight px-2 py-1 rounded">Delivered</span>
                                            </div>
                                        </div>
                                        <div className="flex flex-col md:items-end">
                                            <span className="text-sm font-bold text-stone-900">$1,325.00</span>
                                            <span className="text-[10px] text-stone-400 uppercase mt-1">Purchased April 12, 2026</span>
                                            <div className="mt-4 flex space-x-6">
                                                <button className="text-xs font-bold uppercase tracking-widest underline hover:no-underline transition-soft text-stone-400 hover:text-stone-900">View Detail</button>
                                                <button className="text-xs font-bold uppercase tracking-widest underline hover:no-underline transition-soft text-stone-400 hover:text-stone-900">Reorder</button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                </>
                            )}

                            {/* <!-- Empty Order State (Example) --> */}
                            {/* <!-- 
                            <div className="py-24 text-center bg-stone-50">
                                <p className="serif text-2xl italic text-stone-400">Your archive is currently empty.</p>
                                <a href="/rugs" className="mt-8 inline-block bg-stone-900 text-white px-8 py-4 text-xs font-bold uppercase tracking-widest">Start a Legacy</a>
                            </div>
                            --> */}
                        </div>
                    </div>
                </div>
            </div>
        </section>

    )
}