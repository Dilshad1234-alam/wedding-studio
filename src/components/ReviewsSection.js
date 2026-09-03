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
    <section className="py-20 bg-champagne-bg overflow-hidden relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Center Header */}
        <div className="flex flex-col items-center justify-center text-center mb-16 space-y-4">
          <div className="flex items-center space-x-2 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={28} className="fill-bronze-500 text-bronze-500 drop-shadow-sm" />
            ))}
          </div>
          <h2 className="text-3xl md:text-5xl font-light tracking-tight text-espresso font-serif">
            5 Stars <span className="italic">On Google</span>
          </h2>
          <div className="inline-flex items-center space-x-2 bg-white px-5 py-2 rounded-full shadow-sm border border-champagne-border mt-4">
            <GoogleIcon size={20} />
            <span className="text-sm font-semibold text-espresso-light uppercase tracking-wider">Verified Reviews</span>
          </div>
        </div>

        {/* Carousel Container */}
        <div className="relative group max-w-5xl mx-auto">
          {/* Navigation Buttons */}
          <button 
            onClick={() => scroll('left')}
            className="absolute -left-5 md:-left-12 top-1/2 -translate-y-1/2 z-10 bg-white border border-champagne-border hover:border-bronze-500 text-espresso hover:text-bronze-600 rounded-full p-3 shadow-lg opacity-0 md:group-hover:opacity-100 transition-all focus:outline-none hidden md:flex items-center justify-center"
          >
            <ChevronLeft size={24} />
          </button>
          
          <button 
            onClick={() => scroll('right')}
            className="absolute -right-5 md:-right-12 top-1/2 -translate-y-1/2 z-10 bg-white border border-champagne-border hover:border-bronze-500 text-espresso hover:text-bronze-600 rounded-full p-3 shadow-lg opacity-0 md:group-hover:opacity-100 transition-all focus:outline-none hidden md:flex items-center justify-center"
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
                <div className="h-full flex flex-col bg-white border border-champagne-border rounded-2xl p-8 hover:border-bronze-500/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 shadow-md">
                  
                  {/* Top Stars & Google Icon */}
                  <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={16} className="fill-bronze-500 text-bronze-500" />
                      ))}
                    </div>
                    <GoogleIcon size={20} />
                  </div>

                  {/* Review Text */}
                  <p className="text-espresso font-light leading-relaxed text-base italic flex-grow mb-8">
                    "{review.content}"
                  </p>
                  
                  {/* Bottom Avatar & Info */}
                  <div className="flex items-center space-x-4 border-t border-champagne-border/60 pt-6">
                    <div className="w-12 h-12 rounded-full bg-champagne-card border border-champagne-border flex items-center justify-center text-bronze-600 font-serif text-xl shadow-sm">
                      {review.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="text-espresso font-medium text-base tracking-wide">{review.name}</h4>
                      <p className="text-xs text-espresso-light mt-0.5">{review.date}</p>
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center mt-6">
          <div className="flex space-x-2 bg-white/50 px-3 py-2 rounded-full border border-champagne-border/50">
            {[...Array(Math.ceil(REVIEWS.length / 2))].map((_, i) => (
              <button 
                key={i} 
                onClick={() => {
                  const width = scrollRef.current.clientWidth;
                  scrollRef.current.scrollTo({ left: width * i, behavior: 'smooth' });
                  setActiveIndex(i);
                }}
                className={`h-2 rounded-full transition-all duration-300 ${activeIndex === i ? 'w-8 bg-bronze-500' : 'w-2 bg-champagne-border hover:bg-bronze-400'}`}
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
