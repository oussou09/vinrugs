"use client";

import { apiClient } from "@/app/lib/api";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form"


export default function Signup(){

    const {register, handleSubmit, formState : {errors, isSubmitting}, reset} = useForm();

    const [passwordIn, setPasswordIn] = useState("")
    const [confpassword, setConfpassword] = useState("")
    const [accAgr, setAccAgr] = useState(false)
    const router = useRouter()

    const onSubmits = async (data) => {

        try {
            const dataForm = new FormData();
            dataForm.append('first_name', data.firstName)
            dataForm.append('last_name', data.lastName)
            dataForm.append('email', data.email)
            dataForm.append('password', data.password)
            dataForm.append('confirm_password', data.confirmPassword)

            const resp = await apiClient.post('/storeuser', dataForm)
            if(resp.status === 200 || resp.status === 201 ){
                alert("Your account created successfully!");
                console.log("SUCCESS:", resp.data);
                reset()
                router.push('/login')
            }
            
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message;
            console.error('Connection Error:', errorMessage);
            console.log("STATUS:", error.response?.status);
            console.log("DATA:", error.response?.data);
            console.log("FULL ERROR:", error);
        }
    }

    console.log(accAgr)


    return(
        // <!-- Signup Page -->
        <section className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-stone-50">
            <div className="max-w-2xl w-full bg-white flex flex-col md:flex-row shadow-2xl overflow-hidden">
                {/* <!-- Sidebar Image --> */}
                <div className="md:w-2/5 relative bg-stone-900 hidden md:block">
                    <img src="http://127.0.0.1:8000/storage/AuthForm.jpg" className="w-full h-full object-cover opacity-50 grayscale" />
                    <div className="absolute inset-0 flex flex-col justify-end p-8 text-white">
                        <h2 className="serif text-3xl mb-4 italic">Join the Registry</h2>
                        <p className="text-xs font-light tracking-wide text-stone-300">Unlock private collections, early weaver notifications, and lifetime care services.</p>
                    </div>
                </div>

                {/* <!-- Form Area --> */}
                <div className="md:w-3/5 p-12">
                    <div className="mb-10">
                        <h1 className="serif text-4xl mb-2">Create Account</h1>
                        <p className="text-[10px] uppercase tracking-widest text-stone-400 font-bold">Register your interest</p>
                    </div>

                    <form className="space-y-6" method="POST" onSubmit={handleSubmit(onSubmits)}>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="border-b border-stone-200 pb-2">
                                <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-1">First Name</label>
                                <input
                                    { ...register ("firstName",{ required: "first_name is required"})}
                                    type="text" name="firstName" className="w-full bg-transparent border-none p-0 focus:ring-0 text-sm" />
                                    {errors.firstName && <span className="text-red-500">{errors.firstName.message}</span>}
                            </div>
                            <div className="border-b border-stone-200 pb-2">
                                <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-1">Last Name</label>
                                <input
                                    { ...register ("lastName")}
                                    type="text" name="lastName" className="w-full bg-transparent border-none p-0 focus:ring-0 text-sm" />
                            </div>
                        </div>
                        <div className="border-b border-stone-200 pb-2">
                            <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-1">Email Address</label>
                            <input
                                { ...register ("email",{ required: "email is required"})}
                                type="email" name="email" className="w-full bg-transparent border-none p-0 focus:ring-0 text-sm" />
                                {errors.email && <span className="text-red-500">{errors.email.message}</span>}
                        </div>
                        <div className="border-b border-stone-200 pb-2">
                            <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-1">Password</label>
                            <input
                                  { ...register ("password",{ required: "password Name is required"})}
                                  type="password" onKeyUp={(e) => setPasswordIn(e.target.value)} name="password" className="w-full bg-transparent border-none p-0 focus:ring-0 text-sm" />
                                   {errors.password && <span className="text-red-500">{errors.password.message}</span>}
                        </div>
                        <div className="border-b border-stone-200 pb-2">
                            <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-1">Confirm Password</label>
                            <input
                                { ...register ("confirmPassword",{ required: "confirmtion password is required"})}
                                type="password" onKeyUp={(e) => setConfpassword(e.target.value)} name="confirmPassword" className="w-full bg-transparent border-none p-0 focus:ring-0 text-sm" />
                                {errors.confirmPassword && <span className="text-red-500">{errors.confirmPassword.message}</span>}
                        </div>
                        { confpassword && passwordIn !== confpassword && (
                            <div className="bg-orange-100 border-l-4 mt-2 border-orange-500 text-orange-700 p-4" role="alert">
                                <p className="font-bold">Be Warned</p>
                                <p>Something not ideal might be happening.</p>
                            </div>
                        )}
                        
                        <div className="flex items-start space-x-3 mb-8">
                            <input type="checkbox" checked={accAgr} onChange={ () => setAccAgr(!accAgr)} className="mt-1 w-4 h-4 rounded border-stone-300 text-stone-900 focus:ring-stone-500" />
                            <p className="text-[10px] text-stone-500 leading-relaxed uppercase tracking-widest">I agree to the <a href="/privacypolicy" className="underline">Terms of Service</a> and allow Rug Artisan to preserve my preferences.</p>
                        
                        </div>

                        <button type="submit" disabled={accAgr == false}
                        className={`w-full bg-stone-900 text-white py-5 text-xs font-bold uppercase tracking-widest ${
                            accAgr
                            ? "cursor-pointer hover:opacity-90 transition-soft"
                            : "bg-gray-400 cursor-not-allowed opacity-60 "
                        }`}>
                            {isSubmitting ? "Setup Your Acc ..." : "Create Account"}
                        </button>

                        <p className="text-center pt-8 text-xs text-stone-500">
                            Already registered? <a href="/login" className="text-stone-900 font-bold uppercase tracking-widest ml-2 underline">Sign In</a>
                        </p>
                    </form>
                </div>
            </div>
        </section>

    )
}