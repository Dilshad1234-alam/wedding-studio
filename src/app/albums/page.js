"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function AlbumsPage() {
  const [featureSection, setFeatureSection] = useState({ badge: '', title: '', description: '', ctaText: '', imageLeft: '', imageRight: '' });
  const [editions, setEditions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Smooth scroll to top instantly on mount
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }

    fetch('/api/albums')
      .then(res => res.json())
      .then(data => {
        setFeatureSection(data.featureSection || {});
        setEditions(data.editions || []);
      })
      .catch(err => console.error("Error fetching albums:", err))
      .finally(() => setLoading(false));

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
    <main className="min-h-screen bg-[#07090A] text-[#F5F5F5] font-sans antialiased selection:bg-[#D4AF37] selection:text-black pb-24 relative overflow-hidden">
      
      {/* Background Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[#D4AF37]/5 blur-[150px] pointer-events-none rounded-full" />

      {/* 1. WHY WEDDING ALBUMS MATTER (Feature Hero) */}
      <section className="pt-28 pb-20 px-6 max-w-[1440px] mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Text Box */}
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
            <span className="inline-block px-4 py-1.5 rounded-full text-[10px] uppercase tracking-[0.3em] text-[#D4AF37] font-bold bg-[#121518] border border-[#2B2519]">
              {featureSection.badge || "THE TANGIBLE LEGACY"}
            </span>
            <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl text-white italic leading-[1.1] tracking-tight drop-shadow-sm">
              {featureSection.title || "Why Wedding Albums Matter?"}
            </h1>
            <p className="text-xs sm:text-sm text-[#A89D84] font-light leading-relaxed max-w-xl mx-auto lg:mx-0">
              {featureSection.description || "In a digital world, an album remains the ultimate heirloom. Handcrafted in Italy with archival silk and fine-art cotton rag paper, our curated editions transform your sacred union into a timeless centerpiece for generations."}
            </p>
            <div className="pt-6">
              <a href="#editions" className="inline-block border border-[#D4AF37]/40 text-[#D4AF37] hover:bg-gradient-to-r hover:from-[#F3E5AB] hover:to-[#D4AF37] hover:text-black hover:border-transparent px-10 py-4 rounded-full text-xs uppercase tracking-widest font-black transition-all shadow-[0_0_20px_rgba(212,175,55,0.15)] hover:shadow-[0_0_30px_rgba(212,175,55,0.3)]">
                {featureSection.ctaText || "EXPLORE COLLECTIONS"} ↓
              </a>
            </div>
          </div>

          {/* Right Visual Collage */}
          <div className="lg:col-span-6 flex gap-4 sm:gap-6 items-center justify-center relative">
            <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF37]/10 to-transparent blur-[80px] -z-10 rounded-full" />
            
            {featureSection.imageLeft && (
              <div className="w-[45%] aspect-[3/4] rounded-[32px] overflow-hidden shadow-2xl border border-[#2B2519] transform translate-y-6 hover:-translate-y-2 transition-transform duration-700">
                <img src={featureSection.imageLeft.replace('[', '').replace(']', '').split('(')[0].trim()} alt="Album Sample" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
              </div>
            )}
            {featureSection.imageRight && (
              <div className="w-[50%] aspect-[4/5] rounded-[32px] overflow-hidden shadow-2xl border border-[#2B2519] transform -translate-y-6 hover:-translate-y-12 transition-transform duration-700">
                <img src={featureSection.imageRight.replace('[', '').replace(']', '').split('(')[0].trim()} alt="Album Details" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
              </div>
            )}
          </div>
          
        </div>
      </section>

      {/* 2. ALBUM EDITIONS SHOWROOM */}
      <section id="editions" className="w-full max-w-[1440px] mx-auto px-6 sm:px-8 py-24 relative z-10">
        
        <div className="text-center mb-20 space-y-4">
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-white italic tracking-tight">Curated Editions</h2>
          <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto"></div>
          <p className="text-[#8A7D5C] text-xs font-mono tracking-widest uppercase">Select your heirloom presentation</p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-pulse">
            {[1, 2, 3].map(n => (
              <div key={n} className="bg-[#101317] border border-[#1C222B] rounded-[32px] h-[600px]" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {editions.map((edition, idx) => (
              <div
                key={edition.id || idx}
                className="bg-[#0A0C0F] border border-[#1F252E] rounded-[36px] overflow-hidden hover:border-[#D4AF37]/50 transition-all duration-700 shadow-2xl hover:shadow-[0_20px_50px_rgba(212,175,55,0.1)] group flex flex-col justify-between relative"
              >
                <div>
                  {/* Image Header */}
                  {edition.coverImage && (
                    <div className="w-full aspect-[4/3] bg-[#000] overflow-hidden relative">
                      <img 
                        src={edition.coverImage.replace('[', '').replace(']', '').split('(')[0].trim()} 
                        alt={edition.title} 
                        className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-[1.5s] ease-out"
                      />
                      {/* Gradient overlay for smooth transition to card body */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0A0C0F] via-[#0A0C0F]/40 to-transparent"></div>
                    </div>
                  )}
                  
                  {/* Card Content */}
                  <div className="px-8 pb-10 pt-4 text-center relative z-10 -mt-10">
                    <h3 className="font-serif text-3xl sm:text-4xl text-white font-normal mb-2 tracking-tight drop-shadow-md">
                      {edition.title}
                    </h3>
                    <p className="text-[9px] uppercase tracking-[0.25em] text-[#D4AF37] font-black mb-8 drop-shadow-sm">
                      {edition.subtitle}
                    </p>
                    
                    <div className="space-y-5 text-left bg-[#101317] border border-[#1F252E] p-6 rounded-3xl group-hover:border-[#D4AF37]/20 transition-colors duration-500">
                      {edition.material && (
                        <div className="flex items-start gap-3">
                          <span className="text-[#D4AF37] mt-0.5 font-black text-[10px]">✦</span>
                          <div className="space-y-1">
                            <span className="text-[#8A7D5C] uppercase text-[9px] tracking-[0.2em] block font-bold">Material Binding</span>
                            <span className="text-[#D1C7A5] font-light text-xs leading-snug">{edition.material}</span>
                          </div>
                        </div>
                      )}
                      
                      {edition.material && edition.specs && (
                        <div className="w-full h-[1px] bg-gradient-to-r from-[#1F252E] via-[#2A313C] to-[#1F252E]"></div>
                      )}

                      {edition.specs && (
                        <div className="flex items-start gap-3">
                          <span className="text-[#D4AF37] mt-0.5 font-black text-[10px]">✦</span>
                          <div className="space-y-1">
                            <span className="text-[#8A7D5C] uppercase text-[9px] tracking-[0.2em] block font-bold">Print & Specification</span>
                            <span className="text-[#D1C7A5] font-light text-xs leading-relaxed">{edition.specs}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 3. CTA */}
      <section className="text-center pt-8 pb-10">
        <Link className="inline-block px-12 py-4 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#B89018] hover:from-[#F3E5AB] hover:to-[#D4AF37] text-black font-black text-xs uppercase tracking-widest shadow-xl shadow-[#D4AF37]/20 hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] transition-all duration-300" href="/contact?subject=Album Design">
          DESIGN YOUR ALBUM ↗
        </Link>
      </section>

    </main>
  );
}
