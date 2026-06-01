// app/admin/security/page.js
"use client";
import Asideprofile from '@/app/(user_group)/asideprofile'
import { apiClient } from '@/app/lib/api';
import { useApp } from '@/app/lib/AppContext'
import Link from 'next/link'
import { useState } from 'react';
import { useForm } from 'react-hook-form';

export default function SecurityPage() {

  const {user, token, fetchUserData} = useApp()
  const [Showcard, setShowcard] = useState(false)

  console.log(user)

  const {register, handleSubmit, formState : {errors, isSubmitting}, reset} = useForm()

  const Onsubmits = async (data) => {
    const CardDataForm = new FormData();

    CardDataForm.append('card_number', data.card_number)
    CardDataForm.append('card_name', data.card_name)
    CardDataForm.append('expire_date', data.expire_date)

    // console.log(CardDataForm)
    console.log('data ',data)

    try {
      
      const resp = await apiClient.post('addcarduser', CardDataForm,
        {
          headers: {
                    Authorization: token,
                },
        }
      )
      if (resp.status === 200 || resp.status === 201) {
        alert('card added seccessfully')
        reset()
        await fetchUserData()
      }

    } catch (error) {
        const errorMessage = error.response?.data?.message || error.message;
        console.error('Connection Error:', errorMessage);
        console.log("STATUS:", error.response?.status);
        console.log("DATA:", error.response?.data);
        console.log("FULL ERROR:", error);
      }
  }

  return (
            <section className="py-12 md:py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row gap-16">

                    <Asideprofile />

                    {/* <!-- Main Content Area --> */}
                    {/* Main Content */}
                    <div className="flex-1 space-y-6">
                      <h1 className="text-2xl font-bold text-[#7B542F]">Account Security</h1>

                      {/* Personal Information */}
                      <details className="bg-white rounded-xl shadow border border-[#eddcc9] overflow-hidden group" open>
                        <summary className="p-4 cursor-pointer flex items-center justify-between hover:bg-[#fdf6ec] transition-colors list-none">
                          <div className="flex items-center gap-3">
                            <svg className="w-5 h-5 text-[#FF9D00] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            <h2 className="text-lg font-semibold text-[#7B542F]">Personal Information</h2>
                          </div>
                          <svg className="w-5 h-5 text-[#B6771D] transition-transform duration-200 group-open:rotate-180 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                          </svg>
                        </summary>
                        <div className="px-4 pb-4 border-t border-[#f0e4d3] pt-4">
                          <form className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <label className="block text-sm font-medium text-[#5a3e24] mb-1">First Name</label>
                                <input type="text" defaultValue={user?.first_name ?? ''} className="w-full px-4 py-2.5 border border-[#d4c4a8] rounded-lg focus:ring-2 focus:ring-[#FF9D00] focus:border-transparent outline-none" />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-[#5a3e24] mb-1">Last Name</label>
                                <input type="text" defaultValue={user?.last_name ?? ''} className="w-full px-4 py-2.5 border border-[#d4c4a8] rounded-lg focus:ring-2 focus:ring-[#FF9D00] focus:border-transparent outline-none" />
                              </div>
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-[#5a3e24] mb-1">Email Address</label>
                              <input type="email" defaultValue={user?.email ?? ''} className="w-full px-4 py-2.5 border border-[#d4c4a8] rounded-lg focus:ring-2 focus:ring-[#FF9D00] focus:border-transparent outline-none" />
                            </div>
                            <div className="flex justify-end">
                              <button type="submit" className="px-6 py-2.5 bg-[#FF9D00] text-white font-medium rounded-lg hover:bg-[#b8871a] transition-colors">Update Info</button>
                            </div>
                          </form>
                        </div>
                      </details>

                      {/* Change Password */}
                      <details className="bg-white rounded-xl shadow border border-[#eddcc9] overflow-hidden group">
                        <summary className="p-4 cursor-pointer flex items-center justify-between hover:bg-[#fdf6ec] transition-colors list-none">
                          <div className="flex items-center gap-3">
                            <svg className="w-5 h-5 text-[#FF9D00] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                            </svg>
                            <h2 className="text-lg font-semibold text-[#7B542F]">Change Password</h2>
                          </div>
                          <svg className="w-5 h-5 text-[#B6771D] transition-transform duration-200 group-open:rotate-180 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                          </svg>
                        </summary>
                        <div className="px-4 pb-4 border-t border-[#f0e4d3] pt-4">
                          <form className="space-y-4">
                            <div>
                              <label className="block text-sm font-medium text-[#5a3e24] mb-1">Current Password</label>
                              <input type="password" placeholder="Enter current password" className="w-full px-4 py-2.5 border border-[#d4c4a8] rounded-lg focus:ring-2 focus:ring-[#FF9D00] focus:border-transparent outline-none" />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-[#5a3e24] mb-1">New Password</label>
                              <input type="password" placeholder="Enter new password" className="w-full px-4 py-2.5 border border-[#d4c4a8] rounded-lg focus:ring-2 focus:ring-[#FF9D00] focus:border-transparent outline-none" />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-[#5a3e24] mb-1">Confirm New Password</label>
                              <input type="password" placeholder="Confirm new password" className="w-full px-4 py-2.5 border border-[#d4c4a8] rounded-lg focus:ring-2 focus:ring-[#FF9D00] focus:border-transparent outline-none" />
                            </div>
                            <div className="flex justify-end">
                              <button type="submit" className="px-6 py-2.5 bg-[#FF9D00] text-white font-medium rounded-lg hover:bg-[#b8871a] transition-colors">Change Password</button>
                            </div>
                          </form>
                        </div>
                      </details>

                      {/* Payment Cards */}
                      <details className="bg-white rounded-xl shadow border border-[#eddcc9] overflow-hidden group">
                        <summary className="p-4 cursor-pointer flex items-center justify-between hover:bg-[#fdf6ec] transition-colors list-none">
                          <div className="flex items-center gap-3">
                            <svg className="w-5 h-5 text-[#FF9D00] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                            </svg>
                            <h2 className="text-lg font-semibold text-[#7B542F]">Payment Cards</h2>
                          </div>
                          <svg className="w-5 h-5 text-[#B6771D] transition-transform duration-200 group-open:rotate-180 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                          </svg>
                        </summary>
                        <div className="px-4 pb-4 border-t border-[#f0e4d3] pt-4">
                          <div className="space-y-4">
                            {user?.ccusers?.map((cuser) => (
                            <div key={cuser.id} className="bg-gradient-to-r from-[#7B542F] to-[#B6771D] rounded-lg p-4 text-black">
                              <p className="text-sm opacity-80">VISA</p>
                              <p className="text-lg font-mono mt-2">•••• •••• •••• {cuser.card_number.slice(-4)}</p>
                              <div className="flex gap-4 mt-2 text-xs opacity-80">
                                <span>Exp: {cuser.expiration_date}</span>
                                <span>{cuser.full_name}</span>
                              </div>
                              <div className="flex gap-3 mt-5">
                                <a href="#" className="text-[#FFCF71] hover:text-[#FF9D00] text-sm font-medium transition-colors underline underline-offset-2">Edit</a>
                                <a href="#" className="text-[#FF0000] hover:text-red-400 text-sm font-medium transition-colors underline underline-offset-2">Remove</a>
                              </div>
                            </div>
                            ))}
                            
                            <div className={`${Showcard ? 'block' : 'hidden'} rounded-lg bg-gradient-to-r from-[#7B542F] to-[#B6771D] p-6 text-black`}>
                              <form className="space-y-4" method='POST' onSubmit={handleSubmit(Onsubmits)}>

                                {/* Card Number */}
                                <label className="flex flex-col">
                                  <span className="mb-2 text-sm font-semibold uppercase tracking-widest">Card Number</span>
                                  <input
                                    { ...register ("card_number",{ required: "card number is required"})}
                                    className="rounded-md border-2 border-[#FFCF71]/30 bg-white/10 py-3 px-4 text-black placeholder-white/50 outline-none focus:border-[#FFCF71] focus:bg-white/20 transition-colors tracking-widest"
                                    type="text"
                                    name="card_number"
                                    placeholder="0000 0000 0000 0000"
                                  />
                                    {errors.card_number && <span className="text-red-500">{errors.card_number.message}</span>}
                                </label>

                                {/* Expire Date & CVC same line */}
                                <div className="grid grid-cols-2 gap-4">

                                  {/* Full Name on Card */}
                                  <label className="flex flex-col">
                                    <span className="mb-2 text-sm font-semibold uppercase tracking-widest">Cardholder Name</span>
                                    <input
                                      { ...register ("card_name",{ required: "Cardholder Name is required"})}
                                      className="rounded-md border-2 border-[#FFCF71]/30 bg-white/10 py-3 px-4 text-black placeholder-white/50 outline-none focus:border-[#FFCF71] focus:bg-white/20 transition-colors"
                                      type="text"
                                      name="card_name"
                                      placeholder="Sarah Johnson"
                                    />
                                    {errors.card_name && <span className="text-red-500">{errors.card_name.message}</span>}
                                  </label>

                                  <label className="flex flex-col">
                                    <span className="mb-2 text-sm font-semibold uppercase tracking-widest">Expire Date</span>
                                    <input
                                      { ...register ("expire_date",{ required: "expire date is required"})}
                                      className="rounded-md border-2 border-[#FFCF71]/30 bg-white/10 py-3 px-4 text-black placeholder-white/50 outline-none focus:border-[#FFCF71] focus:bg-white/20 transition-colors"
                                      type="text"
                                      name="expire_date"
                                      placeholder="MM / YY"
                                    />
                                    {errors.expire_date && <span className="text-red-500">{errors.expire_date.message}</span>}
                                  </label>
                                </div>

                                {/* Save Button */}
                                <button
                                  type="submit"
                                  className="w-full py-3 bg-[#FF9D00] text-black font-bold uppercase tracking-widest rounded-md hover:bg-[#FFCF71] hover:text-[#7B542F] transition-colors mt-2"
                                >
                                  {isSubmitting ? "Saving Card ..." : "Save Card"}
                                </button>
                              </form>
                            </div>
                            <button onClick={() => setShowcard(!Showcard)}
                                    className="w-full py-3 border-2 border-dashed border-[#d4c4a8] rounded-lg text-[#B6771D] font-medium hover:bg-[#fdf6ec] hover:border-[#FF9D00] transition-colors">
                                      {Showcard ? '-' : '+'} Add New Card
                            </button>
                          </div>
                        </div>
                      </details>
                    </div>
                </div>
            </div>
        </section>
  )
}