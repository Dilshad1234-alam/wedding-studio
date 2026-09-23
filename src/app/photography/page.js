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

  const [galleryItems, setGalleryItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  React.useEffect(() => {
    fetch('/api/photography', { cache: 'no-store' })
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          const mappedData = data.map(item => {
            let catKey = 'wedding';
            if (item.category === 'Pre-Wedding') catKey = 'pre-wedding';
            else if (item.category === 'Haldi & Sangeet') catKey = 'haldi-sangeet';
            
            return {
              id: item._id || item.id,
              title: item.title,
              category: catKey,
              location: item.location,
              img: item.imageUrl
            };
          });
          setGalleryItems(mappedData);
        }
        setIsLoading(false);
      })
      .catch(err => {
        console.error("Error fetching photography:", err);
        setIsLoading(false);
      });
  }, []);

  const filteredItems = activeFilter === 'all'
    ? galleryItems
    : galleryItems.filter(item => item.category === activeFilter);

  return (
    <main className="min-h-screen bg-[#0B0D0E] text-[#F5F5F5] font-sans antialiased selection:bg-[#5B6454] selection:text-white">
      
      {/* 1. PORTFOLIO HERO HEADER */}
      <section className="pt-2 sm:pt-6 pb-2 sm:pb-8 px-6 text-center max-w-4xl mx-auto">
        <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl italic font-normal text-[#F5F5F5] tracking-tight mb-2">
          Recent Captures
        </h1>

        {/* Category Pill Filters (Horizontal Scroll on Mobile) */}
        <div className="flex overflow-x-auto w-full gap-3 mt-6 sm:mt-10 pb-2 justify-start sm:justify-center px-1 sm:px-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {categories.map((cat) => {
            const isActive = activeFilter === cat.key;
            return (
              <button
                key={cat.key}
                onClick={() => setActiveFilter(cat.key)}
                className={`shrink-0 px-6 py-2.5 rounded-full text-[11px] uppercase tracking-[0.2em] font-medium transition-all duration-300 cursor-pointer ${
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
      <section className="w-full max-w-[1536px] mx-auto px-4 sm:px-8 lg:px-12 pt-4 sm:pt-6 pb-12">
        {isLoading ? (
          <div className="flex justify-center items-center py-20 text-[#D4AF37]">
            Loading...
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="flex justify-center items-center py-20 text-[#C5B388]">
            No captures available in this category.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {filteredItems.map((item) => (
              <Link
                href={`/photography/${item.id}`}
                key={item.id}
                className="group flex flex-col justify-between bg-[#121518] rounded-3xl p-3 border border-[#2B2519] shadow-xl hover:shadow-xl hover:border-[#D4AF37]/40 transition-all duration-500 block"
              >
                {/* Strict aspect ratio container locks every card to the identical height */}
                <div className="relative block aspect-[4/5] w-full rounded-2xl overflow-hidden bg-[#121518]">
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
                </Link>

                {/* Premium Card Details Below Image */}
                <div className="pt-5 pb-3 px-2 sm:px-3 flex items-center justify-between gap-4">
                  <div className="flex flex-col">
                    <p className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.25em] text-[#D4AF37] mb-1.5">
                      {item.location || 'Wedding Event'}
                    </p>
                    <h4 className="font-serif text-xl sm:text-2xl text-[#F5F5F5] group-hover:text-[#D4AF37] transition-colors duration-300 leading-tight">
                      {item.title}
                    </h4>
                  </div>
                  <div 
                    aria-label="View Project" 
                    className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-[#D4AF37]/30 bg-[#0B0D0E] flex items-center justify-center text-[#D4AF37] hover:bg-gradient-to-r hover:from-[#F3E5AB] hover:to-[#D4AF37] hover:text-black hover:border-transparent hover:shadow-[0_0_15px_rgba(212,175,55,0.4)] transition-all duration-300 text-sm sm:text-base group-hover:scale-110" 
                  >
                    ↗
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

    </main>
  );
}