import { Star, Clapperboard, HeartHandshake } from 'lucide-react';

export default function WhyChooseUs() {
  const features = [
    {
      icon: <Star size={32} className="text-[#B35471]" strokeWidth={1.5} />,
      title: "Experience",
      desc: "Wedding day comes only once in your entire life and we understand its importance. We are making weddings beautiful for more than 7 years now and worked with appx. 550 different couples. So our team is prepared to take charge of your wedding."
    },
    {
      icon: <Clapperboard size={32} className="text-[#B35471]" strokeWidth={1.5} />,
      title: "Quality",
      desc: "Our work quality is synonym to each other. We have our quality certification module where we measure the talent and skill of our photographers, cinematographers and editors based on their consistency and attitude towards their job."
    },
    {
      icon: <HeartHandshake size={32} className="text-[#B35471]" strokeWidth={1.5} />,
      title: "Support",
      desc: "Our support line is active 16 hours a day to help our valuable couples. Once you book us, all your problems related to photography and cinematography is ours. You can mail us, whatsapp us or even call us for any type of help."
    }
  ];

  return (
    <section className="py-20 md:py-28 bg-[#FAF8F5] px-4 sm:px-6 lg:px-8 border-t border-champagne-border/50">
      <div className="max-w-7xl mx-auto">
        
        {/* Main Section Heading */}
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-bronze-600 tracking-tight mb-4">
            Why Choose Us?
          </h2>
          <div className="w-16 h-1 bg-bronze-400 mx-auto rounded-full opacity-60"></div>
        </div>

        {/* 3-Column Pillar Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16 mb-24">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-full bg-white border border-champagne-border shadow-sm flex items-center justify-center mb-6 hover:shadow-md transition-shadow">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-serif text-espresso mb-4">
                {feature.title}
              </h3>
              <p className="text-espresso-light font-light leading-relaxed">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Lower Banner / Split Quote */}
        <div className="flex flex-col lg:flex-row bg-white rounded-3xl overflow-hidden border border-champagne-border shadow-xl">
          
          {/* Left: Quote & Paragraph */}
          <div className="w-full lg:w-1/2 p-10 md:p-16 flex flex-col justify-center bg-champagne-card/30">
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-serif text-[#B35471] font-bold leading-tight mb-8">
              "We don't take a photograph, we make it."
            </h3>
            <p className="text-espresso-light font-light text-lg leading-relaxed">
              A perfect shot demands the photographer's passion, the right technique, and photography gear. For the last five years, we have evolved with the most advanced photography technology to bring you cinematic, timeless, and emotionally resonant wedding stories.
            </p>
          </div>

          {/* Right: Image */}
          <div className="w-full lg:w-1/2 min-h-[400px] lg:min-h-0 relative">
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: "url('https://images.unsplash.com/photo-1542037104857-ffbb0b9155fb?q=80&w=1954&auto=format&fit=crop')" }}
            >
              {/* Subtle inner overlay for luxury feel */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
            </div>
          </div>
          
        </div>

      </div>
    </section>
  );
}
