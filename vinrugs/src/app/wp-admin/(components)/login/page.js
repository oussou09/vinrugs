"use client";
import { apiClient } from "@/app/lib/api";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form"
import toast from "react-hot-toast";
import { useAppAdmin } from "../../AdminLib/AppContextAdmin";
import ConfettiBackground from "./ConfettiBackground";

// app/admin/login/page.js
export default function AdminLogin() {

  const {register, handleSubmit, formState : {errors, isSubmitting}, reset} = useForm();
  const router = useRouter();

  const {CheckAdminLogin} = useAppAdmin()


  const HandleLogin = async (data) => {
    console.log('data form: ', data)
    const dataForm = new FormData();
    dataForm.append('email', data.email);
    dataForm.append('password', data.password);
    try {

      const resp = await apiClient.post('/admin/loginadmin' , dataForm);
      if (resp.status === 200) {
        reset();
        // console.log(resp.data.token)
        await CheckAdminLogin(resp.data.token, resp.data.admin);
        router.push('/wp-admin/dashboard');
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


  return (
    <div className="relative overflow-hidden">
    <ConfettiBackground />
      <div className="relative z-10">

        <div className="flex items-center justify-center from-[#fdf6ec] to-[#f5e6d3] px-4">
          <div className="w-full max-w-md">
            
            {/* Logo & Title */}
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-[#7B542F] rounded-full flex items-center justify-center text-white serif text-2xl italic mx-auto mb-4">
                VR
              </div>
              <h1 className="text-3xl font-bold text-[#7B542F]">VintageRugs</h1>
              <p className="text-[#B6771D] text-sm mt-1 uppercase tracking-widest font-medium">Admin Panel</p>
            </div>

            {/* Login Form */}
            <div className="bg-white rounded-2xl shadow-xl border border-[#eddcc9] p-8">
              <form onSubmit={handleSubmit(HandleLogin)} className="space-y-5" method="POST">
                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-xs font-bold uppercase tracking-widest text-[#5a3e24] mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-3 top-1/2 -translate-y-1/2 text-[#B6771D]">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                      <polyline points="22,6 12,13 2,6"/>
                    </svg>
                    <input
                      { ...register ("email",{ required: "Email is required"})}
                      name="email"
                      type="email"
                      id="email"
                      className="w-full pl-11 pr-4 py-3 border border-[#d4c4a8] rounded-lg text-sm focus:ring-2 focus:ring-[#FF9D00] placeholder-stone-400"
                      placeholder="admin@vintagerugs.com"
                    />
                    {errors.email && <span className="text-red-500">{errors.email.message}</span>}
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label htmlFor="password" className="block text-xs font-bold uppercase tracking-widest text-[#5a3e24] mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-3 top-1/2 -translate-y-1/2 text-[#B6771D]">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                      <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                    </svg>
                    <input
                      { ...register ("password",{ required: "password is required"})}
                      name="password"
                      type="password"
                      id="password"
                      className="w-full pl-11 pr-4 py-3 border border-[#d4c4a8] rounded-lg text-sm focus:ring-2 focus:ring-[#FF9D00] placeholder-stone-400"
                      placeholder="••••••••"
                    />
                    {errors.password && <span className="text-red-500">{errors.password.message}</span>}
                  </div>
                </div>

                {/* Remember & Forgot */}
                <div className="flex items-center justify-between text-xs">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="rounded border-[#d4c4a8] text-[#FF9D00] focus:ring-[#FF9D00]" />
                    <span className="text-stone-500">Remember me</span>
                  </label>
                  <a href="#" className="text-[#B6771D] hover:text-[#FF9D00] font-medium transition-colors">
                    Forgot password?
                  </a>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="w-full py-3 bg-[#FF9D00] text-white font-bold uppercase tracking-widest text-sm rounded-lg hover:bg-[#b8871a] transition-colors shadow-sm"
                >
                  {isSubmitting ? 'Signing In...' : 'Sign In'}
                </button>
              </form>

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-[#eddcc9]"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-3 text-stone-400 tracking-widest">or</span>
                </div>
              </div>

              {/* Back to site */}
              <a
                href="/"
                className="block text-center text-xs text-stone-400 hover:text-[#7B542F] transition-colors uppercase tracking-widest"
              >
                ← Back to VintageRugs
              </a>
            </div>

            {/* Footer */}
            <p className="text-center text-[10px] text-stone-400 mt-6 uppercase tracking-widest">
              © 2026 VintageRugs. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}