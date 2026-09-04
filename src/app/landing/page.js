'use client';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="w-full bg-[#FAF8F5] text-[#1E221D] font-sans selection:bg-[#626C59] selection:text-[#FAF8F5] pb-24">
      
      {/* 1. Hero Section */}
      <section className="relative w-full min-h-screen flex flex-col md:flex-row overflow-hidden pt-20 lg:pt-0">
        {/* Split Background */}
        <div className="absolute inset-0 flex z-0">
          <div className="w-full md:w-[55%] bg-[#FAF8F5]"></div>
          <div className="w-full md:w-[45%] bg-[#ECEFEA]"></div>
        </div>

        <div className="relative z-10 max-w-[1400px] mx-auto w-full flex flex-col md:flex-row items-center justify-between px-6 sm:px-12 py-16 lg:py-24 h-full min-h-screen">
          
          {/* Left Content */}
          <div className="w-full md:w-[55%] pr-0 md:pr-12 text-center md:text-left flex flex-col justify-center mb-16 md:mb-0">
            <span className="text-[11px] uppercase tracking-[0.35em] text-[#626C59] font-medium block mb-4">
              Together Forever
            </span>
            <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl text-[#1E221D] font-normal leading-[1.12] mb-6">
              Our love story <br/>
              <span className="italic font-light">begins here.</span>
            </h1>
            <p className="text-[#5F6757] font-light max-w-sm mx-auto md:mx-0 mb-10 leading-relaxed">
              We preserve timeless memories, authentic emotions, and cinematic legacy for modern couples.
            </p>
            <div>
              <Link 
                href="/portfolio" 
                className="inline-block bg-[#626C59] hover:bg-[#4E5646] text-[#FAF8F5] px-9 py-3.5 rounded-full text-xs tracking-[0.25em] uppercase font-medium transition shadow-sm"
              >
                Explore Work
              </Link>
            </div>
          </div>

          {/* Right Visual */}
          <div className="w-full md:w-[45%] flex justify-center md:justify-end items-center">
            <div className="relative mx-auto max-w-sm sm:max-w-md w-full aspect-[3/4] rounded-t-full rounded-b-3xl overflow-hidden shadow-2xl border-8 border-white">
              <img 
                src="https://ik.imagekit.io/Dilshad/Cafe/Yatrikit/wedding-studio/wedding-editorial-shoot-weddingpur-scaled-e1773261531589.jpg" 
                alt="Weddingpur Couple" 
                className="w-full h-full object-cover" 
              />
            </div>
          </div>
          
        </div>
      </section>

      {/* 2. What to Expect / Services */}
      <section className="py-24 sm:py-32 bg-[#FAF8F5] relative px-6 sm:px-12">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-16">
            <span className="text-center block text-[11px] uppercase tracking-[0.3em] text-[#626C59] font-semibold mb-2">
              Our Celebrations
            </span>
            <h2 className="text-center font-serif text-4xl sm:text-5xl text-[#1E221D]">
              What to Expect
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Ceremony */}
            <div className="bg-[#DFE6DE] rounded-t-full rounded-b-3xl p-10 text-center flex flex-col items-center border border-white/60 shadow-sm hover:-translate-y-2 transition-transform duration-500">
              <div className="w-12 h-12 text-[#626C59]">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>
              </div>
              <h3 className="font-serif text-2xl text-[#1E221D] mt-4 mb-2">Ceremony</h3>
              <p className="text-[#5F6757] text-sm font-light leading-relaxed px-2">
                Capturing sacred rituals and genuine feelings surrounded by loved ones.
              </p>
            </div>

            {/* Reception */}
            <div className="bg-[#EFE8DE] rounded-t-full rounded-b-3xl p-10 text-center flex flex-col items-center border border-white/60 shadow-sm hover:-translate-y-2 transition-transform duration-500">
              <div className="w-12 h-12 text-[#8C7A6B]">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22c4.97-1.5 9-6.9 9-12 0-3.9-3.1-7-7-7-2.2 0-4.1.9-5.4 2.4C7.3 3.9 5.4 3 3.2 3 2.5 3 2 3.5 2 4.2c0 6.6 4.6 12 10 17.8Z"/></svg>
              </div>
              <h3 className="font-serif text-2xl text-[#1E221D] mt-4 mb-2">Reception</h3>
              <p className="text-[#5F6757] text-sm font-light leading-relaxed px-2">
                Evening banquets, laughter, toasts, and dancing into the night.
              </p>
            </div>

            {/* Memories */}
            <div className="bg-[#DDE3DF] rounded-t-full rounded-b-3xl p-10 text-center flex flex-col items-center border border-white/60 shadow-sm hover:-translate-y-2 transition-transform duration-500">
              <div className="w-12 h-12 text-[#626C59]">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg>
              </div>
              <h3 className="font-serif text-2xl text-[#1E221D] mt-4 mb-2">Cinematic Legacy</h3>
              <p className="text-[#5F6757] text-sm font-light leading-relaxed px-2">
                Every fleeting second preserved in 4K heirloom cinema and fine art albums.
              </p>
            </div>
          </div>

          <div className="text-center mt-16">
            <Link 
              href="/services" 
              className="inline-block bg-[#626C59] hover:bg-[#4E5646] text-[#FAF8F5] px-9 py-3.5 rounded-full text-xs tracking-[0.2em] uppercase font-medium transition"
            >
              View Details
            </Link>
          </div>
        </div>
      </section>

      {/* 3. Our Story / Philosophy */}
      <section className="py-24 sm:py-32 bg-[#ECEFEA] relative px-6 sm:px-12">
        <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-center gap-12 md:gap-24">
          
          {/* Left Circular Frame */}
          <div className="w-full md:w-1/2 flex justify-center">
            <div className="rounded-full aspect-square w-full max-w-sm sm:max-w-md mx-auto overflow-hidden shadow-xl border-4 border-white">
              <img 
                src="https://images.unsplash.com/photo-1544627836-822bfea45826?q=80&w=1000&auto=format&fit=crop" 
                alt="Our Story" 
                className="w-full h-full object-cover" 
              />
            </div>
          </div>

          {/* Right Content */}
          <div className="w-full md:w-1/2 text-center md:text-left">
            <span className="text-[11px] uppercase tracking-[0.3em] text-[#626C59] font-semibold">
              Our Philosophy
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl text-[#1E221D] leading-snug mt-3 mb-6">
              How We Craft <br/>
              <span className="italic">Timeless Heirlooms</span>
            </h2>
            <div className="text-[#5F6757] font-light leading-relaxed max-w-lg mx-auto md:mx-0 space-y-5 mb-10">
              <p>
                We believe in preserving the unscripted joy and royal intimacy of your celebrations. It is about more than just taking pictures; it is about building a cinematic legacy.
              </p>
              <p>
                With a blend of editorial direction and photojournalistic observation, we document your most treasured day exactly as it felt.
              </p>
            </div>
            <Link 
              href="/about" 
              className="inline-block bg-[#626C59] hover:bg-[#4E5646] text-[#FAF8F5] px-9 py-3.5 rounded-full text-xs tracking-[0.2em] uppercase font-medium transition"
            >
              Read Our Story
            </Link>
          </div>

        </div>
      </section>

      {/* 4. Contact Form */}
      <section className="py-24 sm:py-32 bg-[#FAF8F5] relative px-6 sm:px-12">
        <div className="max-w-[1000px] mx-auto">
          <div className="flex flex-col md:flex-row bg-white rounded-3xl overflow-hidden shadow-xl border border-[#E7E3DA]">
            
            {/* Form */}
            <div className="w-full md:w-[60%] p-10 sm:p-16">
              <span className="text-[11px] uppercase tracking-[0.3em] text-[#626C59] font-semibold block mb-3">
                Kindly Reply
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#1E221D] mb-8">
                Please RSVP by <br/> June 1, 2026
              </h2>
              
              <form className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                   <input type="text" placeholder="Your Name" className="w-full bg-[#FAF8F5] border-none rounded-2xl px-5 py-3.5 text-sm focus:ring-2 focus:ring-[#626C59] text-[#1E221D] placeholder:text-[#A0A69D]" />
                   <input type="text" placeholder="Guest Name" className="w-full bg-[#FAF8F5] border-none rounded-2xl px-5 py-3.5 text-sm focus:ring-2 focus:ring-[#626C59] text-[#1E221D] placeholder:text-[#A0A69D]" />
                </div>
                <div className="relative">
                  <select className="w-full bg-[#FAF8F5] border-none rounded-2xl px-5 py-3.5 text-sm focus:ring-2 focus:ring-[#626C59] text-[#A0A69D] appearance-none">
                    <option value="">Number of Guests</option>
                    <option value="1">1 Guest</option>
                    <option value="2">2 Guests</option>
                    <option value="3+">3+ Guests</option>
                  </select>
                  <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-[#A0A69D]">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m6 9 6 6 6-6"/></svg>
                  </div>
                </div>
                <input type="text" placeholder="Dietary Restrictions" className="w-full bg-[#FAF8F5] border-none rounded-2xl px-5 py-3.5 text-sm focus:ring-2 focus:ring-[#626C59] text-[#1E221D] placeholder:text-[#A0A69D]" />
                
                <button type="button" className="bg-[#626C59] hover:bg-[#4E5646] text-[#FAF8F5] px-10 py-3.5 rounded-full text-xs tracking-widest uppercase font-medium transition shadow-md mt-6">
                  Submit RSVP
                </button>
              </form>
            </div>

            {/* Accent Visual */}
            <div className="w-full md:w-[40%] bg-[#DFE6DE] p-8 flex items-center justify-center relative overflow-hidden">
               <div className="bg-[#ECEFEA] w-full max-w-[240px] aspect-[4/5] p-4 flex flex-col justify-between shadow-lg relative border border-white">
                 <div className="w-full h-2/3 bg-cover bg-center mb-4 border border-white" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=600&auto=format&fit=crop')" }}></div>
                 <div className="text-center pb-4">
                   <h3 className="font-serif text-2xl text-[#1E221D] leading-tight">RSVP <br/> with <br/> love</h3>
                   <span className="text-[#626C59] text-xs mt-2 block">♥</span>
                 </div>
               </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
