"use client";
import {apiClient} from "@/app/lib/api";
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

export default function Contact(){

    const {register, handleSubmit, formState : {errors, isSubmitting}, reset} = useForm();


    const onSubmit = async (data) => {

        console.log(data);
        try {
            const dataForm = new FormData();
            dataForm.append('full_name', data.name)
            dataForm.append('email', data.email)
            dataForm.append('type_problem', parseInt(data.subject))
            dataForm.append('problem_description', data.message)

            const resp = await apiClient.post('/contactus', dataForm);
            if (resp.status === 201 || resp.status ===200) {
                reset()
                toast.success(`Mr.${data.name} Your message send successfully, we will contact you`);
            }
            
        } catch (err) {
                toast.error(err.response?.data?.message || err.message || 'Something went wrong');
                console.error('Full error:', err.response?.data);
                console.error('Status:', err.response?.status);
                console.error('Message:', err.message);
        }
    }

    return (
    <section className="py-12 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                <div>
                    <span className="text-xs font-bold uppercase tracking-widest text-stone-400 mb-4 block">Get in Touch</span>
                    <h1 className="serif text-5xl md:text-6xl mb-12">Visit the Gallery or Send a Word</h1>
                    
                    <div className="space-y-10 mb-16">
                        <div className="flex items-start">
                            <div className="w-10 h-10 border border-stone-200 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                            </div>
                            <div className="ml-6">
                                <h4 className="text-xs font-bold uppercase tracking-widest mb-2">Gallery Location</h4>
                                <p className="text-lg text-stone-600 font-light italic">812 Weaving Way, Heritage District<br />Old City, OC 90210</p>
                            </div>
                        </div>
                        <div className="flex items-start">
                            <div className="w-10 h-10 border border-stone-200 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                            </div>
                            <div className="ml-6">
                                <h4 className="text-xs font-bold uppercase tracking-widest mb-2">Correspondence</h4>
                                <p className="text-lg text-stone-600 font-light italic">hello@rugartisan.com<br />+1 (555) ARTISAN</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex space-x-6">
                        <a href="#" className="text-stone-400 hover:text-stone-900 transition-soft">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
                        </a>
                        <a href="#" className="text-stone-400 hover:text-stone-900 transition-soft">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                        </a>
                    </div>
                </div>

                <div className="bg-stone-50 p-12 lg:p-16">
                    <form className="space-y-8" method="POST" onSubmit={handleSubmit(onSubmit)}>
                        <div className="border-b border-stone-200 pb-2">
                            <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-2">Name</label>
                            <input
                                {...register("name", { required: "Name is required" })}
                                type="text" name="name" placeholder="Johnathan Doe" className="w-full bg-transparent border-none p-0 focus:ring-0 text-stone-900 placeholder-stone-200 text-lg italic serif" />
                                {errors.name && <span className="text-red-500">{errors.name.message}</span>}
                        </div>
                        <div className="border-b border-stone-200 pb-2">
                            <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-2">Email</label>
                            <input
                                {...register("email", { required: "Email is required" })}
                                type="email" name="email" placeholder="email@email.com" className="w-full bg-transparent border-none p-0 focus:ring-0 text-stone-900 placeholder-stone-200 text-lg italic serif" />
                                {errors.email && <span className="text-red-500">{errors.email.message}</span>}
                        </div>
                        <div className="border-b border-stone-200 pb-2">
                            <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-2">Subject of Inquiry</label>
                            <select
                                {...register("subject", { required: "Subject is required" })}
                                name="subject" className="w-full bg-transparent border-none p-0 focus:ring-0 text-stone-900 text-lg italic serif cursor-pointer">
                                <option defaultChecked value="1">Private Viewing</option>
                                <option value="2">Custom Commission</option>
                                <option value="3">Order Status</option>
                                <option value="4">Trade Program</option>
                            </select>
                            {errors.subject && <span className="text-red-500">{errors.subject.message}</span>}
                        </div>
                        <div className="border-b border-stone-200 pb-2">
                            <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-2">Your Narrative</label>
                            <textarea
                                {...register("message", { required: "Message is required" })}
                                rows="4" name="message" placeholder="How can we assist you today?" className="w-full bg-transparent border-none p-0 focus:ring-0 text-stone-900 placeholder-stone-200 text-lg italic serif resize-none"></textarea>
                                {errors.message && <span className="text-red-500">{errors.message.message}</span>}
                        </div>
                        <button
                            disabled={isSubmitting}
                            className="w-full bg-stone-900 text-white py-6 text-xs font-bold uppercase tracking-widest transition-soft hover:opacity-90">
                            {isSubmitting ? "Sending..." : "Transmit Message"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </section>
    )
}