"use client";
import React from 'react';
import Link from 'next/link';

export default function ServicesPage() {
  const serviceOfferings = [
    {
      title: "Wedding Photography",
      tagline: "SACRED RITUALS & TIMELESS STILLS",
      desc: "Your wedding day deserves to be remembered in the most beautiful way possible. Our wedding photography service captures genuine emotions, meaningful rituals, candid moments, and every important detail. From getting ready to the final farewell, we document your celebration with creativity, passion, and timeless storytelling.",
      img: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=85",
      features: ["Full Day Multi-Camera Coverage", "Candid & Ritual Storytelling", "High-Resolution Graded Gallery", "Heirloom Album Ready"]
    },
    {
      title: "Engagement Photography",
      tagline: "THE GENESIS OF FOREVER",
      desc: "Your engagement marks the beginning of a beautiful new chapter. We capture every smile, glance, and special moment with elegant and natural photography. From intimate ceremonies to grand celebrations, our engagement photography preserves memories that perfectly reflect your happiness and commitment.",
      img: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1000&q=85",
      features: ["Ring Ceremony Highlights", "Natural Unposed Expressions", "Family Portraits", "Teaser Reel for Socials"]
    },
    {
      title: "Pre - Wedding Photography",
      tagline: "POETRY IN MOTION & INTIMACY",
      desc: "Celebrate your journey together before the wedding with a personalized pre-wedding photoshoot. Whether you prefer a romantic outdoor location or a unique concept, we create stunning images that reflect your love story. Our goal is to capture your chemistry, personality, and excitement for the future.",
      img: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1000&q=85",
      features: ["Destination & Architectural Shoots", "Styling & Concept Consultation", "Cinematic Music Teasers", "Framed Reception Portraits"]
    },
    {
      title: "Drone Photography",
      tagline: "SWEEPING CINEMATIC PERSPECTIVES",
      desc: "Take your memories to new heights with professional drone photography. Our aerial coverage captures stunning views of venues, ceremonies, decorations, and celebrations from a unique perspective. Perfect for weddings and special events, drone photography adds a dramatic and cinematic touch to your collection.",
      img: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1000&q=85",
      features: ["Licensed & Insured Drone Pilots", "4K Ultra-High Definition Aerials", "Baraat & Venue Grandeur Views", "Synchronized Cinema Cuts"]
    },
    {
      title: "Maternity Photography",
      tagline: "CELEBRATING NEW BEGINNINGS",
      desc: "Every milestone is worth celebrating and remembering. We capture the excitement, laughter, decorations, and special moments that make your celebration unique. Whether it is an intimate session or a grand joy, we create photographs filled with elegance, warmth, and lasting memories.",
      img: "https://images.unsplash.com/photo-1545232979-8bf68ee9b1af?auto=format&fit=crop&w=1000&q=85",
      features: ["Gentle Editorial Lighting", "Studio & Outdoor Settings", "Candid Maternal Glow", "Private Online Gallery"]
    },
    {
      title: "Birthday Photography",
      tagline: "VIBRANT MILESTONES & JOYFUL CANDIDS",
      desc: "From baby milestones and first birthdays to grand anniversary celebrations, we capture the laughter, playful candid moments, and vibrant festivities with bespoke precision so you can relive the joy forever.",
      img: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=1000&q=85",
      features: ["Dynamic Kids & Family Action", "Decor & Cake Cutting Highlights", "Rapid Same-Week Delivery", "Custom Keepsake Photobooks"]
    }
  ];

  return (
    <main className="min-h-screen bg-[#0B0D0E] text-[#F5F5F5] font-sans antialiased selection:bg-[#5B6454] selection:text-white">
      
      {/* 1. EDITORIAL HEADER */}
      <section className="pt-10 -mt-10 pb-16 px-6 text-center max-w-4xl mx-auto">
        <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl italic font-normal text-[#F5F5F5] tracking-tight mb-4">
          Studio Offerings
        </h1>
        <p className="text-xs sm:text-sm text-[#C5B388] font-light leading-relaxed tracking-wide">
         Bespoke visual craftsmanship, fine-art stills, and master cinema tailored for heirloom preservation.
        </p>
      </section>

      {/* 2. ALTERNATING LUXURY SERVICE SPREADS */}
      <section className="w-full max-w-[1536px] mx-auto px-4 sm:px-8 lg:px-12 py-8 sm:py-12 space-y-16">
        {serviceOfferings.map((service, index) => {
          const isReversed = index % 2 !== 0;
          return (
            <div
              key={index}
              className="bg-[#121518] border border-[#2B2519] rounded-3xl p-6 sm:p-12 shadow-xl hover:shadow-md transition-all duration-500"
            >
              <div className={`grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center ${isReversed ? 'lg:flex-row-reverse' : ''}`}>
                
                {/* Visual Image Column */}
                <div className={`lg:col-span-6 ${isReversed ? 'lg:order-2' : 'lg:order-1'}`}>
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg border-4 border-[#FAF8F5] bg-[#121518] group">
                    <img
                      src={service.img}
                      alt={service.title}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>
                  </div>
                </div>

                {/* Narrative & Details Column */}
                <div className={`lg:col-span-6 space-y-5 text-center lg:text-left ${isReversed ? 'lg:order-1' : 'lg:order-2'}`}>
                  <span className="text-[10px] uppercase tracking-[0.25em] text-[#D4AF37] font-black block ">
                    {service.tagline}
                  </span>

                  <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#F5F5F5] italic font-normal leading-tight">
                    {service.title}
                  </h2>

                  <p className="text-xs sm:text-sm text-[#C5B388] leading-relaxed font-light">
                    {service.desc}
                  </p>

                  {/* Feature Highlights */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2 max-w-lg mx-auto lg:mx-0">
                    {service.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-center gap-2 text-left">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]"></span>
                        <span className="text-[11px] text-[#C5B388] tracking-wide font-light">{feat}</span>
                      </div>
                    ))}
                  </div>

                  {/* Dark Pill Hover Button */}
                  <div className="pt-4">
                    <Link className="inline-block border border-[#D4AF37]/50 text-[#C5B388] hover:bg-gradient-to-r hover:from-[#F3E5AB] hover:to-[#D4AF37] hover:text-black hover:font-black hover:shadow-[0_0_20px_rgba(212,175,55,0.45)] px-9 py-3 rounded-full text-xs uppercase tracking-[0.2em] font-medium transition-all duration-300 cursor-pointer" href="/contact">
                      Get Quote
                    </Link>
                  </div>
                </div>

              </div>
            </div>
          );
        })}
      </section>

      {/* 3. BOTTOM COMMISSION BANNER (Ensures Safe Spacing Above Dark Footer) */}
      <section className="w-full max-w-[1536px] mx-auto px-4 sm:px-8 lg:px-12 py-8 sm:py-12">
        <div className="bg-[#121518] border border-[#2B2519] rounded-3xl p-10 sm:p-14 text-center max-w-4xl mx-auto shadow-xl">
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#D4AF37] font-black block  mb-2">
            TAILORED BESPOKE PACKAGES
          </span>
          <h3 className="font-serif text-3xl sm:text-4xl italic text-[#F5F5F5] mb-4">
            Custom Coverage for Multi-Day Celebrations
          </h3>
          <p className="text-xs sm:text-sm text-[#C5B388] max-w-xl mx-auto font-light leading-relaxed mb-8">
            Planning a multi-city wedding or destination event? We curate custom photography and cinema suites aligned perfectly with your schedule.
          </p>
          <Link className="inline-block px-10 py-3.5 rounded-full font-medium bg-gradient-to-r from-[#D4AF37] via-[#E5C158] to-[#B89018] hover:from-[#F3E5AB] hover:to-[#D4AF37] text-black font-black text-xs uppercase tracking-[0.2em] shadow-lg shadow-[#D4AF37]/20 hover:shadow-[0_0_25px_rgba(212,175,55,0.45)] active:scale-[0.98] transition-all duration-300 cursor-pointer" href="/contact">
            Inquire About Custom Package
          </Link>
        </div>
      </section>

    </main>
  );
}
