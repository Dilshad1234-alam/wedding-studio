export default function FeaturedWeddings() {
  return (
    <section className="py-20 md:py-28 bg-[#2B3147] px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-serif font-normal text-bronze-600 tracking-tight">
            Featured Weddings
          </h2>
          <div className="w-24 h-1 bg-bronze-400 mx-auto mt-6 rounded-full opacity-60"></div>
        </div>

        {/* Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-12">
          
          {/* Card 1 */}
          <div className="group relative w-full aspect-[4/5] md:aspect-square overflow-hidden cursor-pointer">
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-[1.5s] ease-out group-hover:scale-110"
              style={{ backgroundImage: "url('https://ik.imagekit.io/Dilshad/Cafe/Yatrikit/wedding-studio/couple-shoot-for-wedding-weddingpur-scaled-e1773261994127-rkd9amrvoysugb5qrivmgnbcfwikh7q9iafy1g9j74.jpg')" }}
            />
            {/* Dark Overlay that fades in */}
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/60 transition-colors duration-700" />
            
            {/* Text Content slides up */}
            <div className="absolute inset-0 flex flex-col justify-end p-8 sm:p-12 text-center opacity-0 translate-y-8 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-700 ease-out">
              <span className="text-xs font-semibold text-[#B38F4D] uppercase tracking-widest mb-3 block">
                53 OPEN COURT, PATNA
              </span>
              <h3 className="text-3xl md:text-4xl font-serif text-white mb-4">
                Abhishek & Ruchi
              </h3>
              <div className="w-12 h-[1px] bg-[#B38F4D] mx-auto mb-4" />
              <p className="text-gray-300 font-light italic text-sm md:text-base max-w-sm mx-auto">
                "Some weddings are beautiful. Some are unforgettable."
              </p>
            </div>
            
            {/* Subtle Border */}
            <div className="absolute inset-4 border border-white/0 group-hover:border-[#B38F4D]/30 transition-colors duration-700 pointer-events-none" />
          </div>

          {/* Card 2 */}
          <div className="group relative w-full aspect-[4/5] md:aspect-square overflow-hidden cursor-pointer">
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-[1.5s] ease-out group-hover:scale-110"
              style={{ backgroundImage: "url('https://ik.imagekit.io/Dilshad/Cafe/Yatrikit/wedding-studio/Lovely-Kiss-Moment-Between-Bride-and-Groom-Filled-with-Love-scaled-e1771221258589-rj856xwxhhg1tsoy3cte6lncrl1lfj66ciafowiv00.jpg')" }}
            />
            {/* Dark Overlay that fades in */}
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/60 transition-colors duration-700" />
            
            {/* Text Content slides up */}
            <div className="absolute inset-0 flex flex-col justify-end p-8 sm:p-12 text-center opacity-0 translate-y-8 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-700 ease-out">
              <span className="text-xs font-semibold text-[#B38F4D] uppercase tracking-widest mb-3 block">
                THE MAVERICK RESORT
              </span>
              <h3 className="text-3xl md:text-4xl font-serif text-white mb-4">
                Akshat & Shivani
              </h3>
              <div className="w-12 h-[1px] bg-[#B38F4D] mx-auto mb-4" />
              <p className="text-gray-300 font-light italic text-sm md:text-base max-w-sm mx-auto">
                "Some celebrations feel timeless from the very first moment."
              </p>
            </div>

            {/* Subtle Border */}
            <div className="absolute inset-4 border border-white/0 group-hover:border-[#B38F4D]/30 transition-colors duration-700 pointer-events-none" />
          </div>

        </div>

      </div>
    </section>
  );
}
