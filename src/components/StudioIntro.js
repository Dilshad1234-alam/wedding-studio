export default function StudioIntro() {
  return (
    <section className="py-20 md:py-28 bg-[#212639] px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto flex flex-col items-center">
        
        {/* Subtle Trust Badge */}
        <div className="inline-flex items-center space-x-2 bg-[#2B3147]/50 px-4 py-1.5 rounded-full border border-white/10 mb-8 shadow-lg shadow-black/20">
          <span className="text-xs font-semibold text-[#E8E6E1] uppercase tracking-widest">
            Powered by Shapo
          </span>
        </div>

        {/* Main Heading */}
        <div className="relative mb-16">
          <div className="absolute inset-0 bg-[#B38F4D]/10 blur-[100px] rounded-full" />
          <h2 className="relative font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-normal text-center leading-[1.2] text-white tracking-wide max-w-4xl mx-auto">
            Expert Wedding Photography for <br className="hidden md:block" />
            <span className="text-[#B38F4D] italic">Every Style and Story</span>
          </h2>
        </div>

        {/* Glassmorphism Text Layout */}
        <div className="relative w-full backdrop-blur-xl bg-white/[0.02] border border-white/10 rounded-2xl p-8 sm:p-12 md:p-16 mb-16 shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
          {/* Subtle gold accent corner */}
          <div className="absolute top-0 left-0 w-16 h-16 border-t border-l border-[#B38F4D]/50 rounded-tl-2xl" />
          <div className="absolute bottom-0 right-0 w-16 h-16 border-b border-r border-[#B38F4D]/50 rounded-br-2xl" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 text-gray-300 font-light text-lg leading-relaxed">
            <div className="space-y-6">
              <p>
                Indian wedding means happiness, laughter, emotions, dance, colors, traditions, vibrancy... and matters. We are a premium wedding photography studio based in Patna, Bihar. We specialize in candid wedding photography, cinematic wedding films, and luxury wedding storytelling.
              </p>
              <p>
                Our team focuses on capturing real emotions, beautiful details, and unforgettable moments that couples will cherish for a lifetime.
              </p>
            </div>
            <div className="space-y-6">
              <p>
                We have been ranked among the best wedding photographers in Patna. Nothing could be better and more precious than the wedding of two people that promise to spend eternity together.
              </p>
              <p>
                Here, we ensure that the Prewedding, Engagement, Candid, and Destination wedding shot by us will cause you to smile and remember the stunning moments forever.
              </p>
            </div>
          </div>
        </div>

        {/* Center Action Button */}
        <div className="flex justify-center w-full">
          <a 
            href="/contact"
            className="inline-block px-10 py-4 bg-transparent border border-[#B38F4D] text-[#B38F4D] rounded-full font-medium tracking-widest uppercase text-xs hover:bg-[#B38F4D] hover:text-white transition-all duration-500 shadow-[0_0_15px_rgba(179,143,77,0.15)] hover:shadow-[0_0_25px_rgba(179,143,77,0.4)]"
          >
            Book Free Consultation
          </a>
        </div>

      </div>
    </section>
  );
}
