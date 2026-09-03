import { Instagram } from 'lucide-react';

const InstaIcon = ({ size = 24 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

export default function InstagramGrid() {
  const images = [
    "https://images.unsplash.com/photo-1595981267035-7b04d84b52df?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=1974&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1542037104857-ffbb0b9155fb?q=80&w=1954&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=2069&auto=format&fit=crop"
  ];

  return (
    <section className="py-20 md:py-28 bg-champagne-bg px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#B35471] tracking-tight drop-shadow-sm">
            A bit of Insta...
          </h2>
        </div>

        {/* 6-Photo Masonry Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 sm:gap-4 mb-16">
          {images.map((src, index) => (
            <a 
              key={index}
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="relative aspect-square w-full bg-champagne-card overflow-hidden group cursor-pointer"
            >
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url('${src}')` }}
              />
              {/* Subtle Hover Overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform scale-75 group-hover:scale-100 text-white drop-shadow-lg">
                  <InstaIcon size={40} />
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <button className="w-full sm:w-auto px-10 py-3.5 border-2 border-espresso text-espresso rounded-full font-medium uppercase tracking-widest text-xs hover:bg-espresso hover:text-white transition-all duration-300">
            Load More
          </button>
          
          <a 
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto flex items-center justify-center gap-3 px-10 py-3.5 bg-bronze-600 border-2 border-bronze-600 text-white rounded-full font-medium uppercase tracking-widest text-xs hover:bg-bronze-500 hover:border-bronze-500 transition-all duration-300 shadow-md shadow-bronze-600/20"
          >
            <InstaIcon size={18} />
            Follow on Instagram
          </a>
        </div>

      </div>
    </section>
  );
}
