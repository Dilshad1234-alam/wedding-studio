'use client';

import React from 'react';
import { Camera, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

export default function BlogPage() {
  const blogPosts = [
    {
      title: "How to Plan Your Wedding Day Timeline for Stress-Free Golden Hour Portraits",
      author: "LUMEN EDITORIAL",
      date: "SEPTEMBER 2, 2026",
      excerpt: "Discover the secret behind effortless sunset portraits, natural lighting transitions, and keeping your bridal party relaxed and on schedule throughout the rituals."
    },
    {
      title: "Candid vs Traditional Wedding Photography: What Modern Couples Really Need",
      author: "LUMEN EDITORIAL",
      date: "SEPTEMBER 2, 2026",
      excerpt: "A balanced breakdown of documentary emotional storytelling versus formal family heirloom portraits, and why having both creates the complete heirloom album."
    },
    {
      title: "Top Destination Wedding Venues in Bihar: From Royal Heritage to Riverside Luxury",
      author: "LUMEN EDITORIAL",
      date: "AUGUST 31, 2026",
      excerpt: "An insider guide to Patna, Bodh Gaya, and Rajgir's most breathtaking architectural hotels, palace lawns, and luxury wedding resorts."
    },
    {
      title: "What to Wear for Your Pre-Wedding Shoot: Fabrics, Colors & Styling Secrets",
      author: "LUMEN EDITORIAL",
      date: "AUGUST 31, 2026",
      excerpt: "Everything you need to know about color harmony, coordinating outfits without looking matching-matching, and silhouettes that move gorgeously in the wind."
    },
    {
      title: "Preserving Memories: Why Handcrafted Lay-Flat Wedding Albums Outlast Digital Files",
      author: "LUMEN EDITORIAL",
      date: "AUGUST 30, 2026",
      excerpt: "Hard drives crash and cloud links expire. Here is why museum-grade archival printing and silk-wrapped lay-flat books remain timeless family treasures."
    },
    {
      title: "Cinematic Teasers vs Feature Highlight Films: What Deliverables Are Essential?",
      author: "LUMEN EDITORIAL",
      date: "AUGUST 27, 2026",
      excerpt: "Explore the art of cinematic storytelling—from fast-paced 60-second reels to 40-minute emotional feature documentaries with drone choreography."
    }
  ];

  return (
    <main className="min-h-screen bg-[#212639] text-[#EDEAE4] pt-28 font-sans selection:bg-[#B38F4D] selection:text-white pb-24">
      
      {/* Header & Visual Strip */}
      <section className="relative w-full">
        <div className="absolute inset-0 bg-gradient-to-b from-[#FAF8F5]/80 to-transparent pointer-events-none"></div>
        <div className="container mx-auto px-4 text-center mb-12 relative z-10">
          <h1 className="text-4xl md:text-6xl font-serif font-normal text-[#B38F4D] mb-4">
            Welcome to Our BLOGS
          </h1>
          <p className="text-lg md:text-xl text-[#A39E93] max-w-2xl mx-auto">
            Improve Your Knowledge About Wedding Photography & Cinematography.
          </p>
        </div>

        {/* 4-Column Photo Showcase Strip */}
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 h-[60vh] md:h-[50vh]">
            <div className="bg-yellow-100 rounded-xl overflow-hidden relative group">
               {/* Placeholder for Vibrant Haldi */}
               <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/20 to-orange-600/30"></div>
               <div className="absolute inset-0 flex items-center justify-center text-yellow-800 font-bold opacity-50 text-sm p-4 text-center">Haldi Celebrations</div>
            </div>
            
            <div className="bg-pink-100 rounded-xl overflow-hidden relative group hidden md:block">
               {/* Placeholder for Sangeet floral entry */}
               <div className="absolute inset-0 bg-gradient-to-br from-pink-400/20 to-rose-600/30"></div>
               <div className="absolute inset-0 flex items-center justify-center text-pink-800 font-bold opacity-50 text-sm p-4 text-center">Sangeet Floral Entry</div>
            </div>

            <div className="bg-red-100 rounded-xl overflow-hidden relative group col-span-2 md:col-span-1 shadow-lg border-2 border-[#B38F4D]/30">
               {/* Centerpiece Royal Bride */}
               <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
               <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                  <div className="bg-[#2B324B]/20 backdrop-blur-sm border border-white/40 text-white px-6 py-2 rounded-full font-serif tracking-widest mb-4">
                    WEDDING
                  </div>
                  <button className="bg-[#B38F4D] text-white px-6 py-2 rounded-full text-sm font-semibold hover:bg-[#987538] transition-colors mt-auto mb-4">
                    View Photos
                  </button>
               </div>
            </div>

            <div className="bg-blue-900 rounded-xl overflow-hidden relative group">
               {/* Placeholder for Night Cinematic */}
               <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/40 to-black/60"></div>
               <div className="absolute inset-0 flex items-center justify-center text-blue-200 font-bold opacity-50 text-sm p-4 text-center">Cinematic Romance</div>
            </div>
          </div>
        </div>
      </section>

      {/* 2-Column Responsive Blog Grid */}
      <section className="container mx-auto px-4 mt-20 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {blogPosts.map((post, index) => (
            <article 
              key={index}
              className="bg-[#2B324B] border border-white/10 rounded-2xl p-8 hover:shadow-xl transition-shadow duration-300 group flex flex-col h-full"
            >
              <div className="flex items-center gap-2 text-xs tracking-wider text-gray-500 mb-4 font-semibold uppercase">
                <span>{post.author}</span>
                <span className="text-[#B38F4D]">•</span>
                <span>{post.date}</span>
              </div>
              
              <h2 className="text-2xl font-serif font-normal text-[#EDEAE4] mb-4 group-hover:text-[#B38F4D] transition-colors leading-snug">
                {post.title}
              </h2>
              
              <p className="text-[#A39E93] leading-relaxed mb-8 flex-grow">
                {post.excerpt}
              </p>
              
              <div className="mt-auto">
                <a href="#" className="inline-flex items-center gap-2 text-sm font-bold text-[#EDEAE4] hover:text-[#B38F4D] border-b-2 border-transparent hover:border-[#B38F4D] pb-1 transition-all">
                  READ MORE
                  <ArrowRight size={16} />
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Pagination Controls */}
      <section className="container mx-auto px-4 mt-20">
        <div className="flex items-center justify-center gap-2 font-semibold">
          <button className="px-4 py-2 text-[#A39E93] hover:text-[#B38F4D] transition-colors flex items-center gap-1">
            <ChevronLeft size={18} />
            Previous
          </button>
          
          <button className="w-10 h-10 rounded-full bg-[#B38F4D] text-white flex items-center justify-center shadow-md">
            1
          </button>
          <button className="w-10 h-10 rounded-full text-[#A39E93] hover:bg-[#2B324B] transition-colors flex items-center justify-center">
            2
          </button>
          <button className="w-10 h-10 rounded-full text-[#A39E93] hover:bg-[#2B324B] transition-colors flex items-center justify-center">
            3
          </button>
          <span className="text-[#A39E93]">...</span>
          <button className="w-10 h-10 rounded-full text-[#A39E93] hover:bg-[#2B324B] transition-colors flex items-center justify-center">
            5
          </button>

          <button className="px-4 py-2 text-[#A39E93] hover:text-[#B38F4D] transition-colors flex items-center gap-1">
            Next
            <ChevronRight size={18} />
          </button>
        </div>
      </section>

    </main>
  );
}
