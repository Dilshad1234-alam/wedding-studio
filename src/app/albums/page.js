"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function AlbumsPage() {
  const [featureSection, setFeatureSection] = useState({ badge: '', title: '', description: '', ctaText: '', imageLeft: '', imageRight: '' });
  const [editions, setEditions] = useState([]);

  useEffect(() => {
    fetch('/api/albums')
      .then(res => res.json())
      .then(data => {
        setFeatureSection(data.featureSection || {});
        setEditions(data.editions || []);
      })
      .catch(err => console.error("Error fetching albums:", err));

    const handleStorageChange = (e) => {
      if (e.key === 'weddingpur_album_deleted' && e.newValue) {
        try {
          const { id } = JSON.parse(e.newValue);
          setEditions(prev => prev.filter(album => album.id !== id));
        } catch (err) {}
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <main className="min-h-screen bg-[#0B0D0E] text-[#F5F5F5] font-sans antialiased selection:bg-[#5B6454] selection:text-white pb-24">
      
      {/* 1. WHY WEDDING ALBUMS MATTER (Feature Hero) */}
      <section className="pt-24 pb-16 px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text Box */}
          <div className="lg:col-span-5 space-y-6 text-center lg:text-left">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#D4AF37] font-black block">
              {featureSection.badge || "THE TANGIBLE LEGACY"}
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-white italic leading-tight">
              {featureSection.title || "Why Wedding Albums Matter?"}
            </h1>
            <p className="text-sm text-[#C5B388] font-light leading-relaxed tracking-wide">
              {featureSection.description}
            </p>
            <div className="pt-4">
              <a href="#editions" className="inline-block border border-[#D4AF37]/50 text-[#C5B388] hover:bg-gradient-to-r hover:from-[#F3E5AB] hover:to-[#D4AF37] hover:text-black hover:font-black hover:shadow-[0_0_20px_rgba(212,175,55,0.45)] px-8 py-3.5 rounded-full text-[10px] uppercase tracking-[0.2em] font-medium transition-all duration-300">
                {featureSection.ctaText || "EXPLORE COLLECTIONS ↓"}
              </a>
            </div>
          </div>

          {/* Right Visual Collage */}
          <div className="lg:col-span-7 flex gap-4 sm:gap-6 items-center justify-center">
            {featureSection.imageLeft && (
              <div className="w-1/2 aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl border-4 border-[#FAF8F5] transform translate-y-8">
                <img src={featureSection.imageLeft.replace('[', '').replace(']', '').split('(')[0].trim()} alt="Album Sample" className="w-full h-full object-cover" />
              </div>
            )}
            {featureSection.imageRight && (
              <div className="w-1/2 aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl border-4 border-[#FAF8F5] transform -translate-y-8">
                <img src={featureSection.imageRight.replace('[', '').replace(']', '').split('(')[0].trim()} alt="Album Details" className="w-full h-full object-cover" />
              </div>
            )}
          </div>
          
        </div>
      </section>

      {/* 2. ALBUM EDITIONS SHOWROOM */}
      <section id="editions" className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-20">
        
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl sm:text-5xl text-white italic">Curated Editions</h2>
          <div className="w-12 h-0.5 bg-[#D4AF37] mx-auto mt-6"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {editions.map((edition, idx) => (
            <div
              key={edition.id || idx}
              className="bg-[#121518] border border-[#2B2519] rounded-2xl overflow-hidden hover:border-[#D4AF37] transition-all duration-500 shadow-xl group flex flex-col justify-between"
            >
              <div>
                {edition.coverImage && (
                  <div className="w-full aspect-[4/3] bg-[#0A0A0A] overflow-hidden border-b border-[#2B2519] relative">
                    <img 
                      src={edition.coverImage.replace('[', '').replace(']', '').split('(')[0].trim()} 
                      alt={edition.title} 
                      className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                    />
                    <div className="absolute inset-0 shadow-[inset_0_-40px_40px_rgba(0,0,0,0.5)]"></div>
                  </div>
                )}
                
                <div className="p-8 text-center">
                  <h3 className="font-serif text-2xl sm:text-3xl text-white font-normal mb-1">
                    {edition.title}
                  </h3>
                  <p className="text-[9px] uppercase tracking-[0.2em] text-[#D4AF37] font-black mb-6">
                    {edition.subtitle}
                  </p>
                  
                  <div className="space-y-4 pt-4 border-t border-[#2B2519]/50 text-left">
                    {edition.material && (
                      <div className="flex items-start gap-3 text-xs">
                        <span className="text-[#D4AF37] mt-0.5 font-black">✦</span>
                        <div>
                          <span className="text-[#A89D84] uppercase text-[9px] tracking-widest block font-bold mb-0.5">Material Binding</span>
                          <span className="text-[#F5F5F5] font-light leading-snug">{edition.material}</span>
                        </div>
                      </div>
                    )}
                    {edition.specs && (
                      <div className="flex items-start gap-3 text-xs">
                        <span className="text-[#D4AF37] mt-0.5 font-black">✦</span>
                        <div>
                          <span className="text-[#A89D84] uppercase text-[9px] tracking-widest block font-bold mb-0.5">Print & Specification</span>
                          <span className="text-[#F5F5F5] font-light leading-snug">{edition.specs}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. CTA */}
      <section className="text-center pt-10">
        <Link className="inline-block px-10 py-4 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#E5C158] to-[#B89018] hover:from-[#F3E5AB] hover:to-[#D4AF37] text-black font-black text-xs uppercase tracking-[0.2em] shadow-lg shadow-[#D4AF37]/20 hover:shadow-[0_0_25px_rgba(212,175,55,0.45)] transition-all duration-300" href="/contact">
          Design Your Album
        </Link>
      </section>

    </main>
  );
}
