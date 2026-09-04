import { Star, Clapperboard, HeartHandshake } from 'lucide-react';

export default function WhyChooseUs() {
  const features = [
    {
      icon: <Star size={32} className="text-[#B38F4D]" strokeWidth={1.5} />,
      title: "Experience",
      desc: "Wedding day comes only once in your entire life and we understand its importance. We are making weddings beautiful for more than 7 years now and worked with appx. 550 different couples. So our team is prepared to take charge of your wedding."
    },
    {
      icon: <Clapperboard size={32} className="text-[#B38F4D]" strokeWidth={1.5} />,
      title: "Quality",
      desc: "Our work quality is synonym to each other. We have our quality certification module where we measure the talent and skill of our photographers, cinematographers and editors based on their consistency and attitude towards their job."
    },
    {
      icon: <HeartHandshake size={32} className="text-[#B38F4D]" strokeWidth={1.5} />,
      title: "Support",
      desc: "Our support line is active 16 hours a day to help our valuable couples. Once you book us, all your problems related to photography and cinematography is ours. You can mail us, whatsapp us or even call us for any type of help."
    }
  ];

  return (
    <section className="relative py-24 md:py-32 bg-[#212639] px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#B38F4D]/5 blur-[150px] rounded-full pointer-events-none" />
      
      <div className="relative z-10 max-w-7xl mx-auto">
        
        {/* Main Section Heading */}
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif font-normal text-white tracking-tight mb-6">
            Why <span className="text-[#B38F4D] italic">Choose Us?</span>
          </h2>
          <div className="w-12 h-[1px] bg-[#B38F4D] mx-auto opacity-80" />
        </div>

        {/* 3-Column Pillar Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 mb-32">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-center text-center p-10 rounded-2xl bg-white/[0.02] backdrop-blur-xl border border-white/5 shadow-[0_8px_32px_rgba(0,0,0,0.2)] hover:-translate-y-2 transition-transform duration-500">
              <div className="w-20 h-20 rounded-full bg-[#B38F4D]/10 flex items-center justify-center mb-8">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-serif text-white mb-4">
                {feature.title}
              </h3>
              <p className="text-gray-400 font-light leading-relaxed">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Lower Banner / Split Quote */}
        <div className="flex flex-col lg:flex-row bg-white/[0.02] backdrop-blur-xl rounded-3xl overflow-hidden border border-white/5 shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
          
          {/* Left: Quote & Paragraph */}
          <div className="w-full lg:w-1/2 p-12 md:p-20 flex flex-col justify-center">
            <h3 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white font-normal leading-tight mb-8 relative">
              <span className="absolute -top-10 -left-6 text-8xl text-[#B38F4D] opacity-20 font-serif">"</span>
              We don't take a <br/> photograph, we <span className="text-[#B38F4D] italic">make it.</span>
            </h3>
            <p className="text-gray-300 font-light text-lg leading-relaxed mt-4">
              A perfect shot demands the photographer's passion, the right technique, and state-of-the-art gear. For the last five years, we have evolved with the most advanced photography technology to bring you cinematic, timeless, and emotionally resonant wedding stories.
            </p>
          </div>

          {/* Right: Image */}
          <div className="w-full lg:w-1/2 min-h-[500px] lg:min-h-0 relative">
            <img 
              src="https://ik.imagekit.io/Dilshad/Cafe/Yatrikit/wedding-studio/wedding-editorial-shoot-weddingpur-scaled-e1773261531589.jpg"
              alt="Weddingpur Editorial Shoot"
              className="absolute inset-0 w-full h-full object-cover"
            />
            {/* Subtle inner overlay for luxury feel */}
            <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-[#212639]/80 lg:block hidden pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#212639]/80 via-transparent to-transparent lg:hidden pointer-events-none" />
          </div>
          
        </div>

      </div>
    </section>
  );
}
