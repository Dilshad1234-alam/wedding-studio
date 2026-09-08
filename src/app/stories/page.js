"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function StoriesPage() {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Prevent any bottom-jump on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
    }
  }, []);

  const fetchStories = async () => {
    try {
      const res = await fetch('/api/stories', { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) {
          // Adapt the API data schema to fit the UI component schema
          const mapped = data.map(s => ({
            id: s.id,
            title: s.couple,
            description: s.desc,
            venue: 'Patna, Bihar', 
            date: 'Sacred Union',
            photos: [s.mainImage, ...(s.thumbnails || [])].filter(Boolean)
          }));
          setStories(mapped);
        }
      }
    } catch (err) {
      console.error("Failed fetching stories:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStories();

    const handleSync = (e) => {
      if (e.key === 'weddingpur_story_updated' || e.key === 'weddingpur_story_deleted') {
        fetchStories();
      }
    };
    window.addEventListener('storage', handleSync);
    return () => window.removeEventListener('storage', handleSync);
  }, []);

  return (
    <div className="min-h-screen bg-[#0B0D0E] text-white selection:bg-[#D4AF37] selection:text-black">
      
      {/* 1. ORIGINAL HEADER */}
      <section className=" pb-14 px-6 text-center space-y-3 max-w-2xl mx-auto">
        <span className="text-[10px] font-mono tracking-[0.25em] text-[#D4AF37] uppercase font-bold block">
          ROYAL NARRATIVES & SACRED VOWS
        </span>
        <h1 className="text-4xl sm:text-5xl font-serif italic text-white tracking-tight">
          Couple Narratives
        </h1>
        <p className="text-xs sm:text-[13px] text-[#8A7D5C] font-light leading-relaxed max-w-lg mx-auto">
          Every union is a cinematic legacy. Explore real wedding journeys documented with editorial reverence across Bihar & destination circuits.
        </p>
      </section>

      {/* 2. EXACT ORIGINAL STORY CARDS */}
      <main className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-12 pb-24 space-y-16">
        {stories.map((story) => (
          <div
            key={story.id}
            className="bg-[#121518] border border-[#20242C] rounded-[32px] p-8 sm:p-12 lg:p-16 space-y-6 shadow-2xl"
          >
            {/* Tag & Couple Title */}
            <div className="space-y-1">
              <span className="text-[10px] font-mono font-bold tracking-wider text-[#D4AF37] uppercase block">
                📍 {story.venue || "PATNA, BIHAR"} • {story.date || "SACRED UNION"}
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif text-white tracking-tight">
                {story.title}
              </h2>
            </div>

            {/* Narrative Description */}
            <p className="text-xs sm:text-[13px] text-[#A89D84] leading-relaxed font-light">
              {story.description}
            </p>

            {/* Photo Grid (Matching Original: 4 columns across, wrapping naturally) */}
            {story.photos && story.photos.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 pt-2">
                {story.photos.map((imgUrl, idx) => (
                  <div
                    key={idx}
                    className="h-44 sm:h-48 rounded-2xl overflow-hidden bg-black border border-[#1F232B] group"
                  >
                    <img
                      src={imgUrl}
                      alt={`${story.title} capture ${idx + 1}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </main>

      {/* 3. BOTTOM CTA BANNER (Only renders once content is loaded so it never flickers) */}
      {!loading && (
        <section className="bg-[#08090A] border-t border-[#1C1F26] py-16 px-6 text-center space-y-4">
          <h3 className="text-2xl sm:text-3xl font-serif italic text-white">
            Have a Story Waiting to Be Told?
          </h3>
          <p className="text-[10px] sm:text-xs font-mono tracking-widest text-[#8A7D5C] uppercase">
            LIMITED DATES AVAILABLE FOR 2026 & 2027 WEDDING COMMISSIONS
          </p>
          <div className="pt-2">
            <Link className="inline-block px-8 py-3 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#B89018] hover:from-[#F3E5AB] hover:to-[#D4AF37] text-black text-xs font-black uppercase tracking-widest shadow-lg shadow-[#D4AF37]/20 transition-all cursor-pointer" href="/contact">
              CHECK DATE AVAILABILITY
            </Link>
          </div>
        </section>
      )}

    </div>
  );
}