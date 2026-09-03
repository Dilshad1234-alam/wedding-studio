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
    <section className="py-20 md:py-28 bg-[#FAF8F5] px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-xs font-bold text-[#B35471] uppercase tracking-widest block mb-3">
            FAQs
          </span>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-espresso tracking-tight">
            Frequently Asked Questions
          </h2>
        </div>

        {/* Accordion Container */}
        <div className="space-y-4 mb-12">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div 
                key={index} 
                className={`border border-champagne-border rounded-xl bg-white overflow-hidden transition-all duration-300 ${isOpen ? 'shadow-md ring-1 ring-[#B35471]/20' : 'shadow-sm hover:shadow-md'}`}
              >
                <button 
                  onClick={() => toggleFaq(index)}
                  className="w-full text-left px-6 py-5 flex items-center justify-between focus:outline-none"
                >
                  <h3 className={`font-serif text-lg leading-snug pr-8 transition-colors duration-300 ${isOpen ? 'text-[#B35471]' : 'text-espresso'}`}>
                    {faq.q}
                  </h3>
                  <div className={`flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 text-[#B35471]' : 'text-bronze-400'}`}>
                    <ChevronDown size={24} strokeWidth={1.5} />
                  </div>
                </button>
                
                <div 
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}
                >
                  <div className="px-6 pb-6 pt-2 border-t border-champagne-border/50">
                    <p className="text-espresso-light font-light leading-relaxed">
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
            className="px-8 py-3 border border-bronze-500 text-bronze-600 rounded-full font-medium uppercase tracking-wide text-sm hover:bg-bronze-50 transition-colors duration-300 shadow-sm"
          >
            Learn More
          </a>
        </div>

      </div>
    </section>
  );
}