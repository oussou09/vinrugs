"use client";
import { apiClient } from "@/app/lib/api";
import { useApp } from "@/app/lib/AppContext";
import { useParams } from "next/navigation";
import toast from 'react-hot-toast';
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";


export default function ProductDetail(){

    const { productid } = useParams();

    const {products, loading, refreshProducts, refreshCount, user, fetchUserData, token} = useApp()
    const {register, handleSubmit, formState : {errors, isSubmitting}, reset} = useForm()


    console.log('user before: ',user);
    console.log('rug_id', productid)
    console.log('rug_id', Number(productid))
    console.log('user_id', user?.rugs?.[0]?.id)




    // start Handle Adding rugs to my wishlist

    const IsLikes = user?.rugs?.find((product) => product.id == productid)
                ? true
                : false;
        
    const Onsubmits = async () => {

        try {
            const dataForm = new FormData()
            dataForm.append('rug_id', productid)
            dataForm.append('type_tret', IsLikes ? '1' : '0')

            const resp = await apiClient.post('/arwishlist', dataForm, {
                headers: {Authorization : token}
            })

            if (resp.status === 200 || resp.status === 201) {
                // alert('rug added seccessfully')
                await fetchUserData()
                await refreshProducts()
                toast.success(resp.data.message || 'Wishlist updated');
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message;
            toast.error(error.response?.data?.message || error.message || 'Something went wrong');
            console.error('Connection Error:', errorMessage);
            console.log("STATUS:", error.response?.status);
            console.log("DATA:", error.response?.data);
            console.log("FULL ERROR:", error);
        }
    }

    // end Handle Adding rugs to my wishlist



    // start Handle Adding rugs to cart

    const [RugQnt, setRugQnt] = useState(1)

    useEffect(() => {
        console.log('RugQnt: ',RugQnt)
    },[RugQnt]);

    const HandleAddCart = async () => {
        const dataForm = new FormData();
        
        try {
            dataForm.append('rug_id', productid);
            dataForm.append('rug_Quantity', RugQnt);

            const resp = await apiClient.post('/addcartrug', dataForm, {
                headers: {Authorization: token}
            });

            if (resp.status === 200 || resp.status === 201) {
                // alert('rug added seccessfully')
                await fetchUserData()
                await refreshProducts()
                toast.success(resp.data.message || 'Rug Added to your cart seccessfully');
            }
            
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message;
            toast.error(error.response?.data?.message || error.message || 'Something went wrong');
            console.error('Connection Error:', errorMessage);
            console.log("STATUS:", error.response?.status);
            console.log("DATA:", error.response?.data);
            console.log("FULL ERROR:", error);
        }
    }

    // end Handle Adding rugs to cart


    console.log('product: ',products)

    if (!Array.isArray(products)) {
        console.error("Data is not an array:", products);
        throw new Error("allproducts is not an array. Check GetData return value.");
    }

    const myproduct = products.find((product) => product.id == productid);

    console.log('myproduct: ',myproduct);

    if (!myproduct) {
        return <div>Product not found</div>;
    }
    // console.log(errormessage)
    
    const mainimg = myproduct?.rug_imges?.[0]?.main_rug_path ? `http://127.0.0.1:8000/storage/${myproduct.rug_imges[0].main_rug_path.replace(/^\/+/, "")}` : errormessage;
    const errormessage = "http://127.0.0.1:8000/storage/imgcomming.jpg";

    console.log("IsLikes ",IsLikes)

    return(
        <section className="py-12 md:py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row gap-16">
                    {/* <!-- Product Images Gallery --> */}
                    <div className="flex-grow lg:w-3/5">
                        <div className="aspect-square bg-stone-100 overflow-hidden mb-4">
                            <img id="main-product-image" src={mainimg} alt={myproduct.rug_title} className="w-full h-full object-cover" />
                        </div>
                        <div className="grid grid-cols-4 gap-4">
                            <button className="aspect-square bg-stone-100 border-2 border-stone-900 overflow-hidden">
                                <img src={mainimg} className="w-full h-full object-cover" />
                            </button>
                            <button className="aspect-square bg-stone-100 hover:border-2 hover:border-stone-200 transition-soft overflow-hidden">
                                <img src="https://images.unsplash.com/photo-1551224151-518f8e12fd97?auto=format&fit=crop&q=80&w=300" className="w-full h-full object-cover grayscale" />
                            </button>
                            <button className="aspect-square bg-stone-100 hover:border-2 hover:border-stone-200 transition-soft overflow-hidden">
                                <img src="https://images.unsplash.com/photo-1574730314821-33560e8ea321?auto=format&fit=crop&q=80&w=300" className="w-full h-full object-cover grayscale" />
                            </button>
                            <div className="aspect-square bg-stone-900 flex items-center justify-center text-white text-xs font-bold uppercase">
                                + Video
                            </div>
                        </div>
                    </div>

                    {/* <!-- Product Information --> */}
                    <div className="lg:w-2/5 flex flex-col">
                        <nav className="flex text-xs uppercase tracking-widest text-stone-400 mb-6 space-x-2">
                            <a href="/rugs">Shop</a>
                            <span>/</span>
                            <a href="#">Persian Silk</a>
                        </nav>

                        <h1 className="serif text-4xl mb-2">{myproduct.rug_title} <br /> ({myproduct.rug_quantity} left)</h1>
                        <p className="text-2xl font-light text-stone-900 mb-8">${myproduct.rug_price}</p>

                        {/* <!-- Configuration --> */}
                        <div className="space-y-10 mb-12">
                            {/* <!-- Size Selection --> */}
                            <div>
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-xs font-bold uppercase tracking-widest">Select Size</h3>
                                    <button className="text-xs text-stone-400 underline uppercase tracking-widest">Size Guide</button>
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    <button className="py-3 px-4 border border-stone-900 text-xs font-bold uppercase tracking-widest">4' x 6' (Runner)</button>
                                    <button className="py-3 px-4 border border-stone-200 text-xs font-medium uppercase tracking-widest hover:border-stone-900 transition-soft text-stone-600">5' x 8' (Area)</button>
                                    <button className="py-3 px-4 border border-stone-200 text-xs font-medium uppercase tracking-widest hover:border-stone-900 transition-soft text-stone-600">8' x 10' (Large)</button>
                                    <button className="py-3 px-4 border border-stone-100 text-xs font-medium uppercase tracking-widest text-stone-300 cursor-not-allowed">9' x 12' (Sold Out)</button>
                                </div>
                            </div>

                            <div className="w-full">
                        
                                <div className="flex items-center">
                                    <button
                                    type="button"
                                    disabled={ RugQnt <= 1 }
                                    onClick={() => setRugQnt((prev) => prev + 1)}
                                    className="px-4 py-3 bg-[#7B542F] text-white hover:bg-[#5a3e24] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    aria-label="Decrement button"
                                    >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/></svg>
                                    </button>
                                    <input
                                    className="w-16 text-center py-3 text-sm font-bold text-[#7B542F] outline-none"
                                    type="text"
                                    value={RugQnt}
                                    aria-label="Quantity input"
                                    id="quantity-input"
                                    readOnly
                                    />
                                    <button
                                    type="button"
                                    onClick={() => setRugQnt((prev) => prev + 1)}
                                    className="px-4 py-3 bg-[#7B542F] text-white hover:bg-[#5a3e24] transition-colors"
                                    aria-label="Increment button"
                                    >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14"/></svg>
                                    </button>
                                </div>
                            </div>

                            {/* <!-- Material Info --> */}
                            <div className="p-6 bg-stone-50 rounded-lg">
                                <div className="flex items-start mb-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 mr-3 text-stone-900"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                                    <div>
                                        <h4 className="text-xs font-bold uppercase tracking-widest mb-1">Authentic Weave</h4>
                                        <p className="text-xs text-stone-500 leading-relaxed">Hand-knotted in central Iran using 100% genuine silk and organic highland wool.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* <!-- Actions --> */}
                        <div className="flex flex-col space-y-4">
                            <button onClick={HandleAddCart} className="w-full bg-stone-900 text-white py-5 text-sm font-bold uppercase tracking-widest transition-soft hover:opacity-90">Add to Bag</button>
                            <button onClick={Onsubmits} className="w-full border border-stone-200 py-5 text-sm font-bold uppercase tracking-widest transition-soft hover:bg-stone-50 flex items-center justify-center">
                                {/* <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg> */}
                                
                                <img 
                                    src={IsLikes ? '/svgs/heart-plain.svg' : '/svgs/heart-empty.svg'}
                                    className="h-5 w-5 mr-2" 
                                    alt="Favorite status indicator" 
                                />

                                Add to Wishlist
                            </button>
                        </div>

                        {/* <!-- Tabs/Details --> */}
                        <div className="mt-16 space-y-6">
                        <details className="bg-white rounded-xl shadow border border-[#eddcc9] overflow-hidden group">
                            <summary className="p-4 cursor-pointer flex items-center justify-between hover:bg-[#fdf6ec] transition-colors list-none">
                                <div className="flex items-center gap-3">
                                <svg className="w-5 h-5 text-[#FF9D00] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <h2 className="text-lg font-semibold text-[#7B542F]">Description</h2>
                                </div>
                                <svg className="w-5 h-5 text-[#B6771D] transition-transform duration-200 group-open:rotate-180 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                </svg>
                            </summary>
                            <div className="px-4 pb-4 border-t border-[#f0e4d3] pt-4">
                                {myproduct.rug_description}
                            </div>
                        </details>
                        <details className="bg-white rounded-xl shadow border border-[#eddcc9] overflow-hidden group">
                            <summary className="p-4 cursor-pointer flex items-center justify-between hover:bg-[#fdf6ec] transition-colors list-none">
                                <div className="flex items-center gap-3">
                                <svg className="w-5 h-5 text-[#FF9D00] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <h2 className="text-lg font-semibold text-[#7B542F]">Details & History</h2>
                                </div>
                                <svg className="w-5 h-5 text-[#B6771D] transition-transform duration-200 group-open:rotate-180 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                </svg>
                            </summary>
                            <div className="px-4 pb-4 border-t border-[#f0e4d3] pt-4">
                                Origin: Isfahan, Iran<br />
                                Knot Density: 600 knots per sq inch<br />
                                Material: 70% Silk, 30% Wool<br />
                                Age: Contemporary (Newly Knotted)
                            </div>
                        </details>
                        <details className="bg-white rounded-xl shadow border border-[#eddcc9] overflow-hidden group">
                            <summary className="p-4 cursor-pointer flex items-center justify-between hover:bg-[#fdf6ec] transition-colors list-none">
                                <div className="flex items-center gap-3">
                                <svg className="w-5 h-5 text-[#FF9D00] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <h2 className="text-lg font-semibold text-[#7B542F]">Shipping & Returns</h2>
                                </div>
                                <svg className="w-5 h-5 text-[#B6771D] transition-transform duration-200 group-open:rotate-180 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                </svg>
                            </summary>
                            <div className="px-4 pb-4 border-t border-[#f0e4d3] pt-4">
                                Content goes here
                            </div>
                        </details>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    )
}