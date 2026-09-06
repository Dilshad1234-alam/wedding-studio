"use client";
import React from 'react';
import Link from 'next/link';

export default function AlbumsPage() {
  const albumCollections = [
    {
      name: "Essence Collection",
      subtitle: "SIMPLE AND ELEGANT, CAPTURING THE ESSENCE OF YOUR DAY.",
      price: "499",
      originalPrice: "649",
      popular: false,
      specs: [
        "Digital Press Printing (CMYK)",
        "Standard Seamless Binding",
        "Medium Thickness (150-200 GSM)",
        "Matte/Gloss Lamination",
        "20+ Premium Cover Options",
        "30 Sheets Already Included In Package"
      ]
    },
    {
      name: "Elegance Collection",
      subtitle: "WHERE ARTISANAL DESIGN MEETS THOUGHTFUL CUSTOMIZATION.",
      price: "699",
      originalPrice: "799",
      popular: false,
      specs: [
        "Digital Press Printing (CMYK)",
        "Seamless Lay-Flat Binding",
        "Medium-Heavy Thickness (200-300 GSM)",
        "Silk-Touch Lamination",
        "60+ Handcrafted Cover Options",
        "30 Sheets Already Included In Package"
      ]
    },
    {
      name: "Eternal Collection",
      subtitle: "CRAFTED WITH ARCHIVAL SILK TO BE PASSED DOWN FOR GENERATIONS.",
      price: "799",
      originalPrice: "899",
      popular: true,
      specs: [
        "True Silver Halide Printing (RGB)",
        "True 180° Lay-Flat Archival Binding",
        "Thick, Rigid Pages (300-400 GSM)",
        "Laminated & UV Scuff Coated",
        "80+ Italian Leather & Acrylic Covers",
        "30 Sheets Already Included In Package"
      ]
    }
  ];

  const ribbonAlbums = [
    { title: "JEWEL", desc: "Pure White Silk with Silver Monogram", img: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=600&q=80" },
    { title: "ACRYLIC FABRIC", desc: "Crimson Velvet & Gold Embossing", img: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80" },
    { title: "BRIO", desc: "Ochre Box with Window Cutout", img: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=600&q=80" },
    { title: "QUATRO", desc: "Minimal Slate Grey Archival Linen", img: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=600&q=80" },
    { title: "FABRO", desc: "Imperial Burgundy Leather Heirloom", img: "https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=600&q=80" }
  ];

  return (
    <main className="min-h-screen bg-[#0B0D0E] text-[#F5F5F5] font-sans antialiased selection:bg-[#5B6454] selection:text-white">
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 35s linear infinite;
        }
      `}} />
      
      {/* 1. HERO HEADER */}
      <section className="pt-10 -mt-10 pb-14 px-6 text-center max-w-4xl mx-auto">
        {/* <span className="text-[10px] uppercase tracking-[0.25em] text-[#D4AF37] font-black block  mb-3">
          HEIRLOOMS & ARTIFACTS
        </span> */}
        <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl italic font-normal text-[#F5F5F5] tracking-tight mb-4">
          Handcrafted Wedding Albums
        </h1>
        <p className="text-xs sm:text-sm text-[#C5B388] max-w-xl mx-auto font-light leading-relaxed">
          Physical heirlooms bound in Italian leather, linen, and museum-grade archival cotton paper—crafted to keep your memories vivid for a century.
        </p>
      </section>

      {/* 2. WHY WEDDING ALBUMS MATTER (SPLIT EDITORIAL SPREAD) */}
      <section className="w-full max-w-[1536px] mx-auto px-4 sm:px-8 lg:px-12 py-8 sm:py-12 mb-24">
        <div className="bg-[#121518] border border-[#2B2519] rounded-3xl p-6 sm:p-14 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Image Spread */}
            <div className="lg:col-span-6 grid grid-cols-2 gap-4">
              <div className="relative aspect-square rounded-2xl overflow-hidden shadow-md bg-[#121518]">
                <img
                  src="https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80"
                  alt="Gold Boxed Heirloom Album"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="relative aspect-square rounded-2xl overflow-hidden shadow-md bg-[#121518]">
                <img
                  src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80"
                  alt="Couple Cherishing Album"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>

            {/* Content */}
            <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#D4AF37] font-black block ">
                THE TANGIBLE LEGACY
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl italic font-normal text-[#F5F5F5] leading-tight">
                Why Wedding Albums Matter?
              </h2>
              <p className="text-xs sm:text-sm text-[#C5B388] leading-relaxed font-light">
                Imagine holding in your hands a timeless keepsake filled with laughter, love, and cherished memories. A wedding album is more than just pictures; it's a tangible piece of your history, a legacy to share with generations to come.
              </p>
              <p className="text-xs sm:text-sm text-[#C5B388] leading-relaxed font-light">
                Let us transform your digital images into a heartfelt keepsake that captures the essence of your special day. Relive the magic, the love, and the joy through the pages of your personalized wedding album.
              </p>
              <div className="pt-2">
                <a
                  href="#pricing"
                  className="inline-block border border-[#D4AF37]/50 text-[#C5B388] hover:bg-gradient-to-r hover:from-[#F3E5AB] hover:to-[#D4AF37] hover:text-black hover:font-black hover:shadow-[0_0_20px_rgba(212,175,55,0.45)] px-8 py-3 rounded-full text-xs uppercase tracking-[0.2em] font-medium transition-all duration-300 cursor-pointer"
                >
                  Explore Collections ↓
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2.5 ALBUM RIBBON SHOWCASE (INFINITE SCROLL) */}
      <section className="w-full overflow-hidden mb-24 py-16 bg-[#121518] border-y border-[#2B2519]">
        <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
          {[...ribbonAlbums, ...ribbonAlbums].map((album, idx) => (
            <div 
              key={idx} 
              className="group relative flex-shrink-0 w-72 sm:w-80 mx-4 bg-[#121518] rounded-3xl overflow-hidden border border-[#2B2519] shadow-xl hover:shadow-2xl hover:border-[#D4AF37]/40 transition-all duration-500 hover:-translate-y-2 hover:scale-105 cursor-pointer"
            >
              <div className="aspect-[4/5] relative bg-[#121518]">
                <img 
                  src={album.img} 
                  alt={album.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-500"></div>
                <div className="absolute bottom-6 left-6 right-6 text-white transform group-hover:-translate-y-2 transition-transform duration-500">
                  <h3 className="font-serif text-3xl italic tracking-wide mb-1 text-[#FAF8F5] drop-shadow-md">{album.title}</h3>
                  <p className="text-[10px] text-white/90 uppercase tracking-widest font-medium drop-shadow-xl">{album.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. WHY CHOOSE A HIGH-QUALITY ALBUM? */}
      <section className="px-6 sm:px-12 max-w-6xl mx-auto mb-24">
        <div className="text-center mb-14">
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#D4AF37] font-black block  mb-2">
            MUSEUM STANDARDS
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl italic font-normal text-[#F5F5F5]">
            Why Choose a High-Quality Album?
          </h2>
          <div className="w-16 h-[1px] bg-[#5B6454]/40 mx-auto mt-4"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="bg-[#121518] rounded-3xl p-8 border border-[#2B2519] shadow-xl flex flex-col items-center">
            <span className="text-3xl mb-4">💎</span>
            <h3 className="font-serif text-xl text-[#F5F5F5] mb-3">Durable Materials</h3>
            <p className="text-xs text-[#C5B388] font-light leading-relaxed">
              Professional albums are made with archival paper and fade-resistant inks to ensure your images remain vibrant and crystal clear for decades.
            </p>
          </div>

          <div className="bg-[#121518] rounded-3xl p-8 border border-[#2B2519] shadow-xl flex flex-col items-center">
            <span className="text-3xl mb-4">✨</span>
            <h3 className="font-serif text-xl text-[#F5F5F5] mb-3">Elegant Design</h3>
            <p className="text-xs text-[#C5B388] font-light leading-relaxed">
              With premium binding, cover materials like Italian leather or organic linen, and custom foil options, a high-quality album becomes a true work of art.
            </p>
          </div>

          <div className="bg-[#121518] rounded-3xl p-8 border border-[#2B2519] shadow-xl flex flex-col items-center">
            <span className="text-3xl mb-4">🏛️</span>
            <h3 className="font-serif text-xl text-[#F5F5F5] mb-3">Lasting Legacy</h3>
            <p className="text-xs text-[#C5B388] font-light leading-relaxed">
              Unlike digital files that can get lost, corrupted, or forgotten on hard drives, a physical album gives you a reliable heirloom to revisit anytime.
            </p>
          </div>
        </div>
      </section>

      {/* 4. THREE ALBUM PRICING CARDS */}
      <section id="pricing" className="py-20 px-6 sm:px-12 bg-[#121518] border-t border-b border-[#2B2519] scroll-mt-20">
        <div className="w-full max-w-[1536px] mx-auto px-4 sm:px-8 lg:px-12 py-8 sm:py-12">
          
          <div className="text-center mb-16">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#D4AF37] font-black block  mb-2">
              BESPOKE PRINTING TIERS
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl italic font-normal text-[#F5F5F5]">
              Album Collections & Pricing
            </h2>
            <p className="text-xs text-[#C5B388] tracking-[0.2em] uppercase mt-2">
              All collections include 30 luxury printed sheets
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {albumCollections.map((col, idx) => (
              <div
                key={idx}
                className={`relative rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 ${
                  col.popular
                    ? 'bg-[#121518] border-2 border-[#D4AF37] shadow-xl shadow-[#D4AF37]/10 md:-translate-y-2'
                    : 'bg-[#121518] border border-[#2B2519] shadow-xl hover:shadow-md'
                }`}
              >
                {col.popular && (
                  <span className="absolute -top-3.5 right-6 bg-gradient-to-r from-[#D4AF37] to-[#B89018] text-black text-[9px] uppercase tracking-[0.25em] font-bold px-4 py-1 rounded-full shadow-md shadow-[#D4AF37]/20">
                    MOST POPULAR
                  </span>
                )}

                <div>
                  <div className="pb-6 border-b border-[#2B2519] text-center">
                    <h3 className="font-serif text-2xl sm:text-3xl text-[#F5F5F5] mb-2 font-normal">
                      {col.name}
                    </h3>
                    <p className="text-[10px] text-[#C5B388] tracking-wider uppercase min-h-[32px] flex items-center justify-center font-light">
                      {col.subtitle}
                    </p>
                    
                    <div className="mt-6 flex items-baseline justify-center gap-2">
                      <span className="text-xs text-[#C5B388] line-through font-mono">₹{col.originalPrice}</span>
                      <span className="text-4xl font-serif text-[#F5F5F5] font-medium">₹{col.price}</span>
                      <span className="text-[10px] uppercase tracking-widest text-[#D4AF37]">/ sheet</span>
                    </div>
                  </div>

                  <ul className="py-8 space-y-3.5 text-left">
                    {col.specs.map((spec, sIdx) => (
                      <li key={sIdx} className="flex items-start gap-2.5 text-xs text-[#C5B388] font-light">
                        <span className="text-[#D4AF37] font-bold text-xs mt-0.5">✓</span>
                        <span>{spec}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-[#2B2519] text-center">
                  <Link 
                    className={`block w-full py-3.5 rounded-full text-xs uppercase tracking-[0.2em] font-medium transition-all duration-300 shadow-xl cursor-pointer ${
                      col.popular
                        ? 'bg-gradient-to-r from-[#D4AF37] via-[#E5C158] to-[#B89018] hover:from-[#F3E5AB] hover:to-[#D4AF37] text-black font-black shadow-lg shadow-[#D4AF37]/20 hover:shadow-[0_0_25px_rgba(212,175,55,0.45)] active:scale-[0.98]'
                        : 'border border-[#D4AF37]/50 text-[#C5B388] hover:bg-gradient-to-r hover:from-[#F3E5AB] hover:to-[#D4AF37] hover:text-black hover:font-black hover:shadow-[0_0_20px_rgba(212,175,55,0.45)]'
                    }`} 
                    href="/contact"
                  >
                    Select & Customize
                  </Link>
                  <span className="text-[9px] text-[#C5B388] uppercase tracking-wider block mt-3">
                    30 Sheets Already Included in Package
                  </span>
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 5. CLIENT ALBUM PRAISE & FOOTER BUFFER */}
      <section className="pt-20 pb-28 px-6 sm:px-12 max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#D4AF37] font-black block  mb-2">
            IN THEIR HANDS
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl italic text-[#F5F5F5]">
            Nothing Tells the Story Better
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-[#121518] p-8 rounded-3xl border border-[#2B2519] shadow-xl">
            <div className="text-[#D4AF37] text-sm mb-3">★★★★★</div>
            <p className="text-xs sm:text-sm text-[#C5B388] italic leading-relaxed mb-6 font-light">
              "We weren't sure if we wanted a wedding album at first, but after receiving ours, we couldn't be happier! The quality is amazing, and it captures the essence of our day so perfectly. It's something we can show our children one day."
            </p>
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider block text-[#F5F5F5]">
                Prerna & Himanshu
              </span>
              <span className="text-[10px] text-[#C5B388] tracking-wide">
                Patna • Custom Leather Album
              </span>
            </div>
          </div>

          <div className="bg-[#121518] p-8 rounded-3xl border border-[#2B2519] shadow-xl">
            <div className="text-[#D4AF37] text-sm mb-3">★★★★★</div>
            <p className="text-xs sm:text-sm text-[#C5B388] italic leading-relaxed mb-6 font-light">
              "The customization options allowed us to create an album that really felt like 'us.' We love the leather cover with our initials, and the layout is beautifully done. Every time we flip through it, we relive the magic of our wedding day."
            </p>
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider block text-[#F5F5F5]">
                Aparna & Abhinav
              </span>
              <span className="text-[10px] text-[#C5B388] tracking-wide">
                Delhi • Lay-Flat Eternal Album
              </span>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
