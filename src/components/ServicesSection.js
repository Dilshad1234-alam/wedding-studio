import Link from 'next/link';

// Helper component for the 6-image mini collage
const MiniCollage = () => (
  <div className="grid grid-cols-3 gap-1 mb-6 rounded-xl overflow-hidden aspect-[3/2]">
    {[...Array(6)].map((_, i) => (
      <div 
        key={i} 
        className="w-full h-full bg-cover bg-center hover:opacity-90 transition-opacity"
        style={{ backgroundImage: `url('https://source.unsplash.com/random/200x200?wedding,couple&sig=${Math.random() + i}')` }}
      />
    ))}
  </div>
);

// Fallback if unsplash source is unreliable, using fixed placehold.co or specific unsplash IDs
const CollagePreview = ({ seed }) => {
  const images = [
    `https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=200&q=80`,
    `https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=200&q=80`,
    `https://images.unsplash.com/photo-1532712938736-5e153c0638ce?auto=format&fit=crop&w=200&q=80`,
    `https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=200&q=80`,
    `https://images.unsplash.com/photo-1606216794074-735e91aa2c92?auto=format&fit=crop&w=200&q=80`,
    `https://images.unsplash.com/photo-1542037104857-ffbb0b9155fb?auto=format&fit=crop&w=200&q=80`
  ];

  return (
    <div className="grid grid-cols-3 gap-1.5 mb-6 rounded-xl overflow-hidden aspect-[4/3] bg-champagne-card">
      {images.map((src, i) => (
        <div 
          key={i} 
          className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
          style={{ backgroundImage: `url('${src}')` }}
        />
      ))}
    </div>
  );
};

export default function ServicesSection() {
  const services = [
    {
      title: "Destination Wedding Photography",
      desc: "If you want your wedding to be a thing outside the world, then a destination wedding is the right choice for you.",
      link: "#destination"
    },
    {
      title: "Candid Style Wedding Photography",
      desc: "Candid photography is nothing but capturing real moments, feelings and expressions rather than posed ones.",
      link: "#candid"
    },
    {
      title: "Wedding Cinematography & Films",
      desc: "A wedding is like a movie of so many beautiful things coming together into one big happy story that is timeless.",
      link: "#cinematography"
    },
    {
      title: "Prewedding Photography & Videos",
      desc: "Your unmatched love story with you and your beloved in the frame captured months before your big day.",
      link: "#prewedding"
    }
  ];

  return (
    <section className="py-20 md:py-28 bg-champagne-bg px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Main Heading & Subtitle */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#B35471] mb-6 drop-shadow-sm">
            Our Wedding Photography Services
          </h2>
          <p className="text-espresso-light font-light text-lg leading-relaxed">
            Each wedding is different; hence, we always take a personalized approach. You might be interested in destination wedding photography, pre-wedding shoots, or cinematic wedding films. We make sure each memory is preserved beautifully. Your photos will reflect the unique essence of your love story.
          </p>
          <div className="w-16 h-[2px] bg-bronze-400 mx-auto mt-8 opacity-60"></div>
        </div>

        {/* 4-Card Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="group flex flex-col bg-white/70 backdrop-blur-sm border border-champagne-border rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <CollagePreview seed={index} />
              <h3 className="text-xl font-serif text-espresso mb-3 font-medium leading-snug h-14">
                {service.title}
              </h3>
              <p className="text-sm text-espresso-light font-light leading-relaxed mb-8 flex-grow">
                {service.desc}
              </p>
              <Link 
                href={service.link}
                className="inline-block w-full text-center px-6 py-2.5 border border-bronze-500 text-bronze-600 rounded-full font-medium tracking-wide uppercase text-xs hover:bg-bronze-500 hover:text-white transition-all duration-300"
              >
                Learn More
              </Link>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}