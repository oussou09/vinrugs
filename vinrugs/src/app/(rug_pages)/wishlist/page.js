'use client';
import Asideprofile from "@/app/(user_group)/asideprofile";
import { useApp } from "@/app/lib/AppContext";


export default function Wishlist(){

const wishlistItems = [
  {
    id: 1,
    name: 'Isfahan Silk Medallion',
    price: '$1,280',
    image: 'https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?auto=format&fit=crop&q=80&w=600',
  },
  {
    id: 2,
    name: 'Persian Wool Runner',
    price: '$890',
    image: 'https://images.unsplash.com/photo-1600166898405-da9535204843?auto=format&fit=crop&q=80&w=600',
  },
  {
    id: 3,
    name: 'Turkish Kilim Geometric',
    price: '$650',
    image: 'https://images.unsplash.com/photo-1581539250439-c96689b516dd?auto=format&fit=crop&q=80&w=600',
  },
  {
    id: 4,
    name: 'Moroccan Boujad Vintage',
    price: '$1,450',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=600',
  },
]

    const {user, products} = useApp()

    console.log(user)


    const list_products = products?.filter((product) =>
                            user?.rugs?.some((rug) => rug.id === product.id)
                            ) || [];

    console.log("products: ", products)
    console.log("rugs users: ", user?.rugs)
    console.log("list_products ", list_products)

    return(
    <section className="py-12 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-16">
          {/* Navigation Sidebar */}
          <Asideprofile displayName="Sarah Johnson" currentPath="/wishlist" />

          {/* Main Content Area */}
          <div className="flex-grow">
            <h1 className="serif text-5xl mb-4 italic text-[#7B542F]">Your Curated Collection</h1>
            <p className="text-stone-400 tracking-wide uppercase text-xs font-bold">{wishlistItems.length} Pieces Saved</p>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
              {list_products.map((item) => (
                <div key={item.id} className="group relative">
                  <div className="aspect-[3/4] overflow-hidden bg-[#f0e4d3] relative">
                    <img src={`http://127.0.0.1:8000/storage/${item.rug_imges?.[0]?.main_rug_path}`} className="w-full h-full object-cover" alt={item.rug_title} />
                    <button className="absolute top-4 right-4 p-2 bg-white/80 rounded-full hover:bg-red-50 text-stone-400 hover:text-red-500 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
                    </button>
                    <div className="absolute bottom-0 w-full h-1 bg-[#FF9D00] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                  </div>
                  <div className="mt-6 flex justify-between items-end">
                    <div>
                      <h3 className="text-sm font-medium text-[#7B542F]">{item.rug_title}</h3>
                      <p className="text-xs text-stone-400 mt-1">{item.rug_price}</p>
                    </div>
                    <button className="text-[10px] font-bold uppercase tracking-widest text-[#FF9D00] border-b border-[#FF9D00] pb-1 hover:text-[#b8871a] hover:border-[#b8871a] transition-colors">
                      Move to cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
    )
}