"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { useApp } from "./lib/AppContext";

export default function Home() {

    const {products = [], loading, user} = useApp();
    console.log('product ', products)
    
    const tree_rugs = products
    .filter((element) => element?.rug_imges?.[0]?.main_rug_path)
    .slice(0, 3);
    

    console.log('tree_rugs ', tree_rugs)
  return (
  <>
      {/* // <!-- Home Page Content --> */}
      <section className="relative h-[80vh] flex items-center overflow-hidden">
          {/* <!-- Hero Image --> */}
          <div className="absolute inset-0 z-0">
              <img src="https://images.unsplash.com/photo-1600166898405-da9535204843?auto=format&fit=crop&q=80&w=2000" alt="Beautifully textured oriental rug in a sunlit room" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-stone-900/20"></div>
          </div>
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-2xl text-white">
                  <span className="text-xs font-bold uppercase tracking-widest bg-stone-900/80 px-3 py-1 inline-block mb-6">The Heritage Collection</span>
                  <h1 className="serif text-5xl md:text-7xl font-light mb-8 leading-tight">Art you can walk on.</h1>
                  <p className="text-lg mb-10 opacity-90 leading-relaxed font-light">
                      Discover our curated selection of hand-knotted rugs, each telling a story of tradition, patience, and unparalleled craftsmanship.
                  </p>
                  <div className="flex space-x-4">
                      <a href="/rugs" className="bg-white text-stone-900 px-8 py-4 text-sm font-bold uppercase tracking-widest hover:bg-stone-100 transition-soft">Explore Shop</a>
                      <a href="/about" className="border border-white text-white px-8 py-4 text-sm font-bold uppercase tracking-widest hover:bg-white hover:text-stone-900 transition-soft">Learn More</a>
                  </div>
              </div>
          </div>
      </section>

      {/* <!-- Featured Categories --> */}
      <section className="py-24 bg-stone-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-end mb-16">
                  <div>
                      <h2 className="serif text-4xl mb-4">Curated Collections</h2>
                      <p className="text-stone-500 max-w-md">Every rug in our gallery is hand-selected for its unique provenance and exceptional quality.</p>
                  </div>
                  <a href="/rugs" className="text-sm font-bold uppercase tracking-widest border-b border-stone-900 pb-1">View All</a>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {/* <!-- Category 1 --> */}
                  <a href="#" className="group relative aspect-[4/5] overflow-hidden">
                      <img src={`http://127.0.0.1:8000/storage/${tree_rugs?.[0]?.rug_imges?.[0]?.main_rug_path}`} alt="Intricate Persian rug details" className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" />
                      <div className="absolute inset-0 bg-stone-900/10 group-hover:bg-stone-900/30 transition-soft"></div>
                      <div className="absolute bottom-10 left-10 text-white">
                          <h3 className="serif text-3xl mb-2">{tree_rugs?.[0]?.rug_title}</h3>
                          <p className="text-xs uppercase tracking-widest opacity-80">Ancient Traditions</p>
                      </div>
                  </a>
                  {/* <!-- Category 2 --> */}
                  <a href="#" className="group relative aspect-[4/5] overflow-hidden mt-12 md:mt-0">
                      <img src={`http://127.0.0.1:8000/storage/${tree_rugs?.[1]?.rug_imges?.[0]?.main_rug_path}`} alt="Neutral modern minimal rug" className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" />
                      <div className="absolute inset-0 bg-stone-900/10 group-hover:bg-stone-900/30 transition-soft"></div>
                      <div className="absolute bottom-10 left-10 text-white">
                          <h3 className="serif text-3xl mb-2">{tree_rugs?.[1]?.rug_title}</h3>
                          <p className="text-xs uppercase tracking-widest opacity-80">Quiet Luxury</p>
                      </div>
                  </a>
                  {/* <!-- Category 3 --> */}
                  <a href="#" className="group relative aspect-[4/5] overflow-hidden mt-12 md:mt-24">
                      <img src={`http://127.0.0.1:8000/storage/${tree_rugs?.[2]?.rug_imges?.[0]?.main_rug_path}`} alt="Bold tribal runner" className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" />
                      <div className="absolute inset-0 bg-stone-900/10 group-hover:bg-stone-900/30 transition-soft"></div>
                      <div className="absolute bottom-10 left-10 text-white">
                          <h3 className="serif text-3xl mb-2">{tree_rugs?.[2]?.rug_title}</h3>
                          <p className="text-xs uppercase tracking-widest opacity-80">Bold Narratives</p>
                      </div>
                  </a>
              </div>
          </div>
      </section>

      {/* <!-- Values Section --> */}
      <section className="py-24 border-y border-stone-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <div className="max-w-3xl mx-auto">
                  <h2 className="serif text-4xl mb-12 italic">Why Rug Artisan?</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                      <div>
                          <div className="w-12 h-12 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-6 text-stone-900">
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                          </div>
                          <h4 className="text-xs font-bold uppercase tracking-widest mb-3">Certified Origin</h4>
                          <p className="text-sm text-stone-500">Every rug comes with a signed certificate of authenticity and provenance.</p>
                      </div>
                      <div>
                          <div className="w-12 h-12 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-6 text-stone-900">
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M16 12l-4-4-4 4M12 16V9"/></svg>
                          </div>
                          <h4 className="text-xs font-bold uppercase tracking-widest mb-3">Sustainable Loom</h4>
                          <p className="text-sm text-stone-500">We prioritize natural dyes and ethically sourced, local wool materials.</p>
                      </div>
                      <div>
                          <div className="w-12 h-12 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-6 text-stone-900">
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 17H2a3 3 0 0 0 3-3V9a7 7 0 0 1 14 0v5a3 3 0 0 0 3 3zm-3 0v1a3 3 0 0 1-6 0v-1"/></svg>
                          </div>
                          <h4 className="text-xs font-bold uppercase tracking-widest mb-3">Lifetime Care</h4>
                          <p className="text-sm text-stone-500">Professional cleaning and restoration services for all our patrons.</p>
                      </div>
                  </div>
              </div>
          </div>
      </section>
    </>
  );
}
