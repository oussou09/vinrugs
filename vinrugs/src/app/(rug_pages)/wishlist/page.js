'use client';
import Asideprofile from "@/app/(user_group)/asideprofile";
import { apiClient } from "@/app/lib/api";
import { useApp } from "@/app/lib/AppContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from 'react-hot-toast';


export default function Wishlist(){

    const {user, products, token, refreshProducts, fetchUserData, loadingAuth} = useApp()
    const router = useRouter()
    console.log(user)


    const list_products = products?.filter((product) =>
                            user?.rugs?.some((rug) => rug.id === product.id)
                            ) || [];

    console.log("products: ", products)
    console.log("rugs users: ", user?.rugs)
    console.log("list_products ", list_products)

    const handleDelete = async (RugId) => {
      const dataForm = new FormData();

      dataForm.append('rug_id', RugId)
      dataForm.append('type_tret', 1)

      try {
        const resp = await apiClient.post('/arwishlist', dataForm, {
          headers: {
            Authorization: token
          }
        });

        await fetchUserData()
        await refreshProducts()

        toast.success('Wishlist rug was removed');

      } catch (error) {
            const errorMessage = error.response?.data?.message || error.message;
            toast.error(error.response?.data?.message || error.message || 'Something went wrong');
            console.error('Connection Error:', errorMessage);
            console.log("STATUS:", error.response?.status);
            console.log("DATA:", error.response?.data);
            console.log("FULL ERROR:", error);
      }
    }

    return(
    <section className="py-12 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-16">
          {/* Navigation Sidebar */}
          <Asideprofile displayName="Sarah Johnson" currentPath="/wishlist" />

          {/* Main Content Area */}
          <div className="flex-grow">
            <h1 className="serif text-5xl mb-4 italic text-[#7B542F]">Your Curated Collection</h1>
            <p className="text-stone-400 tracking-wide uppercase text-xs font-bold">{user?.rugs?.length} Pieces Saved</p>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
              { loadingAuth ?
                (
                  <div className="group relative animate-pulse">
                    <div className="aspect-[3/4] overflow-hidden bg-[#f0e4d3] relative">
                      <div className="w-full h-full bg-[#e7d7c1]" />
                      <div className="absolute top-4 right-4 p-2 bg-white/60 rounded-full">
                        <div className="w-4 h-4 bg-[#d4c4a8] rounded" />
                      </div>
                    </div>
                    <div className="mt-6 flex justify-between items-end">
                      <div className="space-y-2">
                        <div className="h-4 w-32 bg-[#f0e4d3] rounded" />
                        <div className="h-3 w-16 bg-[#f0e4d3] rounded" />
                      </div>
                      <div className="h-3 w-20 bg-[#f0e4d3] rounded" />
                    </div>
                  </div>
                )
                : !user?.rugs?.length ?
                (
                  <div className="border border-[#eddcc9] p-12 flex flex-col items-center justify-center gap-4 text-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-[#d4c4a8]">
                      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
                    </svg>
                    <div>
                      <h3 className="text-sm font-bold uppercase tracking-widest text-[#7B542F] mb-1">No Saved Items</h3>
                      <p className="text-xs text-stone-400 max-w-xs mx-auto">Your wishlist is empty. Start curating your vintage rug collection.</p>
                    </div>
                    <Link href='/rugs' className="mt-2 px-6 py-2.5 bg-[#FF9D00] text-white text-xs font-bold uppercase tracking-widest rounded-lg hover:bg-[#b8871a] transition-colors">
                      Browse Collection
                    </Link>
                  </div>
                )
                :
                (
                  <>
                    {list_products.map((item) => (
                      <div key={item.id} className="group relative">
                        <div className="aspect-[3/4] overflow-hidden bg-[#f0e4d3] relative">
                          <img src={`http://127.0.0.1:8000/storage/${item.rug_imges?.[0]?.main_rug_path}`} className="w-full h-full object-cover" alt={item.rug_title} />
                          <button onClick={() => handleDelete(item.id)} className="absolute top-4 right-4 p-2 bg-white/80 rounded-full hover:bg-red-50 text-stone-400 hover:text-red-500 transition-colors">
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
                  </>
                )
              }
            </div>
          </div>
        </div>
      </div>
    </section>
    )
}