"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function ServicesPage() {
  const [packages, setPackages] = useState([]);
  const [activeTabId, setActiveTabId] = useState(1);
  const [loading, setLoading] = useState(true);

  const fetchPackages = async () => {
    try {
      const res = await fetch('/api/services', { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        setPackages(data);
        if (data.length > 0) {
          setActiveTabId(data[0].id);
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
    const t = (title || '').toLowerCase();
    if (t.includes('standard')) return 'standard';
    if (t.includes('silver')) return 'silver';
    if (t.includes('gold')) return 'gold';
    return 'luxury';
  };

  return (
    <div className="min-h-screen bg-[#07090A] text-[#F5F5F5] font-sans antialiased selection:bg-[#D4AF37] selection:text-black">
      
      {/* 1. HERO HEADER */}
      <section className=" pb-12 px-4 sm:px-8 lg:px-12 text-center relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-[#D4AF37]/5 blur-[140px] pointer-events-none rounded-full" />
        
        <div className="max-w-4xl mx-auto space-y-4 relative z-10">
          {/* <span className="inline-block px-4 py-1.5 rounded-full text-[10px] font-mono font-bold tracking-[0.3em] uppercase bg-[#121518] text-[#D4AF37] border border-[#2B2519]">
            TRANSPARENT WEDDING INVESTMENTS
          </span> */}
          <h1 className="text-4xl sm:text-6xl font-serif italic text-white tracking-tight">
            Studio Offerings & Suites
          </h1>
          <p className="text-xs sm:text-sm text-[#9E927A] font-light max-w-2xl mx-auto leading-relaxed">
            Bespoke visual craftsmanship, fine-art stills, and master 4K cinema tailored for multi-day royal heirlooms across Bihar & beyond.
          </p>
        </div>

        {/* Executive 4-Pill Plan Switcher (Zero Scrollbar) */}
        {packages.length > 0 && (
          <div className="max-w-5xl mx-auto mt-10 grid grid-cols-2 sm:grid-cols-4 gap-2.5 p-2 bg-[#101317] border border-[#222832] rounded-2xl">
            {packages.map((pkg) => {
              const isActive = activeTabId === pkg.id;
              return (
                <button
                  key={pkg.id}
                  type="button"
                  onClick={() => {
                    setActiveTabId(pkg.id);
                    const el = document.getElementById(`suite-${pkg.id}`);
                    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                  className={`py-3 px-3 rounded-xl text-xs font-mono font-bold uppercase transition-all flex flex-col items-center justify-center gap-1 cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-[#D4AF37] to-[#B89018] text-black font-black shadow-lg shadow-[#D4AF37]/20'
                      : 'bg-[#15191F] text-[#A89D84] hover:text-white hover:bg-[#1A2027] border border-[#222832]'
                  }`}
                >
                  <span className="text-[11px] truncate">{pkg.title.split('(')[0].trim()}</span>
                  <span className={`text-xs ${isActive ? 'text-black font-black' : 'text-[#D4AF37]'}`}>
                    {pkg.offerPrice}
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </section>

      {/* PACKAGE CARD (VIEWPORT-FIT ARCHITECTURE) */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-8 pb-16 space-y-12">
        {packages.map((pkg, pIdx) => {
          const pkgKey = getPackageKey(pkg.title);

          return (
            <div
              key={pkg.id}
              id={`suite-${pkg.id}`}
              className="w-full bg-[#0E1114] border border-[#222832] hover:border-[#D4AF37]/50 rounded-[28px] p-6 lg:p-8 shadow-2xl relative transition-all duration-300"
            >
              {/* 1. COMPACT TOP HEADER BAR */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#1C222B]">
                <div className="flex items-center gap-2.5">
                  <span className="w-7 h-7 rounded-lg bg-[#0B0D0E] border border-[#2B2519] text-[#D4AF37] flex items-center justify-center font-mono font-black text-xs">
                    0{pIdx + 1}
                  </span>
                  <span className="text-[10px] font-mono text-[#8A7D5C] tracking-widest uppercase">
                    {pkg.subtitle || "3 DAYS EVENT COVERAGE QUOTATION"}
                  </span>
                </div>

                <span className="px-3 py-1 rounded-full text-[9px] font-mono font-black tracking-widest uppercase bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/30">
                  {pkg.badge}
                </span>
              </div>

              {/* 2. MAIN 2-COLUMN VIEW (LEFT: CREW & EXP | RIGHT: PRICE & DELIVERABLES) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 pt-5 items-start">
                
                {/* LEFT COLUMN (7 Cols / ~58%) */}
                <div className="lg:col-span-7 space-y-4">
                  {/* Title & Subtitle */}
                  <div>
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif italic text-white tracking-tight leading-snug">
                      {pkg.title}
                    </h2>
                    <p className="text-[10px] text-[#8A7D5C] font-mono uppercase tracking-wider mt-0.5">
                      COMPLETE 3-DAY WEDDING PHOTOGRAPHY & CINEMATOGRAPHY SUITE
                    </p>
                  </div>

                  {/* Event Schedule (3 Day Cards) */}
                  <div className="space-y-1.5">
                    <span className="text-[9px] font-mono font-bold tracking-widest text-[#D4AF37] uppercase block">
                      EVENT SCHEDULE & CREW DEPLOYMENT
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                      {pkg.schedule?.map((dayItem, dIdx) => (
                        <div
                          key={dIdx}
                          className="bg-[#13161C] border border-[#1F2530] p-3 rounded-xl space-y-1.5"
                        >
                          <span className="text-[11px] font-bold text-white block border-b border-[#20252F] pb-1 font-sans">
                            {dayItem.day}
                          </span>
                          <div className="space-y-1 text-[10px]">
                            {dayItem.crew?.map((cItem, cIdx) => (
                              <div key={cIdx} className="text-[#C5B388] flex items-start gap-1 leading-tight">
                                <span className="text-[#D4AF37] text-[8px] shrink-0 mt-0.5">◆</span>
                                <span>{cItem}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Premium Experience Statement (Compact) */}
                  {pkg.experience && (
                    <div className="space-y-1.5">
                      <span className="text-[9px] font-mono font-bold tracking-widest text-[#D4AF37] uppercase block">
                        PREMIUM EXPERIENCE & PRODUCTION VALUE
                      </span>
                      <div className="bg-[#12151B] border border-[#1F2530] p-3 rounded-xl grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                        {pkg.experience.map((exp, eIdx) => (
                          <div key={eIdx} className="flex items-center gap-1.5 text-[11px] text-[#C5B388]">
                            <span className="text-emerald-400 font-bold shrink-0 text-xs">✓</span>
                            <span className="truncate">{exp}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Why Choose 6 Badges (Compact Pill Row) */}
                  <div className="space-y-1.5">
                    <span className="text-[9px] font-mono font-bold tracking-widest text-[#8A7D5C] uppercase block">
                      {pkg.whyChooseTitle || "WHY CHOOSE THIS SUITE?"}
                    </span>
                    <div className="grid grid-cols-3 gap-1.5">
                      {pkg.whyChooseFeatures?.map((feat, fIdx) => (
                        <div
                          key={fIdx}
                          className="py-1.5 px-2 rounded-lg bg-[#12151B] border border-[#1F2530] text-[9px] font-mono text-white flex items-center gap-1.5 truncate"
                        >
                          <span className="text-[#D4AF37] text-[10px]">✓</span>
                          <span className="truncate">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* RIGHT COLUMN (5 Cols / ~42%) */}
                <div className="lg:col-span-5 bg-[#090B0D] border border-[#202630] rounded-2xl p-5 space-y-4">
                  
                  {/* Price Header (Inline Compact) */}
                  <div className="flex items-end justify-between border-b border-[#1A2028] pb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-xs text-[#8A7D5C] line-through font-mono">
                          {pkg.regularPrice}
                        </span>
                        <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono text-[9px] font-black uppercase">
                          {pkg.savings}
                        </span>
                      </div>
                      <div className="text-3xl sm:text-4xl font-mono font-black text-[#D4AF37] tracking-tight leading-none">
                        {pkg.offerPrice}
                      </div>
                    </div>
                    <span className="text-[9px] font-mono text-[#8A7D5C] text-right max-w-[130px] leading-tight">
                      *All-inclusive crew & equipment
                    </span>
                  </div>

                  {/* Final Deliverables in 2-Column Grid (NO SCROLLBAR, FITS PERFECTLY) */}
                  <div className="space-y-2">
                    <span className="text-[9px] font-mono font-bold tracking-widest text-[#D4AF37] uppercase block">
                      FINAL DELIVERABLES ({pkg.deliverables?.length || 0} ASSETS)
                    </span>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-3 gap-y-1.5 text-[11px]">
                      {pkg.deliverables?.map((del, dIdx) => (
                        <div key={dIdx} className="flex items-start gap-1.5 text-[#D1C7A5] leading-tight">
                          <span className="text-[#D4AF37] text-[9px] shrink-0 mt-0.5">✦</span>
                          <span className="truncate" title={del}>{del}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Priority Timeline Compact Strip (if applicable) */}
                  {pkg.timeline && pkg.timeline.length > 0 && (
                    <div className="pt-2 border-t border-[#1A2028] flex items-center justify-between text-[10px] font-mono text-[#8A7D5C]">
                      <span>⏱ Preview: <strong className="text-white">{pkg.timeline[0]?.time || '24 Hrs'}</strong></span>
                      <span>⏱ Teaser: <strong className="text-white">{pkg.timeline[1]?.time || '48 Hrs'}</strong></span>
                      <span>⏱ Full: <strong className="text-white">{pkg.timeline[3]?.time || '20-30 Days'}</strong></span>
                    </div>
                  )}

                  {/* CTA Button */}
                  <div className="pt-1">
                    <Link className="w-full py-3 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B89018] hover:from-[#F3E5AB] hover:to-[#D4AF37] text-black font-black uppercase text-xs tracking-widest transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer" href={`/contact?pkg=${pkgKey}`}>
                      <span>COMMISSION THIS SUITE</span>
                      <span>↗</span>
                    </Link>
                  </div>

                </div>

              </div>

            </div>
          );
        })}
      </section>

      {/* 3. BOTTOM CONCIERGE BANNER */}
      <section className="pb-24 px-4 sm:px-8 lg:px-12">
        <div className="max-w-[1440px] mx-auto bg-[#101317] border border-[#2B2519] rounded-[32px] p-8 sm:p-14 text-center space-y-6 shadow-2xl relative overflow-hidden">
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
            <Link className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black text-xs font-black uppercase tracking-widest transition-all shadow-lg cursor-pointer" href="/contact?pkg=custom">
              <span>INQUIRE ABOUT CUSTOM PACKAGE</span>
              <span>→</span>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
