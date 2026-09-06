"use client";
import React, { useState } from 'react';
import Link from 'next/link';

export default function FilmsPage() {
  const [activeCategory, setActiveCategory] = useState('all');

  // Hero showcase films mapped to each category
  const heroShowcases = {
    all: {
      tag: "FEATURED MASTER REEL • 4K UHD",
      title: "A Royal Affair in Udaipur — Arjun & Maya",
      location: "CITY PALACE & LAKE PICHOLA, UDAIPUR",
      duration: "18:40 MIN",
      img: "https://ik.imagekit.io/Dilshad/Cafe/Yatrikit/wedding-studio/wedding-editorial-shoot-weddingpur-scaled-e1773261531589.jpg",
      youtubeUrl: "https://www.youtube.com/@WeddingPur"
    },
    teasers: {
      tag: "CINEMATIC TEASER • 4K UHD",
      title: "Aditya & Riya's Sacred Pheras",
      location: "TAJ NADESAR PALACE, VARANASI",
      duration: "04:12 MIN",
      img: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1400&q=85",
      youtubeUrl: "https://www.youtube.com/@WeddingPur"
    },
    feature: {
      tag: "FULL CINEMA FEATURE • 4K UHD",
      title: "Sandhya & Pratik — Forever Beginnings",
      location: "VISHWANATH FARMS, PATNA",
      duration: "24:30 MIN",
      img: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1400&q=85",
      youtubeUrl: "https://www.youtube.com/@WeddingPur"
    },
    'pre-wedding': {
      tag: "PRE-WEDDING CINEMA • 4K UHD",
      title: "Ghats of Eternity — Whispers of Ganga",
      location: "ASSI GHAT & CHET SINGH FORT, VARANASI",
      duration: "02:50 MIN",
      img: "https://images.unsplash.com/photo-1545232979-8bf68ee9b1af?auto=format&fit=crop&w=1400&q=85",
      youtubeUrl: "https://www.youtube.com/@WeddingPur"
    }
  };

  const categories = [
    { label: "ALL FILMS", key: "all" },
    { label: "CINEMATIC TEASERS", key: "teasers" },
    { label: "FEATURE FILMS", key: "feature" },
    { label: "PRE-WEDDING CINEMA", key: "pre-wedding" }
  ];

  const filmsList = [
    {
      title: "Aditya & Riya's Royal Pheras",
      location: "TAJ NADESAR PALACE, VARANASI",
      duration: "04:12 MIN",
      category: "teasers",
      quality: "4K UHD",
      img: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=85",
      youtubeUrl: "https://www.youtube.com/@WeddingPur"
    },
    {
      title: "Karan & Naina's Haldi Beats",
      location: "UMAID BHAWAN PALACE, JODHPUR",
      duration: "03:45 MIN",
      category: "teasers",
      quality: "4K UHD",
      img: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1000&q=85",
      youtubeUrl: "https://www.youtube.com/@WeddingPur"
    },
    {
      title: "Sandhya & Pratik — Forever Beginnings",
      location: "VISHWANATH FARMS, PATNA",
      duration: "24:30 MIN",
      category: "feature",
      quality: "4K CINEMA",
      img: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1000&q=85",
      youtubeUrl: "https://www.youtube.com/@WeddingPur"
    },
    {
      title: "Pankaj & Shritika's Treasured Symphony",
      location: "SHANGRI-LA PALACE, PATNA",
      duration: "03:20 MIN",
      category: "teasers",
      quality: "4K UHD",
      img: "https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=1000&q=85",
      youtubeUrl: "https://www.youtube.com/@WeddingPur"
    },
    {
      title: "Sneha & Rahul's Sacred Vows",
      location: "TAJ PALACE, PATNA",
      duration: "28:15 MIN",
      category: "feature",
      quality: "4K CINEMA",
      img: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=1000&q=85",
      youtubeUrl: "https://www.youtube.com/@WeddingPur"
    },
    {
      title: "Ghats of Eternity — Pre-Wedding Film",
      location: "ASSI GHAT, VARANASI",
      duration: "02:50 MIN",
      category: "pre-wedding",
      quality: "4K UHD",
      img: "https://images.unsplash.com/photo-1545232979-8bf68ee9b1af?auto=format&fit=crop&w=1000&q=85",
      youtubeUrl: "https://www.youtube.com/@WeddingPur"
    }
  ];

  const currentHero = heroShowcases[activeCategory] || heroShowcases.all;

  const filteredFilms = activeCategory === 'all'
    ? filmsList
    : filmsList.filter(film => film.category === activeCategory);

  return (
    <main className="min-h-screen bg-[#FAF8F5] text-[#1E221D] font-sans antialiased selection:bg-[#5B6454] selection:text-white">
      
      {/* 1. CINEMA HEADER */}
      <section className="pt-0 -mt-10 pb-10 px-6 text-center max-w-4xl mx-auto">
  
        <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl italic font-normal text-[#1E221D] tracking-tight mb-4">
          Moving Portraits
        </h1>
        <p className="text-xs sm:text-sm text-[#525B4C] max-w-xl mx-auto font-light leading-relaxed">
          We don't just record events; we weave emotions, spoken vows, and subtle glances into a cinematic documentary that feels like a timeless movie.
        </p>

        {/* Category Pill Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mt-10">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.key;
            return (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`px-6 py-2 rounded-full text-[11px] uppercase tracking-[0.2em] font-medium transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'bg-[#5B6454] text-[#FAF8F5] shadow-sm'
                    : 'border border-[#DDD7CD] text-[#7A8275] hover:border-[#5B6454] hover:text-[#5B6454]'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </section>

      {/* 2. DYNAMIC FEATURED HERO SHOWCASE (CHANGES WITH ACTIVE CATEGORY) */}
      <section className="px-6 sm:px-12 max-w-7xl mx-auto mb-20">
        <div className="text-center mb-6">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#5B6454] font-semibold">
            FEATURED CINEMA REEL
          </span>
        </div>

        <a
          key={currentHero.title}
          href={currentHero.youtubeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative block aspect-[16/9] sm:aspect-[21/9] rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-black cursor-pointer animate-fadeIn transition-all duration-700"
        >
          <img
            src={currentHero.img}
            alt={currentHero.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent"></div>

          {/* Animated Center Play Button */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/20 backdrop-blur-md border border-white/40 group-hover:bg-[#5B6454] flex items-center justify-center shadow-2xl group-hover:scale-110 transition-all duration-300">
              <svg className="w-6 h-6 sm:w-8 sm:h-8 fill-white ml-1" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
            <span className="text-[11px] uppercase tracking-[0.3em] mt-4 font-medium text-white/90 group-hover:text-white">
              Watch The Film on YouTube ↗
            </span>
          </div>

          {/* Dynamic Film Meta Info */}
          <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between text-white gap-2">
            <div>
              <span className="text-[10px] tracking-widest uppercase text-amber-300 font-semibold block mb-1">
                {currentHero.tag}
              </span>
              <h3 className="font-serif text-2xl sm:text-4xl italic">
                {currentHero.title}
              </h3>
              <p className="text-[11px] uppercase tracking-wider text-white/70 mt-1">
                {currentHero.location}
              </p>
            </div>
            <span className="text-xs text-white/80 tracking-wider font-mono">
              Runtime: {currentHero.duration}
            </span>
          </div>
        </a>
      </section>

      {/* 3. 2-COLUMN LUXURY FILM GRID */}
      <section className="px-6 sm:px-12 max-w-7xl mx-auto pb-28">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {filteredFilms.map((film, idx) => (
            <a
              key={idx}
              href={film.youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-white rounded-3xl p-5 border border-[#DDD7CD] shadow-sm hover:shadow-xl hover:border-[#5B6454]/50 transition-all duration-500 block"
            >
              <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-black mb-5">
                <img
                  src={film.img}
                  alt={film.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
                />
                
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/15 transition-colors"></div>

                <div className="absolute top-3.5 left-3.5 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-[10px] text-white font-medium">
                  {film.quality}
                </div>

                <div className="absolute top-3.5 right-3.5 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-[10px] text-white font-medium">
                  {film.duration}
                </div>

                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-white/30 backdrop-blur-sm border border-white/50 group-hover:bg-[#5B6454] flex items-center justify-center shadow-lg group-hover:scale-110 transition-all">
                    <svg className="w-5 h-5 fill-white ml-0.5" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>

                <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] text-white flex items-center gap-1.5 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>Stream on YouTube</span>
                  <span>↗</span>
                </div>
              </div>

              <div className="px-2 pb-2 flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-serif text-2xl text-[#1E221D] italic mb-1 group-hover:text-[#5B6454] transition-colors">
                    {film.title}
                  </h3>
                  <p className="text-[10px] uppercase tracking-widest text-[#7A8275]">
                    {film.location}
                  </p>
                </div>

                <div className="w-9 h-9 rounded-full border border-[#5B6454]/40 flex items-center justify-center text-[#5B6454] group-hover:bg-[#5B6454] group-hover:text-white transition-all text-xs shrink-0 mt-1">
                  ↗
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Bottom Commission Box */}
        <div className="mt-20 bg-[#ECEFEA] border border-[#DDD7CD] rounded-3xl p-10 sm:p-14 text-center max-w-4xl mx-auto shadow-sm">
          <span className="text-[10px] uppercase tracking-[0.35em] text-[#5B6454] font-semibold block mb-2">
            PRESERVE YOUR LEGACY IN MOTION
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl italic text-[#1E221D] mb-4">
            Commission a Wedding Cinema Film
          </h2>
          <p className="text-xs sm:text-sm text-[#525B4C] max-w-xl mx-auto font-light leading-relaxed mb-8">
            Every couple has an unwritten poetry. Our cinema crews are available across Patna, Varanasi, and destination locations worldwide.
          </p>
          <Link className="inline-block bg-[#5B6454] hover:bg-[#485042] text-[#FAF8F5] px-10 py-3.5 rounded-full text-xs uppercase tracking-[0.25em] font-medium shadow-md transition-all duration-300" href="/contact">
            Commission A Film
          </Link>
        </div>
      </section>

    </main>
  );
}