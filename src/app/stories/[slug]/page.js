'use client';

import React, { use } from 'react';
import Link from 'next/link';
import { ArrowLeft, MapPin, Calendar, Users, Clock, Share2 } from 'lucide-react';

const mockStoryDetails = {
  'abhishek-and-ruchi': {
    couple: 'Abhishek & Ruchi',
    venue: '53 Open Court, Patna',
    date: 'November 25, 2025',
    crewSize: '5 Members',
    coverage: '14 Hours',
    heroImage: 'https://picsum.photos/seed/story1/1920/1080',
    narrative: [
      "The celebrations for Abhishek and Ruchi began with a vibrant Haldi ceremony, filled with laughter, marigold showers, and the sweet fragrance of sandalwood. Family members danced to the beats of the dhol, smearing golden hues of joy on the couple's faces.",
      "As evening approached, the venue transformed into a magical realm for the Varmala and Reception. The couple exchanged garlands under a magnificent floral chandelier, surrounded by cold pyros and the cheers of their loved ones.",
      "Every moment of their special day was a testament to their deep bond and the rich heritage of their families. From the tearful Vidaai to the grand entry, we were honored to document the beginning of their forever."
    ],
    gallery: [
      'https://picsum.photos/seed/gal2/800/800',
      'https://picsum.photos/seed/gal2/800/800',
      'https://picsum.photos/seed/gal3/800/1000',
      'https://picsum.photos/seed/gal4/800/1200',
      'https://picsum.photos/seed/gal5/800/800',
      'https://picsum.photos/seed/gal6/800/600',
      'https://picsum.photos/seed/gal7/800/1000',
      'https://picsum.photos/seed/gal8/800/1200',
    ]
  }
};

const getStoryData = (slug) => {
  return mockStoryDetails[slug] || {
    couple: 'Akshat & Shivani',
    venue: 'The Maverick Resort, Bodh Gaya',
    date: 'December 12, 2025',
    crewSize: '4 Members',
    coverage: '12 Hours',
    heroImage: `https://picsum.photos/seed/${slug}hero/1920/1080`,
    narrative: [
      "A beautiful winter wedding that celebrated love amidst the serene surroundings. The festivities kicked off with an intimate Sangeet night filled with soulful performances.",
      "The wedding morning was crisp and clear, perfect for a traditional ceremony. The couple looked breathtaking in their royal attire as they took their vows.",
      "Capturing their genuine smiles and stolen glances was an absolute delight. A timeless celebration of two beautiful souls uniting."
    ],
    gallery: [
      `https://picsum.photos/seed/${slug}1/800/1200`,
      `https://picsum.photos/seed/${slug}2/800/800`,
      `https://picsum.photos/seed/${slug}3/800/1000`,
      `https://picsum.photos/seed/${slug}4/800/1200`,
      `https://picsum.photos/seed/${slug}5/800/800`,
      `https://picsum.photos/seed/${slug}6/800/600`,
      `https://picsum.photos/seed/${slug}7/800/1000`,
      `https://picsum.photos/seed/${slug}8/800/1200`,
    ]
  };
};

