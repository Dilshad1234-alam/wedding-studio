"use client";
import React from 'react';
import Link from 'next/link';

export default function ServicesPage() {
  const [serviceOfferings, setServiceOfferings] = React.useState([]);

  React.useEffect(() => {
    fetch('/api/services')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          // Re-sort data by ID or just keep the backend order
          setServiceOfferings(data.sort((a,b) => a.id - b.id));
        }
      })
      .catch(err => console.error("Error fetching services:", err));

    const handleStorageChange = (e) => {
      if (e.key === 'weddingpur_service_deleted' && e.newValue) {
        try {
          const { id } = JSON.parse(e.newValue);
          setServiceOfferings(prev => prev.filter(service => service.id !== id));
        } catch (err) {}
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <main className="min-h-screen bg-[#0B0D0E] text-[#F5F5F5] font-sans antialiased selection:bg-[#5B6454] selection:text-white pb-24">
      
      {/* 1. EDITORIAL HEADER */}
      <section className="pt-16 pb-16 px-6 text-center max-w-4xl mx-auto">
        <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl italic font-normal text-[#F5F5F5] tracking-tight mb-4">
          Studio Offerings
        </h1>
        <p className="text-xs sm:text-sm text-[#C5B388] font-light leading-relaxed tracking-wide">
         Bespoke visual craftsmanship, fine-art stills, and master cinema tailored for heirloom preservation.
        </p>
      </section>

      {/* 2. COMPREHENSIVE LUXURY PACKAGE SPREADS */}
      <section className="w-full max-w-[1536px] mx-auto px-4 sm:px-8 lg:px-12 space-y-12">
        {serviceOfferings.map((pkg, index) => (
          <div key={pkg.id || index} className="bg-[#121518] border border-[#2B2519] rounded-[2rem] overflow-hidden shadow-2xl relative group hover:border-[#D4AF37]/50 transition-all duration-700">
            {pkg.badge && (
              <div className="absolute top-0 right-0 md:top-6 md:right-6 bg-gradient-to-r from-[#D4AF37] to-[#B89018] text-black text-[9px] uppercase tracking-[0.25em] font-black px-6 py-2 rounded-bl-3xl md:rounded-full shadow-lg shadow-[#D4AF37]/20 z-10">
                {pkg.badge}
              </div>
            )}
            
            <div className="grid grid-cols-1 lg:grid-cols-12">
              
              {/* Left Column: Header, Crew, Experience & Why Choose */}
              <div className="lg:col-span-7 p-8 sm:p-12 border-b lg:border-b-0 lg:border-r border-[#2B2519] flex flex-col justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.25em] text-[#D4AF37] font-black block mb-3">
                    {pkg.subtitle}
                  </span>
                  <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#F5F5F5] italic font-normal leading-tight mb-8">
                    {pkg.title}
                  </h2>
                  
                  {/* Schedule Details */}
                  {pkg.schedule && pkg.schedule.length > 0 && (
                    <div className="space-y-4 mb-8">
                      <h4 className="text-[10px] uppercase tracking-widest text-[#8A7D5C] font-bold border-b border-[#2B2519] pb-2">Event Schedule & Crew</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {pkg.schedule.map((dayObj, dIdx) => (
                          <div key={dIdx} className="bg-[#181B20] p-4 rounded-xl border border-[#2B2519]">
                            <h5 className="text-xs font-bold text-[#D4AF37] mb-2">{dayObj.day}</h5>
                            <ul className="space-y-1">
                              {(dayObj.crew || []).map((member, mIdx) => (
                                <li key={mIdx} className="text-[11px] text-[#A89D84] leading-relaxed flex items-start gap-1.5">
                                  <span className="text-[#D4AF37] mt-0.5">▪</span> {member}
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Experience Highlights */}
                  {pkg.experience && pkg.experience.length > 0 && (
                    <div className="mb-8">
                      <h4 className="text-[10px] uppercase tracking-widest text-[#8A7D5C] font-bold border-b border-[#2B2519] pb-2 mb-3">Experience</h4>
                      <ul className="space-y-2">
                        {pkg.experience.map((exp, eIdx) => (
                          <li key={eIdx} className="flex items-start gap-2.5 text-xs text-[#C5B388] font-light">
                            <span className="text-[#D4AF37] font-bold">✓</span> {exp}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Why Choose Badges */}
                <div className="pt-8">
                  <h4 className="text-[10px] uppercase tracking-widest text-[#8A7D5C] font-bold mb-4">{pkg.whyChooseTitle || "WHY CHOOSE LENSLOOM?"}</h4>
                  <div className="flex flex-wrap gap-2">
                    {(pkg.whyChooseFeatures || []).map((feat, fIdx) => (
                      <span key={fIdx} className="text-[10px] px-3 py-1.5 rounded-full border border-[#2B2519] text-[#A89D84] uppercase tracking-wider bg-[#181B20]">
                        {feat}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Pricing, Timeline & Deliverables */}
              <div className="lg:col-span-5 p-8 sm:p-12 bg-gradient-to-b from-[#181B20] to-[#121518] flex flex-col justify-between">
                <div>
                  {/* Pricing Box */}
                  <div className="text-center pb-8 border-b border-[#2B2519]">
                    <div className="flex justify-center items-center gap-3 mb-2">
                      <span className="text-sm text-[#8A7D5C] line-through font-mono">{pkg.regularPrice}</span>
                      <span className="text-xs bg-emerald-900/30 text-emerald-400 px-3 py-1 rounded font-bold uppercase tracking-widest">{pkg.savings}</span>
                    </div>
                    <div className="text-5xl lg:text-6xl font-serif text-white font-medium">{pkg.offerPrice}</div>
                  </div>

                  {/* Deliverables Checklist */}
                  <div className="pt-8 mb-8">
                    <h4 className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-bold mb-4">Final Deliverables</h4>
                    <ul className="space-y-3">
                      {(pkg.deliverables || []).map((item, iIdx) => (
                        <li key={iIdx} className="flex items-start gap-3 text-xs text-white">
                          <span className="text-[#D4AF37] shrink-0 mt-0.5">✦</span>
                          <span className="leading-snug">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Priority Timeline */}
                  {pkg.timeline && pkg.timeline.length > 0 && (
                    <div className="pt-6 border-t border-[#2B2519] mb-8">
                      <h4 className="text-[10px] uppercase tracking-widest text-[#8A7D5C] font-bold mb-3">Delivery Timeline</h4>
                      <div className="space-y-2">
                        {pkg.timeline.map((tl, tIdx) => (
                          <div key={tIdx} className="flex justify-between items-center text-[11px] border border-[#2B2519] bg-[#121518] p-2.5 rounded-lg">
                            <span className="text-[#A89D84]">{tl.item}</span>
                            <span className="text-[#D4AF37] font-mono">{tl.time}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <Link className="block w-full text-center py-4 rounded-xl font-medium bg-gradient-to-r from-[#D4AF37] via-[#E5C158] to-[#B89018] hover:from-[#F3E5AB] hover:to-[#D4AF37] text-black font-black text-xs uppercase tracking-[0.2em] shadow-lg shadow-[#D4AF37]/20 transition-all duration-300" href={`/contact?pkg=${String(pkg.title ? pkg.title.split(' ')[0] : pkg.id).toLowerCase()}`}>
                  Commission This Suite ↗
                </Link>
              </div>

            </div>
          </div>
        ))}
      </section>

      {/* 3. BOTTOM COMMISSION BANNER */}
      <section className="w-full max-w-[1536px] mx-auto px-4 sm:px-8 lg:px-12 mt-16">
        <div className="bg-[#121518] border border-[#2B2519] rounded-3xl p-10 sm:p-14 text-center max-w-4xl mx-auto shadow-xl">
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#D4AF37] font-black block mb-2">
            TAILORED BESPOKE PACKAGES
          </span>
          <h3 className="font-serif text-3xl sm:text-4xl italic text-[#F5F5F5] mb-4">
            Custom Coverage for Multi-Day Celebrations
          </h3>
          <p className="text-xs sm:text-sm text-[#C5B388] max-w-xl mx-auto font-light leading-relaxed mb-8">
            Planning a multi-city wedding or destination event? We curate custom photography and cinema suites aligned perfectly with your schedule.
          </p>
          <Link className="inline-block px-10 py-3.5 rounded-full font-medium border border-[#D4AF37]/50 text-[#C5B388] hover:bg-gradient-to-r hover:from-[#F3E5AB] hover:to-[#D4AF37] hover:text-black hover:font-black text-xs uppercase tracking-[0.2em] transition-all duration-300 cursor-pointer" href="/contact">
            Inquire About Custom Package
          </Link>
        </div>
      </section>

    </main>
  );
}
