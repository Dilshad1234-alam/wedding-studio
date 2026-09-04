'use client';
import Link from 'next/link';
import { Play } from 'lucide-react';

export default function FilmsPage() {
  const films = [
    {
      title: "Aditya & Riya's Royal Pheras",
      location: "Taj Nadesar Palace, Varanasi",
      tag: "HIGHLIGHT FILM",
      image: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&auto=format&fit=crop"
    },
    {
      title: "Karan & Naina's Haldi",
      location: "Umaid Bhawan, Jodhpur",
      tag: "CINEMATIC TEASER",
      image: "https://images.unsplash.com/photo-1595981267035-7b04d84b52df?q=80&w=1200&auto=format&fit=crop"
    },
    {
      title: "Sneha & Rahul's Vows",
      location: "Taj Palace, Patna",
      tag: "DOCUMENTARY",
      image: "https://ik.imagekit.io/Dilshad/Cafe/Yatrikit/wedding-studio/wedding-editorial-shoot-weddingpur-scaled-e1773261531589.jpg"
    }
  ];

  return (
    <main className="min-h-screen bg-[#FAF8F5] text-[#1F231D] font-sans selection:bg-[#5B6454] selection:text-[#FAF8F5] pt-32 pb-24">
      
      {/* Header */}
      <section className="container mx-auto px-4 text-center mb-20 max-w-4xl">
        <span className="text-[10px] uppercase tracking-[0.3em] text-[#555D4E] font-semibold block mb-4">
          CINEMATOGRAPHY
        </span>
        <h1 className="font-serif text-5xl md:text-7xl text-[#1F231D] mb-8 leading-tight">
          Moving <span className="italic">Portraits</span>
        </h1>
        <div className="w-12 h-[1px] bg-[#555D4E] mx-auto mb-8 opacity-50" />
        <p className="text-[#4C5346] text-sm font-light leading-relaxed max-w-2xl mx-auto">
          We don't just record events; we weave emotions, spoken vows, and subtle glances into a cinematic documentary that feels like a timeless movie.
        </p>
      </section>

      {/* Cinematic Grid */}
      <section className="container mx-auto px-4 max-w-6xl space-y-20">
        {films.map((film, index) => (
          <div key={index} className="flex flex-col group cursor-pointer">
            
            {/* 16:9 Cinema Frame */}
            <div className="w-full aspect-video rounded-md overflow-hidden shadow-2xl relative mb-6 border border-white">
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-[5s] ease-out group-hover:scale-105"
                style={{ backgroundImage: `url('${film.image}')` }}
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-700" />
              
              {/* Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 rounded-full border border-white/50 backdrop-blur-sm flex items-center justify-center text-white group-hover:scale-110 group-hover:bg-white group-hover:text-[#5B6454] transition-all duration-500">
                  <Play size={32} fill="currentColor" className="ml-2" />
                </div>
              </div>
            </div>
            
            {/* Metadata */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 px-2">
              <div>
                <span className="inline-block bg-[#EAECE8] text-[#555D4E] px-3 py-1 rounded-sm text-[9px] uppercase tracking-[0.2em] font-medium mb-3">
                  {film.tag}
                </span>
                <h3 className="font-serif text-3xl text-[#1F231D] group-hover:text-[#555D4E] transition-colors">
                  {film.title}
                </h3>
              </div>
              <p className="text-[#4C5346] text-xs tracking-widest uppercase pb-1">
                {film.location}
              </p>
            </div>

          </div>
        ))}
      </section>

      {/* Action Footer */}
      <section className="mt-32 text-center px-4">
         <Link 
            href="/contact" 
            className="inline-block bg-[#5B6454] hover:bg-[#485042] text-[#FAF8F5] px-10 py-3.5 rounded-full text-[10px] tracking-widest uppercase transition-colors shadow-md"
          >
            Commission a Film
          </Link>
      </section>

    </main>
  );
}