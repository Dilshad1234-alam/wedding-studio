export default function StudioIntro() {
  return (
    <section className="py-20 md:py-28 bg-champagne-bg px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto flex flex-col items-center">
        
        {/* Subtle Trust Badge */}
        <div className="inline-flex items-center space-x-2 bg-champagne-card/50 px-4 py-1.5 rounded-full border border-champagne-border mb-8 shadow-sm">
          <span className="text-xs font-semibold text-espresso-light uppercase tracking-widest">
            Powered by Shapo
          </span>
        </div>

        {/* Main Heading */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-center font-bold text-[#B35471] mb-16 leading-tight max-w-4xl drop-shadow-sm">
          Expert Wedding Photography for Every Style and Story
        </h2>

        {/* 2-Column Text Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 text-espresso-light font-light text-lg leading-relaxed mb-16">
          <div className="space-y-4">
            <p>
              Indian wedding means happiness, laughter, emotions, dance, colors, traditions, vibrancy... and matters. We are a premium wedding photography studio based in Patna, Bihar. We specialize in candid wedding photography, cinematic wedding films, and luxury wedding storytelling.
            </p>
            <p>
              Our team focuses on capturing real emotions, beautiful details, and unforgettable moments that couples will cherish for a lifetime.
            </p>
          </div>
          <div className="space-y-4">
            <p>
              We have been ranked among the best wedding photographers in Patna. Nothing could be better and more precious than the wedding of two people that promise to spend eternity together.
            </p>
            <p>
              Here, we ensure that the Prewedding, Engagement, Candid, and Destination wedding shot by us will cause you to smile and remember the stunning moments forever.
            </p>
          </div>
        </div>

        {/* Center Action Button */}
        <div className="flex justify-center w-full">
          <a 
            href="#contact"
            className="inline-block px-8 py-3.5 border-2 border-bronze-500 text-bronze-600 rounded-full font-medium tracking-wide uppercase text-sm hover:bg-bronze-500 hover:text-white transition-all duration-300 shadow-sm shadow-bronze-500/10"
          >
            Book Free Consultation
          </a>
        </div>

      </div>
    </section>
  );
}
