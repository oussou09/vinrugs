// components/PrivacyPolicy.js
export default function PrivacyPolicy() {
  return (
    <div className="max-w-4xl mx-auto py-16 md:py-24 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-16 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-[#7B542F] mb-4">Privacy Policy</h1>
        <p className="text-xs text-stone-400 uppercase tracking-widest">Last updated June 2026</p>
        <div className="w-16 h-0.5 bg-[#FF9D00] mx-auto mt-6"></div>
      </div>

      {/* Content */}
      <div className="space-y-12">
        
        {/* Introduction */}
        <div className="bg-white border border-stone-100 rounded-xl p-6 md:p-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-8 bg-[#7B542F] text-white rounded-full flex items-center justify-center text-xs font-bold">1</span>
            <h2 className="text-lg font-bold text-[#7B542F] uppercase tracking-widest">Introduction</h2>
          </div>
          <p className="text-sm text-stone-600 leading-relaxed pl-11">
            VintageRugs (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or make a purchase. By using our site, you agree to the terms outlined in this policy.
          </p>
        </div>

        {/* Information We Collect */}
        <div className="bg-white border border-stone-100 rounded-xl p-6 md:p-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-8 bg-[#7B542F] text-white rounded-full flex items-center justify-center text-xs font-bold">2</span>
            <h2 className="text-lg font-bold text-[#7B542F] uppercase tracking-widest">Information We Collect</h2>
          </div>
          <div className="space-y-4 pl-11">
            <div className="flex items-start gap-3 p-3 bg-stone-50 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#FF9D00] mt-0.5 flex-shrink-0"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/></svg>
              <div>
                <span className="font-semibold text-stone-900 text-sm">Personal Information</span>
                <p className="text-xs text-stone-500 mt-0.5">Name, email address, phone number, shipping/billing address when you place an order or create an account.</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-stone-50 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#FF9D00] mt-0.5 flex-shrink-0"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>
              <div>
                <span className="font-semibold text-stone-900 text-sm">Payment Information</span>
                <p className="text-xs text-stone-500 mt-0.5">Credit card details and billing information processed securely through our payment partners.</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-stone-50 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#FF9D00] mt-0.5 flex-shrink-0"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
              <div>
                <span className="font-semibold text-stone-900 text-sm">Browsing Data</span>
                <p className="text-xs text-stone-500 mt-0.5">IP address, browser type, pages visited, and time spent on site via cookies and analytics tools.</p>
              </div>
            </div>
          </div>
        </div>

        {/* How We Use Your Information */}
        <div className="bg-white border border-stone-100 rounded-xl p-6 md:p-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-8 bg-[#7B542F] text-white rounded-full flex items-center justify-center text-xs font-bold">3</span>
            <h2 className="text-lg font-bold text-[#7B542F] uppercase tracking-widest">How We Use Your Information</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pl-11">
            {[
              { icon: '📦', text: 'Process and fulfill your orders, including shipping and returns.' },
              { icon: '💬', text: 'Communicate with you about your orders, inquiries, and promotional offers.' },
              { icon: '🔧', text: 'Improve our website experience and customer service.' },
              { icon: '📧', text: 'Send marketing emails (you can opt out anytime).' },
              { icon: '🔒', text: 'Prevent fraud and ensure the security of our platform.' },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 p-3 bg-stone-50 rounded-lg">
                <span className="text-lg flex-shrink-0">{item.icon}</span>
                <p className="text-xs text-stone-600">{item.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Cookies */}
        <div className="bg-white border border-stone-100 rounded-xl p-6 md:p-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-8 bg-[#7B542F] text-white rounded-full flex items-center justify-center text-xs font-bold">4</span>
            <h2 className="text-lg font-bold text-[#7B542F] uppercase tracking-widest">Cookies & Tracking</h2>
          </div>
          <div className="pl-11 flex items-start gap-4 p-4 bg-amber-50 border border-amber-100 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#FF9D00] flex-shrink-0 mt-0.5"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>
            <p className="text-sm text-stone-600">
              We use cookies and similar tracking technologies to enhance your browsing experience, analyze site traffic, and personalize content. You can control cookie preferences through your browser settings.
            </p>
          </div>
        </div>

        {/* Data Sharing */}
        <div className="bg-white border border-stone-100 rounded-xl p-6 md:p-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-8 bg-[#7B542F] text-white rounded-full flex items-center justify-center text-xs font-bold">5</span>
            <h2 className="text-lg font-bold text-[#7B542F] uppercase tracking-widest">Data Sharing</h2>
          </div>
          <div className="pl-11 space-y-4">
            <div className="bg-red-50 border border-red-100 rounded-lg p-4 text-center">
              <p className="text-sm font-bold text-red-800 uppercase tracking-widest">We do not sell your personal information</p>
            </div>
            <p className="text-sm text-stone-600">We may share your data with:</p>
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 bg-stone-50 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#B6771D] mt-0.5 flex-shrink-0"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
                <div>
                  <span className="font-semibold text-stone-900 text-sm">Service Providers</span>
                  <p className="text-xs text-stone-500 mt-0.5">Payment processors (Stripe, PayPal), shipping carriers, and hosting platforms.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-stone-50 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#B6771D] mt-0.5 flex-shrink-0"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                <div>
                  <span className="font-semibold text-stone-900 text-sm">Legal Compliance</span>
                  <p className="text-xs text-stone-500 mt-0.5">When required by law or to protect our rights and property.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Your Rights */}
        <div className="bg-white border border-stone-100 rounded-xl p-6 md:p-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-8 bg-[#7B542F] text-white rounded-full flex items-center justify-center text-xs font-bold">6</span>
            <h2 className="text-lg font-bold text-[#7B542F] uppercase tracking-widest">Your Rights</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pl-11">
            {[
              { title: 'Access', desc: 'Request a copy of the personal data we hold about you.' },
              { title: 'Correction', desc: 'Update inaccurate or incomplete information.' },
              { title: 'Deletion', desc: 'Request deletion of your personal data, subject to legal obligations.' },
              { title: 'Opt-Out', desc: 'Unsubscribe from marketing communications at any time.' },
            ].map((right, i) => (
              <div key={i} className="flex items-start gap-3 p-3 bg-stone-50 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#FF9D00] mt-0.5 flex-shrink-0"><polyline points="20 6 9 17 4 12"/></svg>
                <div>
                  <span className="font-semibold text-stone-900 text-sm">{right.title}</span>
                  <p className="text-xs text-stone-500 mt-0.5">{right.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div className="bg-gradient-to-r from-[#7B542F] to-[#B6771D] rounded-xl p-6 md:p-8 text-black">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-xs font-bold">7</span>
            <h2 className="text-lg font-bold uppercase tracking-widest">Contact Us</h2>
          </div>
          <p className="text-sm text-white/80 mb-6">
            If you have questions about this Privacy Policy or wish to exercise your data rights:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-3 bg-white/10 rounded-lg p-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              <span className="text-sm">privacy@vintagerugs.com</span>
            </div>
            <div className="flex items-center gap-3 bg-white/10 rounded-lg p-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              <span className="text-sm">+1 (555) 123-4567</span>
            </div>
            <div className="flex items-center gap-3 bg-white/10 rounded-lg p-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
              <span className="text-sm">123 Vintage Street, NY 10001</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}