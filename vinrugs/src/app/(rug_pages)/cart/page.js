"use client";
import { apiClient } from "@/app/lib/api";
import { useApp } from "@/app/lib/AppContext"
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from 'react-hot-toast';



export default function Card(){

    const {token, user, loadingAuth, refreshProducts, fetchUserData} = useApp()
    const {register, handleSubmit, formState : {errors, isSubmitting}, reset} = useForm()
    const [totalPriceRugs, setTotalPriceRugs] = useState(0)
    const [shippinRug, setShippinRug] = useState(0)
    const [totalPrice, setotalPrice] = useState(0)
    const router = useRouter();

    console.log(user?.cart_shopping?.[0]?.rug?.rug_imges?.[0]?.main_rug_path);

    useEffect(() => {
        if (!user?.cart_shopping || user.cart_shopping.length === 0) {
            setTotalPriceRugs(0);
            setShippinRug(0);
            setotalPrice(0);
            return;
        }

        const cartSubtotal = user.cart_shopping.reduce((sum, item) => {
            const price = Number(item.rug?.rug_price || 0);
            const qty = Number(item.cart_rug_quantity || 0);
            return sum + price * qty;
        }, 0);

        const totalQuantity = user.cart_shopping.reduce((sum, item) => {
            const qty = Number(item.cart_rug_quantity || 0);
            return sum + qty;
        }, 0);

        const shippingPrice = (cartSubtotal * totalQuantity) / 100;
        const priceWithShipping = cartSubtotal + shippingPrice;

        setTotalPriceRugs(cartSubtotal);
        setShippinRug(shippingPrice);
        setotalPrice(priceWithShipping);
    }, [user]);

        console.log('totalPrice ',totalPrice)
        console.log('shippinRug ', shippinRug)
        console.log('totalPrice ', totalPrice)



        const HandleDelete = async (RugId) => {

            console.log("sending rug_id:", RugId);
            const dataForm = new FormData();
            
            try {
                dataForm.append('rug_id', RugId);
                const resp = await apiClient.post('/removecartrug', dataForm, {
                    headers:{Authorization:token}
                });
                if (resp.status === 200 || resp.status === 201) {
                    await fetchUserData()
                    await refreshProducts()
                    toast.success(resp.data.message || 'Rug Removed from your cart seccessfully');
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

    return(
        // <!-- Shopping Cart Page -->
        <section className="py-12 md:py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="serif text-5xl mb-16">Your Bag</h1>

                <div className="flex flex-col lg:flex-row gap-16">
                    {/* <!-- Cart Items --> */}
                    <div className="flex-grow lg:w-2/3">
                        <div className="border-t border-stone-200">
                            {/* <!-- Item 1 --> */}

                            {loadingAuth ? 
                            (
                                // Loading skeleton
                                <div className="py-10 border-b border-stone-100 flex gap-8 animate-pulse">
                                    <div className="w-24 h-32 md:w-40 md:h-52 bg-stone-100 flex-shrink-0" />
                                        <div className="flex-grow flex flex-col justify-between">
                                            <div className="flex justify-between items-start">
                                            <div className="space-y-2">
                                                <div className="h-5 w-48 bg-stone-100 rounded" />
                                                <div className="h-4 w-24 bg-stone-100 rounded" />
                                                <div className="h-4 w-32 bg-stone-100 rounded" />
                                            </div>
                                            <div className="h-5 w-20 bg-stone-100 rounded" />
                                            </div>
                                            <div className="flex justify-between items-end mt-4">
                                                <div className="flex items-center border border-stone-100">
                                                    <div className="p-2"><div className="w-3 h-3 bg-stone-100 rounded" /></div>
                                                    <div className="px-4"><div className="w-6 h-4 bg-stone-100 rounded" /></div>
                                                    <div className="p-2"><div className="w-3 h-3 bg-stone-100 rounded" /></div>
                                                </div>
                                            <div className="h-3 w-16 bg-stone-100 rounded" />
                                        </div>
                                    </div>
                                </div>
                            )
                            : !user?.cart_shopping?.length ?
                            (
                            // No items in cart - Empty state
                            <div className="py-10 border-b border-stone-100 flex flex-col items-center justify-center gap-4 text-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-stone-300">
                                    <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z"/>
                                    <path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9"/>
                                    <path d="M9 13h6"/>
                                </svg>
                                <div>
                                    <h3 className="text-lg font-medium text-stone-900">Your Cart Is Empty</h3>
                                    <p className="text-sm text-stone-400 mt-1 max-w-xs mx-auto">You haven&apos;t added any vintage rugs to your cart yet.</p>
                                </div>
                                <Link href="/rugs" className="mt-2 px-6 py-2.5 bg-stone-900 text-white text-xs font-bold uppercase tracking-widest hover:bg-stone-700 transition-soft">
                                    Browse Collection
                                </Link>
                            </div>
                            )
                            :
                            (
                                <>
                                {user?.cart_shopping?.map((product) => (
                                    <div key={product?.id} className="py-10 border-b border-stone-100 flex gap-8">
                                        <div className="w-24 h-32 md:w-40 md:h-52 bg-stone-100 flex-shrink-0">
                                            <img src={`http://127.0.0.1:8000/storage/${product?.rug?.rug_imges?.[0]?.main_rug_path}`} alt="Rug Thumbnail" className="w-full h-full object-cover" />
                                        </div>
                                        <div className="flex-grow flex flex-col justify-between">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <h3 className="text-lg font-medium text-stone-900 leading-tight">{product?.rug?.rug_title}</h3>
                                                    <p className="text-sm text-stone-500 mt-1 italic">Size: 4' x 6'</p>
                                                    <p className="text-sm text-stone-500 italic">Color: Crimson / Gold</p>
                                                </div>
                                                <span className="text-lg font-bold text-stone-900">${product?.rug?.rug_price}</span>
                                            </div>
                                            <div className="flex justify-between items-end mt-4">
                                                <div className="flex items-center border border-stone-200">
                                                    <button className="p-2 hover:bg-stone-50 transition-soft">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" x2="19" y1="12" y2="12"/></svg>
                                                    </button>
                                                    <span className="px-4 text-sm font-medium">{product?.cart_rug_quantity}</span>
                                                    <button className="p-2 hover:bg-stone-50 transition-soft">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" x2="12" y1="5" y2="19"/><line x1="5" x2="19" y1="12" y2="12"/></svg>
                                                    </button>
                                                </div>
                                                <button type="submit" onClick={ () => HandleDelete(product?.rug?.id)} className="text-xs uppercase tracking-widest text-stone-400 hover:text-stone-900 transition-soft underline">Remove</button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                </>
                            )
                            }

                            {/* <!-- Item 2 --> */}
                            {/* <div className="py-10 border-b border-stone-100 flex gap-8">
                                <div className="w-24 h-32 md:w-40 md:h-52 bg-stone-100 flex-shrink-0">
                                    <img src="https://images.unsplash.com/photo-1574730314821-33560e8ea321?auto=format&fit=crop&q=80&w=400" alt="Rug Thumbnail" className="w-full h-full object-cover grayscale" />
                                </div>
                                <div className="flex-grow flex flex-col justify-between">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="text-lg font-medium text-stone-900 leading-tight">Vintage Oushak Fragment</h3>
                                            <p className="text-sm text-stone-500 mt-1 italic">Size: 2' x 3'</p>
                                            <p className="text-sm text-stone-500 italic">Material: Highland Wool</p>
                                        </div>
                                        <span className="text-lg font-bold text-stone-900">$450.00</span>
                                    </div>
                                    <div className="flex justify-between items-end mt-4">
                                        <div className="flex items-center border border-stone-200">
                                            <button className="p-2">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" x2="19" y1="12" y2="12"/></svg>
                                            </button>
                                            <span className="px-4 text-sm font-medium">1</span>
                                            <button className="p-2">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" x2="12" y1="5" y2="19"/><line x1="5" x2="19" y1="12" y2="12"/></svg>
                                            </button>
                                        </div>
                                        <button className="text-xs uppercase tracking-widest text-stone-400 hover:text-stone-900 underline">Remove</button>
                                    </div>
                                </div>
                            </div> */}



                        </div>
                    </div>

                    {/* <!-- Summary Panel --> */}
                    <div className="lg:w-1/3">
                        <div className="bg-stone-50 p-8 sticky top-24">
                            <h2 className="text-xs font-bold uppercase tracking-widest border-b border-stone-200 pb-4 mb-6">Order Summary</h2>
                            <div className="space-y-4 text-sm mb-8 border-b border-stone-200 pb-8">
                                <div className="flex justify-between">
                                    <span className="text-stone-500">Subtotal</span>
                                    <span className="font-medium">${totalPriceRugs}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-stone-500">Shipping (Insured)</span>
                                    <span className="font-medium">${shippinRug}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-stone-500">Taxes</span>
                                    <span className="font-medium font-mono text-[10px] tracking-tight uppercase">Calculated at checkout</span>
                                </div>
                            </div>

                            <div className="flex justify-between text-lg font-bold mb-8">
                                <span>Total</span>
                                <span>${totalPrice}</span>
                            </div>
                            
                            <button onClick={() => {router.push('/checkout')}}  className="block w-full bg-stone-900 text-white text-center py-5 text-sm font-bold uppercase tracking-widest hover:opacity-90 transition-soft">
                                Proceed to Checkout
                            </button>
                            
                            <div className="mt-8">
                                <p className="text-[10px] uppercase tracking-widest text-stone-400 text-center leading-relaxed">
                                    Complimentary professional cleaning kit included with every order over $1,000
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    )
}