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
    <section className="py-24 md:py-32 bg-[#212639] overflow-hidden relative">
      <div className="max-w-screen-2xl mx-auto px-4">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif font-normal text-white tracking-tight">
            Follow <span className="text-[#B38F4D] italic">@weddingpur</span>
          </h2>
          <div className="w-12 h-[1px] bg-[#B38F4D] mx-auto opacity-80 mt-6" />
        </div>

        {/* 6-Photo Masonry Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-1 mb-20">
          {images.map((src, index) => (
            <a 
              key={index}
              href="https://www.instagram.com/weddingpur/"
              target="_blank"
              rel="noopener noreferrer"
              className="relative aspect-square w-full overflow-hidden group cursor-pointer"
            >
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-[2s] ease-out group-hover:scale-110"
                style={{ backgroundImage: `url('${src}')` }}
              />
              {/* Subtle Dark Vignette */}
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/60 transition-colors duration-700 pointer-events-none" />
              
              {/* Overlay with Icon */}
              <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                <div className="transform translate-y-4 group-hover:translate-y-0 transition-all duration-700 text-[#B38F4D]">
                  <InstaIcon size={40} />
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <button className="w-full sm:w-auto px-10 py-3.5 border border-white/20 text-white rounded-full font-semibold uppercase tracking-[0.2em] text-[10px] hover:bg-white/[0.05] hover:border-white/40 transition-all duration-500 backdrop-blur-md">
            Load More
          </button>
          
          <a 
            href="https://www.instagram.com/weddingpur/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto flex items-center justify-center gap-3 px-10 py-3.5 bg-[#B38F4D]/10 border border-[#B38F4D]/50 text-[#B38F4D] rounded-full font-semibold uppercase tracking-[0.2em] text-[10px] hover:bg-[#B38F4D] hover:text-white hover:border-[#B38F4D] transition-all duration-500 shadow-[0_4px_20px_rgba(179,143,77,0.15)] hover:shadow-[0_8px_32px_rgba(179,143,77,0.3)] backdrop-blur-md"
          >
            <InstaIcon size={16} />
            Follow on Instagram
          </a>
        </div>

      </div>
    </section>
  );
}
