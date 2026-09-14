'use client';

import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

export default function LeadPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', address: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const hasSeenPopup = sessionStorage.getItem('hasSeenLeadPopup');
    if (!hasSeenPopup) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 4000); // 4 seconds delay
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem('hasSeenLeadPopup', 'true');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) {
        setIsSuccess(true);
        sessionStorage.setItem('hasSeenLeadPopup', 'true');
        setTimeout(() => {
          setIsOpen(false);
        }, 3000);
      } else {
        alert(data.error || 'Failed to submit. Please try again.');
      }
    } catch (err) {
      console.error(err);
      alert('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-500">
      <div className="bg-[#0B0D0E] border border-[#2B2519] rounded-2xl w-full max-w-md shadow-[0_20px_60px_rgba(212,175,55,0.1)] overflow-hidden relative transform transition-all">
        {/* Header Image or Pattern */}
        <div className="h-24 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#D4AF37]/20 via-[#0B0D0E] to-[#0B0D0E] flex items-center justify-center border-b border-[#2B2519]">
          <h2 className="text-xl font-serif text-[#D4AF37] tracking-widest uppercase">LensLoom Production</h2>
        </div>
        
        {/* Close Button */}
        <button 
          onClick={handleClose}
          className="absolute top-4 right-4 text-[#8A7D5C] hover:text-[#D4AF37] transition-colors focus:outline-none"
        >
          <X size={24} />
        </button>

        <div className="p-8 pt-6">
          {isSuccess ? (
            <div className="text-center py-10">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#181B20] border border-[#D4AF37]/30 mb-6">
                <svg className="w-8 h-8 text-[#D4AF37]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-serif text-white mb-2">Thank You!</h3>
              <p className="text-sm text-[#8A7D5C]">We have received your details and will get back to you shortly.</p>
            </div>
          ) : (
            <>
              <div className="text-center mb-6">
                <h3 className="text-2xl font-serif text-white mb-2 tracking-wide">Capture Your Moments</h3>
                <p className="text-xs text-[#8A7D5C] uppercase tracking-wider">Leave your details for exclusive luxury packages</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-[#181B20] border border-[#2B2519] rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#D4AF37] placeholder-[#8A7D5C]/50 transition-colors"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-[#181B20] border border-[#2B2519] rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#D4AF37] placeholder-[#8A7D5C]/50 transition-colors"
                  />
                </div>
                <div>
                  <input
                    type="tel"
                    name="phone"
                    required
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full bg-[#181B20] border border-[#2B2519] rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#D4AF37] placeholder-[#8A7D5C]/50 transition-colors"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    name="address"
                    placeholder="City / Address (Optional)"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full bg-[#181B20] border border-[#2B2519] rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#D4AF37] placeholder-[#8A7D5C]/50 transition-colors"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-[#D4AF37] to-[#B89018] text-black hover:from-[#F3E5AB] hover:to-[#D4AF37] shadow-lg shadow-[#D4AF37]/10 px-6 py-4 rounded-xl text-xs tracking-[0.2em] uppercase font-bold transition-all duration-300 mt-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Submitting...' : 'Inquire Now'}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
