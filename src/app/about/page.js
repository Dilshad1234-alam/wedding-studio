'use client';
import { useState } from 'react';
import { ChevronDown, Trophy, Star } from 'lucide-react';

export default function AboutPage() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      q: "Do you only do Photography/Cinematography or both?",
      a: "We specialize in both luxury photography and cinematic films. When booked for both sides, we deploy a synchronized team to capture cohesive timelines without duplicate costs."
    },
    {
      q: "What deliverables form part of the package?",
      a: "Packages typically include raw coverage, edited candid high-res photos, 3-5 min cinematic teaser, 30-45 min highlight film, and handcrafted lay-flat photo albums."
    },
    {
      q: "What is the expected time for the delivery?",
      a: "Teasers and Instagram reels are delivered within 7 to 10 days. The complete edited photo gallery and full wedding film take approximately 4 to 6 weeks."
    },
    {
      q: "How many crew members do you provide?",
      a: "A typical team consists of 4 to 6 professionals (Candid Photographer, Traditional Photographer, Cinematographer, Drone Pilot). Customization is available based on your event scale."
    },
    {
      q: "How much do you charge?",
      a: "Our packages are customized based on the number of days, locations, and deliverables. Contact us directly for a personalized transparent quotation."
    }
  ];

  return (
    <main className="min-h-screen bg-[#FAF8F5] text-[#1F231D] font-sans selection:bg-[#5B6454] selection:text-[#FAF8F5] pt-32 pb-24">
      
      {/* 1. Studio Story */}
      <section className="container mx-auto px-4 max-w-[1200px] mb-32">
        <div className="flex flex-col md:flex-row items-center gap-16 md:gap-24">
          <div className="w-full md:w-1/2">
             <div className="w-full aspect-[4/5] rounded-t-full rounded-b-2xl overflow-hidden shadow-2xl border-4 border-white relative">
              <img 
                src="https://ik.imagekit.io/Dilshad/Cafe/Yatrikit/wedding-studio/wedding-editorial-shoot-weddingpur-scaled-e1773261531589.jpg" 
                alt="Our Studio" 
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </div>
          
          <div className="w-full md:w-1/2 text-center md:text-left">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#555D4E] font-semibold block mb-4">
              OUR JOURNEY
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#1F231D] mb-8 leading-tight">
              Crafting Legacy <br/>
              <span className="italic text-[#8C7A6B]">Since 2016.</span>
            </h1>
            <div className="space-y-6 text-[#4C5346] text-sm font-light leading-relaxed max-w-lg mx-auto md:mx-0">
              <p>
                Founded on the belief that every love story deserves to be treated as a work of fine art. Over the past seven years, we have had the privilege of documenting over 550 celebrations across India and beyond.
              </p>
              <p>
                We are a collective of visual storytellers, cinematic directors, and fine-art editors dedicated to preserving the authentic, unscripted moments of your most important day.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Awards & Recognition */}
      <section className="bg-[#EAECE8] py-24 mb-32">
        <div className="container mx-auto px-4 max-w-6xl text-center">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#555D4E] font-semibold block mb-4">
            RECOGNITION
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl text-[#1F231D] mb-16">
            Global Acclaim
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             <div className="bg-[#FAF8F5] p-10 rounded-2xl border border-white flex flex-col items-center">
               <Trophy size={32} className="text-[#8C7A6B] mb-6" strokeWidth={1.5} />
               <h3 className="font-serif text-2xl text-[#1F231D] mb-2">Fearless Awards</h3>
               <p className="text-[#4C5346] text-sm font-light">Top 50 Wedding Photographers 2025</p>
             </div>
             
             <div className="bg-[#FAF8F5] p-10 rounded-2xl border border-white flex flex-col items-center">
               <Star size={32} className="text-[#8C7A6B] mb-6" strokeWidth={1.5} />
               <h3 className="font-serif text-2xl text-[#1F231D] mb-2">WedSutra Premium</h3>
               <p className="text-[#4C5346] text-sm font-light">Best Cinematic Film of the Year</p>
             </div>
             
             <div className="bg-[#FAF8F5] p-10 rounded-2xl border border-white flex flex-col items-center">
               <Trophy size={32} className="text-[#8C7A6B] mb-6" strokeWidth={1.5} />
               <h3 className="font-serif text-2xl text-[#1F231D] mb-2">Asia Wedding Pro</h3>
               <p className="text-[#4C5346] text-sm font-light">Excellence in Destination Photography</p>
             </div>
          </div>
        </div>
      </section>

      {/* 3. FAQ Section */}
      <section className="container mx-auto px-4 max-w-3xl mb-12">
        <div className="text-center mb-16">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#555D4E] font-semibold block mb-4">
            FAQS
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl text-[#1F231D]">
            Frequently Asked
          </h2>
        </div>
        
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div 
                key={index} 
                className={`border bg-white rounded-2xl transition-all duration-300 overflow-hidden ${isOpen ? 'border-[#555D4E] shadow-lg' : 'border-[#E8E4DC] hover:border-[#555D4E]/50'}`}
              >
                <button 
                  onClick={() => toggleFaq(index)}
                  className="w-full text-left px-6 py-5 sm:px-8 sm:py-6 flex items-center justify-between focus:outline-none"
                >
                  <h3 className={`font-serif text-lg sm:text-xl pr-8 transition-colors ${isOpen ? 'text-[#555D4E]' : 'text-[#1F231D]'}`}>
                    {faq.q}
                  </h3>
                  <div className={`flex-shrink-0 transition-transform duration-500 ${isOpen ? 'rotate-180 text-[#555D4E]' : 'text-[#8C9385]'}`}>
                    <ChevronDown size={20} strokeWidth={1.5} />
                  </div>
                </button>
                
                <div 
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}
                >
                  <div className="px-6 pb-6 sm:px-8 sm:pb-8 pt-0">
                    <div className="h-[1px] w-full bg-[#E8E4DC] mb-6" />
                    <p className="text-[#4C5346] font-light leading-relaxed text-sm">
                      {faq.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

    </main>
  );
}