export default function StoryDetail({ params }) {
  const unwrappedParams = params instanceof Promise ? use(params) : params;
  const slug = unwrappedParams?.slug || 'abhishek-and-ruchi';
  const story = getStoryData(slug);

  return (
    <div className="min-h-screen bg-[#F7F4EB] text-[#1E1E1E]">
      
      {/* Floating Back Button */}
      <div className="fixed top-24 left-4 md:left-8 z-40">
        <Link 
          href="/stories"
          className="flex items-center space-x-2 bg-white/70 backdrop-blur-md px-4 py-2 rounded-full shadow-sm text-[#1E1E1E] hover:text-[#B38F4D] transition-colors border border-[#DFD9CB]/50 hover:border-[#B38F4D]/30"
        >
          <ArrowLeft size={16} />
          <span className="text-sm font-semibold tracking-wider uppercase hidden sm:block">Back to Stories</span>
        </Link>
      </div>

      {/* Hero Banner */}
      <div className="relative w-full h-[60vh] sm:h-[70vh] lg:h-[80vh] overflow-hidden">
        <img 
          src={story.heroImage} 
          alt={story.couple}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <span className="text-white/90 text-sm md:text-base font-semibold tracking-[0.3em] uppercase mb-4 drop-shadow-md">
            A Wedding Story
          </span>
          <h1 className="text-5xl md:text-6xl lg:text-8xl font-serif font-normal text-white drop-shadow-xl mb-6">
            {story.couple}
          </h1>
          <button className="flex items-center space-x-2 text-white/80 hover:text-white transition-colors bg-white/10 hover:bg-white/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
            <Share2 size={16} />
            <span className="text-sm font-medium tracking-wider uppercase">Share Story</span>
          </button>
        </div>
      </div>

      {/* Wedding Info Ribbon */}
      <div className="bg-[#FAF8F5] border-y border-[#DFD9CB]">
        <div className="max-w-6xl mx-auto px-4 py-6 md:py-8 flex flex-wrap justify-center md:justify-between items-center gap-6">
          <div className="flex items-center space-x-3 text-[#5A524A]">
            <MapPin className="text-[#B38F4D]" size={20} />
            <div>
              <p className="text-[10px] uppercase tracking-widest text-[#B38F4D] font-bold">Venue</p>
              <p className="font-medium">{story.venue}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 text-[#5A524A]">
            <Calendar className="text-[#B38F4D]" size={20} />
            <div>
              <p className="text-[10px] uppercase tracking-widest text-[#B38F4D] font-bold">Date</p>
              <p className="font-medium">{story.date}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 text-[#5A524A]">
            <Users className="text-[#B38F4D]" size={20} />
            <div>
              <p className="text-[10px] uppercase tracking-widest text-[#B38F4D] font-bold">Crew</p>
              <p className="font-medium">{story.crewSize}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 text-[#5A524A]">
            <Clock className="text-[#B38F4D]" size={20} />
            <div>
              <p className="text-[10px] uppercase tracking-widest text-[#B38F4D] font-bold">Coverage</p>
              <p className="font-medium">{story.coverage}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Editorial Narrative Section */}
      <div className="max-w-3xl mx-auto px-6 py-20 lg:py-24 text-center">
        <h2 className="text-3xl md:text-4xl font-serif text-[#1E1E1E] mb-12 italic">
          "The Beginning of Forever"
        </h2>
        <div className="space-y-8 text-lg text-[#5A524A] font-light leading-relaxed">
          {story.narrative.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </div>

      {/* Dedicated Story Photo Gallery (Masonry Grid) */}
      <div className="max-w-[1600px] mx-auto px-4 pb-20">
        <div className="text-center mb-12">
          <span className="text-[#B38F4D] text-xs font-bold tracking-[0.2em] uppercase">Gallery</span>
        </div>
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
          {story.gallery.map((image, index) => (
            <div key={index} className="break-inside-avoid overflow-hidden rounded-xl bg-gray-200">
              <img 
                src={image} 
                alt={`${story.couple} Wedding Moment ${index + 1}`}
                className="w-full h-auto object-cover hover:scale-105 transition-transform duration-700 ease-in-out cursor-pointer"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Floating CTA */}
      <div className="bg-[#1E1E1E] text-white py-20 px-4 text-center">
        <h3 className="text-3xl md:text-4xl font-serif mb-6">Loved this celebration?</h3>
        <p className="text-gray-300 font-light mb-10 max-w-lg mx-auto">
          We'd love to capture your special day with the same passion and artistic vision. Let's create magic together.
        </p>
        <Link 
          href="/#contact"
          className="inline-block bg-[#B38F4D] hover:bg-[#B38F4D] text-white px-8 py-4 rounded-full font-semibold uppercase tracking-widest transition-colors shadow-lg shadow-[#B38F4D]/20"
        >
          Inquire About Your Dates
        </Link>
      </div>

    </div>
  );
}