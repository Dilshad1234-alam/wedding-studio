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
            mainCoverImageUrl: s.mainImage,
            thumbnails: (s.thumbnails || []).filter(url => typeof url === 'string' && url.trim().length > 5)
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
      
      {/* 1. STORIES HERO HEADER */}
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

      {/* 2. REFINED STORY CARDS WITH COVER LAYOUT */}
      <main className="max-w-7xl mx-auto px-6 pb-24 space-y-24">
        {stories.map((story) => (
          <div
            key={story.id}
            className="space-y-8"
          >
            {/* Tag & Couple Title */}
            <div className="space-y-2">
              <span className="text-[10px] sm:text-[11px] font-mono font-bold tracking-[0.2em] text-[#D4AF37] uppercase block">
                📍 {story.venue || "PATNA, BIHAR"} • {story.date || "SACRED UNION"}
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif italic text-white tracking-wide">
                {story.title}
              </h2>
            </div>

            {/* Narrative Description */}
            <p className="text-[13px] sm:text-sm text-[#A89D84] leading-loose font-light max-w-4xl">
              {story.description}
            </p>

            {/* Main Cover Image */}
            {story.mainCoverImageUrl && story.mainCoverImageUrl.length > 5 && (
              <div className="w-full aspect-[21/9] sm:aspect-video rounded-2xl overflow-hidden bg-[#08090A] border border-[#1C1F26] group relative shadow-2xl">
                <img
                  src={story.mainCoverImageUrl}
                  alt={`${story.title} Main Cover`}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
                  onError={(e) => {
                    e.target.parentElement.style.display = 'none';
                  }}
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-700" />
              </div>
            )}

            {/* Thumbnails Grid */}
            {story.thumbnails && story.thumbnails.length > 0 && (
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
                {story.thumbnails.map((imgUrl, idx) => (
                  <div
                    key={idx}
                    className="aspect-[4/3] rounded-xl overflow-hidden bg-[#08090A] border border-[#1C1F26] group cursor-pointer relative shadow-lg"
                  >
                    <img
                      src={imgUrl}
                      alt={`${story.title} thumbnail ${idx + 1}`}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                      onError={(e) => {
                        e.target.parentElement.style.display = 'none';
                      }}
                    />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
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