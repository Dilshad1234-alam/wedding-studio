'use client';

import React from 'react';
import { Play, Heart, Star, Award, ShieldCheck } from 'lucide-react';

export default function AboutPage() {
  // Custom SVG for Instagram since lucide-react might not export it in this version
  const InstagramIcon = ({ size = 24, className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
    </svg>
  );

  // Custom SVG for Facebook
  const FacebookIcon = ({ size = 24, className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
    </svg>
  );

  return (
    <main className="min-h-screen bg-[#212639] text-[#EDEAE4] pt-28 font-sans selection:bg-[#B38F4D] selection:text-white pb-20">
      
      {/* Section 1: Our Story */}
      <section className="container mx-auto px-4 py-16">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-normal text-center text-[#B38F4D] mb-12 tracking-wide">
          Our Story
        </h1>
        <div className="max-w-4xl mx-auto text-center md:text-left space-y-6 text-[#A39E93] text-lg md:text-xl leading-relaxed">
          <p>
            Lumen Weddings was born out of a passion to capture beautiful memories of your love story with fun and art, founded in the year 2016.
          </p>
          <p>
            We love photography, but we love weddings even more. Today, we are recognized among the most innovative wedding photography studios in Bihar, backed by a full-time team of candid photographers, cinematographers, drone artists, album designers, and colorists. We have brought a whole new level of quality, finesse, and perfection into the world of Indian weddings. Every wedding is a unique celebration, and we present it in a delightful, crisp manner so couples can cherish those emotions forever.
          </p>
          <p className="font-serif font-medium text-[#B38F4D] italic text-2xl pt-4">
            "Last but not least, we thank all our brides and grooms who trusted us and chose us for the biggest day of their lives."
          </p>
        </div>
      </section>

      {/* Section 2: Community & Growth Split */}
      <section className="bg-[#2B324B] border-y border-white/10 py-20 mt-12">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            
            {/* Left Column */}
            <div className="w-full lg:w-1/2 space-y-8">
              <div className="flex items-center gap-3 text-[#B38F4D] mb-2">
                <Heart fill="currentColor" size={24} />
                <span className="font-bold tracking-widest uppercase text-sm">Our Community</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-serif font-normal text-[#EDEAE4] leading-tight">
                Your love is Making us Grow everyday
              </h2>
              <p className="text-[#A39E93] text-lg leading-relaxed">
                It wouldn't be possible for us to reach this stage without your constant love and trust. We are deeply grateful to every couple who made us part of their special milestone. Today, that love has built a thriving community across Instagram and social platforms.
              </p>
              <button className="inline-flex items-center gap-3 px-8 py-4 bg-blue-600 text-white font-bold rounded-full hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20">
                <FacebookIcon size={20} />
                <span>Join our Facebook Community</span>
              </button>
            </div>

            {/* Right Column: Instagram aesthetic grid mockup */}
            <div className="w-full lg:w-1/2">
              <div className="bg-[#2B324B] p-4 rounded-3xl shadow-xl border border-gray-100 max-w-md mx-auto rotate-1 hover:rotate-0 transition-transform duration-500">
                {/* Mockup Header */}
                <div className="flex items-center gap-4 mb-6 px-2 pt-2">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500 p-[2px]">
                    <div className="w-full h-full bg-[#2B324B] rounded-full border-2 border-white overflow-hidden flex items-center justify-center">
                      <InstagramIcon size={32} className="text-[#B38F4D]" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold text-[#EDEAE4] text-lg">lumenweddings</h3>
                    <p className="text-gray-500 text-sm">Luxury Wedding Photography</p>
                  </div>
                </div>
                
                {/* Mockup Highlights */}
                <div className="flex gap-4 mb-6 px-2 overflow-hidden">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="flex flex-col items-center gap-1">
                      <div className="w-14 h-14 rounded-full border border-gray-300 bg-gray-100 flex items-center justify-center">
                        <Heart size={20} className="text-gray-400" />
                      </div>
                      <span className="text-xs text-[#A39E93]">Story {i}</span>
                    </div>
                  ))}
                </div>

                {/* Mockup Grid */}
                <div className="grid grid-cols-3 gap-1">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
                    <div key={i} className="aspect-square bg-gray-200 relative overflow-hidden">
                      <div className={`absolute inset-0 bg-gradient-to-br ${
                        i % 3 === 0 ? 'from-pink-300/40 to-rose-400/40' : 
                        i % 2 === 0 ? 'from-amber-200/40 to-orange-300/40' : 
                        'from-blue-200/40 to-indigo-300/40'
                      }`}></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </section>

      {/* Section 3: Visual Reel & Story Grid */}
      <section className="container mx-auto px-4 py-24 text-center">
        <h2 className="text-3xl md:text-4xl font-serif font-normal text-[#B38F4D] mb-12">
          Capturing the Unseen Moments
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-6xl mx-auto mb-12">
          {/* Reel Item 1 (Video Teaser) */}
          <div className="aspect-[4/5] bg-neutral-800 rounded-xl relative overflow-hidden group col-span-2 md:col-span-1 border border-white/10">
             <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
             <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 bg-[#2B324B]/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                   <Play className="text-white fill-white ml-1" size={24} />
                </div>
             </div>
             <span className="absolute bottom-4 left-4 text-white font-bold text-sm">Cinematic Teaser</span>
          </div>
          
          {/* Item 2 */}
          <div className="aspect-[4/5] bg-amber-100 rounded-xl relative overflow-hidden border border-white/10">
            <div className="absolute inset-0 bg-[#B38F4D]/10"></div>
            <span className="absolute bottom-4 left-4 text-amber-900 font-bold text-sm">Floral Rituals</span>
          </div>

          {/* Item 3 */}
          <div className="aspect-[4/5] bg-gray-200 rounded-xl relative overflow-hidden border border-white/10">
            <div className="absolute inset-0 bg-black/5 grayscale"></div>
            <span className="absolute bottom-4 left-4 text-white font-bold text-sm">B&W Candid</span>
          </div>

          {/* Item 4 */}
          <div className="aspect-[4/5] bg-rose-100 rounded-xl relative overflow-hidden border border-white/10">
            <div className="absolute inset-0 bg-[#B38F4D]/10"></div>
            <span className="absolute bottom-4 left-4 text-rose-900 font-bold text-sm">Royal Close-ups</span>
          </div>

          {/* Item 5 (Video Teaser) */}
          <div className="aspect-[4/5] bg-neutral-900 rounded-xl relative overflow-hidden group col-span-2 md:col-span-1 border border-white/10">
             <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
             <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 bg-[#2B324B]/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                   <Play className="text-white fill-white ml-1" size={24} />
                </div>
             </div>
             <span className="absolute bottom-4 left-4 text-white font-bold text-sm">Pre-Wedding Story</span>
          </div>

          {/* Item 6 */}
          <div className="aspect-[4/5] bg-indigo-100 rounded-xl relative overflow-hidden border border-white/10">
            <div className="absolute inset-0 bg-indigo-900/10"></div>
            <span className="absolute bottom-4 left-4 text-indigo-900 font-bold text-sm">Outdoor Magic</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <button className="px-8 py-3 rounded-full border-2 border-[#1E1E1E] text-[#EDEAE4] font-bold hover:bg-[#1E1E1E] hover:text-white transition-colors">
            Load More
          </button>
          <button className="flex items-center gap-2 px-8 py-3 rounded-full bg-[#B38F4D] text-white font-bold hover:bg-[#987538] transition-colors shadow-lg shadow-[#B38F4D]/20">
            <InstagramIcon size={20} />
            <span>Follow on Instagram</span>
          </button>
        </div>
      </section>

      {/* Section 4: Why Choose Us? */}
      <section className="bg-[#2B324B] border-t border-white/10 py-24">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-normal text-[#EDEAE4] mb-6">
              Why Choose Us?
            </h2>
            <div className="h-1 w-24 bg-[#B38F4D] mx-auto rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            
            {/* Pillar 1 */}
            <div className="bg-[#212639] p-8 rounded-2xl border border-white/10 shadow-sm text-center hover:-translate-y-2 transition-transform duration-300">
              <div className="w-20 h-20 mx-auto bg-[#2B324B] rounded-full flex items-center justify-center border-4 border-[#B38F4D] mb-6 shadow-md">
                <Star className="text-[#B38F4D]" size={36} fill="currentColor" />
              </div>
              <h3 className="text-2xl font-serif font-normal text-[#EDEAE4] mb-4">Experience</h3>
              <p className="text-[#A39E93] leading-relaxed">
                Over 7+ years of capturing luxury weddings and telling the beautiful stories of more than 550+ happy couples.
              </p>
            </div>

            {/* Pillar 2 */}
            <div className="bg-[#212639] p-8 rounded-2xl border border-white/10 shadow-sm text-center hover:-translate-y-2 transition-transform duration-300">
              <div className="w-20 h-20 mx-auto bg-[#2B324B] rounded-full flex items-center justify-center border-4 border-[#B38F4D] mb-6 shadow-md">
                <Award className="text-[#B38F4D]" size={36} />
              </div>
              <h3 className="text-2xl font-serif font-normal text-[#EDEAE4] mb-4">Quality</h3>
              <p className="text-[#A39E93] leading-relaxed">
                Rigorous internal quality standards ensuring excellence from our candid photographers, cinematographers, and colorists.
              </p>
            </div>

            {/* Pillar 3 */}
            <div className="bg-[#212639] p-8 rounded-2xl border border-white/10 shadow-sm text-center hover:-translate-y-2 transition-transform duration-300">
              <div className="w-20 h-20 mx-auto bg-[#2B324B] rounded-full flex items-center justify-center border-4 border-[#B38F4D] mb-6 shadow-md">
                <ShieldCheck className="text-[#B38F4D]" size={36} />
              </div>
              <h3 className="text-2xl font-serif font-normal text-[#EDEAE4] mb-4">Support</h3>
              <p className="text-[#A39E93] leading-relaxed">
                Active 16-hour support line for direct communication, scheduling, planning, and dedicated album assistance.
              </p>
            </div>

          </div>
        </div>
      </section>

    </main>
  );
}
