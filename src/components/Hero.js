import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative w-full h-[90vh] min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image & Overlay */}
      {/* We use a placeholder image for now, which can be replaced with the actual high-end bridal portrait */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1583939411023-14783179e581?q=80&w=2070&auto=format&fit=crop')" }}
      >
        <div className="absolute inset-0 bg-black/50 bg-gradient-to-b from-black/80 via-black/30 to-black/80" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 text-center pt-20 w-full">
        {/* Main Heading */}
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight text-white mb-6 uppercase max-w-5xl font-serif drop-shadow-lg">
          Best Wedding Photographer <span className="text-bronze-400 italic block mt-3 drop-shadow-md font-light">In Patna</span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl text-white/95 font-light max-w-3xl mb-8 leading-relaxed tracking-wide drop-shadow-md">
          We Capture Timeless Weddings For Modern Couples Who Want Their Story Told Beautifully.
        </p>

        {/* Decorative Divider */}
        <div className="flex items-center justify-center w-full max-w-xs mb-10 opacity-80">
          <div className="h-[2px] flex-grow bg-gradient-to-r from-transparent via-bronze-400 to-transparent" />
          <div className="w-2.5 h-2.5 rounded-full bg-bronze-400 mx-4 shadow-[0_0_10px_rgba(199,162,99,0.8)]" />
          <div className="h-[2px] flex-grow bg-gradient-to-r from-bronze-400 via-transparent to-transparent" />
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-6 w-full sm:w-auto">
          <a 
            href="#portfolio" 
            className="w-full sm:w-auto px-10 py-3.5 border-2 border-white/80 rounded-full text-white font-medium tracking-widest uppercase text-xs hover:bg-white hover:text-black hover:border-white transition-all duration-300 backdrop-blur-sm"
          >
            View Gallery
          </a>
          <a 
            href="#contact" 
            className="w-full sm:w-auto px-10 py-3.5 border-2 border-bronze-400 rounded-full text-white font-medium tracking-widest uppercase text-xs hover:bg-bronze-400 hover:text-white transition-all duration-300 backdrop-blur-sm"
          >
            Contact Us
          </a>
        </div>
      </div>

      {/* Bottom Wave Divider matching Champagne Beige background */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-10 transform translate-y-[1px]">
        <svg 
          className="relative block w-full h-[60px] sm:h-[120px]" 
          data-name="Layer 1" 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none"
        >
          <path 
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.08,130.83,119.33,189.6,108.64Z" 
            className="fill-champagne-bg" 
          />
        </svg>
      </div>
    </section>
  );
}