"use client";
import { apiClient } from "@/app/lib/api";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useAppUser } from "@/app/lib/AppContext";
import toast from 'react-hot-toast';



export default function Login(){

    const {register, handleSubmit, formState : {errors, isSubmitting}, reset} = useForm()
    const router = useRouter();
    const {checkUserLogin} = useAppUser()

    const Submits = async (data) => {
        try {
            const dataForm = new FormData();
            dataForm.append('email', data.email);
            dataForm.append('password', data.password);
            const resp = await apiClient.post('/user/loginuser' , dataForm)
            if(resp.status === 200 || resp.status === 201 ){
                reset()
                await checkUserLogin(resp.data.access_token)
                router.push('/rugs')
                toast.success('Login successfully');
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Something went wrong";
            toast.error(errorMessage);
            console.log("STATUS:", error.response?.status);
            console.log("DATA:", error.response?.data);
            console.log("FULL ERROR:", error);
        }
    }

    return(
        // <!-- Login Page -->
        <section className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-stone-50">
            <div className="max-w-md w-full bg-white p-12 shadow-2xl relative">
                {/* <!-- Floating Accent --> */}
                <div className="absolute -top-12 -right-12 w-24 h-24 bg-stone-900 flex items-center justify-center text-white hidden md:flex">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" x2="3" y1="12" y2="12"/></svg>
                </div>

                <div className="text-center mb-12">
                    <h1 className="serif text-4xl mb-3 italic">Welcome Back</h1>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-stone-400 font-bold">Access your artisan collection</p>
                </div>

                <form className="space-y-8" method="POST" onSubmit={handleSubmit(Submits)}>
                    <div className="border-b border-stone-200 pb-2 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-stone-300 mr-4"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                        <div className="flex-grow">
                            <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-1">Email Address</label>
                            <input
                            { ...register ("email",{ required: "email is required"})}
                            type="email" placeholder="weaver@heritage.com" className="w-full bg-transparent border-none p-0 focus:ring-0 text-stone-900 placeholder-stone-200 text-sm" />
                            {errors.email && <span className="text-red-500">{errors.email.message}</span>}
                        </div>
                    </div>

                    <div className="border-b border-stone-200 pb-2 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-stone-300 mr-4"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                        <div className="flex-grow">
                            <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-1">Password</label>
                            <input
                            { ...register ("password",{ required: "password is required"})}
                            type="password" placeholder="••••••••" className="w-full bg-transparent border-none p-0 focus:ring-0 text-stone-900 placeholder-stone-200 text-sm" />
                            {errors.password && <span className="text-red-500">{errors.password.message}</span>}
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <label className="flex items-center cursor-pointer">
                            <input type="checkbox" className="w-4 h-4 rounded border-stone-300 text-stone-900 focus:ring-stone-500" />
                            <span className="ml-2 text-xs text-stone-500">Remember Me</span>
                        </label>
                        <a href="/password_reset" className="text-xs text-stone-400 hover:text-stone-900 transition-soft">Forgotten Password?</a>
                    </div>

                    <button type="submit" className="w-full bg-stone-900 text-white py-5 text-xs font-bold uppercase tracking-widest hover:opacity-90 transition-soft">
                        {isSubmitting ? "Authenticating..." : "Authenticate"}
                    </button>

                    <div className="text-center pt-8 border-t border-stone-100">
                        <p className="text-xs text-stone-500">New to the Guild?</p>
                        <a href="/signup" className="mt-2 inline-block text-xs font-bold uppercase tracking-widest text-stone-900 underline hover:no-underline transition-soft">Create an Account</a>
                    </div>
                </form>
            </div>
        </section>

    )
}