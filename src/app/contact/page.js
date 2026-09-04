'use client';

import React, { useState } from 'react';
import { MapPin, Phone, Mail, CheckCircle2 } from 'lucide-react';

export default function ContactPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    service: '',
    date: '',
    location: '',
    budget: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate API call
    setTimeout(() => {
      setIsSubmitted(true);
    }, 800);
  };

  return (
    <main className="min-h-screen bg-[#212639] text-[#EDEAE4] pt-28 font-sans selection:bg-[#B38F4D] selection:text-white pb-20">
      <div className="max-w-7xl mx-auto px-4 py-12 lg:py-16">
        
        <div className="flex flex-col lg:flex-row gap-12 xl:gap-20">
          
          {/* Left Side: Studio Info & Map */}
          <div className="w-full lg:w-5/12 space-y-8 flex flex-col">
            <div>
              <h1 className="text-4xl md:text-5xl font-serif font-normal text-[#EDEAE4] mb-6">
                Get in touch!
              </h1>
              <p className="text-[#A39E93] text-lg leading-relaxed mb-8">
                We can't wait to hear from you! We respond to inquiries ASAP always, but if it's a weekend just know that we might be at a photography event when you contact us.
              </p>
              
              {/* Social Media Icons */}
              <div className="flex items-center gap-4 mb-10">
                <a href="#" className="w-12 h-12 rounded-full bg-[#2B324B] border border-white/15 flex items-center justify-center text-[#B38F4D] hover:bg-[#B38F4D] hover:text-white transition-all shadow-sm">
                  <span className="font-serif font-normal text-lg">Y</span>
                </a>
                <a href="#" className="w-12 h-12 rounded-full bg-[#2B324B] border border-white/15 flex items-center justify-center text-[#B38F4D] hover:bg-[#B38F4D] hover:text-white transition-all shadow-sm">
                  <span className="font-serif font-normal text-lg">P</span>
                </a>
                <a href="#" className="w-12 h-12 rounded-full bg-[#2B324B] border border-white/15 flex items-center justify-center text-[#B38F4D] hover:bg-[#B38F4D] hover:text-white transition-all shadow-sm">
                  <span className="font-serif font-normal text-lg">F</span>
                </a>
                <a href="#" className="w-12 h-12 rounded-full bg-[#2B324B] border border-white/15 flex items-center justify-center text-[#B38F4D] hover:bg-[#B38F4D] hover:text-white transition-all shadow-sm">
                  <span className="font-serif font-normal text-lg">I</span>
                </a>
              </div>
            </div>

            <div className="bg-[#2B324B] border border-white/15 rounded-2xl p-8 shadow-sm relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#B38F4D]/5 rounded-bl-full -z-10 group-hover:scale-110 transition-transform"></div>
              <div className="flex items-center gap-3 mb-4">
                <MapPin className="text-[#B38F4D]" size={24} />
                <h2 className="text-xl font-serif font-normal text-[#EDEAE4]">Official Address</h2>
              </div>
              <p className="text-[#EDEAE4] leading-relaxed font-medium">
                21 A.N. Path, Boring Rd,<br />
                in front of A.N. Collage, behind Petrol Pump,<br />
                Patna, Bihar 800013
              </p>
            </div>

            {/* Interactive Google Map Iframe */}
            <div className="w-full flex-grow rounded-2xl overflow-hidden border border-white/15 shadow-md min-h-[300px]">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14390.64038481498!2d85.10906232677943!3d25.616223405786482!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ed582046a6f6df%3A0x6b2b733bc4e723de!2sBoring%20Rd%2C%20Patna%2C%20Bihar!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
                width="100%" 
                height="100%" 
                style={{ border: 0, minHeight: '300px' }} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full grayscale hover:grayscale-0 transition-all duration-700 opacity-90 hover:opacity-100"
              ></iframe>
            </div>
          </div>

          {/* Right Side: Inquiry Form Container */}
          <div className="w-full lg:w-7/12">
            <div className="bg-[#2B324B]/80 backdrop-blur-md p-8 md:p-12 rounded-3xl border border-white/15 shadow-sm relative overflow-hidden">
              
              {/* Decorative background elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#212639] rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#B38F4D]/5 rounded-full blur-2xl -z-10 -translate-x-1/2 translate-y-1/2"></div>

              {isSubmitted ? (
                <div className="flex flex-col items-center justify-center h-full min-h-[500px] text-center space-y-6 animate-in fade-in zoom-in duration-500">
                  <CheckCircle2 size={80} className="text-[#B38F4D]" />
                  <h3 className="text-3xl font-serif font-normal text-[#EDEAE4]">Thank You!</h3>
                  <p className="text-[#A39E93] text-lg max-w-md">
                    Your inquiry has been successfully submitted. We've received your details and will get back to you shortly to discuss your big day.
                  </p>
                  <button 
                    onClick={() => setIsSubmitted(false)}
                    className="mt-4 px-8 py-3 border-2 border-[#B38F4D] text-[#B38F4D] font-bold rounded-full hover:bg-[#B38F4D] hover:text-white transition-colors"
                  >
                    Submit Another Query
                  </button>
                </div>
              ) : (
                <>
                  <h2 className="text-3xl font-serif font-normal text-center text-[#EDEAE4] mb-10">
                    Submit your queries?
                  </h2>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-[#EDEAE4] uppercase tracking-wider">Name *</label>
                        <input 
                          type="text" 
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="e.g. Anand Kumar" 
                          required 
                          className="w-full px-4 py-3 bg-[#1C2030] text-white placeholder-gray-500 border border-white/15 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B38F4D] transition-shadow placeholder-gray-400"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-[#EDEAE4] uppercase tracking-wider">Mobile Number *</label>
                        <input 
                          type="tel" 
                          name="mobile"
                          value={formData.mobile}
                          onChange={handleChange}
                          placeholder="e.g. +91 98765 43210" 
                          required 
                          className="w-full px-4 py-3 bg-[#1C2030] text-white placeholder-gray-500 border border-white/15 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B38F4D] transition-shadow placeholder-gray-400"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-bold text-[#EDEAE4] uppercase tracking-wider">Email Address *</label>
                      <input 
                        type="email" 
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="e.g. hello@example.com" 
                        required 
                        className="w-full px-4 py-3 bg-[#1C2030] text-white placeholder-gray-500 border border-white/15 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B38F4D] transition-shadow placeholder-gray-400"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-bold text-[#EDEAE4] uppercase tracking-wider">Required Service *</label>
                      <select 
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-[#1C2030] text-white placeholder-gray-500 border border-white/15 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B38F4D] transition-shadow text-white"
                      >
                        <option value="" disabled>Select a service</option>
                        <option value="Wedding Photography">Wedding Photography</option>
                        <option value="Pre-Wedding Shoot">Pre-Wedding Shoot</option>
                        <option value="Cinematic Films">Cinematic Films</option>
                        <option value="Drone Coverage">Drone Coverage</option>
                        <option value="Custom Album Design">Custom Album Design</option>
                        <option value="Complete Luxury Package">Complete Luxury Package</option>
                      </select>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-[#EDEAE4] uppercase tracking-wider">Event Date *</label>
                        <input 
                          type="date" 
                          name="date"
                          value={formData.date}
                          onChange={handleChange}
                          required 
                          className="w-full px-4 py-3 bg-[#1C2030] text-white placeholder-gray-500 border border-white/15 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B38F4D] transition-shadow text-white"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-[#EDEAE4] uppercase tracking-wider">Event Location *</label>
                        <input 
                          type="text" 
                          name="location"
                          value={formData.location}
                          onChange={handleChange}
                          placeholder="e.g. Hotel Maurya, Patna" 
                          required 
                          className="w-full px-4 py-3 bg-[#1C2030] text-white placeholder-gray-500 border border-white/15 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B38F4D] transition-shadow placeholder-gray-400"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-bold text-[#EDEAE4] uppercase tracking-wider">Estimated Budget *</label>
                      <select 
                        name="budget"
                        value={formData.budget}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-[#1C2030] text-white placeholder-gray-500 border border-white/15 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B38F4D] transition-shadow text-white"
                      >
                        <option value="" disabled>Select estimated budget</option>
                        <option value="We're still working on that!">We're still working on that!</option>
                        <option value="₹1,50,000 - ₹2,50,000">₹1,50,000 - ₹2,50,000</option>
                        <option value="₹2,50,000 - ₹4,00,000">₹2,50,000 - ₹4,00,000</option>
                        <option value="₹4,00,000+">₹4,00,000+</option>
                      </select>
                    </div>

                    <div className="pt-6">
                      <button 
                        type="submit"
                        className="w-full bg-[#B38F4D] text-white font-medium py-4 rounded-xl hover:bg-[#987538] hover:shadow-lg transition-all duration-300 tracking-wider text-lg"
                      >
                        SUBMIT INQUIRY
                      </button>
                    </div>
                  </form>
                </>
              )}
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}