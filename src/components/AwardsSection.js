// Laurel Wreath SVG Icon Component
const LaurelWreath = ({ children }) => (
  <div className="relative flex items-center justify-center w-full aspect-square max-w-[240px] mx-auto p-4 group">
    {/* SVG Laurel Graphic */}
    <svg 
      viewBox="0 0 100 100" 
      className="absolute inset-0 w-full h-full text-bronze-400 opacity-60 group-hover:opacity-100 transition-opacity duration-500 transform scale-110" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M 50 95 C 20 95 10 70 10 40 C 10 30 15 20 25 15 C 20 25 25 35 30 35 C 25 35 15 45 15 55 C 20 45 30 45 35 45 C 30 55 25 65 35 75 C 30 70 40 65 45 70 C 45 80 50 85 50 90" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M 50 95 C 80 95 90 70 90 40 C 90 30 85 20 75 15 C 80 25 75 35 70 35 C 75 35 85 45 85 55 C 80 45 70 45 65 45 C 70 55 75 65 65 75 C 70 70 60 65 55 70 C 55 80 50 85 50 90" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      {/* Leaves Detailing */}
      <path d="M 17 35 C 22 25 27 20 27 20 M 83 35 C 78 25 73 20 73 20 M 13 47 C 22 40 28 35 28 35 M 87 47 C 78 40 72 35 72 35 M 14 62 C 22 55 30 50 30 50 M 86 62 C 78 55 70 50 70 50 M 21 76 C 28 68 36 62 36 62 M 79 76 C 72 68 64 62 64 62" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
    {/* Center Text Content */}
    <div className="relative z-10 flex flex-col items-center justify-center text-center p-6 space-y-1">
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
    <section className="py-20 md:py-28 bg-[#FAF8F5] px-4 sm:px-6 lg:px-8 border-t border-champagne-border/50">
      <div className="max-w-7xl mx-auto">
        
        {/* Main Section Heading */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#B35471] tracking-tight mb-4 drop-shadow-sm">
            Awards & Features
          </h2>
          <div className="w-16 h-1 bg-bronze-400 mx-auto rounded-full opacity-60"></div>
        </div>

        {/* 4-Badge Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {awards.map((award, index) => (
            <LaurelWreath key={index}>
              <span className="text-[10px] font-bold text-bronze-600 uppercase tracking-[0.2em] mb-1">
                {award.topText}
              </span>
              
              <h3 className="text-xs md:text-[13px] font-serif font-bold text-espresso leading-relaxed max-w-[140px] mt-1 mb-2">
                {award.title}
              </h3>
              
              {award.year && (
                <span className="text-xl font-serif italic text-bronze-500 mb-1 leading-none">
                  {award.year}
                </span>
              )}
              
              <span className="text-[10px] font-medium text-espresso-light uppercase tracking-widest mt-1">
                {award.org}
              </span>
            </LaurelWreath>
          ))}
        </div>

      </div>
    </section>
  );
}
