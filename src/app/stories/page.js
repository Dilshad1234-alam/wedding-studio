"use client";
import React from 'react';
import Link from 'next/link';

export default function StoriesPage() {
  const [weddingStories, setWeddingStories] = React.useState([]);

  React.useEffect(() => {
    // 1. Initial Fetch
    fetch('/api/stories')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          const mapped = data.map(s => ({
            id: s.id,
            couple: s.couple,
            subtitle: s.tagline,
            desc: s.desc,
            featuredImg: s.mainImage,
            gridImgs: s.thumbnails
          }));
          setWeddingStories(mapped);
        }
      })
      .catch(err => console.error("Error fetching stories:", err));

    // 2. Cross-tab sync for deletions
    const handleStorageChange = (e) => {
      if (e.key === 'weddingpur_story_deleted' && e.newValue) {
        try {
          const { id } = JSON.parse(e.newValue);
          setWeddingStories(prev => prev.filter(story => story.id !== id));
        } catch (err) {
          console.error("Error parsing deleted story event:", err);
        }
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <main className="min-h-screen bg-[#0B0D0E] text-[#F5F5F5] font-sans antialiased selection:bg-[#5B6454] selection:text-white">
      
      {/* 1. EDITORIAL HEADER */}
      <section className="pt-4 pb-16 px-6 text-center max-w-4xl mx-auto">
        <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl italic font-normal text-[#F5F5F5] tracking-tight mb-4">
          Wedding Stories
        </h1>
        <p className="text-xs sm:text-sm text-[#C5B388] font-light leading-relaxed tracking-wide">
          A curated chronicle of love, sacred rituals, and unspoken glances captured in their purest cinematic form.
        </p>
      </section>

      {/* 2. STORIES FEED (ALTERNATING EDITORIAL SPREADS) */}
      <section className="w-full max-w-[1536px] mx-auto px-4 sm:px-8 lg:px-12 py-8 sm:py-12 space-y-20">
        {weddingStories.map((story, index) => {
          const isReversed = index % 2 !== 0;
          return (
            <div
              key={index}
              className="bg-[#121518] border border-[#2B2519] rounded-3xl p-6 sm:p-12 shadow-xl hover:shadow-md transition-shadow duration-500"
            >
              <div className={`grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center ${isReversed ? 'lg:flex-row-reverse' : ''}`}>
                
                {/* Visual Side: Featured Arch + Mini Collage */}
                <div className={`lg:col-span-6 space-y-4 ${isReversed ? 'lg:order-2' : 'lg:order-1'}`}>
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-md bg-[#121518]">
                    <img
                      src={story.featuredImg}
                      alt={story.couple}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    />
                  </div>

                  {/* 4 Mini Collage Shots */}
                  <div className="grid grid-cols-4 gap-2">
                    {story.gridImgs.map((img, i) => (
                      <div key={i} className="aspect-square rounded-xl overflow-hidden bg-[#121518] border border-[#2B2519]">
                        <img
                          src={img}
                          alt={`${story.couple} moment ${i + 1}`}
                          className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Narrative Side */}
                <div className={`lg:col-span-6 space-y-5 text-center lg:text-left ${isReversed ? 'lg:order-1' : 'lg:order-2'}`}>
                  <span className="text-[10px] uppercase tracking-[0.25em] text-[#D4AF37] font-black block ">
                    {story.subtitle}
                  </span>
                  
                  <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#F5F5F5] italic font-normal">
                    {story.couple}
                  </h2>

                  <p className="text-xs sm:text-sm text-[#C5B388] leading-relaxed font-light">
                    {story.desc}
                  </p>

                  <div className="pt-3">
                    <Link className="inline-block border border-[#D4AF37]/50 text-[#C5B388] hover:bg-gradient-to-r hover:from-[#F3E5AB] hover:to-[#D4AF37] hover:text-black hover:font-black hover:shadow-[0_0_20px_rgba(212,175,55,0.45)] px-8 py-3 rounded-full text-xs uppercase tracking-[0.2em] font-medium transition-all duration-300 cursor-pointer" href="/contact">
                      View Story
                    </Link>
                  </div>
                </div>

              </div>
            </div>
          );
        })}
      </section>

      {/* 3. BOTTOM COMMISSION CTA */}
      <section className="py-20 px-6 bg-[#121518] text-center border-t border-[#2B2519]">
        <h3 className="font-serif text-3xl sm:text-4xl text-[#F5F5F5] italic mb-3">
          Have a Story Waiting to Be Told?
        </h3>
        <p className="text-xs text-[#C5B388] uppercase tracking-widest mb-6">
          Limited dates available for 2026 & 2027 wedding commissions
        </p>
        <Link className="inline-block px-10 py-3.5 rounded-full font-medium bg-gradient-to-r from-[#D4AF37] via-[#E5C158] to-[#B89018] hover:from-[#F3E5AB] hover:to-[#D4AF37] text-black font-black text-xs uppercase tracking-[0.2em] shadow-lg shadow-[#D4AF37]/20 hover:shadow-[0_0_25px_rgba(212,175,55,0.45)] active:scale-[0.98] transition-all duration-300 cursor-pointer" href="/contact">
          Check Date Availability
        </Link>
      </section>

    </main>
  );
}