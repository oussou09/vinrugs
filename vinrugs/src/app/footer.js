"use client";
import { useForm } from "react-hook-form"
import { apiClient } from "./lib/api";
import toast from 'react-hot-toast';



export default function Footer(){

    const {register, handleSubmit, formState : {errors, isSubmitting}, reset} = useForm();
    const dataForm = new FormData();

    const onSubmits = async (data) => {
        dataForm.append('email', data.email)

        try {
            const resp = await apiClient.post('/user/mailnewsletter', dataForm)
            
            if(resp.status === 200 || resp.status === 201 ){
                // console.log("SUCCESS:", resp.data);
                toast.success(resp?.data?.message);
                reset()
            }
        } catch (error) {
            toast.error(error,'Something went wrong');
        }
        
    }

    return (
        <footer className="bg-stone-900 text-stone-300 pt-12 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-6">
                    {/* <!-- Brand & Info --> */}
                    <div className="col-span-1 md:col-span-1">
                        <h2 className="serif text-2xl text-white mb-6">Rug Artisan</h2>
                        <p className="text-sm leading-relaxed opacity-70">
                            Preserving the ancient art of rug weaving while bringing timeless elegance to the modern home. 
                        </p>
                    </div>

                    {/* <!-- Shop --> */}
                    <div>
                        <h3 className="text-xs font-bold uppercase tracking-widest text-white mb-6">Shop</h3>
                        <ul className="space-y-4 text-sm">
                            <li><a href="/rugs" className="hover:text-white transition-soft">All Rugs</a></li>
                            <li><a href="#" className="hover:text-white transition-soft">Persian Collection</a></li>
                            <li><a href="#" className="hover:text-white transition-soft">Modern Minimalist</a></li>
                        </ul>
                    </div>

                    {/* <!-- Support --> */}
                    <div>
                        <h3 className="text-xs font-bold uppercase tracking-widest text-white mb-6">Support</h3>
                        <ul className="space-y-4 text-sm">
                            <li><a href="#" className="hover:text-white transition-soft">Shipping & Returns</a></li>
                            <li><a href="#" className="hover:text-white transition-soft">Care Guide</a></li>
                            <li><a href="/privacypolicy" className="hover:text-white transition-soft">Privacy Policy</a></li>
                        </ul>
                    </div>

                    {/* <!-- Newsletter --> */}
                    <div>
                        <h3 className="text-xs font-bold uppercase tracking-widest text-white mb-6">Provenance</h3>
                        <p className="text-sm mb-4 opacity-70">Join our newsletter for exclusive collections and weaving stories.</p>
                        <form method="POST" onSubmit={handleSubmit(onSubmits)} className="flex border-b border-stone-700 pb-2">
                            <input
                                {...register("email", {
                                    required: "Email address is required",
                                    pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: "Please enter a valid email address",
                                    },
                                    onChange: (e) => {
                                    // Instantly strips out accidental spaces while typing
                                    e.target.value = e.target.value.trim().replace(/\s/g, "");
                                    },
                                })}
                                type="email" placeholder="Email Address" className="bg-transparent border-none focus:ring-0 text-sm w-full py-1" />
                                <button type="submit" className="text-white hover:opacity-70 transition-soft">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                                </button>
                        </form>
                    </div>
                </div>

                <div className="mt-10 pt-8 border-t border-stone-800 flex flex-col md:flex-row justify-between items-center text-xs opacity-50">
                    <p>&copy; 2026 Rug Artisan. All rights reserved.</p>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        <a href="#" className="hover:text-white">Instagram</a>
                        <a href="#" className="hover:text-white">Pinterest</a>
                        <a href="#" className="hover:text-white">Journal</a>
                    </div>
                </div>
            </div>
        </footer>

    )
}