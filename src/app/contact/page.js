"use client";
import React, { useState, useEffect } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    selectedPackage: 'Gold Wedding Package (3 Days) — ₹1,10,000/- (Recommended)',
    eventDate: '',
    location: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  const weddingPackages = [
    {
      id: 'standard',
      fullLabel: 'Standard Wedding Package (3 Days) — ₹60,000/- (Save ₹18,000)'
    },
    {
      id: 'silver',
      fullLabel: 'Silver Wedding Package (3 Days) — ₹80,000/- (Save ₹24,000)'
    },
    {
      id: 'gold',
      fullLabel: 'Gold Wedding Package (3 Days) — ₹1,10,000/- (Recommended)'
    },
    {
      id: 'luxury',
      fullLabel: 'Luxury Wedding Package (3 Days) — ₹1,50,000/- (VIP Experience)'
    }
  ];

  // URL parameter detector so clicking 'COMMISSION THIS SUITE' pre-selects the right one
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const pkgParam = params.get('pkg');
      if (pkgParam) {
        const match = weddingPackages.find(p => p.id === pkgParam.toLowerCase());
        if (match) {
          setFormData(prev => ({ ...prev, selectedPackage: match.fullLabel }));
        }
      }
    }
  }, []);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatusMessage('');

    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        setStatusMessage('Thank you. Our studio director will contact you promptly.');
        setFormData({
          name: '',
          mobile: '',
          email: '',
          selectedPackage: 'Gold Wedding Package (3 Days) — ₹1,10,000/- (Recommended)',
          eventDate: '',
          location: '',
          message: ''
        });
      } else {
        setStatusMessage('Your inquiry was noted. We will reach out shortly.');
      }
    } catch (err) {
      console.error(err);
      setStatusMessage('Your inquiry was noted. We will reach out shortly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0D0E] text-[#F5F5F5] font-sans antialiased pt-0 px-6 sm:px-12 selection:bg-[#D4AF37] selection:text-black">
      
      {/* Background Subtle Gold Aura */}
      <div className="fixed inset-0 pointer-events-none flex items-center justify-center">
        <div className="w-[600px] h-[600px] bg-[#D4AF37]/5 blur-[140px] rounded-full"></div>
      </div>

      <div className="relative w-full max-w-[1536px] mx-auto px-4 sm:px-8 lg:px-12 py-8 sm:py-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* LEFT COLUMN: Editorial Contact Information */}
        <div className="lg:col-span-5 space-y-10">
          <div>
            <span className="text-[11px] font-black uppercase tracking-[0.3em] text-[#D4AF37] block mb-2">
              CONNECT WITH US
            </span>
            <h1 className="text-4xl sm:text-5xl font-serif text-white tracking-tight leading-tight mb-4">
              Get in <span className="italic text-[#D4AF37]">touch</span>
            </h1>
            <p className="text-xs sm:text-sm text-[#D1C7A5] font-light leading-relaxed">
              We look forward to preserving your celebration. Reach out and our studio director will connect promptly to discuss your vision, dates, and requirements.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3 mt-6">
              {[
                { 
                  icon: <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>, 
                  href: "https://instagram.com/weddingpur", 
                  label: "Instagram" 
                },
                { 
                  icon: <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>, 
                  href: "https://youtube.com/@weddingpur", 
                  label: "YouTube" 
                },
                { 
                  icon: <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3.81l.39-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>, 
                  href: "https://www.facebook.com/people/LensLoom-Production/61586068716821/", 
                  label: "Facebook" 
                }
              ].map((item, idx) => (
                <a
                  key={idx}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.label}
                  className="w-10 h-10 rounded-full bg-[#121518] border border-[#2B2519] hover:border-[#D4AF37] hover:bg-[#D4AF37]/10 flex items-center justify-center text-[#C5B388] hover:text-[#D4AF37] transition-all duration-300 shadow-md"
                >
                  {item.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Studio Details Card */}
          <div className="bg-[#121518] border border-[#2B2519] rounded-3xl p-8 shadow-2xl space-y-6">
            <h3 className="text-lg font-serif italic text-white tracking-wide border-b border-[#2B2519] pb-4">
              Our Studio
            </h3>

            <div className="space-y-5 text-xs text-[#D1C7A5]">
              {/* Address */}
              <div className="flex items-start gap-4">
                <span className="text-[#D4AF37] shrink-0 mt-0.5">
                  <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                </span>
                <div>
                  <span className="block font-semibold text-white">Main Studio & Office</span>
                  <p className="text-[#A89D84] mt-0.5 leading-relaxed">
                    2nd Floor, Gopal Market, Bhikhna Pahari More, Makhania Kuan, Patna, Bihar – 800004
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-center gap-4">
                <span className="text-[#D4AF37] shrink-0">
                  <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                </span>
                <div>
                  <span className="block font-semibold text-white">Direct Line</span>
                  <a href="tel:+917209886900" className="text-[#C5B388] hover:text-[#D4AF37] transition-colors">
                    +91 7209886900
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center gap-4">
                <span className="text-[#D4AF37] shrink-0">
                  <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                </span>
                <div>
                  <span className="block font-semibold text-white">Concierge & Bookings</span>
                  <a href="mailto:lensloomofficial@gmail.com" className="text-[#C5B388] hover:text-[#D4AF37] transition-colors">
                    lensloomofficial@gmail.com
                  </a>
                </div>
              </div>

              {/* Website */}
              <div className="flex items-center gap-4">
                <span className="text-[#D4AF37] shrink-0">
                  <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
                </span>
                <div>
                  <span className="block font-semibold text-white">Website</span>
                  <a href="https://www.lensloom.in" target="_blank" rel="noopener noreferrer" className="text-[#C5B388] hover:text-[#D4AF37] transition-colors">
                    www.lensloom.in
                  </a>
                </div>
              </div>
            </div>

            {/* Studio Badge / Mini Map Card */}
            <div className="w-full bg-[#0E1012] border border-[#2B2519] rounded-2xl p-4 text-center">
              <span className="text-[10px] font-black uppercase tracking-[0.25em] text-[#D4AF37] block mb-1">
                PATNA HQ • AVAILABLE PAN-INDIA
              </span>
              <p className="text-[11px] text-[#8A7D5C]">
                Available worldwide for destination weddings and signature cinematic shoots.
              </p>
            </div>
            
            {/* Embedded Google Map */}
            <div className="w-full mt-4 rounded-2xl overflow-hidden border border-[#2B2519]">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3597.558230788649!2d85.1438258!3d25.6195744!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ed585ce0923f65%3A0xc3cf3fbd1cfa068e!2sGopal%20Market%2C%20Bhikhna%20Pahari%20More%2C%20Makhania%20Kuan%2C%20Patna%2C%20Bihar%20800004!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
                width="100%" 
                height="200" 
                style={{ border: 0, filter: "invert(90%) hue-rotate(180deg)" }} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Studio Location"
              ></iframe>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Inquiry Form Container */}
        <div className="lg:col-span-7 bg-[#121518] border border-[#2B2519] rounded-3xl p-8 sm:p-10 shadow-2xl">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-serif italic text-white tracking-tight">
              Submit your queries
            </h2>
            <p className="text-xs text-[#8A7D5C] mt-1">
              Please provide your event dates and preferred requirements
            </p>
          </div>

          {statusMessage && (
            <div className="mb-6 p-4 rounded-xl bg-[#1A1812] border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-semibold text-center">
              {statusMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name & Mobile */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] font-black text-[#D4AF37] mb-1.5">
                  NAME *
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Arjun & Maya"
                  className="w-full bg-[#181B1F] border border-[#2B2519] text-white rounded-xl px-4 py-3 text-xs font-medium placeholder-[#554C34] focus:outline-none focus:border-[#D4AF37] transition-all"
                />
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] font-black text-[#D4AF37] mb-1.5">
                  MOBILE *
                </label>
                <input
                  type="tel"
                  name="mobile"
                  required
                  value={formData.mobile}
                  onChange={handleChange}
                  placeholder="+91 98765 43210"
                  className="w-full bg-[#181B1F] border border-[#2B2519] text-white rounded-xl px-4 py-3 text-xs font-medium placeholder-[#554C34] focus:outline-none focus:border-[#D4AF37] transition-all"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-[10px] uppercase tracking-[0.2em] font-black text-[#D4AF37] mb-1.5">
                EMAIL ADDRESS *
              </label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="hello@couple.com"
                className="w-full bg-[#181B1F] border border-[#2B2519] text-white rounded-xl px-4 py-3 text-xs font-medium placeholder-[#554C34] focus:outline-none focus:border-[#D4AF37] transition-all"
              />
            </div>

            {/* Combined Package Selector */}
            <div>
              <label className="block text-[10px] uppercase tracking-[0.2em] font-black text-[#D4AF37] mb-1.5">
                SELECT WEDDING PACKAGE & INVESTMENT *
              </label>
              <select
                name="selectedPackage"
                required
                value={formData.selectedPackage}
                onChange={handleChange}
                className="w-full bg-[#181B1F] border border-[#2B2519] text-[#F5F5F5] rounded-xl px-4 py-3 text-xs font-medium focus:outline-none focus:border-[#D4AF37] transition-all cursor-pointer appearance-none"
              >
                {weddingPackages.map(pkg => (
                  <option key={pkg.id} value={pkg.fullLabel}>{pkg.fullLabel}</option>
                ))}
              </select>
            </div>

            {/* Date & Location Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] font-black text-[#D4AF37] mb-1.5">
                  EVENT DATE
                </label>
                <input type="date" name="eventDate" required value={formData.eventDate} onChange={handleChange} className="w-full bg-[#181B1F] border border-[#2B2519] text-white rounded-xl px-4 py-3 text-xs font-medium focus:outline-none focus:border-[#D4AF37] transition-all" />
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] font-black text-[#D4AF37] mb-1.5">
                  LOCATION
                </label>
                <input type="text" name="location" required value={formData.location} onChange={handleChange} placeholder="City or Venue" className="w-full bg-[#181B1F] border border-[#2B2519] text-white rounded-xl px-4 py-3 text-xs font-medium placeholder-[#554C34] focus:outline-none focus:border-[#D4AF37] transition-all" />
              </div>
            </div>

            {/* Message */}
            <div>
              <label className="block text-[10px] uppercase tracking-[0.2em] font-black text-[#D4AF37] mb-1.5">
                MESSAGE (OPTIONAL)
              </label>
              <textarea name="message" value={formData.message} onChange={handleChange} rows="3" placeholder="Tell us more about your events..." className="w-full bg-[#181B1F] border border-[#2B2519] text-white rounded-xl px-4 py-3 text-xs font-medium placeholder-[#554C34] focus:outline-none focus:border-[#D4AF37] transition-all"></textarea>
            </div>

            <button type="submit" disabled={isSubmitting} className="w-full py-4 rounded-full text-[11px] font-medium mt-6 focus:outline-none bg-gradient-to-r from-[#D4AF37] via-[#E5C158] to-[#B89018] hover:from-[#F3E5AB] hover:to-[#D4AF37] text-black font-black uppercase tracking-[0.2em] shadow-lg shadow-[#D4AF37]/20 hover:shadow-[0_0_25px_rgba(212,175,55,0.45)] active:scale-[0.98] transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">
              {isSubmitting ? 'Submitting...' : 'Submit Inquiry'}
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}