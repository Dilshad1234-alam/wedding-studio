"use client";
import React, { useState } from 'react';
import Link from 'next/link';

export default function AboutPage() {
  const [openFaq, setOpenFaq] = useState(0);

  const stats = [
    { value: "850+", label: "WEDDINGS PRESERVED", desc: "Across Bihar, Rajasthan & Delhi NCR" },
    { value: "10+", label: "YEARS OF HERITAGE", desc: "Crafting timeless visual heirlooms" },
    { value: "4.9★", label: "CLIENT SATISFACTION", desc: "Over 600+ verified couple testimonials" },
    { value: "65+", label: "DESTINATIONS COVERED", desc: "Pan-India & international shoots" }
  ];

  const awards = [
    {
      title: "Fearless Awards",
      year: "2025",
      desc: "Ranked among Top 50 Wedding Photographers in India for documentary excellence.",
      icon: "🏆"
    },
    {
      title: "WedSutra Premium",
      year: "2024",
      desc: "Recognized for Best Cinematic Film of the Year across destination circuits.",
      icon: "⭐"
    },
    {
      title: "Asia Wedding Pro",
      year: "2023",
      desc: "Honored with the Crown of Excellence in Traditional & Heritage Photography.",
      icon: "🏆"
    }
  ];

  const faqs = [
    {
      q: "Do you only do Photography/Cinematography or both?",
      a: "We provide comprehensive, end-to-end coverage across both candid photography and master 4K cinematography. Our creative directors ensure consistent color grading and emotional cadence across all your films and stills."
    },
    {
      q: "What deliverables form part of the package?",
      a: "Our signature package includes a 3–5 minute Cinematic Teaser, a 25–35 minute Master Wedding Film, an online gallery with 800+ graded high-resolution stills, and handcrafted leather-bound archival heirloom albums."
    },
    {
      q: "What is the expected time for the delivery?",
      a: "You receive an instant 25-frame sneak peek within 48 hours for immediate celebrations and social sharing. The complete cinematic edit and archival photo suite are delivered within 4 to 6 weeks."
    },
    {
      q: "How many crew members do you provide?",
      a: "Depending on your celebration scale, our crew ranges from a tight 4-member candid unit to a full 10-member production team featuring dedicated drone pilots, steadicam operators, and lighting masters."
    },
    {
      q: "How much do you charge?",
      a: "Our bespoke wedding commissions typically begin at ₹1.5L for single-day coverage and scale up for multi-day grand destination productions. Custom quotes are tailored based on dates, crew scale, and destinations."
    }
  ];

  const [aboutConfig, setAboutConfig] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchAbout = () => {
      setIsLoading(true);
      fetch('/api/about', { cache: 'no-store' })
        .then(res => res.json())
        .then(data => {
          if (data && data.directorName) {
            setAboutConfig(data);
          }
        })
        .catch(err => console.error("Error fetching about config:", err))
        .finally(() => setIsLoading(false));
    };

    fetchAbout();

    const handleStorageChange = (e) => {
      if (e.key === 'weddingpur_about_updated' && e.newValue) {
        fetchAbout();
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0B0D0E] flex items-center justify-center pt-0 pb-12 px-6">
        <div className="w-10 h-10 border-4 border-[#D4AF37]/30 border-t-[#D4AF37] rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B0D0E] text-[#F5F5F5] font-sans antialiased pt-0 pb-12 px-6 sm:px-10 lg:px-16 selection:bg-[#D4AF37] selection:text-black">
      
      {/* Background Subtle Gold Aura */}
      <div className="fixed inset-0 pointer-events-none flex items-center justify-center">
        <div className="w-[650px] h-[650px] bg-[#D4AF37]/5 blur-[150px] rounded-full"></div>
      </div>

      <div className="relative w-full max-w-[1440px] mx-auto space-y-24">
        
        {/* 1. HERO STORY & ARCH PHOTO */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          
          {/* Left: Arch Photo */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-[420px] aspect-[3/4] rounded-t-[140px] rounded-b-3xl overflow-hidden border border-[#2B2519] shadow-2xl bg-[#121518]">
              <img
                src={aboutConfig?.directorPhoto || "https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=1200&auto=format&fit=crop"}
                alt={aboutConfig?.directorName || "Weddingpur Couple"}
                className="w-full h-full object-cover grayscale-[10%] hover:grayscale-0 transition-all duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0D0E]/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6 text-center">
                <span className="text-[9px] uppercase font-black tracking-[0.3em] text-[#D4AF37]">
                  PATNA • BIHAR • PAN-INDIA
                </span>
              </div>
            </div>
          </div>

          {/* Right: Narrative & Stats */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <span className="text-[11px] font-black uppercase tracking-[0.3em] text-[#D4AF37] block mb-2">
                {aboutConfig?.directorRole || "OUR JOURNEY"}
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-white tracking-tight leading-[1.1]">
                {aboutConfig?.directorName || "Crafting Legacy"} <br />
                <span className="italic text-[#D4AF37]">Since 2016.</span>
              </h1>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-[#D1C7A5] font-light leading-relaxed">
              <p>
                {aboutConfig?.bio || "Founded on the belief that every love story deserves to be treated as a work of fine art. Over the past decade, we have had the privilege of documenting over 850 celebrations across India and beyond."}
              </p>
              {aboutConfig?.awards && (
                <p className="text-[#D4AF37] font-bold">
                  Awards & Recognition: {aboutConfig.awards}
                </p>
              )}
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-[#2B2519]">
              {stats.map((s, idx) => (
                <div key={idx} className="bg-[#121518] border border-[#2B2519] p-3.5 rounded-2xl">
                  <span className="text-xl sm:text-2xl font-black text-[#D4AF37] block">
                    {s.value}
                  </span>
                  <span className="text-[9px] uppercase font-black tracking-wider text-white block mt-0.5">
                    {s.label}
                  </span>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="pt-2 flex items-center gap-4 flex-wrap">
              <Link className="px-8 py-3 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#B89018] hover:from-[#F3E5AB] hover:to-[#D4AF37] text-black text-xs uppercase tracking-[0.2em] font-black shadow-lg shadow-[#D4AF37]/20 transition-all cursor-pointer" href="/contact">
                SCHEDULE CONSULTATION
              </Link>
              <Link className="px-7 py-3 rounded-full border border-[#2B2519] hover:border-[#D4AF37] text-[#C5B388] hover:text-white text-xs uppercase tracking-[0.2em] font-bold transition-all" href="/stories">
                EXPLORE STORIES ↗
              </Link>
            </div>
          </div>

        </div>

        {/* 1.5 OUR CORE TEAM */}
        {aboutConfig?.teamMembers && aboutConfig.teamMembers.length > 0 && (
          <div className="space-y-10 pt-8 border-t border-[#1C1F24]">
            <div className="text-center space-y-2">
              <span className="text-[10px] uppercase font-black tracking-[0.3em] text-[#D4AF37] block">
                MEET THE EXPERTS
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif text-white tracking-tight">
                Our Core <span className="italic text-[#D4AF37]">Team</span>
              </h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {aboutConfig.teamMembers.map((member, idx) => (
                <div key={idx} className="group flex flex-col items-center text-center bg-[#121518] border border-[#2B2519] rounded-t-[100px] rounded-b-3xl p-6 transition-all duration-500 hover:border-[#D4AF37] hover:-translate-y-2 shadow-xl hover:shadow-[#D4AF37]/10">
                  <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden border-2 border-[#D4AF37]/50 mb-6 bg-[#181B20] relative">
                    {member.photoUrl ? (
                      <img src={member.photoUrl} alt={member.name} className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-[#8A7D5C] text-xs uppercase font-mono bg-[#0B0D0E]">
                        LensLoom
                      </div>
                    )}
                  </div>
                  <h3 className="text-lg font-bold text-white tracking-wide mb-1 group-hover:text-[#F3E5AB] transition-colors">{member.name}</h3>
                  <span className="text-[10px] uppercase font-black tracking-[0.2em] text-[#D4AF37] block mb-4">
                    {member.role}
                  </span>
                  <p className="text-xs text-[#A89D84] leading-relaxed font-light line-clamp-4">
                    {member.bio}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 2. RECOGNITION / GLOBAL ACCLAIM */}
        <div className="space-y-8">
          <div className="text-center">
            <span className="text-[10px] uppercase font-black tracking-[0.3em] text-[#D4AF37] block mb-1">
              RECOGNITION
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif italic text-white">
              Global Acclaim
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {awards.map((award, i) => (
              <div 
                key={i} 
                className="bg-[#121518] border border-[#2B2519] hover:border-[#D4AF37]/50 rounded-2xl p-8 text-center transition-all duration-300 shadow-xl group"
              >
                <div className="text-3xl mb-3 text-[#D4AF37] group-hover:scale-110 transition-transform">
                  {award.icon}
                </div>
                <span className="text-[10px] uppercase font-mono tracking-widest text-[#D4AF37] block mb-1">
                  HONORED • {award.year}
                </span>
                <h3 className="text-base font-bold text-white mb-2 tracking-wide">
                  {award.title}
                </h3>
                <p className="text-xs text-[#A89D84] font-light leading-relaxed">
                  {award.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 3. FAQS SECTION */}
        <div className="space-y-8">
          <div className="text-center">
            <span className="text-[10px] uppercase font-black tracking-[0.3em] text-[#D4AF37] block mb-1">
              FAQS
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif italic text-white">
              Frequently Asked
            </h2>
          </div>

          <div className="max-w-4xl mx-auto space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div 
                  key={idx} 
                  className="bg-[#121518] border border-[#2B2519] hover:border-[#D4AF37]/40 rounded-2xl transition-all overflow-hidden shadow-md"
                >
                  <button 
                    onClick={() => setOpenFaq(isOpen ? -1 : idx)} 
                    className="w-full flex items-center justify-between p-5 text-left cursor-pointer"
                  >
                    <span className="text-sm font-semibold text-white tracking-wide pr-4">
                      {faq.q}
                    </span>
                    <span className="text-[#D4AF37] text-xs font-mono shrink-0 transition-transform">
                      {isOpen ? "▲" : "▼"}
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-xs text-[#D1C7A5] leading-relaxed border-t border-[#1C1F24] pt-3 font-light">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* 4. LUXURY BOTTOM BOOKING BANNER */}
        <div className="bg-gradient-to-r from-[#121518] via-[#171B21] to-[#121518] border border-[#2B2519] rounded-3xl p-8 sm:p-12 text-center shadow-2xl">
          <span className="text-[10px] uppercase font-black tracking-[0.3em] text-[#D4AF37] block mb-2">
            RESERVE YOUR CHAPTER
          </span>
          <h3 className="text-2xl sm:text-3xl font-serif italic text-white mb-3">
            Commission Weddingpur For Your Sacred Day
          </h3>
          <p className="text-xs text-[#A89D84] max-w-xl mx-auto mb-6 leading-relaxed">
            We limit our calendar to a selected number of weddings per season to maintain uncompromised fine-art standards.
          </p>
          <Link className="inline-block px-8 py-3.5 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#B89018] hover:from-[#F3E5AB] hover:to-[#D4AF37] text-black text-xs uppercase tracking-[0.2em] font-black shadow-lg shadow-[#D4AF37]/20 transition-all cursor-pointer" href="/contact">
            INQUIRE DATES & AVAILABILITY ↗
          </Link>
        </div>

      </div>
    </div>
  );
}
