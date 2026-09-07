"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function ServicesPage() {
  const [packages, setPackages] = useState([]);
  const [activePackageId, setActivePackageId] = useState(1);
  const [loading, setLoading] = useState(true);

  const fetchPackages = async () => {
    try {
      const res = await fetch('/api/services', { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        setPackages(data);
        if (data.length > 0 && !activePackageId) {
          setActivePackageId(data[0].id);
        }
      }
    } catch (err) {
      console.error("Failed fetching services:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPackages();

    const handleSync = (e) => {
      if (e.key === 'weddingpur_service_updated' || e.key === 'weddingpur_service_deleted') {
        fetchPackages();
      }
    };
    window.addEventListener('storage', handleSync);
    return () => window.removeEventListener('storage', handleSync);
  }, []);

  const getPackageKey = (title) => {
    if (title.toLowerCase().includes('standard')) return 'standard';
    if (title.toLowerCase().includes('silver')) return 'silver';
    if (title.toLowerCase().includes('gold')) return 'gold';
    return 'luxury';
  };

  return (
    <div className="min-h-screen bg-[#07090A] text-[#F5F5F5] font-sans antialiased selection:bg-[#D4AF37] selection:text-black">
      
      {/* 1. HERO HEADER SECTION */}
      <section className="pt-20 pb-12 px-6 lg:px-12 text-center relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#D4AF37]/5 blur-[120px] pointer-events-none rounded-full" />
        
        <div className="max-w-3xl mx-auto space-y-4 relative z-10">
          <span className="inline-block px-4 py-1.5 rounded-full text-[10px] font-mono font-bold tracking-[0.3em] uppercase bg-[#121518] text-[#D4AF37] border border-[#2B2519]">
            TRANSPARENT WEDDING INVESTMENTS
          </span>
          <h1 className="text-4xl sm:text-6xl font-serif italic text-white tracking-tight">
            Studio Offerings & Suites
          </h1>
          <p className="text-xs sm:text-sm text-[#9E927A] font-light max-w-xl mx-auto leading-relaxed">
            Bespoke visual craftsmanship, fine-art stills, and master 4K cinema tailored for multi-day royal heirlooms across Bihar & beyond.
          </p>
        </div>

        {/* Quick Jump Ribbon */}
        {packages.length > 0 && (
          <div className="max-w-4xl mx-auto mt-10 flex items-center justify-center gap-2 overflow-x-auto p-1.5 bg-[#0E1114] border border-[#20252F] rounded-2xl">
            {packages.map((pkg) => (
              <a
                key={pkg.id}
                href={`#suite-${pkg.id}`}
                className="px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase transition-all whitespace-nowrap text-[#A89D84] hover:text-white hover:bg-[#181C22]"
              >
                {pkg.title.split('(')[0].trim()} • <span className="text-[#D4AF37]">{pkg.offerPrice}</span>
              </a>
            ))}
          </div>
        )}
      </section>

      {/* 2. PACKAGES LISTING */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 pb-24 space-y-16">
        {packages.map((pkg, pIdx) => {
          const pkgKey = getPackageKey(pkg.title);

          return (
            <div
              key={pkg.id}
              id={`suite-${pkg.id}`}
              className="bg-gradient-to-b from-[#111418] to-[#0B0D0E] border border-[#252B35] hover:border-[#D4AF37]/50 rounded-[32px] p-6 sm:p-10 lg:p-12 shadow-2xl relative transition-all duration-500 group"
            >
              {/* Top Quotation Subtitle & Badge Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 border-b border-[#1C222B]">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-xl bg-black border border-[#2B2519] text-[#D4AF37] flex items-center justify-center font-mono font-black text-xs">
                    0{pIdx + 1}
                  </span>
                  <span className="text-[11px] font-mono text-[#8A7D5C] tracking-widest uppercase">
                    {pkg.subtitle || "3 DAYS EVENT COVERAGE QUOTATION"}
                  </span>
                </div>

                <span className="px-3.5 py-1 rounded-full text-[10px] font-mono font-black tracking-widest uppercase self-start sm:self-auto bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/30 shadow-sm">
                  {pkg.badge}
                </span>
              </div>

              {/* Main Content Layout: 60/40 Split */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 pt-8 items-start">
                
                {/* LEFT COLUMN (7 Cols / ~58%): Title, Schedule, Experience, Why Choose */}
                <div className="lg:col-span-7 space-y-8">
                  <div>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif italic text-white tracking-tight leading-tight">
                      {pkg.title}
                    </h2>
                    <p className="text-xs text-[#8A7D5C] font-mono mt-2 uppercase tracking-wider">
                      Complete 3-Day Wedding Photography & Cinematography Suite
                    </p>
                  </div>

                  {/* Event Schedule & Crew (3 Days) */}
                  <div className="space-y-3">
                    <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-[#D4AF37] uppercase block">
                      EVENT SCHEDULE & CREW DEPLOYMENT
                    </span>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {pkg.schedule?.map((dayItem, dIdx) => (
                        <div
                          key={dIdx}
                          className="bg-[#15191F] border border-[#202630] p-4 rounded-2xl space-y-2.5 flex flex-col justify-between"
                        >
                          <span className="text-[11px] font-bold text-white block border-b border-[#20252F] pb-1.5 font-sans">
                            {dayItem.day}
                          </span>
                          <div className="space-y-1.5 text-[11px]">
                            {dayItem.crew?.map((cItem, cIdx) => (
                              <div key={cIdx} className="text-[#C5B388] flex items-start gap-1.5 leading-snug">
                                <span className="text-[#D4AF37] text-[9px] shrink-0 mt-0.5">◆</span>
                                <span>{cItem}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Experience & Quality Statement */}
                  {pkg.experience && (
                    <div className="space-y-3">
                      <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-[#D4AF37] uppercase block">
                        PREMIUM EXPERIENCE & PRODUCTION VALUE
                      </span>
                      <div className="bg-[#13161C] border border-[#202630] p-4 sm:p-5 rounded-2xl space-y-2">
                        {pkg.experience.map((exp, eIdx) => (
                          <div key={eIdx} className="flex items-start gap-2.5 text-xs text-[#C5B388]">
                            <span className="text-emerald-400 font-bold shrink-0">✓</span>
                            <span className="leading-relaxed">{exp}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Why Choose 6 Badges */}
                  <div className="space-y-3 pt-2">
                    <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-[#8A7D5C] uppercase block">
                      {pkg.whyChooseTitle || "WHY CHOOSE THIS SUITE?"}
                    </span>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {pkg.whyChooseFeatures?.map((feat, fIdx) => (
                        <div
                          key={fIdx}
                          className="p-2.5 rounded-xl bg-[#14181F] border border-[#202630] text-[10px] font-mono font-semibold text-white flex items-center gap-2"
                        >
                          <span className="text-[#D4AF37]">✓</span>
                          <span className="truncate">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* RIGHT COLUMN (5 Cols / ~42%): Pricing Card, Deliverables, Timeline, CTA */}
                <div className="lg:col-span-5 bg-[#0E1013] border border-[#242A33] rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl relative lg:sticky lg:top-24">
                  
                  {/* Price Banner Container */}
                  <div className="pb-5 border-b border-[#1C212A] space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-[#8A7D5C] line-through font-mono">
                        {pkg.regularPrice}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono text-[10px] font-black uppercase">
                        {pkg.savings}
                      </span>
                    </div>

                    <div className="text-3xl sm:text-4xl font-mono font-black text-[#D4AF37] tracking-tight">
                      {pkg.offerPrice}
                    </div>
                    <span className="text-[10px] font-mono text-[#8A7D5C] block">
                      *All-inclusive crew honorarium, equipment, master edits & raw drives.
                    </span>
                  </div>

                  {/* Final Deliverables Checklist */}
                  <div className="space-y-3">
                    <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-[#D4AF37] uppercase block">
                      FINAL DELIVERABLES
                    </span>

                    <div className="space-y-2 text-xs max-h-72 overflow-y-auto pr-1">
                      {pkg.deliverables?.map((del, dIdx) => (
                        <div key={dIdx} className="flex items-start gap-2 text-[#DDD1B4] leading-snug">
                          <span className="text-[#D4AF37] text-xs shrink-0 mt-0.5">✦</span>
                          <span>{del}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Priority Delivery Timeline (if included) */}
                  {pkg.timeline && pkg.timeline.length > 0 && (
                    <div className="space-y-2.5 pt-2 border-t border-[#1C212A]">
                      <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-[#D4AF37] uppercase block">
                        PRIORITY DELIVERY TIMELINE
                      </span>
                      <div className="bg-[#14181F] p-3 rounded-2xl border border-[#202630] space-y-1.5 text-[11px] font-mono">
                        {pkg.timeline.map((tItem, tIdx) => (
                          <div key={tIdx} className="flex justify-between items-center text-[#A89D84]">
                            <span className="text-white">⏱ {tItem.item}:</span>
                            <span className="text-[#D4AF37] font-bold">{tItem.time}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Book / Commission Button */}
                  <div className="pt-2">
                    <Link className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#D4AF37] to-[#B89018] hover:from-[#F3E5AB] hover:to-[#D4AF37] text-black font-black uppercase text-xs tracking-widest transition-all shadow-xl shadow-[#D4AF37]/20 flex items-center justify-center gap-2 group-hover:scale-[1.01]" href={`/contact?pkg=${pkgKey}`}>
                      <span>COMMISSION THIS SUITE</span>
                      <span className="text-sm">↗</span>
                    </Link>
                  </div>

                </div>

              </div>

            </div>
          );
        })}
      </section>

      {/* 3. BOTTOM CUSTOM CONCIERGE BANNER */}
      <section className="pb-24 px-6 lg:px-12">
        <div className="max-w-5xl mx-auto bg-[#101317] border border-[#2B2519] rounded-[32px] p-8 sm:p-14 text-center space-y-6 shadow-2xl relative overflow-hidden">
          <div className="space-y-2">
            <span className="text-[10px] font-mono font-bold tracking-[0.3em] uppercase text-[#D4AF37] block">
              TAILORED BESPOKE PACKAGES
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif italic text-white tracking-tight">
              Custom Coverage for Multi-Day Celebrations
            </h2>
            <p className="text-xs sm:text-sm text-[#8A7D5C] max-w-xl mx-auto font-light leading-relaxed">
              Planning a destination wedding in Varanasi, Jaipur, or Bodhgaya? We curate bespoke multi-city photography and cinema suites aligned precisely with your itinerary.
            </p>
          </div>

          <div className="pt-2">
            <Link className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black text-xs font-black uppercase tracking-widest transition-all shadow-lg" href="/contact?pkg=custom">
              <span>INQUIRE ABOUT CUSTOM PACKAGE</span>
              <span>→</span>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
