import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative w-full h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
      {/* Background Image & Overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transform scale-105 animate-[zoomIn_20s_ease-out_forwards]"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1583939411023-14783179e581?q=80&w=2070&auto=format&fit=crop')" }}
      >
        <div className="absolute inset-0 bg-black/40 bg-gradient-to-t from-[#212639] via-black/20 to-black/60" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 text-center pt-24 w-full">
        {/* Subtitle Top */}
        <p className="text-xs sm:text-sm text-[#B38F4D] uppercase tracking-[0.3em] font-medium mb-6 animate-[fadeInUp_1s_ease-out_0.2s_both]">
          Premium Studio & Cinema
        </p>

        {/* Main Heading */}
        <h1 className="text-5xl sm:text-7xl md:text-8xl font-normal tracking-tight text-white mb-6 font-serif leading-[1.1] animate-[fadeInUp_1s_ease-out_0.4s_both]">
          Crafting Timeless <br />
          <span className="text-[#B38F4D] italic font-light pr-4">Memories</span>
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg text-gray-300 font-light max-w-2xl mb-12 leading-relaxed tracking-wide animate-[fadeInUp_1s_ease-out_0.6s_both]">
          We document your most beautiful moments for modern couples who desire elegant, authentic, and cinematic storytelling.
        </p>

        {/* Decorative Divider */}
        <div className="flex items-center justify-center w-full max-w-xs mb-12 opacity-70 animate-[fadeInUp_1s_ease-out_0.8s_both]">
          <div className="h-[1px] flex-grow bg-gradient-to-r from-transparent via-[#B38F4D] to-transparent" />
          <div className="w-1.5 h-1.5 rounded-full bg-[#B38F4D] mx-6 shadow-[0_0_8px_rgba(179,143,77,0.8)]" />
          <div className="h-[1px] flex-grow bg-gradient-to-r from-[#B38F4D] via-transparent to-transparent" />
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-6 w-full sm:w-auto animate-[fadeInUp_1s_ease-out_1s_both]">
          <Link 
            href="/portfolio" 
            className="w-full sm:w-auto px-10 py-4 border border-white/20 rounded-full text-white font-medium tracking-widest uppercase text-xs hover:bg-white hover:text-black transition-all duration-500 backdrop-blur-md"
          >
            Explore Gallery
          </Link>
          <Link 
            href="/contact" 
            className="w-full sm:w-auto px-10 py-4 bg-[#B38F4D] border border-[#B38F4D] rounded-full text-white font-medium tracking-widest uppercase text-xs hover:bg-[#987538] transition-all duration-500 shadow-[0_4px_20px_rgba(179,143,77,0.3)] hover:shadow-[0_4px_25px_rgba(179,143,77,0.5)]"
          >
            Inquire Now
          </Link>
        </div>
      </div>
      
      {/* CSS Animations (Inline for simplicity without extending tailwind config if not necessary) */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes zoomIn {
          from { transform: scale(1.1); }
          to { transform: scale(1); }
        }
      `}} />
    </section>
  );
}