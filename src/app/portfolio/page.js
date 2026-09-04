'use client';
import Link from 'next/link';

export default function PortfolioPage() {
  const images = [
    { src: "https://ik.imagekit.io/Dilshad/Cafe/Yatrikit/wedding-studio/wedding-editorial-shoot-weddingpur-scaled-e1773261531589.jpg", aspect: "aspect-[3/4]" },
    { src: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&auto=format&fit=crop", aspect: "aspect-square" },
    { src: "https://images.unsplash.com/photo-1595981267035-7b04d84b52df?q=80&w=800&auto=format&fit=crop", aspect: "aspect-[4/5]" },
    { src: "https://images.unsplash.com/photo-1583939411023-14783179e581?q=80&w=800&auto=format&fit=crop", aspect: "aspect-[3/4]" },
    { src: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&auto=format&fit=crop", aspect: "aspect-square" },
    { src: "https://ik.imagekit.io/Dilshad/Cafe/Yatrikit/wedding-studio/wedding-editorial-shoot-weddingpur-scaled-e1773261531589.jpg", aspect: "aspect-[4/5]" },
  ];

  return (
    <main className="min-h-screen bg-[#FAF8F5] text-[#1F231D] font-sans selection:bg-[#5B6454] selection:text-[#FAF8F5] pt-32 pb-24">
      
      {/* Header */}
      <section className="container mx-auto px-4 text-center mb-20 max-w-4xl">
        <span className="text-[10px] uppercase tracking-[0.3em] text-[#555D4E] font-semibold block mb-4">
          PORTFOLIO
        </span>
        <h1 className="font-serif text-5xl md:text-7xl text-[#1F231D] mb-8 leading-tight">
          Recent <span className="italic">Captures</span>
        </h1>
        <p className="text-[#4C5346] text-sm font-light leading-relaxed max-w-2xl mx-auto">
          A curated selection of our favorite moments from recent celebrations across the globe.
        </p>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-4 mt-12">
          {['All Works', 'Wedding', 'Pre-Wedding', 'Haldi & Sangeet'].map((filter, i) => (
            <button 
              key={i}
              className={`px-6 py-2 rounded-full text-[10px] tracking-widest uppercase font-medium transition-colors ${i === 0 ? 'bg-[#5B6454] text-[#FAF8F5]' : 'bg-transparent border border-[#555D4E]/20 text-[#555D4E] hover:border-[#555D4E]'}`}
            >
              {filter}
            </button>
          ))}
        </div>
      </section>

      {/* Masonry / Grid Showcase */}
      <section className="w-full px-4 sm:px-6 md:px-12">
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {images.map((img, index) => (
            <div 
              key={index} 
              className={`relative overflow-hidden group cursor-pointer border border-[#E8E4DC] ${img.aspect} ${index % 3 === 1 ? 'rounded-t-full rounded-b-xl' : 'rounded-xl'}`}
            >
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-[4s] group-hover:scale-110"
                style={{ backgroundImage: `url('${img.src}')` }}
              />
              <div className="absolute inset-0 bg-[#555D4E]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          ))}
        </div>
      </section>

    </main>
  );
}