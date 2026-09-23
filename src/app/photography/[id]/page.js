import React from 'react';
import dbConnect from '@/lib/dbConnect';
import Photography from '@/models/Photography';
import Link from 'next/link';

export default async function PhotographyDetailPage({ params }) {
  const { id } = params;
  let photo = null;

  try {
    await dbConnect();
    const doc = await Photography.findById(id).lean();
    if (doc) {
      photo = JSON.parse(JSON.stringify(doc));
    }
  } catch (error) {
    console.error("Error fetching photography detail:", error);
  }

  if (!photo) {
    return (
      <div className="min-h-screen bg-[#0B0D0E] text-[#F5F5F5] flex flex-col items-center justify-center">
        <h1 className="font-serif text-3xl text-[#D4AF37] italic mb-4">Capture Not Found</h1>
        <Link href="/photography" className="text-xs uppercase tracking-[0.2em] font-medium text-[#C5B388] hover:text-white transition-colors">
          &larr; Return to Gallery
        </Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#0B0D0E] text-[#F5F5F5] font-sans antialiased selection:bg-[#D4AF37] selection:text-black">
      
      {/* 1. CINEMATIC COVER HERO */}
      <section className="relative w-full h-[60vh] sm:h-[80vh] bg-[#121518]">
        <div className="absolute inset-0 z-0">
          <img
            src={photo.imageUrl}
            alt={photo.title}
            className="w-full h-full object-cover object-center"
          />
          {/* Gradients for text readability and blending into background */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-[#0B0D0E]"></div>
        </div>

        <div className="relative z-10 w-full max-w-[1536px] mx-auto px-6 sm:px-12 h-full flex flex-col justify-end pb-12 sm:pb-24">
          <Link href="/photography" className="inline-flex items-center text-[10px] sm:text-xs uppercase tracking-[0.2em] font-medium text-[#C5B388] hover:text-[#D4AF37] transition-colors mb-6 sm:mb-10 w-fit">
            <span className="mr-2">&larr;</span> Back to Portfolio
          </Link>

          <span className="inline-block px-3 py-1 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 text-[9px] sm:text-[10px] font-black uppercase tracking-[0.3em] text-[#D4AF37] mb-4 w-fit">
            {photo.category || 'Wedding'}
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-white italic tracking-tight leading-tight mb-4 drop-shadow-md">
            {photo.title}
          </h1>
          <p className="text-[#C5B388] text-xs sm:text-sm uppercase tracking-[0.3em] font-medium flex items-center gap-2">
            <span className="text-[#D4AF37]">◆</span> {photo.location || 'India'}
          </p>
        </div>
      </section>

      {/* 2. DESCRIPTION & NARRATIVE (If available) */}
      {photo.description && (
        <section className="w-full max-w-4xl mx-auto px-6 sm:px-12 py-16 sm:py-24 text-center">
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#D4AF37] block mb-6">
            THE STORY
          </span>
          <p className="text-sm sm:text-lg text-[#D1C7A5] font-light leading-relaxed">
            {photo.description}
          </p>
          <div className="w-12 h-[1px] bg-[#3A311D] mx-auto mt-12"></div>
        </section>
      )}

      {/* 3. FULL GALLERY GRID (If available) */}
      {photo.gallery && photo.gallery.length > 0 && (
        <section className="w-full max-w-[1536px] mx-auto px-4 sm:px-8 lg:px-12 pb-24">
          {!photo.description && <div className="pt-16 sm:pt-24"></div>}
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="font-serif text-3xl sm:text-4xl text-white italic font-normal">
              Event Gallery
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {photo.gallery.map((imgUrl, idx) => (
              <div key={idx} className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden bg-[#121518] group border border-[#2B2519]">
                <img
                  src={imgUrl}
                  alt={`${photo.title} Gallery Image ${idx + 1}`}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300 pointer-events-none"></div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 4. CALL TO ACTION FOOTER */}
      <section className="w-full bg-[#121518] py-20 border-t border-[#2B2519]">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="font-serif text-3xl sm:text-5xl text-white italic mb-6">
            Begin Your Legacy
          </h2>
          <p className="text-xs sm:text-sm text-[#C5B388] font-light mb-10">
            Let us capture your moments with the same cinematic depth and editorial elegance.
          </p>
          <Link
            href="/contact"
            className="inline-block px-10 py-4 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#E5C158] to-[#B89018] hover:from-[#F3E5AB] hover:to-[#D4AF37] text-black text-xs font-black uppercase tracking-[0.2em] shadow-lg shadow-[#D4AF37]/20 transition-all duration-300"
          >
            Commission This Suite
          </Link>
        </div>
      </section>

    </main>
  );
}
