"use client";
import { useRef, useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

const GoogleIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

const REVIEWS = [
  {
    id: 1,
    name: "Sneha & Rahul",
    date: "Jan 12, 2026",
    content: "We had an absolutely amazing experience! The team was highly punctual, professional, and delivered stunning photography. They truly captured the magic of our big day flawlessly. Highly recommend them to any couple looking for perfection.",
  },
  {
    id: 2,
    name: "Shubham Pandey",
    date: "Jan 25, 2026",
    content: "I booked them for my engagement and reception. From the beginning they were very polite and accommodating. Excellent team and timely delivery of albums. The cinematic video was mind-blowing!",
  },
  {
    id: 3,
    name: "Priyanka Singh",
    date: "Dec 15, 2025",
    content: "The best photography team in Patna hands down. Our pre-wedding shoot was beautifully choreographed and the photos look straight out of a magazine. Love their attention to detail.",
  },
  {
    id: 4,
    name: "Amit & Pooja",
    date: "Nov 02, 2025",
    content: "Such a hardworking crew. They made us feel so comfortable in front of the camera and the candid shots are my absolute favorite. 5/5 stars for sure!",
  }
];

export default function ReviewsSection() {
  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth > 768 ? clientWidth / 2 : clientWidth;
      const targetScroll = direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount;
      
      scrollRef.current.scrollTo({
        left: targetScroll,
        behavior: 'smooth'
      });
    }
  };

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const newIndex = Math.round(scrollLeft / clientWidth);
      setActiveIndex(newIndex);
    }
  };

  return (
    <section className="py-24 md:py-32 bg-[#212639] overflow-hidden relative">
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#B38F4D]/5 blur-[150px] rounded-full pointer-events-none" />
      
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Center Header */}
        <div className="flex flex-col items-center justify-center text-center mb-24 space-y-4">
          <div className="flex items-center space-x-2 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={28} className="fill-[#B38F4D] text-[#B38F4D] drop-shadow-[0_0_8px_rgba(179,143,77,0.4)]" />
            ))}
          </div>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-light tracking-tight text-white font-serif">
            5 Stars <span className="text-[#B38F4D] italic">On Google</span>
          </h2>
          <div className="inline-flex items-center space-x-2 bg-white/[0.02] backdrop-blur-md px-6 py-2.5 rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.2)] border border-white/5 mt-6">
            <GoogleIcon size={20} />
            <span className="text-xs font-semibold text-white uppercase tracking-widest">Verified Reviews</span>
          </div>
        </div>

        {/* Carousel Container */}
        <div className="relative group max-w-5xl mx-auto">
          {/* Navigation Buttons */}
          <button 
            onClick={() => scroll('left')}
            className="absolute -left-5 md:-left-12 top-1/2 -translate-y-1/2 z-10 bg-[#2B3147] border border-white/10 hover:border-bronze-500 text-white hover:text-bronze-600 rounded-full p-3 shadow-lg opacity-0 md:group-hover:opacity-100 transition-all focus:outline-none hidden md:flex items-center justify-center"
          >
            <ChevronLeft size={24} />
          </button>
          
          <button 
            onClick={() => scroll('right')}
            className="absolute -right-5 md:-right-12 top-1/2 -translate-y-1/2 z-10 bg-[#2B3147] border border-white/10 hover:border-bronze-500 text-white hover:text-bronze-600 rounded-full p-3 shadow-lg opacity-0 md:group-hover:opacity-100 transition-all focus:outline-none hidden md:flex items-center justify-center"
          >
            <ChevronRight size={24} />
          </button>

          {/* Scrollable Track */}
          <div 
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex space-x-6 overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-8 pt-4 px-2"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {REVIEWS.map((review) => (
              <div 
                key={review.id} 
                className="snap-center flex-none w-[90vw] md:w-[calc(50%-12px)] h-full"
              >
                <div className="h-full flex flex-col bg-white/[0.02] backdrop-blur-xl border border-white/5 rounded-3xl p-10 hover:bg-white/[0.04] hover:border-[#B38F4D]/30 hover:shadow-[0_8px_32px_rgba(0,0,0,0.3)] hover:-translate-y-1 transition-all duration-500">
                  
                  {/* Top Stars & Google Icon */}
                  <div className="flex justify-between items-center mb-8">
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={16} className="fill-[#B38F4D] text-[#B38F4D]" />
                      ))}
                    </div>
                    <GoogleIcon size={20} />
                  </div>

                  {/* Review Text */}
                  <p className="text-gray-300 font-light leading-relaxed text-base italic flex-grow mb-10">
                    "{review.content}"
                  </p>
                  
                  {/* Bottom Avatar & Info */}
                  <div className="flex items-center space-x-4 border-t border-white/5 pt-6 mt-auto">
                    <div className="w-12 h-12 rounded-full bg-[#B38F4D]/10 border border-[#B38F4D]/20 flex items-center justify-center text-[#B38F4D] font-serif text-xl shadow-lg shadow-black/20">
                      {review.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="text-white font-serif text-lg tracking-wide">{review.name}</h4>
                      <p className="text-[10px] font-semibold text-[#B38F4D] uppercase tracking-widest mt-1">{review.date}</p>
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center mt-12">
          <div className="flex space-x-2 bg-white/[0.02] backdrop-blur-md px-4 py-3 rounded-full border border-white/5 shadow-[0_4px_20px_rgba(0,0,0,0.2)]">
            {[...Array(Math.ceil(REVIEWS.length / 2))].map((_, i) => (
              <button 
                key={i} 
                onClick={() => {
                  const width = scrollRef.current.clientWidth;
                  scrollRef.current.scrollTo({ left: width * i, behavior: 'smooth' });
                  setActiveIndex(i);
                }}
                className={`h-1.5 rounded-full transition-all duration-500 ${activeIndex === i ? 'w-8 bg-[#B38F4D]' : 'w-2 bg-white/20 hover:bg-white/40'}`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>

      </div>

      {/* Global CSS for hiding scrollbar inside the component scope just in case */}
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}} />
    </section>
  );
}
