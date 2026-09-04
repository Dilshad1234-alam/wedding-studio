'use client';
import Link from 'next/link';

export default function ServicesPage() {
  const services = [
    {
      id: "photography",
      title: "Wedding Photography",
      tagline: "BESPOKE COVERAGE",
      description: "A seamless blend of fine-art portraiture and photojournalistic storytelling. We document the raw, unfiltered emotions, the grand architectural beauty of your venue, and the delicate details you spent months planning.",
      features: [
        "Primary & Associate Master Photographers",
        "Unlimited High-Resolution Edited Images",
        "Signature Color & Editorial Grading",
        "Curated Online Private Gallery"
      ],
      image: "https://ik.imagekit.io/Dilshad/Cafe/Yatrikit/wedding-studio/wedding-editorial-shoot-weddingpur-scaled-e1773261531589.jpg"
    },
    {
      id: "cinematography",
      title: "Cinematic Films",
      tagline: "BESPOKE COVERAGE",
      description: "Moving portraits that feel like a cinematic heirloom. We weave together spoken vows, the ambient sounds of laughter, and cinematic scores to create a documentary film that will transport you back to this exact feeling.",
      features: [
        "Director of Photography & Camera Crew",
        "3-5 Minute Cinematic Trailer",
        "30-45 Minute Complete Highlight Film",
        "Licensed High-End Audio Scoring"
      ],
      image: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&auto=format&fit=crop"
    },
    {
      id: "prewedding",
      title: "Pre-Wedding Narratives",
      tagline: "BESPOKE COVERAGE",
      description: "An intimate session designed to celebrate your connection before the whirlwind of the wedding day begins. Whether on a secluded beach or a royal palace, we create editorial portraits that define your unique style.",
      features: [
        "Conceptual Direction & Styling Guidance",
        "Multiple Wardrobe Changes & Locations",
        "Drone/Aerial Cinematography (Optional)",
        "Save-The-Date Teaser Reel"
      ],
      image: "https://images.unsplash.com/photo-1544627836-822bfea45826?q=80&w=800&auto=format&fit=crop"
    },
    {
      id: "destination",
      title: "Destination Coverage",
      tagline: "BESPOKE COVERAGE",
      description: "From the vineyards of Tuscany to the palaces of Rajasthan, our team is equipped to travel globally. We seamlessly integrate the soul of your destination into the fabric of your wedding narrative.",
      features: [
        "Comprehensive Multi-Day Coverage",
        "Dedicated Travel Logistics Manager",
        "Scouting & Environmental Portraits",
        "Priority Post-Production Delivery"
      ],
      image: "https://images.unsplash.com/photo-1595981267035-7b04d84b52df?q=80&w=800&auto=format&fit=crop"
    }
  ];

  return (
    <main className="min-h-screen bg-[#FAF8F5] text-[#1E221D] font-sans selection:bg-[#5B6454] selection:text-[#FAF8F5]">
      
      {/* Intro Header */}
      <section className="pt-40 pb-20 px-6 sm:px-12 text-center max-w-4xl mx-auto">
        <h1 className="font-serif text-5xl sm:text-6xl text-[#1E221D] mb-6">
          Our Services
        </h1>
        <p className="text-[#4C5445] text-sm font-light leading-relaxed max-w-2xl mx-auto">
          We offer comprehensive visual storytelling tailored for modern luxury celebrations. Explore our curated offerings designed to preserve your legacy.
        </p>
      </section>

      {/* Alternating Editorial Spreads */}
      <div className="flex flex-col">
        {services.map((service, index) => {
          const isEven = index % 2 === 0;
          return (
            <section 
              key={service.id} 
              className={`py-24 sm:py-32 px-6 sm:px-12 ${isEven ? 'bg-[#FAF8F5]' : 'bg-[#ECEFEA]'}`}
            >
              <div className={`max-w-[1200px] mx-auto flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-16 md:gap-24`}>
                
                {/* Image Frame */}
                <div className="w-full md:w-1/2 flex justify-center">
                  <div className="w-full max-w-md aspect-[4/5] rounded-t-full rounded-b-3xl overflow-hidden shadow-xl border-4 border-white relative group">
                    <div 
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-[6s] group-hover:scale-105"
                      style={{ backgroundImage: `url('${service.image}')` }}
                    />
                    <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-500" />
                  </div>
                </div>

                {/* Content Column */}
                <div className={`w-full md:w-1/2 flex flex-col ${isEven ? 'text-left' : 'text-left md:text-right md:items-end'}`}>
                  <span className="text-[10px] uppercase tracking-[0.3em] text-[#626C59] font-semibold block mb-4">
                    {service.tagline}
                  </span>
                  
                  <h2 className="font-serif text-4xl sm:text-5xl text-[#1E221D] font-normal mb-6 leading-tight">
                    {service.title}
                  </h2>
                  
                  <p className={`text-[#4C5445] text-base leading-relaxed font-light mb-10 ${isEven ? 'max-w-lg' : 'max-w-lg ml-auto'}`}>
                    {service.description}
                  </p>
                  
                  <ul className={`space-y-4 mb-12 ${isEven ? '' : 'text-right'}`}>
                    {service.features.map((feature, i) => (
                      <li key={i} className={`flex items-start gap-3 ${isEven ? 'justify-start' : 'md:justify-end'}`}>
                        {isEven && <span className="text-[#626C59] mt-1.5 text-[8px]">✦</span>}
                        <span className="text-[#4C5445] text-sm font-medium tracking-wide">{feature}</span>
                        {!isEven && <span className="text-[#626C59] mt-1.5 text-[8px] hidden md:block">✦</span>}
                        {!isEven && <span className="text-[#626C59] mt-1.5 text-[8px] block md:hidden">✦</span>}
                      </li>
                    ))}
                  </ul>

                  <div>
                    <Link 
                      href="/contact" 
                      className="inline-block bg-[#5B6454] hover:bg-[#485042] text-[#FAF8F5] px-8 py-3.5 rounded-full text-[10px] tracking-widest uppercase transition shadow-md font-semibold"
                    >
                      Inquire for Dates
                    </Link>
                  </div>
                </div>

              </div>
            </section>
          );
        })}
      </div>

    </main>
  );
}
