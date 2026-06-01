








export default function Password_reset(){
    return(
        // <!-- Password Reset Page -->
        <section className="min-h-[80vh] flex items-center justify-center p-4 bg-stone-50">
            <div className="max-w-md w-full bg-white p-12 text-center shadow-lg">
                <div className="mb-8 p-4 bg-stone-50 inline-block rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" className="text-stone-400"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/><circle cx="12" cy="16" r="1"/></svg>
                </div>
                <h1 className="serif text-4xl mb-4 italic italic">Lost your key?</h1>
                <p className="text-sm text-stone-500 mb-10 leading-relaxed">Enter your email address and we will dispatch a secure link to restore your access.</p>
                
                <form className="space-y-8">
                    <div className="border-b border-stone-900/10 pb-2">
                        <input type="email" placeholder="weaver@heritage.com" className="w-full bg-transparent border-none p-0 focus:ring-0 text-center text-sm italic" />
                    </div>
                    
                    <button className="w-full bg-stone-900 text-white py-5 text-xs font-bold uppercase tracking-widest transition-soft">Dispatch Reset Link</button>
                    
                    <a href="/login" className="inline-block text-[10px] font-bold uppercase tracking-widest text-stone-400 hover:text-stone-900 mt-6">Return to Authentication</a>
                </form>
            </div>
        </section>

    )
}