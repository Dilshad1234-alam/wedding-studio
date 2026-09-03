export default function FeaturedWeddings() {
  return (
    <section className="py-20 md:py-28 bg-[#FAF8F5] px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-bronze-600 tracking-tight">
            Featured Weddings
          </h2>
          <div className="w-24 h-1 bg-bronze-400 mx-auto mt-6 rounded-full opacity-60"></div>
        </div>

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14">
          
          {/* Card 1 */}
          <div className="group flex flex-col bg-white border border-champagne-border rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500">
            {/* Image Container with hover scale */}
            <div className="relative w-full aspect-[4/3] overflow-hidden bg-champagne-card">
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=1974&auto=format&fit=crop')" }}
              />
            </div>
            
            {/* Card Content */}
            <div className="p-8 md:p-10 flex flex-col items-center text-center">
              <span className="text-xs font-semibold text-bronze-500 uppercase tracking-widest mb-3 block">
                53 OPEN COURT, PATNA
              </span>
              <h3 className="text-2xl md:text-3xl font-serif text-espresso mb-4">
                Abhishek & Ruchi
              </h3>
              <p className="text-espresso-light font-light italic leading-relaxed max-w-md mx-auto relative before:content-[''] before:block before:w-8 before:h-[1px] before:bg-champagne-border before:mx-auto before:mb-4">
                "Some weddings are beautiful. Some are unforgettable."
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="group flex flex-col bg-white border border-champagne-border rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500">
            {/* Image Container with hover scale */}
            <div className="relative w-full aspect-[4/3] overflow-hidden bg-champagne-card">
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1606216794074-735e91aa2c92?q=80&w=1974&auto=format&fit=crop')" }}
              />
            </div>
            
            {/* Card Content */}
            <div className="p-8 md:p-10 flex flex-col items-center text-center">
              <span className="text-xs font-semibold text-bronze-500 uppercase tracking-widest mb-3 block">
                THE MAVERICK RESORT
              </span>
              <h3 className="text-2xl md:text-3xl font-serif text-espresso mb-4">
                Akshat & Shivani
              </h3>
              <p className="text-espresso-light font-light italic leading-relaxed max-w-md mx-auto relative before:content-[''] before:block before:w-8 before:h-[1px] before:bg-champagne-border before:mx-auto before:mb-4">
                "Some celebrations feel timeless from the very first moment."
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
