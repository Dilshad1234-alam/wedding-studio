'use client';
import Link from 'next/link';
import { BookOpen } from 'lucide-react';

export default function AlbumsPage() {
  const albums = [
    {
      title: "The Heritage Lay-Flat",
      desc: "Museum-grade archival printing on matte silk paper, bound in genuine leather.",
      image: "https://images.unsplash.com/photo-1544627836-822bfea45826?q=80&w=1000&auto=format&fit=crop"
    },
    {
      title: "The Editorial Lookbook",
      desc: "A sleek, magazine-style softcover book featuring your candid story.",
      image: "https://images.unsplash.com/photo-1595981267035-7b04d84b52df?q=80&w=1000&auto=format&fit=crop"
    },
    {
      title: "The Linen Heirloom",
      desc: "Handcrafted natural linen cover with deep debossing and thick core pages.",
      image: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1000&auto=format&fit=crop"
    }
  ];

  return (
    <main className="min-h-screen bg-[#FAF8F5] text-[#1F231D] font-sans selection:bg-[#5B6454] selection:text-[#FAF8F5] pt-32 pb-24">
      
      {/* Header */}
      <section className="container mx-auto px-4 text-center mb-24 max-w-4xl">
        <span className="text-[10px] uppercase tracking-[0.3em] text-[#555D4E] font-semibold block mb-4">
          FINE ART PRINTING
        </span>
        <h1 className="font-serif text-5xl md:text-7xl text-[#1F231D] mb-8 leading-tight">
          Handcrafted <br/>
          <span className="italic">Heirloom Albums</span>
        </h1>
        <p className="text-[#4C5346] text-sm font-light leading-relaxed max-w-2xl mx-auto">
          We believe that a photograph is not truly finished until it is printed. Our bespoke albums are museum-grade art pieces, designed to preserve your legacy for generations.
        </p>
      </section>

      {/* Album Showcase Grid */}
      <section className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
          {albums.map((album, index) => (
            <div key={index} className="flex flex-col items-center text-center group cursor-pointer">
              
              {/* Arched Photo Card */}
              <div className="w-full aspect-[3/4] rounded-t-full rounded-b-2xl overflow-hidden shadow-xl border-4 border-white mb-8 relative">
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-[4s] group-hover:scale-105"
                  style={{ backgroundImage: `url('${album.image}')` }}
                />
                <div className="absolute inset-0 bg-[#555D4E]/10 group-hover:bg-transparent transition-colors duration-700" />
                
                {/* Overlay Icon */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-[#FAF8F5]/30 backdrop-blur-sm">
                  <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-[#555D4E] shadow-lg">
                    <BookOpen size={24} strokeWidth={1.5} />
                  </div>
                </div>
              </div>
              
              {/* Info */}
              <h3 className="font-serif text-2xl text-[#1F231D] mb-3 group-hover:text-[#555D4E] transition-colors">
                {album.title}
              </h3>
              <p className="text-[#4C5346] text-sm font-light leading-relaxed px-4">
                {album.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="mt-32 text-center px-4">
        <div className="inline-flex flex-col items-center bg-[#EAECE8] rounded-full px-12 py-16 sm:px-24 border border-white max-w-3xl mx-auto shadow-sm">
          <h2 className="font-serif text-3xl sm:text-4xl text-[#1F231D] mb-6">
            Ready to design your legacy?
          </h2>
          <Link 
            href="/contact" 
            className="bg-[#5B6454] hover:bg-[#485042] text-[#FAF8F5] px-10 py-3.5 rounded-full text-[10px] tracking-widest uppercase transition-colors shadow-md"
          >
            Inquire About Albums
          </Link>
        </div>
      </section>

    </main>
  );
}
