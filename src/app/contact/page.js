'use client';
import { useState } from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

const InstagramIcon = ({ size = 18 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

const YoutubeIcon = ({ size = 18 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/>
    <path d="m10 15 5-3-5-3z"/>
  </svg>
);

const FacebookIcon = ({ size = 18 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

export default function ContactPage() {
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
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) {
        alert('Thank you for your inquiry! Our studio director will connect with you shortly.');
        setFormData({ name: '', mobile: '', email: '', service: '', date: '', location: '', budget: '' });
      } else {
        alert('Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error(error);
      alert('Failed to submit inquiry. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#FAF8F5] text-[#1E221D] pt-16 pb-24 px-6 sm:px-12 font-sans selection:bg-[#5B6454] selection:text-[#FAF8F5]">
      <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row gap-16 lg:gap-24">
        
        {/* Left Column: Get In Touch */}
        <div className="w-full md:w-1/2 flex flex-col justify-start">
          <span className="text-[10px] uppercase tracking-[0.35em] text-[#626C59] font-medium block mb-3">
            CONNECT WITH US
          </span>
          <h1 className="font-serif text-5xl sm:text-6xl text-[#1E221D] mb-6">
            Get in <span className="italic font-light">touch</span>
          </h1>
          <p className="text-[#4A5243] text-sm font-light leading-relaxed max-w-md mb-8">
            We look forward to preserving your celebration. Reach out and our studio director will connect promptly to discuss your vision, dates, and requirements.
          </p>

          {/* Social Icons */}
          <div className="flex space-x-4 mb-12">
             <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="bg-[#ECEFEA] text-[#5B6454] hover:bg-[#5B6454] hover:text-white transition-all w-10 h-10 rounded-full flex items-center justify-center shadow-sm">
               <InstagramIcon size={18} />
             </a>
             <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="bg-[#ECEFEA] text-[#5B6454] hover:bg-[#5B6454] hover:text-white transition-all w-10 h-10 rounded-full flex items-center justify-center shadow-sm">
               <YoutubeIcon size={18} />
             </a>
             <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="bg-[#ECEFEA] text-[#5B6454] hover:bg-[#5B6454] hover:text-white transition-all w-10 h-10 rounded-full flex items-center justify-center shadow-sm">
               <FacebookIcon size={18} />
             </a>
          </div>

          {/* Studio Office Card */}
          <div className="bg-white p-8 rounded-2xl border border-[#E8E4DC] shadow-sm max-w-md w-full">
            <h3 className="font-serif text-2xl text-[#1E221D] mb-6">Our Studio</h3>
            
            <div className="space-y-5">
              <div className="flex items-start gap-4 text-[#4A5243]">
                <MapPin className="text-[#626C59] mt-1 shrink-0" size={20} strokeWidth={1.5} />
                <p className="text-sm font-light leading-relaxed">
                  123 Heritage Avenue, <br />
                  Banjara Hills, Hyderabad, <br />
                  Telangana 500034
                </p>
              </div>
              <div className="flex items-center gap-4 text-[#4A5243]">
                <Phone className="text-[#626C59] shrink-0" size={20} strokeWidth={1.5} />
                <p className="text-sm font-light">+91 8235 109 707</p>
              </div>
              <div className="flex items-center gap-4 text-[#4A5243]">
                <Mail className="text-[#626C59] shrink-0" size={20} strokeWidth={1.5} />
                <p className="text-sm font-light">inquiries@weddingpurindia.com</p>
              </div>
            </div>

            {/* Map Frame */}
            <div className="w-full h-32 rounded-xl border border-[#E8E4DC] overflow-hidden mt-8 bg-[#ECEFEA] flex items-center justify-center">
              <span className="text-[#626C59] text-xs uppercase tracking-widest">Map View Unavailable</span>
            </div>
          </div>
        </div>

        {/* Right Column: Submit Queries Form */}
        <div className="w-full md:w-1/2">
           <div className="bg-white p-8 sm:p-10 rounded-3xl border border-[#E4DFD5] shadow-lg">
             <h2 className="font-serif text-3xl text-[#1E221D] text-center mb-8 italic">
               Submit your queries
             </h2>
             
             <form onSubmit={handleSubmit} className="space-y-5">
               
               {/* Name & Mobile Grid */}
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                 <div>
                   <label className="text-[10px] uppercase tracking-[0.2em] text-[#626C59] font-semibold mb-2 block ml-2">Name</label>
                   <input type="text" name="name" required value={formData.name} onChange={handleChange} placeholder="Arjun & Maya" className="w-full bg-[#FAF8F5] border border-[#DDD7CD] rounded-xl px-4 py-3 text-sm text-[#1E221D] placeholder:text-[#9EA598] focus:border-[#5B6454] focus:outline-none focus:ring-1 focus:ring-[#5B6454] transition" />
                 </div>
                 <div>
                   <label className="text-[10px] uppercase tracking-[0.2em] text-[#626C59] font-semibold mb-2 block ml-2">Mobile</label>
                   <input type="tel" name="mobile" required value={formData.mobile} onChange={handleChange} placeholder="+91 XXXXX XXXXX" className="w-full bg-[#FAF8F5] border border-[#DDD7CD] rounded-xl px-4 py-3 text-sm text-[#1E221D] placeholder:text-[#9EA598] focus:border-[#5B6454] focus:outline-none focus:ring-1 focus:ring-[#5B6454] transition" />
                 </div>
               </div>

               {/* Email */}
               <div>
                 <label className="text-[10px] uppercase tracking-[0.2em] text-[#626C59] font-semibold mb-2 block ml-2">Email Address</label>
                 <input type="email" name="email" required value={formData.email} onChange={handleChange} placeholder="hello@couple.com" className="w-full bg-[#FAF8F5] border border-[#DDD7CD] rounded-xl px-4 py-3 text-sm text-[#1E221D] placeholder:text-[#9EA598] focus:border-[#5B6454] focus:outline-none focus:ring-1 focus:ring-[#5B6454] transition" />
               </div>

               {/* Service Type */}
               <div>
                 <label className="text-[10px] uppercase tracking-[0.2em] text-[#626C59] font-semibold mb-2 block ml-2">Service Required</label>
                 <select name="service" required value={formData.service} onChange={handleChange} className="w-full bg-[#FAF8F5] border border-[#DDD7CD] rounded-xl px-4 py-3 text-sm text-[#1E221D] focus:border-[#5B6454] focus:outline-none focus:ring-1 focus:ring-[#5B6454] transition appearance-none">
                   <option value="" disabled>Select a service</option>
                   <option value="wedding">Wedding Photography & Films</option>
                   <option value="prewedding">Pre-Wedding Shoot</option>
                   <option value="both">Complete Wedding + Pre-Wedding</option>
                 </select>
               </div>

               {/* Date & Location Grid */}
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                 <div>
                   <label className="text-[10px] uppercase tracking-[0.2em] text-[#626C59] font-semibold mb-2 block ml-2">Event Date</label>
                   <input type="date" name="date" required value={formData.date} onChange={handleChange} className="w-full bg-[#FAF8F5] border border-[#DDD7CD] rounded-xl px-4 py-3 text-sm text-[#1E221D] focus:border-[#5B6454] focus:outline-none focus:ring-1 focus:ring-[#5B6454] transition" />
                 </div>
                 <div>
                   <label className="text-[10px] uppercase tracking-[0.2em] text-[#626C59] font-semibold mb-2 block ml-2">Location</label>
                   <input type="text" name="location" required value={formData.location} onChange={handleChange} placeholder="City or Venue" className="w-full bg-[#FAF8F5] border border-[#DDD7CD] rounded-xl px-4 py-3 text-sm text-[#1E221D] placeholder:text-[#9EA598] focus:border-[#5B6454] focus:outline-none focus:ring-1 focus:ring-[#5B6454] transition" />
                 </div>
               </div>

               {/* Budget */}
               <div>
                 <label className="text-[10px] uppercase tracking-[0.2em] text-[#626C59] font-semibold mb-2 block ml-2">Estimated Budget</label>
                 <select name="budget" required value={formData.budget} onChange={handleChange} className="w-full bg-[#FAF8F5] border border-[#DDD7CD] rounded-xl px-4 py-3 text-sm text-[#1E221D] focus:border-[#5B6454] focus:outline-none focus:ring-1 focus:ring-[#5B6454] transition appearance-none">
                   <option value="" disabled>Select your budget</option>
                   <option value="1-3L">₹1,00,000 - ₹3,00,000</option>
                   <option value="3-5L">₹3,00,000 - ₹5,00,000</option>
                   <option value="5L+">₹5,00,000+</option>
                 </select>
               </div>

               <button type="submit" className="w-full bg-[#5B6454] hover:bg-[#485042] text-[#FAF8F5] py-4 rounded-full text-[11px] uppercase tracking-[0.25em] font-medium transition shadow-md mt-6 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#5B6454]">
                 Submit Inquiry
               </button>
             </form>
           </div>
        </div>

      </div>
    </main>
  );
}