"use client";
import React from 'react';
import Link from 'next/link';

export default function StoriesPage() {
  const weddingStories = [
    {
      couple: "Rishabh & Shivani",
      subtitle: "LOVE STORY & SACRED VOWS • PATNA",
      desc: "Rishav and Shivani's wedding journey began long before the wedding day. As a love marriage, their story already had a strong foundation of friendship, comfort, and understanding. Having captured their engagement earlier, we also loved covering their wedding story from the first celebrations to the final bride welcome ceremony.",
      featuredImg: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80",
      gridImgs: [
        "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=200&q=80",
        "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=200&q=80",
        "https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=200&q=80",
        "https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=200&q=80"
      ]
    },
    {
      couple: "Ruchi & Abhishek",
      subtitle: "A JOYFUL MARWADI REVERIE • JAIPUR",
      desc: "Some weddings are beautiful. Some are unforgettable. Abhishek and Ruchi's wedding was one of a kind. A Marwadi wedding full of life, laughter, and love that every single frame told a story worth saving forever. Click on the button to feel every moment of this beautiful union.",
      featuredImg: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80",
      gridImgs: [
        "https://images.unsplash.com/photo-1545232979-8bf68ee9b1af?auto=format&fit=crop&w=200&q=80",
        "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=200&q=80",
        "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=200&q=80",
        "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=200&q=80"
      ]
    },
    {
      couple: "Akshat & Shivangi",
      subtitle: "TWO STATES, ONE CELEBRATION • THE MAVERICK RESORT",
      desc: "Few weddings bring together not just two people and their families, but also two cultures and two beautiful traditions. Akshat and Shivangi's wedding at The Maverick Resort was one such celebration, where love and traditions from two states came together to create something truly special.",
      featuredImg: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
      gridImgs: [
        "https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=200&q=80",
        "https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=200&q=80",
        "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=200&q=80",
        "https://images.unsplash.com/photo-1545232979-8bf68ee9b1af?auto=format&fit=crop&w=200&q=80"
      ]
    },
    {
      couple: "Divya & Nikhil",
      subtitle: "A VALENTINE'S UNION • VRINDAVAN GARDEN, PATNA",
      desc: "Some love stories seem to be timeless, Divya and Nikhil's story was exactly the same. They finalized Valentine's Day for their engagement and this made the moment even more memorable for them. The wedding was in Vrindavan Garden, Patna. In the presence of their close family members and friends, they tied their knot.",
      featuredImg: "https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=800&q=80",
      gridImgs: [
        "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=200&q=80",
        "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=200&q=80",
        "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=200&q=80",
        "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=200&q=80"
      ]
    },
    {
      couple: "Aprajita & Abhinav",
      subtitle: "FROM ZOOM CALL TO FOREVER • THE PARK PRIDE, PATNA",
      desc: "An intimate arranged wedding filled with love, laughter, and happiness. Aprajita and Abhinav started their new journey from THE PARK PRIDE hotel, Patna. Witness their magical journey from Rishta, Zoom call, 2 mins of first meet, proposal, engagement, and wedding.",
      featuredImg: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=800&q=80",
      gridImgs: [
        "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=200&q=80",
        "https://images.unsplash.com/photo-1545232979-8bf68ee9b1af?auto=format&fit=crop&w=200&q=80",
        "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=200&q=80",
        "https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=200&q=80"
      ]
    },
    {
      couple: "Minakshi & Rahul",
      subtitle: "SERENE HEIRLOOMS • ANAND INTERNATIONAL, BODHGAYA",
      desc: "In the heart of Bodhgaya, Minakshi and Rahul exchanged vows at Anand International Hotel, Bihar. The intimate ceremony radiated love as the couple embarked on their journey together. With joyous hearts and a serene backdrop, their union blossomed, creating memories to cherish for a lifetime.",
      featuredImg: "https://images.unsplash.com/photo-1545232979-8bf68ee9b1af?auto=format&fit=crop&w=800&q=80",
      gridImgs: [
        "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=200&q=80",
        "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=200&q=80",
        "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=200&q=80",
        "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=200&q=80"
      ]
    },
    {
      couple: "Sakshi & Manish",
      subtitle: "6-DAY CELEBRATION • BODHGAYA TO SILIGURI",
      desc: "An intimate wedding happened in Bodhgaya, Bihar. A wedding full of masti, fun & enjoyment. We also travelled Siliguri for their reception event. A wedding of six days including engagement, pool party, sangeet, haldi, mehendi, tilak and wedding. View their entire story here.",
      featuredImg: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=800&q=80",
      gridImgs: [
        "https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=200&q=80",
        "https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=200&q=80",
        "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=200&q=80",
        "https://images.unsplash.com/photo-1545232979-8bf68ee9b1af?auto=format&fit=crop&w=200&q=80"
      ]
    },
    {
      couple: "Vageesha & Ritesh",
      subtitle: "BIHAR MEETS UP • LEMON TREE PREMIER, PATNA",
      desc: "We covered a beautiful wedding at Lemontree Premier Hotel, Patna. Ritesh and Vageesha, they both share a beautiful love story. Bride from Uttar Pradesh and groom from Bihar, two families united together for the union of this beautiful couple. Checkout their entire wedding story.",
      featuredImg: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=800&q=80",
      gridImgs: [
        "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=200&q=80",
        "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=200&q=80",
        "https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=200&q=80",
        "https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=200&q=80"
      ]
    }
  ];

  return (
    <main className="min-h-screen bg-[#FAF8F5] text-[#1E221D] font-sans antialiased selection:bg-[#5B6454] selection:text-white">
      
      {/* 1. EDITORIAL HEADER */}
      <section className="pt-4 pb-16 px-6 text-center max-w-4xl mx-auto">
        <span className="text-[10px] uppercase tracking-[0.4em] text-[#5B6454] font-semibold block mb-3">
          JOURNAL & ARCHIVES
        </span>
        <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl italic font-normal text-[#1E221D] tracking-tight mb-4">
          Wedding Stories
        </h1>
      </section>

      {/* 2. STORIES FEED (ALTERNATING EDITORIAL SPREADS) */}
      <section className="pb-28 px-6 sm:px-12 max-w-7xl mx-auto space-y-20">
        {weddingStories.map((story, index) => {
          const isReversed = index % 2 !== 0;
          return (
            <div
              key={index}
              className="bg-white border border-[#DDD7CD] rounded-3xl p-6 sm:p-12 shadow-sm hover:shadow-md transition-shadow duration-500"
            >
              <div className={`grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center ${isReversed ? 'lg:flex-row-reverse' : ''}`}>
                
                {/* Visual Side: Featured Arch + Mini Collage */}
                <div className={`lg:col-span-6 space-y-4 ${isReversed ? 'lg:order-2' : 'lg:order-1'}`}>
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-md bg-[#ECEFEA]">
                    <img
                      src={story.featuredImg}
                      alt={story.couple}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    />
                  </div>

                  {/* 4 Mini Collage Shots */}
                  <div className="grid grid-cols-4 gap-2">
                    {story.gridImgs.map((img, i) => (
                      <div key={i} className="aspect-square rounded-xl overflow-hidden bg-[#ECEFEA] border border-[#EAE6DE]">
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
                  <span className="text-[10px] uppercase tracking-[0.25em] text-[#5B6454] font-semibold block">
                    {story.subtitle}
                  </span>
                  
                  <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#1E221D] italic font-normal">
                    {story.couple}
                  </h2>

                  <p className="text-xs sm:text-sm text-[#525B4C] leading-relaxed font-light">
                    {story.desc}
                  </p>

                  <div className="pt-3">
                    <Link className="inline-block border border-[#5B6454] text-[#5B6454] hover:bg-[#5B6454] hover:text-[#FAF8F5] px-8 py-3 rounded-full text-xs uppercase tracking-[0.2em] font-medium transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer" href="/contact">
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
      <section className="py-20 px-6 bg-[#ECEFEA] text-center border-t border-[#DDD7CD]">
        <h3 className="font-serif text-3xl sm:text-4xl text-[#1E221D] italic mb-3">
          Have a Story Waiting to Be Told?
        </h3>
        <p className="text-xs text-[#525B4C] uppercase tracking-widest mb-6">
          Limited dates available for 2026 & 2027 wedding commissions
        </p>
        <Link className="inline-block bg-[#5B6454] hover:bg-[#485042] text-[#FAF8F5] px-10 py-3.5 rounded-full text-xs uppercase tracking-[0.25em] font-medium shadow-md transition-all duration-300" href="/contact">
          Check Date Availability
        </Link>
      </section>

    </main>
  );
}