"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { useProtectedAction } from '@/hooks/useProtectedAction';

export default function FilmsPage() {
  const { handleProtectedAction } = useProtectedAction();
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { label: "ALL FILMS", key: "all" },
    { label: "CINEMATIC TEASERS", key: "teasers" },
    { label: "FEATURE FILMS", key: "feature" },
    { label: "PRE-WEDDING CINEMA", key: "pre-wedding" }
  ];

  const [filmsList, setFilmsList] = useState([]);
  const [featuredFilm, setFeaturedFilm] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  React.useEffect(() => {
    // 1. Initial Fetch
    fetch('/api/films', { cache: 'no-store' })
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          const mapped = data.map(f => ({
            id: f.id || f._id,
            title: f.title,
            location: f.venue,
            duration: f.runtime + " MIN",
            category: "feature", // or extract if available, assuming default feature
            quality: "4K UHD",
            img: f.posterUrl,
            youtubeUrl: f.videoUrl,
            couple: f.couple,
            isFeatured: f.isFeatured || false,
            tag: "FEATURED CINEMA • 4K UHD"
          }));
          
          // Separate featured and remaining
          const featured = mapped.find(f => f.isFeatured) || (mapped.length > 0 ? mapped[0] : null);
          setFeaturedFilm(featured);
          
          // Filter out the featured film from the grid
          const remaining = mapped.filter(f => f.id !== (featured ? featured.id : null));
          setFilmsList(remaining);
        }
        setIsLoading(false);
      })
      .catch(err => {
        console.error("Error fetching films:", err);
        setIsLoading(false);
      });

    // 2. Cross-tab sync for deletions
    const handleStorageChange = (e) => {
      if (e.key === 'weddingpur_film_deleted' && e.newValue) {
        try {
          const { id } = JSON.parse(e.newValue);
          setFilmsList(prev => prev.filter(film => film.id !== id));
        } catch (err) {
          console.error("Error parsing deleted film event:", err);
        }
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const currentHero = featuredFilm;

  const filteredFilms = activeCategory === 'all'
    ? filmsList
    : filmsList.filter(film => film.category === activeCategory);

  return (
    <main className="min-h-screen bg-[#0B0D0E] text-[#F5F5F5] font-sans antialiased selection:bg-[#5B6454] selection:text-white">
      
      {/* 1. CINEMA HERO HEADER */}
      <section className="pb-10 px-6 text-center max-w-4xl mx-auto">
  
        <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl italic font-normal text-[#F5F5F5] tracking-tight mb-4">
          Moving Portraits
        </h1>

        {/* Category Pill Filters */}
        <div className="flex overflow-x-auto w-full gap-3 mt-6 sm:mt-10 pb-2 justify-start sm:justify-center px-1 sm:px-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.key;
            return (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
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

      {/* 2. DYNAMIC FEATURED HERO SHOWCASE (CHANGES WITH ACTIVE CATEGORY) */}
      <section className="w-full max-w-[1536px] mx-auto px-4 sm:px-8 lg:px-12 py-5 ">
        <div className="text-center mb-6">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#D4AF37] font-semibold">
            FEATURED CINEMA REEL
          </span>
        </div>

        {currentHero && (
          <a
            key={currentHero.title}
            href={currentHero.youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleProtectedAction()}
            className="w-full group relative block aspect-[16/9] sm:aspect-[21/9] rounded-3xl overflow-hidden shadow-2xl border-4 border-[#2B2519] bg-[#121518] cursor-pointer animate-fadeIn transition-all duration-700 mb-12"
          >
            <img
              src={currentHero.img}
              alt={currentHero.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent"></div>

            {/* Animated Center Play Button */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white pb-8 sm:pb-0">
              <div className="w-14 h-14 sm:w-20 sm:h-20 rounded-full bg-red-600/90 group-hover:bg-red-600 flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300">
                <svg className="w-6 h-6 sm:w-8 sm:h-8 fill-white ml-1" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
              <span className="hidden sm:block text-[11px] uppercase tracking-[0.3em] mt-4 font-medium text-white/90 group-hover:text-white">
                Watch The Film on YouTube ↗
              </span>
            </div>

            {/* Dynamic Film Meta Info */}
            <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 flex flex-col sm:flex-row sm:items-end justify-between text-white gap-1 sm:gap-2">
              <div className="flex-1 pr-2">
                <span className="text-[9px] sm:text-[10px] tracking-widest uppercase text-[#D4AF37] font-semibold block mb-1">
                  {currentHero.tag}
                </span>
                <h3 className="font-serif text-xl sm:text-4xl italic leading-tight">
                  {currentHero.title}
                </h3>
                <p className="text-[10px] sm:text-[11px] uppercase tracking-wider text-white/70 mt-1">
                  {currentHero.location}
                </p>
              </div>
              <span className="text-[10px] sm:text-xs text-white/80 tracking-wider font-mono shrink-0">
                Runtime: {currentHero.duration}
              </span>
            </div>
          </a>
        )}
      </section>

      {/* 3. 2-COLUMN LUXURY FILM GRID */}
      <section className="w-full max-w-[1536px] mx-auto px-4 sm:px-8 lg:px-12 py-8 sm:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 w-full">
          {filteredFilms.map((film, idx) => (
            <a
              key={idx}
              href={film.youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleProtectedAction()}
              className="group bg-[#121518] rounded-3xl p-5 border border-[#2B2519] shadow-xl hover:shadow-xl hover:border-[#D4AF37]/40/50 transition-all duration-500 block"
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
                  <div className="w-12 h-12 rounded-full bg-red-600/90 group-hover:bg-red-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
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
                  <h3 className="font-serif text-2xl text-[#F5F5F5] italic mb-1 group-hover:text-[#D4AF37] transition-colors">
                    {film.title}
                  </h3>
                  <p className="text-[10px] uppercase tracking-widest text-[#C5B388]">
                    {film.location}
                  </p>
                </div>

                <div className="w-9 h-9 rounded-full border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37] group-hover:bg-gradient-to-r group-hover:from-[#F3E5AB] group-hover:to-[#D4AF37] group-hover:text-black group-hover:shadow-[0_0_15px_rgba(212,175,55,0.45)] transition-all text-xs shrink-0 mt-1">
                  ↗
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Bottom Commission Box */}
        <div className="mt-20 bg-[#121518] border border-[#2B2519] rounded-3xl p-10 sm:p-14 text-center max-w-4xl mx-auto shadow-xl">
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#D4AF37] font-black block  mb-2">
            PRESERVE YOUR LEGACY IN MOTION
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl italic text-[#F5F5F5] mb-4">
            Commission a Wedding Cinema Film
          </h2>
          <p className="text-xs sm:text-sm text-[#C5B388] max-w-xl mx-auto font-light leading-relaxed mb-8">
            Every couple has an unwritten poetry. Our cinema crews are available across Patna, Varanasi, and destination locations worldwide.
          </p>
          <Link className="inline-block px-10 py-3.5 rounded-full font-medium bg-gradient-to-r from-[#D4AF37] via-[#E5C158] to-[#B89018] hover:from-[#F3E5AB] hover:to-[#D4AF37] text-black font-black text-xs uppercase tracking-[0.2em] shadow-lg shadow-[#D4AF37]/20 hover:shadow-[0_0_25px_rgba(212,175,55,0.45)] active:scale-[0.98] transition-all duration-300 cursor-pointer" href="/contact">
            Commission A Film
          </Link>
        </div>
      </section>

    </main>
  );
}