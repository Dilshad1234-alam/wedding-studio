import Link from 'next/link';
import { Camera, Video, MapPin, Heart } from 'lucide-react';

export default function ServicesSection() {
  const services = [
    {
      title: "Destination Wedding",
      desc: "If you want your wedding to be a thing outside the world, then a destination wedding is the right choice.",
      link: "/services#destination",
      icon: MapPin
    },
    {
      title: "Candid Photography",
      desc: "Capturing real moments, true feelings, and raw expressions rather than rigid poses.",
      link: "/services#candid",
      icon: Camera
    },
    {
      title: "Cinematic Films",
      desc: "A wedding is like a movie of beautiful things coming together into one timeless story.",
      link: "/services#cinematography",
      icon: Video
    },
    {
      title: "Prewedding Shoots",
      desc: "Your unmatched love story with you and your beloved in the frame, captured beautifully.",
      link: "/services#prewedding",
      icon: Heart
    }
  ];

  return (
    <section className="py-20 md:py-28 bg-[#212639] px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Main Heading & Subtitle */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif font-normal text-white mb-6">
            Our <span className="text-[#B38F4D] italic">Services</span>
          </h2>
          <div className="w-12 h-[1px] bg-[#B38F4D] mx-auto mb-8" />
          <p className="text-gray-300 font-light text-lg leading-relaxed">
            Each wedding is different; hence, we take a highly personalized approach. From majestic destination weddings to intimate candid moments, we ensure each memory is preserved elegantly.
          </p>
        </div>

        {/* 4-Card Minimalist Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div 
                key={index} 
                className="group relative flex flex-col items-center text-center bg-white/[0.02] backdrop-blur-xl border border-white/5 rounded-2xl p-10 shadow-[0_8px_32px_rgba(0,0,0,0.2)] hover:bg-white/[0.05] hover:border-[#B38F4D]/30 transition-all duration-500 hover:-translate-y-2"
              >
                <div className="w-16 h-16 rounded-full bg-[#B38F4D]/10 flex items-center justify-center mb-8 group-hover:bg-[#B38F4D]/20 transition-colors duration-500">
                  <Icon size={28} strokeWidth={1} className="text-[#B38F4D]" />
                </div>
                
                <h3 className="text-xl md:text-2xl font-serif text-white mb-4 leading-snug">
                  {service.title}
                </h3>
                
                <p className="text-sm text-gray-400 font-light leading-relaxed mb-8 flex-grow">
                  {service.desc}
                </p>
                
                <Link 
                  href={service.link}
                  className="mt-auto inline-flex items-center text-[#B38F4D] text-xs font-semibold tracking-widest uppercase hover:text-white transition-colors duration-300"
                >
                  Discover <span className="ml-2 group-hover:translate-x-1 transition-transform duration-300">→</span>
                </Link>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}