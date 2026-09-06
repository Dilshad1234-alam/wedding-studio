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
    <main className="min-h-screen bg-[#FAF8F5] text-[#1E221D] font-sans antialiased selection:bg-[#5B6454] selection:text-white">
      
      {/* 1. EDITORIAL HEADER */}
      <section className="pt-0 -mt-10 pb-16 px-6 text-center max-w-4xl mx-auto">
        <span className="text-[10px] uppercase tracking-[0.4em] text-[#5B6454] font-semibold block mb-3">
          BESPOKE COMMISSIONS
        </span>
        <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl italic font-normal text-[#1E221D] tracking-tight mb-4">
          Studio Offerings
        </h1>
        <p className="text-xs sm:text-sm text-[#525B4C] max-w-xl mx-auto font-light leading-relaxed">
          Explore our complete suite of fine-art photography, high-altitude aerials, and documentary cinema tailored for celebrations in Patna, Bihar, and across the globe.
        </p>
      </section>

      {/* 2. ALTERNATING LUXURY SERVICE SPREADS */}
      <section className="px-6 sm:px-12 max-w-7xl mx-auto space-y-16">
        {serviceOfferings.map((service, index) => {
          const isReversed = index % 2 !== 0;
          return (
            <div
              key={index}
              className="bg-white border border-[#DDD7CD] rounded-3xl p-6 sm:p-12 shadow-sm hover:shadow-md transition-all duration-500"
            >
              <div className={`grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center ${isReversed ? 'lg:flex-row-reverse' : ''}`}>
                
                {/* Visual Image Column */}
                <div className={`lg:col-span-6 ${isReversed ? 'lg:order-2' : 'lg:order-1'}`}>
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg border-4 border-[#FAF8F5] bg-[#ECEFEA] group">
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
                  <span className="text-[10px] uppercase tracking-[0.3em] text-[#5B6454] font-semibold block">
                    {service.tagline}
                  </span>

                  <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#1E221D] italic font-normal leading-tight">
                    {service.title}
                  </h2>

                  <p className="text-xs sm:text-sm text-[#525B4C] leading-relaxed font-light">
                    {service.desc}
                  </p>

                  {/* Feature Highlights */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2 max-w-lg mx-auto lg:mx-0">
                    {service.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-center gap-2 text-left">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#5B6454]"></span>
                        <span className="text-[11px] text-[#424B3D] tracking-wide font-light">{feat}</span>
                      </div>
                    ))}
                  </div>

                  {/* Dark Pill Hover Button */}
                  <div className="pt-4">
                    <Link className="inline-block border border-[#5B6454] text-[#5B6454] hover:bg-[#5B6454] hover:text-[#FAF8F5] px-9 py-3 rounded-full text-xs uppercase tracking-[0.2em] font-medium transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer" href="/contact">
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
      <section className="px-6 sm:px-12 max-w-7xl mx-auto pt-20 pb-28">
        <div className="bg-[#ECEFEA] border border-[#DDD7CD] rounded-3xl p-10 sm:p-14 text-center max-w-4xl mx-auto shadow-sm">
          <span className="text-[10px] uppercase tracking-[0.35em] text-[#5B6454] font-semibold block mb-2">
            TAILORED BESPOKE PACKAGES
          </span>
          <h3 className="font-serif text-3xl sm:text-4xl italic text-[#1E221D] mb-4">
            Custom Coverage for Multi-Day Celebrations
          </h3>
          <p className="text-xs sm:text-sm text-[#525B4C] max-w-xl mx-auto font-light leading-relaxed mb-8">
            Planning a multi-city wedding or destination event? We curate custom photography and cinema suites aligned perfectly with your schedule.
          </p>
          <Link className="inline-block bg-[#5B6454] hover:bg-[#485042] text-[#FAF8F5] px-10 py-3.5 rounded-full text-xs uppercase tracking-[0.25em] font-medium shadow-md transition-all duration-300" href="/contact">
            Inquire About Custom Package
          </Link>
        </div>
      </section>

    </main>
  );
}
