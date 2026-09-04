'use client';

import Link from 'next/link';
import { Camera } from 'lucide-react';

const services = [
  {
    title: 'Wedding Photography',
    description: 'Your wedding day deserves to be remembered in the most beautiful way possible. Our wedding photography service captures genuine emotions, meaningful rituals, candid moments, and every important detail. From getting ready to the final farewell, we document your celebration with creativity, passion, and timeless storytelling.',
    image: 'https://picsum.photos/seed/service-wedding/1000/1200'
  },
  {
    title: 'Engagement Photography',
    description: 'Your engagement marks the beginning of a beautiful new chapter. We capture every smile, glance, and special moment with elegant and natural photography. From intimate ceremonies to grand celebrations, our engagement photography preserves memories that perfectly reflect your happiness and commitment.',
    image: 'https://picsum.photos/seed/service-engagement/1000/1200'
  },
  {
    title: 'Pre - Wedding Photography',
    description: 'Celebrate your journey together before the wedding with a personalized pre-wedding photoshoot. Whether you prefer a romantic outdoor location or a unique concept, we create stunning images that reflect your love story. Our goal is to capture your chemistry, personality, and excitement for the future.',
    image: 'https://picsum.photos/seed/service-prewedding/1000/1200'
  },
  {
    title: 'Drone Photography',
    description: 'Take your memories to new heights with professional drone photography. Our aerial coverage captures stunning views of venues, ceremonies, decorations, and celebrations from a unique perspective. Perfect for weddings and special events, drone photography adds a dramatic and cinematic touch to your collection.',
    image: 'https://picsum.photos/seed/service-drone/1000/1200'
  },
  {
    title: 'Maternity Photography',
    description: 'Every milestone is worth celebrating and remembering. We capture the excitement, laughter, and tender moments that make your story unique. Our gentle and artistic photography celebrates the upcoming arrival with elegance and warmth.',
    image: 'https://picsum.photos/seed/service-maternity/1000/1200'
  },
  {
    title: 'Birthday Photography',
    description: 'Celebrate life\'s joyful milestones with vibrant, joyful photography. From cake smashes and intimate family gatherings to grand birthday parties, we preserve the playful smiles and unforgettable memories for years to come.',
    image: 'https://picsum.photos/seed/service-birthday/1000/1200'
  }
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-[#212639] text-[#EDEAE4] pt-28 pb-20">
      
      {/* Header Intro Section */}
      <div className="pt-8 pb-16 px-4 sm:px-6 lg:px-8 text-center max-w-5xl mx-auto">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-normal text-[#B38F4D] mb-6">
          Services we Offer
        </h1>
        
        {/* Decorative Camera Line Divider */}
        <div className="flex items-center justify-center space-x-4 mb-8">
          <div className="w-16 md:w-24 border-t-2 border-dashed border-[#B38F4D]/50"></div>
          <Camera className="text-[#B38F4D]" size={24} />
          <div className="w-16 md:w-24 border-t-2 border-dashed border-[#B38F4D]/50"></div>
        </div>

        <p className="text-[#A39E93] text-base md:text-lg leading-relaxed font-light">
          At WEDDINGPUR, we offer complete wedding photography and cinematography services in Patna and across India. From candid wedding photography and cinematic wedding films to engagement shoots, pre-wedding sessions, wedding albums, and online photo galleries, our team captures every moment with creativity, emotion, and timeless storytelling.
        </p>
      </div>

      {/* 6 Alternating Split Grid Rows (Z-Pattern) */}
      <div className="flex flex-col">
        {services.map((service, index) => {
          const isEven = index % 2 === 0;
          return (
            <div 
              key={service.title} 
              className={`py-16 md:py-24 px-4 sm:px-6 lg:px-12 ${isEven ? 'bg-[#212639]' : 'bg-[#2B324B]'}`}
            >
              <div className={`max-w-7xl mx-auto flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-10 lg:gap-16`}>
                
                {/* Image Side */}
                <div className="w-full lg:w-1/2 overflow-hidden shadow-xl rounded-2xl">
                  <div className="aspect-[4/5] md:aspect-square lg:aspect-[4/5] overflow-hidden group cursor-pointer bg-gray-200">
                    <img 
                      src={service.image} 
                      alt={service.title}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-in-out"
                      loading="lazy"
                    />
                  </div>
                </div>

                {/* Text Side */}
                <div className="w-full lg:w-1/2 flex flex-col text-center lg:text-left justify-center px-4 md:px-8">
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-normal text-[#B38F4D] mb-6 leading-tight">
                    {service.title}
                  </h2>
                  <p className="text-[#A39E93] text-base md:text-lg leading-relaxed mb-10 font-light">
                    {service.description}
                  </p>
                  <div>
                    <Link 
                      href="/#contact"
                      className="inline-block px-10 py-3.5 rounded-full bg-[#B38F4D] text-white font-medium text-sm tracking-widest uppercase hover:bg-[#987538] hover:shadow-xl transition-all duration-300 shadow-md shadow-[#B38F4D]/20"
                    >
                      Get Quote
                    </Link>
                  </div>
                </div>

              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
