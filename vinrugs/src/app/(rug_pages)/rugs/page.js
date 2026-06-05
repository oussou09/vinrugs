"use client";
import Link from "next/link";
import { useApp } from "@/app/lib/AppContext";


export default function Rugs(){
    
    const {products, loading, refreshProducts, refreshCount} = useApp()
    // const allproducts = products.data
    const allproducts = products?.data || products || [];

    // console.log("allproducts: ",allproducts)
    // console.log("products?.data: ",products?.data)
    console.log("refresh Count: ",refreshCount)

    const ImgTrait = (data) => {

        const firstImage = data[0];

        if (!firstImage || !firstImage.main_rug_path) {
            return 'http://127.0.0.1:8000/storage/imgcomming.jpg'
        }
        // console.log(`http://127.0.0.1:8000/storage/${firstImage.main_rug_path}`)
        return `http://127.0.0.1:8000/storage/${firstImage.main_rug_path}`
    }

    const SortBySize = (allsproducts = []) => {
        return [...allsproducts].sort((a, b) => {
            const SizeA = a.rug_imges?.[0]?.main_rug_file_size || 0;
            const SizeB = b.rug_imges?.[0]?.main_rug_file_size || 0;
            // console.log(SizeB ,"-", SizeA)
            return SizeB - SizeA;
        });
    }

    const sortedRugs = SortBySize(allproducts);


    // https://dummyjson.com/products
    return (
        // <!-- Rug Gallery Catalog -->
        <section className="pt-12 pb-24 bg-stone-50 min-h-screen font-sans text-stone-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* --- Header --- */}
                <header className="mb-8 border-b border-stone-100 pb-8 flex flex-col md:flex-row md:items-end justify-between">
                    <div>
                        <h1 className="serif text-3xl mb-4">All Rugs</h1>
                        <p className="text-stone-500">
                        {loading ? "Updating inventory..." : `Browse our master collection of over ${products.length} handcrafted weaving pieces.`}
                        </p>
                    </div>
                    
                    <div className="mt-8 md:mt-0 flex items-center space-x-6">
                        <div>
                            <span className="text-[10px] font-medium uppercase tracking-widest text-stone-400">Sort by Price:</span>
                            <select
                            className="bg-transparent border-none text-xs font-bold py-0 pl-0 focus:ring-0 cursor-pointer text-stone-900 focus:outline-none"
                            defaultValue="New Arrivals"
                            >
                                <option value="New Arrivals">New Arrivals</option>
                                <option value="Price: Low to High">Price: Low to High</option>
                                <option value="Price: High to Low">Price: High to Low</option>
                            </select>
                        </div>
                        
                        <div>
                            <span className="text-[10px] font-medium uppercase tracking-widest text-stone-400">Sort by Category:</span>
                            <select
                            className="bg-transparent border-none text-xs font-bold py-0 pl-0 focus:ring-0 cursor-pointer text-stone-900 focus:outline-none"
                            defaultValue="New Arrivals"
                            >
                                <option value="New Arrivals">New Arrivals</option>
                                <option value={1}>Category: Persian</option>
                                <option value={2}>Category: Turkish</option>
                                <option value={3}>Category: Moroccan</option>
                                <option value={4}>Category: Modern</option>
                            </select>
                        </div>
                    </div>

                </header>

                <div className="flex flex-col md:flex-row gap-12">
                {/* --- Sidebar Optional Insertion Point --- */}
                {/* <aside className="w-full md:w-64 shrink-0">Sidebar Content Here</aside> */}

                {/* --- Product Grid Container --- */}
                <div className="grow">
                    {loading ? (
                    /* Loading State Layout */
                    <div className="flex flex-col items-center justify-center py-32 space-y-4">
                        <div className="w-8 h-8 border-2 border-stone-300 border-t-stone-900 rounded-full animate-spin"></div>
                        <p className="text-xs uppercase tracking-widest text-stone-500 animate-pulse">Weaving collection...</p>
                    </div>
                    ) : sortedRugs.length === 0 ? (
                    /* Empty Fallback State Layout */
                        <div className="text-center py-32 border border-dashed border-stone-200">
                            <h3 className="text-base font-medium mb-2">Our Vault is Temporarily Empty</h3>
                            <p className="text-xs text-stone-500 mb-6">Check back soon or hit refresh to pull latest updates.</p>
                            <button type="submit"
                            onClick={refreshProducts} 
                            className="bg-stone-900 text-white text-xs uppercase tracking-widest px-6 py-3 font-bold hover:bg-stone-800 transition-colors duration-200"
                            >
                            Retry Connection
                            </button>
                        </div>
                    ) : (
                    /* Active Results Display */
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
                        {sortedRugs.map((product) => (
                            <div key={product.id} className="group">
                            <div className="aspect-[3/4] overflow-hidden bg-stone-100 relative">
                                <img 
                                src={ImgTrait(product.rug_imges)}
                                alt={product.rug_title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700" 
                                />
                                <div className="absolute top-4 left-4">
                                <span className="bg-stone-900 text-white text-[10px] font-bold uppercase tracking-widest px-2 py-1">
                                    {product.rug_quantity > 0 ? 'Limited Edition' : 'Unlimited Edition'}
                                </span>
                                </div>
                                <div className="absolute inset-0 bg-stone-900/0 group-hover:bg-stone-900/20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                                <Link
                                    href={`/product_detail/${product.id}`}
                                    className="bg-white text-stone-900 px-6 py-3 text-xs font-bold uppercase tracking-widest hover:bg-stone-900 hover:text-white transition-colors duration-200"
                                >
                                    Quick View
                                </Link>
                                </div>
                            </div>
                            <div className="mt-6 flex justify-between items-start">
                                <div>
                                <h3 className="text-sm font-medium text-stone-900">{product.rug_title}</h3>
                                </div>
                                <span className="text-sm font-bold text-stone-900">${product.rug_price}</span>
                            </div>
                            </div>
                        ))}
                        </div>

                        {/* --- Pagination --- */}
                        <div className="mt-24 border-t border-stone-100 pt-12 flex justify-center">
                        <nav className="flex space-x-4 items-center">
                            <a href="#" className="w-10 h-10 border border-stone-200 flex items-center justify-center text-xs font-bold hover:bg-stone-900 hover:text-white transition-all duration-200">1</a>
                            <a href="#" className="w-10 h-10 border border-stone-200 bg-stone-900 text-white flex items-center justify-center text-xs font-bold">2</a>
                            <a href="#" className="w-10 h-10 border border-stone-200 flex items-center justify-center text-xs font-bold hover:bg-stone-900 hover:text-white transition-all duration-200">3</a>
                            <span className="text-stone-300">...</span>
                            <a href="#" className="w-10 h-10 border border-stone-200 flex items-center justify-center text-sm font-bold hover:bg-stone-900 hover:text-white transition-all duration-200">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="m9 18 6-6-6-6"/>
                            </svg>
                            </a>
                        </nav>
                        </div>
                    </>
                    )}
                </div>
                </div>

            </div>
            </section>

    )
}