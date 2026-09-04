

"use client";
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      q: "Do You Only Do Photography/Cinematography Or Both? How Would You Help Me If We Book You For Both Bride And Groom Side?",
      a: "We specialize in both luxury photography and cinematic films. When booked for both sides, we deploy a synchronized team to capture cohesive timelines without duplicate costs."
    },
    {
      q: "What Deliverables Form Part Of The Package?",
      a: "Packages typically include raw coverage, edited candid high-res photos, 3-5 min cinematic teaser, 30-45 min highlight film, and handcrafted lay-flat photo albums."
    },
    {
      q: "What Is The Expected Time For The Delivery?",
      a: "Teasers and Instagram reels are delivered within 7 to 10 days. The complete edited photo gallery and full wedding film take approximately 4 to 6 weeks."
    },
    {
      q: "How Many Crew Members Normally Do You Provide For The Coverage Of The Wedding? Will The Reduction In The Crew Member Affect The Cost?",
      a: "A typical team consists of 4 to 6 professionals (Candid Photographer, Traditional Photographer, Cinematographer, Drone Pilot). Customization is available based on your event scale."
    },
    {
      q: "How Much Do You Charge?",
      a: "Our packages are customized based on the number of days, locations, and deliverables. Contact us directly for a personalized transparent quotation."
    }
  ];

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24 md:py-32 bg-[#212639] px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#B38F4D]/5 rounded-full blur-[120px] pointer-events-none translate-x-1/3 -translate-y-1/3" />

      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center mb-20">
          <span className="text-[10px] font-bold text-[#B38F4D] uppercase tracking-[0.25em] block mb-4">
            FAQs
          </span>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif font-normal text-white tracking-tight">
            Frequently <span className="text-[#B38F4D] italic">Asked Questions</span>
          </h2>
        </div>

        {/* Accordion Container */}
        <div className="space-y-4 mb-16">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div 
                key={index} 
                className={`border border-white/5 rounded-2xl bg-white/[0.02] backdrop-blur-md overflow-hidden transition-all duration-500 ${isOpen ? 'shadow-[0_8px_32px_rgba(0,0,0,0.3)] border-[#B38F4D]/30' : 'hover:bg-white/[0.04] hover:border-white/10'}`}
              >
                <button 
                  onClick={() => toggleFaq(index)}
                  className="w-full text-left px-8 py-6 flex items-center justify-between focus:outline-none"
                >
                  <h3 className={`font-serif text-xl leading-snug pr-8 transition-colors duration-300 ${isOpen ? 'text-[#B38F4D]' : 'text-white'}`}>
                    {faq.q}
                  </h3>
                  <div className={`flex-shrink-0 transition-transform duration-500 ${isOpen ? 'rotate-180 text-[#B38F4D]' : 'text-white/40'}`}>
                    <ChevronDown size={24} strokeWidth={1.5} />
                  </div>
                </button>
                
                <div 
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}
                >
                  <div className="px-8 pb-8 pt-2 border-t border-white/5">
                    <p className="text-gray-300 font-light leading-relaxed">
                      {faq.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Action */}
        <div className="flex justify-center">
          <a 
            href="#contact" 
            className="px-10 py-3.5 border border-[#B38F4D] text-[#B38F4D] rounded-full font-semibold uppercase tracking-[0.2em] text-[10px] hover:bg-[#B38F4D] hover:text-white transition-all duration-500 shadow-[0_4px_20px_rgba(179,143,77,0.2)] hover:shadow-[0_8px_32px_rgba(179,143,77,0.4)]"
          >
            Ask a Question
          </a>
        </div>

      </div>
    </section>
  );
}