import React from 'react';

// Laurel Wreath SVG Icon Component
const LaurelWreath = ({ children }) => (
  <div className="relative flex items-center justify-center w-full aspect-square max-w-[280px] mx-auto p-4 group cursor-pointer">
    {/* Glow Effect on Hover */}
    <div className="absolute inset-0 bg-[#B38F4D] rounded-full blur-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-700"></div>
    
    {/* Refined Laurel Wreath SVG */}
    <svg 
      viewBox="0 0 100 100" 
      className="absolute inset-0 w-full h-full text-[#B38F4D] opacity-[0.15] group-hover:opacity-40 group-hover:drop-shadow-[0_0_15px_rgba(179,143,77,0.3)] transition-all duration-[1s] transform group-hover:scale-105" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Stems */}
      <path d="M49 95 C 15 93, 5 60, 15 28" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
      <path d="M51 95 C 85 93, 95 60, 85 28" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
      
      {/* Left Leaves */}
      <path d="M15 28 C 10 18, 20 13, 25 23 C 20 26, 16 28, 15 28 Z" fill="currentColor" opacity="0.9" />
      <path d="M12 40 C 5 35, 12 25, 20 30 C 18 35, 15 38, 12 40 Z" fill="currentColor" opacity="0.9" />
      <path d="M11 54 C 4 50, 8 40, 16 44 C 15 49, 13 52, 11 54 Z" fill="currentColor" opacity="0.9" />
      <path d="M14 67 C 8 64, 10 54, 18 57 C 17 62, 15 65, 14 67 Z" fill="currentColor" opacity="0.9" />
      <path d="M20 79 C 15 77, 16 68, 24 70 C 23 75, 21 77, 20 79 Z" fill="currentColor" opacity="0.9" />
      <path d="M29 88 C 25 87, 26 80, 33 81 C 32 85, 30 87, 29 88 Z" fill="currentColor" opacity="0.9" />

      {/* Right Leaves */}
      <path d="M85 28 C 90 18, 80 13, 75 23 C 80 26, 84 28, 85 28 Z" fill="currentColor" opacity="0.9" />
      <path d="M88 40 C 95 35, 88 25, 80 30 C 82 35, 85 38, 88 40 Z" fill="currentColor" opacity="0.9" />
      <path d="M89 54 C 96 50, 92 40, 84 44 C 85 49, 87 52, 89 54 Z" fill="currentColor" opacity="0.9" />
      <path d="M86 67 C 92 64, 90 54, 82 57 C 83 62, 85 65, 86 67 Z" fill="currentColor" opacity="0.9" />
      <path d="M80 79 C 85 77, 84 68, 76 70 C 77 75, 79 77, 80 79 Z" fill="currentColor" opacity="0.9" />
      <path d="M71 88 C 75 87, 74 80, 67 81 C 68 85, 70 87, 71 88 Z" fill="currentColor" opacity="0.9" />
    </svg>

    {/* Center Text Content */}
    <div className="relative z-10 flex flex-col items-center justify-center text-center p-8 space-y-2 pb-4 mt-2 transition-transform duration-500 group-hover:-translate-y-1">
      {children}
    </div>
  </div>
);

export default function AwardsSection() {
  const awards = [
    {
      topText: "Winner",
      title: "COUPLE'S CHOICE AWARD",
      year: "2025",
      org: "WEDDINGWIRE"
    },
    {
      topText: "Member",
      title: "WORLD WEDDING PHOTOGRAPHERS CLUB",
      year: null,
      org: "SINCE 2018"
    },
    {
      topText: "Winner",
      title: "USER'S CHOICE AWARD",
      year: "2026",
      org: "WedMeGood"
    },
    {
      topText: "Top 10 Finalist",
      title: "WEDDING PHOTOGRAPHERS OF THE YEAR",
      year: "2025",
      org: "CAPTURINGWOW"
    }
  ];

  return (
    <section className="py-32 md:py-48 bg-[#212639] px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#B38F4D]/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Main Section Heading */}
        <div className="text-center mb-28">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif font-normal text-white tracking-wide mb-8">
            Honors <span className="text-[#B38F4D] italic">&</span> Recognition
          </h2>
          <div className="flex items-center justify-center gap-4 opacity-70">
            <div className="w-16 h-[1px] bg-[#B38F4D]/50" />
            <div className="w-1.5 h-1.5 rounded-full bg-[#B38F4D]" />
            <div className="w-16 h-[1px] bg-[#B38F4D]/50" />
          </div>
        </div>

        {/* 4-Badge Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-16">
          {awards.map((award, index) => (
            <LaurelWreath key={index}>
              <div className="flex flex-col items-center">
                <span className="text-[10px] md:text-[11px] font-medium text-[#B38F4D]/80 uppercase tracking-[0.3em] mb-4">
                  {award.topText}
                </span>
                
                <h3 className="text-[13px] md:text-[15px] font-serif text-white/90 leading-loose max-w-[160px] uppercase tracking-[0.15em] group-hover:text-white transition-colors duration-500">
                  {award.title}
                </h3>
              </div>
              
              <div className="flex flex-col items-center pt-4">
                {award.year && (
                  <span className="text-3xl md:text-4xl font-serif italic text-[#B38F4D] mb-2 leading-none group-hover:scale-105 transition-transform duration-700">
                    {award.year}
                  </span>
                )}
                
                <span className="text-[9px] md:text-[10px] font-medium text-white/40 uppercase tracking-[0.25em] mt-3 group-hover:text-[#B38F4D]/80 transition-colors duration-500">
                  {award.org}
                </span>
              </div>
            </LaurelWreath>
          ))}
        </div>

      </div>
    </section>
  );
}
