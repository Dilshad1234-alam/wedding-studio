'use client';

import React, { useState } from 'react';
import { Camera, ChevronDown, ChevronUp, Check, Layers, BookOpen, Star } from 'lucide-react';

export default function AlbumsPage() {
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const faqs = [
    { q: "WHY AREN'T ALBUMS INCLUDED IN THE PHOTOGRAPHY PACKAGE?", a: "To give you full control over your budget and choices, we keep albums separate. This allows you to select exactly the style, size, and material you prefer, or simply opt for digital files if you wish." },
    { q: "WHAT ARE THE BENEFITS OF BUYING AN ALBUM SEPARATELY?", a: "Buying an album separately ensures you get a customized product tailored specifically to your taste, without being restricted by a pre-set package." },
    { q: "HOW LONG DOES IT TAKE TO CREATE AN ALBUM?", a: "Depending on the customization and revisions, it typically takes 4-8 weeks from design approval to delivery." },
    { q: "WHAT CUSTOMIZATION OPTIONS ARE AVAILABLE?", a: "We offer various cover materials (leather, linen, acrylic), custom embossing, foil stamping, edge gilding, and multiple paper types including fine art and photographic paper." },
    { q: "CAN I SEE SAMPLES OF THE ALBUMS BEFORE MAKING A DECISION?", a: "Yes, we have a selection of physical samples in our studio. We highly recommend scheduling a visit to feel the textures and see the print quality in person." },
    { q: "WHAT IF I NEED TO MAKE CHANGES AFTER I APPROVE THE DESIGN?", a: "Once the design is approved and sent to print, changes cannot be made. We ensure multiple review rounds before final approval." },
    { q: "HOW DO I CHOOSE THE RIGHT ALBUM FOR ME?", a: "We guide you through the process during a consultation, helping you select materials and sizes that best match your wedding style and budget." }
  ];

  const pricingTiers = [
    {
      name: "Essence Collection",
      tagline: "SIMPLE AND ELEGANT, CAPTURING THE ESSENCE OF YOUR DAY.",
      price: "₹499",
      strikethrough: "₹649",
      specs: [
        "Digital Press Printing (CMYK)",
        "Standard Binding",
        "Medium Thickness (150-200 GSM)",
        "Laminated",
        "20+ Cover Options"
      ]
    },
    {
      name: "Elegance Collection",
      tagline: "WHERE DESIGN MEETS THOUGHTFUL CUSTOMIZATION",
      price: "₹699",
      strikethrough: "₹799",
      specs: [
        "Digital Press Printing (CMYK)",
        "Lay-Flat Binding",
        "Medium Thickness (200-300 GSM)",
        "Laminated",
        "60+ Cover Options"
      ]
    },
    {
      name: "Eternal Collection",
      tagline: "CRAFTED TO BE PASSED DOWN FOR GENERATIONS.",
      price: "₹799",
      strikethrough: "₹899",
      isPopular: true,
      specs: [
        "Silver Halide Printing (RGB)",
        "Lay-Flat Binding",
        "Thick, Rigid Pages (300-400 GSM)",
        "Laminated & UV Coated",
        "80+ Cover Options"
      ]
    }
  ];

  return (
    <main className="min-h-screen bg-[#212639] text-white pt-24 font-sans selection:bg-[#B38F4D] selection:text-white pb-20">
      
      {/* Header & Intro */}
      <section className="container mx-auto px-4 py-16 text-center max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-normal text-[#B38F4D] mb-6 font-serif">
          Create Your Perfect Wedding Album
        </h1>
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="h-px w-24 border-t border-dashed border-[#B38F4D]"></div>
          <Camera className="text-[#B38F4D]" size={24} />
          <div className="h-px w-24 border-t border-dashed border-[#B38F4D]"></div>
        </div>
        <p className="text-lg md:text-xl text-[#A39E93] leading-relaxed">
          Preserve the memories of your wedding day with a customized, high-quality wedding album. Explore our range of album styles, personalization options, and see how easy it is to create your unique keepsake.
        </p>
      </section>

      {/* Section 1: Why Wedding Albums Matter? */}
      <section className="container mx-auto px-4 py-16">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="w-full md:w-1/2">
            <div className="aspect-[4/3] bg-[#2B324B] border-2 border-white/10 p-4 shadow-xl rounded-lg">
              {/* Placeholder for mustard-tan box album image */}
              <div className="w-full h-full bg-gray-200 flex items-center justify-center rounded overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-[#B38F4D]/20 to-transparent"></div>
                <span className="text-gray-500 flex flex-col items-center gap-2">
                  <BookOpen size={48} className="text-[#B38F4D]" />
                  OPERA Series Photo
                </span>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2 space-y-6">
            <h2 className="text-3xl md:text-4xl font-serif font-normal text-[#B38F4D]">
              Why Wedding Albums Matter?
            </h2>
            <p className="text-lg text-[#EDEAE4] leading-relaxed">
              Imagine holding in your hands a timeless keepsake filled with laughter, love, and cherished memories. A wedding album is more than just pictures: it's a tangible piece of your history, a legacy to share with generations to come.
            </p>
            <button className="px-8 py-3 rounded-full border-2 border-[#B38F4D] text-[#B38F4D] font-semibold hover:bg-[#B38F4D] hover:text-white transition-colors duration-300 shadow-sm">
              View Catalog
            </button>
          </div>
        </div>
      </section>

      {/* Section 2: Material & Quality Showcase Strip */}
      <section className="w-full bg-[#2B324B] border-y border-white/10 py-12 my-12 overflow-hidden">
        <div className="container mx-auto px-4">
          <p className="text-center text-sm font-bold tracking-widest text-gray-400 mb-8 uppercase">Cover Styles & Collections</p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 text-xl font-serif text-[#B38F4D]">
            <span>JEWEL</span>
            <span>ACRYLIC FABRIC</span>
            <span>BRIO</span>
            <span>QUATTRO</span>
            <span>FABRO</span>
          </div>
        </div>
      </section>

      {/* Section 3: Why Choose a High-Quality Album? */}
      <section className="container mx-auto px-4 py-16">
        <div className="flex flex-col md:flex-row-reverse items-center gap-12">
          <div className="w-full md:w-1/2">
            <div className="aspect-square max-w-md mx-auto bg-black p-4 shadow-2xl rounded-lg rotate-2 hover:rotate-0 transition-transform duration-500">
               {/* Placeholder for black textured album */}
               <div className="w-full h-full bg-neutral-900 border border-neutral-700 flex items-center justify-center rounded">
                <span className="text-neutral-600 font-serif tracking-widest">LUXURY TEXTURE</span>
               </div>
            </div>
          </div>
          <div className="w-full md:w-1/2 space-y-8">
            <h2 className="text-3xl md:text-4xl font-serif font-normal text-[#B38F4D]">
              Why Choose a High-Quality Album?
            </h2>
            <p className="text-lg text-[#EDEAE4]">
              There are countless options for photo albums, but not all are created equal...
            </p>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="mt-1"><Check className="text-[#B38F4D]" size={24} /></div>
                <div>
                  <h3 className="font-bold text-white text-lg">Durable Materials</h3>
                  <p className="text-[#A39E93]">Professional albums made with archival paper and fade-resistant inks.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="mt-1"><Check className="text-[#B38F4D]" size={24} /></div>
                <div>
                  <h3 className="font-bold text-white text-lg">Elegant Design</h3>
                  <p className="text-[#A39E93]">Premium binding, cover materials like leather or linen, and customizable options.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="mt-1"><Check className="text-[#B38F4D]" size={24} /></div>
                <div>
                  <h3 className="font-bold text-white text-lg">Lasting Legacy</h3>
                  <p className="text-[#A39E93]">A reliable, permanent way to revisit your wedding day that outlasts fragile digital files.</p>
                </div>
              </div>
            </div>
            <button className="px-8 py-3 rounded-full border-2 border-[#B38F4D] text-[#B38F4D] font-semibold hover:bg-[#B38F4D] hover:text-white transition-colors duration-300 shadow-sm mt-4">
              View Catalog
            </button>
          </div>
        </div>
      </section>

      {/* Section 4: Customization Options */}
      <section className="bg-[#2B324B] py-20 mt-16 border-t border-white/10">
        <div className="container mx-auto px-4 text-center max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-serif font-normal text-[#B38F4D] mb-12">
            Customization Options
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-[#212639] p-8 rounded-xl border border-white/10 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-16 h-16 mx-auto bg-[#B38F4D]/10 rounded-full flex items-center justify-center mb-6">
                <BookOpen className="text-[#B38F4D]" size={32} />
              </div>
              <h3 className="font-bold text-xl text-[#B38F4D] mb-4">Cover Personalization</h3>
              <p className="text-[#A39E93]">Embossed initials, custom monograms, or front window photo.</p>
            </div>
            <div className="bg-[#212639] p-8 rounded-xl border border-white/10 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-16 h-16 mx-auto bg-[#B38F4D]/10 rounded-full flex items-center justify-center mb-6">
                <Layers className="text-[#B38F4D]" size={32} />
              </div>
              <h3 className="font-bold text-xl text-[#B38F4D] mb-4">Page Layouts</h3>
              <p className="text-[#A39E93]">Clean minimalist magazine layouts or dynamic multi-image spreads.</p>
            </div>
            <div className="bg-[#212639] p-8 rounded-xl border border-white/10 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-16 h-16 mx-auto bg-[#B38F4D]/10 rounded-full flex items-center justify-center mb-6">
                <Star className="text-[#B38F4D]" size={32} />
              </div>
              <h3 className="font-bold text-xl text-[#B38F4D] mb-4">Finishing Touches</h3>
              <p className="text-[#A39E93]">Gold/Bronze foil stamping, silk ribbons, and custom luxury endpapers.</p>
            </div>
          </div>
          <button className="px-8 py-3 rounded-full bg-[#B38F4D] text-white font-semibold hover:bg-[#987538] transition-colors duration-300 shadow-md">
            View Catalog
          </button>
        </div>
      </section>

      {/* Section 5: Happy Clients Testimonials Strip */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-serif text-[#B38F4D] italic">
            "Nothing tells the story better than hearing from our happy clients."
          </h2>
        </div>
        <div className="flex flex-col lg:flex-row gap-8 items-center bg-[#2B324B] rounded-2xl border border-white/10 overflow-hidden shadow-lg">
          <div className="w-full lg:w-5/12 h-64 lg:h-auto bg-red-900/20 relative">
             {/* Placeholder for red album box photo */}
             <div className="absolute inset-0 bg-[#B38F4D]/10 flex items-center justify-center">
                <span className="text-[#B38F4D] font-bold">Red Album Box Showcase</span>
             </div>
          </div>
          <div className="w-full lg:w-7/12 p-8 md:p-12 space-y-6">
            <div className="bg-[#212639] p-6 rounded-xl border border-white/10 shadow-sm">
              <div className="flex items-center gap-1 mb-3 text-yellow-500">
                <Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" />
              </div>
              <p className="text-[#EDEAE4] italic mb-4">"The album is absolutely breathtaking. Every page feels so premium, and the lay-flat binding makes the panoramas look incredible. We couldn't be happier!"</p>
              <p className="font-bold text-[#B38F4D] text-sm uppercase">— Sarah & James</p>
            </div>
            <div className="bg-[#212639] p-6 rounded-xl border border-white/10 shadow-sm">
              <div className="flex items-center gap-1 mb-3 text-yellow-500">
                <Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" />
              </div>
              <p className="text-[#EDEAE4] italic mb-4">"We were amazed by the customization options. The bronze foil stamping on the cover perfectly matched our wedding theme. A true masterpiece."</p>
              <p className="font-bold text-[#B38F4D] text-sm uppercase">— Priya & Rahul</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 6: Album Frequently Asked Questions */}
      <section className="bg-[#2B324B] py-20 border-y border-white/10">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-serif font-normal text-center text-[#B38F4D] mb-12">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-[#212639] border border-white/10 rounded-lg overflow-hidden transition-all duration-300">
                <button 
                  onClick={() => toggleFaq(idx)}
                  className="w-full px-6 py-4 flex items-center justify-between bg-[#212639] hover:bg-[#2B324B] transition-colors text-left"
                >
                  <span className="font-bold text-white pr-8">{faq.q}</span>
                  {openFaqIndex === idx ? (
                    <ChevronUp className="text-[#B38F4D] shrink-0" />
                  ) : (
                    <ChevronDown className="text-[#B38F4D] shrink-0" />
                  )}
                </button>
                <div 
                  className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${openFaqIndex === idx ? 'max-h-96 py-4 opacity-100 border-t border-white/10' : 'max-h-0 opacity-0'}`}
                >
                  <p className="text-[#EDEAE4]">{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 7: 3-Tier Collection Pricing */}
      <section className="container mx-auto px-4 py-24">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-normal text-[#B38F4D] mb-6">
            Design Your Perfect Album with Our Exclusive Customization Options
          </h2>
          <p className="text-[#A39E93] text-lg">
            Choose a collection that suits your style and legacy needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pricingTiers.map((tier, idx) => (
            <div 
              key={idx} 
              className={`relative bg-[#2B324B] border rounded-2xl overflow-hidden shadow-lg flex flex-col ${
                tier.isPopular ? 'border-[#B38F4D] ring-2 ring-[#B38F4D]/20 scale-105 md:-translate-y-4 z-10' : 'border-white/10'
              }`}
            >
              {tier.isPopular && (
                <div className="absolute top-6 -right-12 bg-[#B38F4D] text-white text-xs font-bold py-1 px-12 rotate-45 shadow-sm">
                  POPULAR
                </div>
              )}
              
              <div className="bg-[#B38F4D] text-white p-8 text-center">
                <h3 className="text-2xl font-serif font-normal mb-2">{tier.name}</h3>
                <p className="text-sm font-medium opacity-90 mb-6">{tier.tagline}</p>
                <div className="flex items-center justify-center gap-3">
                  <span className="text-xl line-through opacity-70">{tier.strikethrough}</span>
                  <span className="text-4xl font-bold">{tier.price}</span>
                </div>
                <p className="text-sm mt-1 opacity-80">/ PER SHEET</p>
              </div>

              <div className="p-8 flex-grow flex flex-col">
                <ul className="space-y-4 mb-8 flex-grow">
                  {tier.specs.map((spec, sIdx) => (
                    <li key={sIdx} className="flex items-start gap-3">
                      <Check size={18} className="text-[#B38F4D] mt-1 shrink-0" />
                      <span className="text-[#EDEAE4]">{spec}</span>
                    </li>
                  ))}
                </ul>
                
                <button className={`w-full py-3 rounded-full font-bold transition-colors duration-300 shadow-md ${
                  tier.isPopular 
                    ? 'bg-[#B38F4D] text-white hover:bg-[#987538]' 
                    : 'bg-[#B38F4D] text-white hover:bg-[#987538]'
                }`}>
                  View Catalog
                </button>
                
                <p className="text-center text-xs font-medium text-gray-500 mt-4 bg-gray-100 py-2 rounded">
                  30 Sheets Already Included In Package
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

    </main>
  );
}
