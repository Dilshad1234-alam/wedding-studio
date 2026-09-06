"use client";
import React, { useState } from 'react';
import Link from 'next/link';

export default function PortfolioPage() {
  const [activeFilter, setActiveFilter] = useState('all');

  const categories = [
    { label: "ALL WORKS", key: "all" },
    { label: "WEDDING", key: "wedding" },
    { label: "PRE-WEDDING", key: "pre-wedding" },
    { label: "HALDI & SANGEET", key: "haldi-sangeet" }
  ];

  const galleryItems = [
    {
      title: "Royal Rajputana Vows",
      category: "wedding",
      location: "Jaipur Palace",
      img: "https://ik.imagekit.io/Dilshad/Cafe/Yatrikit/wedding-studio/wedding-editorial-shoot-weddingpur-scaled-e1773261531589.jpg"
    },
    {
      title: "Monsoon Garland Celebration",
      category: "wedding",
      location: "Patna Greens",
      img: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=85"
    },
    {
      title: "Heirloom Bridal Jewelry",
      category: "wedding",
      location: "Heritage Courtyard",
      img: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1000&q=85"
    },
    {
      title: "Golden Hour Whispers",
      category: "pre-wedding",
      location: "Varanasi Ghats",
      img: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1000&q=85"
    },
    {
      title: "Marigold Symphony",
      category: "haldi-sangeet",
      location: "Shangri-La Palace",
      img: "https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=1000&q=85"
    },
    {
      title: "Midnight Sangeet Beats",
      category: "haldi-sangeet",
      location: "Hotel Maurya",
      img: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=1000&q=85"
    },
    {
      title: "Timeless Traditions",
      category: "wedding",
      location: "Udaipur Fort",
      img: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1000&q=85"
    },
    {
      title: "Ethereal Moments",
      category: "pre-wedding",
      location: "Taj Lake Palace",
      img: "https://images.unsplash.com/photo-1545232979-8bf68ee9b1af?auto=format&fit=crop&w=1000&q=85"
    },
    {
      title: "Royal Rajputana Vows",
      category: "wedding",
      location: "Jaipur Palace",
      img: "https://ik.imagekit.io/Dilshad/Cafe/Yatrikit/wedding-studio/wedding-editorial-shoot-weddingpur-scaled-e1773261531589.jpg"
    },
    {
      title: "Monsoon Garland Celebration",
      category: "wedding",
      location: "Patna Greens",
      img: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=85"
    },
    {
      title: "Heirloom Bridal Jewelry",
      category: "wedding",
      location: "Heritage Courtyard",
      img: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1000&q=85"
    },
    {
      title: "Golden Hour Whispers",
      category: "pre-wedding",
      location: "Varanasi Ghats",
      img: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1000&q=85"
    },
        {
      title: "Marigold Symphony",
      category: "haldi-sangeet",
      location: "Shangri-La Palace",
      img: "https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=1000&q=85"
    },
    {
      title: "Midnight Sangeet Beats",
      category: "haldi-sangeet",
      location: "Hotel Maurya",
      img: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=1000&q=85"
    },
    {
      title: "Timeless Traditions",
      category: "wedding",
      location: "Udaipur Fort",
      img: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1000&q=85"
    },
    {
      title: "Ethereal Moments",
      category: "pre-wedding",
      location: "Taj Lake Palace",
      img: "https://images.unsplash.com/photo-1545232979-8bf68ee9b1af?auto=format&fit=crop&w=1000&q=85"
    },
  ];

  const filteredItems = activeFilter === 'all'
    ? galleryItems
    : galleryItems.filter(item => item.category === activeFilter);

  return (
    <main className="min-h-screen bg-[#0B0D0E] text-[#F5F5F5] font-sans antialiased selection:bg-[#5B6454] selection:text-white">
      
      {/* 1. PORTFOLIO HERO HEADER */}
      <section className=" pb-12 px-6 text-center max-w-4xl mx-auto">
        {/* <span className="text-[10px] uppercase tracking-[0.25em] text-[#D4AF37] font-black block  mb-3">
          PORTFOLIO
        </span> */}
        <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl italic font-normal text-[#F5F5F5] tracking-tight mb-4">
          Recent Captures
        </h1>

        {/* Category Pill Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mt-10">
          {categories.map((cat) => {
            const isActive = activeFilter === cat.key;
            return (
              <button
                key={cat.key}
                onClick={() => setActiveFilter(cat.key)}
                className={`px-6 py-2 rounded-full text-[11px] uppercase tracking-[0.2em] font-medium transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-[#D4AF37] to-[#B89018] text-black font-black shadow-md shadow-[#D4AF37]/20 border-transparent'
                    : 'bg-[#121518] border border-[#2B2519] text-[#C5B388] hover:text-white hover:border-[#D4AF37]/40'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </section>

      {/* 2. BALANCED GALLERY GRID (UNIFORM HEIGHT & CLEAN BOTTOM MARGIN) */}
      <section className="w-full max-w-[1536px] mx-auto px-4 sm:px-8 lg:px-12 py-8 sm:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {filteredItems.map((item, idx) => (
            <div
              key={idx}
              className="group flex flex-col justify-between bg-[#121518] rounded-3xl p-3 border border-[#2B2519] shadow-xl hover:shadow-xl hover:border-[#D4AF37]/40/40 transition-all duration-500"
            >
              {/* Strict aspect ratio container locks every card to the identical height */}
              <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden bg-[#121518]">
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                
                {/* Subtle vignette hover gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <div className="text-white">
                    <span className="text-[10px] uppercase tracking-widest text-[#C5B388]/80 block">
                      {item.location}
                    </span>
                    <h3 className="font-serif text-2xl italic">{item.title}</h3>
                  </div>
                </div>
              </div>

              {/* Minimalist Card Details Below Image */}
              <div className="pt-4 pb-2 px-3 flex items-center justify-between">
                <div>
                  <h4 className="font-serif text-lg text-[#F5F5F5] group-hover:text-[#D4AF37] transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-[10px] uppercase tracking-widest text-[#C5B388]">
                    {item.location}
                  </p>
                </div>
                <Link aria-label="Book a shoot" className="w-9 h-9 rounded-full border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37] hover:bg-gradient-to-r hover:from-[#F3E5AB] hover:to-[#D4AF37] hover:text-black hover:shadow-[0_0_15px_rgba(212,175,55,0.45)] transition-all text-xs" href="/contact">
                  ↗
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

    </main>
  );
}