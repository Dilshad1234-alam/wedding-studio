"use client";
import React, { useState } from 'react';
import Link from 'next/link';

export default function LandingPage() {
  const [openFaq, setOpenFaq] = useState(null);
  const [reviewIndex, setReviewIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const realGoogleReviews = [
    {
      name: "Ashish kumar Sriwastava",
      date: "Jan 23, 2026",
      role: "Patna • Google Verified Review",
      text: "Picture-Perfect Memories: A Heartfelt Thank You to Vivek and his entire Weddingpur team. We were very impressed with your photography services. You did a great job capturing all the special moments. Team took plenty of amazing photos from every possible angle. The editor did a wonderful job on the teasers..."
    },
    {
      name: "Puja Das",
      date: "Feb 8, 2026",
      role: "Google Verified Review",
      text: "I really like the WeddingPur page. This page is very helpful for wedding planning. Their photographer's behavior was very polite. I'm so happy to have booked this team for my wedding. Thank you for making my special day truly special. It's successfully done, thanks to your team."
    },
    {
      name: "Yasha Bharadwaj",
      date: "Feb 2, 2026",
      role: "Google Verified Review",
      text: "Choosing WeddingPur for our wedding photography was the best decision. The team was punctual, creative, and very cooperative. Even though we couldn't give them enough time due to time constraints, they still managed to capture the best photos. They also took amazing candid and random shots of our guests, which..."
    },
    {
      name: "Shreenandan Prasad",
      date: "Jan 16, 2026",
      role: "Google Verified Review",
      text: "Great experience with Weddingpur for our maternity shoot! We chose a temple location and the pictures turned out amazing. Vivek was very supportive and made the whole process easy and stress-free. Highly recommend their services for anyone looking for quality photography."
    },
    {
      name: "Gautam Kumar",
      date: "Dec 31, 2025",
      role: "Google Verified Review",
      text: "They delivered high quality photos and captured every moment beautifully. The service was worth the money and they worked well within my budget. Their pricing was clear and reasonable. The team was professional, friendly and easy to work with throughout. I highly recommend them for anyone looking for reliable..."
    },
    {
      name: "Anand & Ritu Verma",
      date: "Patna Royal",
      role: "Google Verified Review",
      text: "Vivek and the entire Weddingpur crew documented our multi-day celebration with pure perfection. The drone shots of the barat and the cinematic teaser made our families tear up with joy. Best team in Patna by far!"
    }
  ];

  React.useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      setReviewIndex((prev) => (prev + 1) % realGoogleReviews.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [isHovered, realGoogleReviews.length]);

  const handlePrevReview = () => {
    setReviewIndex((prev) => (prev - 1 + realGoogleReviews.length) % realGoogleReviews.length);
  };

  const handleNextReview = () => {
    setReviewIndex((prev) => (prev + 1) % realGoogleReviews.length);
  };

  return (
    <main className="min-h-screen bg-[#FAF8F5] text-[#1E221D] font-sans antialiased selection:bg-[#5B6454] selection:text-white">
      
      {/* 1. CINEMATIC PATNA HERO */}
      <section className="relative min-h-[92vh] flex flex-col justify-center items-center text-center px-6 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center z-0 scale-100"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1800&q=85')`
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-[#1E221D]/75 via-[#1E221D]/55 to-[#1E221D]/85"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
          <span className="text-[10px] sm:text-xs uppercase tracking-[0.4em] text-[#ECEFEA] font-medium mb-3">
            WEDDINGPUR — BESPOKE WEDDING CINEMA & STILLS
          </span>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif text-[#FAF8F5] tracking-tight leading-[1.12] drop-shadow-md">
            Best Wedding Photographers <br className="hidden sm:inline" />
            <span className="italic font-light">In Patna, Bihar</span>
          </h1>

          <p className="text-[#FAF8F5]/90 text-sm sm:text-lg font-light tracking-wide max-w-2xl mx-auto mt-6 mb-4">
            We capture timeless weddings for modern couples who want their story told beautifully.
          </p>

          <div className="flex flex-wrap gap-4 justify-center items-center mt-6">
            <Link className="border border-[#FAF8F5]/80 hover:bg-[#FAF8F5] hover:text-[#1E221D] text-[#FAF8F5] px-9 py-3.5 rounded-full text-xs tracking-[0.25em] uppercase font-medium backdrop-blur-sm transition-all duration-300" href="/portfolio">
              Explore Portfolio
            </Link>
            <Link className="bg-[#5B6454] hover:bg-[#485042] text-[#FAF8F5] px-9 py-3.5 rounded-full text-xs tracking-[0.25em] uppercase font-medium shadow-md transition-all duration-300" href="/contact">
              Contact Us
            </Link>
          </div>

          <span className="text-[10px] tracking-[0.3em] uppercase text-[#ECEFEA]/70 mt-10">
            Patna • Varanasi • Jaipur • Goa
          </span>
        </div>

        <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-none z-10 pointer-events-none">
          <svg className="relative block w-full h-12 sm:h-16 text-[#FAF8F5] fill-current" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,0 C300,90 900,90 1200,0 L1200,120 L0,120 Z"></path>
          </svg>
        </div>
      </section>


      {/* 2. ROMAN ARCH PHILOSOPHY SECTION */}
      <section className="py-24 px-6 sm:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          <div className="lg:col-span-6 flex justify-center">
            <div className="relative w-full max-w-md aspect-[3/4] rounded-t-full rounded-b-3xl overflow-hidden shadow-2xl border-8 border-white bg-[#ECEFEA]">
              <img 
                src="https://ik.imagekit.io/Dilshad/Cafe/Yatrikit/wedding-studio/wedding-editorial-shoot-weddingpur-scaled-e1773261531589.jpg" 
                alt="Royal Wedding Couple" 
                className="w-full h-full object-cover object-center scale-100 hover:scale-105 transition-transform duration-700" 
              />
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
            <span className="text-[10px] uppercase tracking-[0.35em] text-[#5B6454] font-semibold block">
              OUR EDITORIAL PHILOSOPHY
            </span>
            <h2 className="font-serif text-5xl sm:text-6xl text-[#1E221D] font-normal leading-[1.12]">
              Unposed. Pure. <br />
              <span className="italic font-light">Poetic.</span>
            </h2>
            <p className="text-[#5F6757] text-base leading-relaxed max-w-lg mx-auto lg:mx-0 font-light">
              We believe the most breathtaking images are the ones you didn't know were being taken. Our documentary approach focuses on the raw, unscripted emotion of your day—capturing what poses simply cannot. We blend into your celebration to document your legacy as it organically unfolds.
            </p>

            <div className="grid grid-cols-3 gap-6 pt-4 max-w-md mx-auto lg:mx-0 border-t border-[#E8E4DB]">
              <div>
                <span className="font-serif text-3xl text-[#1E221D] block">150+</span>
                <span className="text-[9px] uppercase tracking-wider text-[#7A8275]">Weddings Documented</span>
              </div>
              <div>
                <span className="font-serif text-3xl text-[#1E221D] block">10+</span>
                <span className="text-[9px] uppercase tracking-wider text-[#7A8275]">Awards Won</span>
              </div>
              <div>
                <span className="font-serif text-3xl text-[#1E221D] block">100%</span>
                <span className="text-[9px] uppercase tracking-wider text-[#7A8275]">Raw Emotion</span>
              </div>
            </div>

            <div className="pt-4">
              <Link className="inline-block border border-[#5B6454] text-[#5B6454] hover:bg-[#5B6454] hover:text-[#FAF8F5] px-9 py-3 rounded-full text-xs tracking-[0.25em] uppercase font-medium transition shadow-sm" href="/about">
                Our Story & Crew
              </Link>
            </div>
          </div>

        </div>
      </section>


      {/* 3. FEATURED WEDDINGS (MAGAZINE SHOWCASE) */}
      <section className="py-24 px-6 sm:px-12 bg-[#FAF8F5] border-t border-[#EAE6DE]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl sm:text-5xl text-[#1E221D] font-normal mb-2">
              Featured Weddings
            </h2>
            <p className="text-xs text-[#7A8275] tracking-[0.25em] uppercase">Curated weddings captured with cinematic depth</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                names: "Abhishek & Ruchi",
                sub: "ANANYA & KABIR • JAIPUR",
                img: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
                description: "Some weddings are beautiful. Some are unforgettable. Abhishek and Ruchi's wedding was one of a kind. A Marwadi wedding full of life, laughter, and love that every single frame told a story worth saving forever. Click on the button to feel every moment of this beautiful union."
              },
              {
                names: "Akshat & Shivani",
                sub: "SNEHA & RAHUL • VARANASI",
                img: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80",
                description: "Some celebrations feel timeless from the very first moment. Akshat and Shivani's wedding at The Mavrick Resort was one such celebration. A beautiful blend of emotions, traditions and joyful moments where every frame reflected the elegance of their story."
              },
              {
                names: "Minimalist Meadow Vows",
                sub: "POOJA & NEIL • PATNA",
                img: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80",
                description: "Some weddings are beautiful. Some are unforgettable. Abhishek and Ruchi's wedding was one of a kind. A Marwadi wedding full of life, laughter, and love that every single frame told a story worth saving forever. Click on the button to feel every moment of this beautiful union."
              }
            ].map((story, i) => (
              <div key={i} className="group cursor-pointer flex flex-col items-start text-left">
                <div className="aspect-[4/5] rounded-2xl overflow-hidden mb-5 bg-[#ECEFEA] border border-[#E3DFD5] w-full">
                  <img 
                    src={story.img} 
                    alt={story.names} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                  />
                </div>
                <h3 className="font-serif text-2xl text-[#1E221D] mb-1">{story.names}</h3>
                <p className="text-[10px] tracking-[0.25em] uppercase text-[#7A8275] mb-2">{story.sub}</p>
                
                {story.description ? (
                  <>
                    <p className="text-[#7A8275] text-[13px] leading-[1.8] mt-3 mb-6 pr-4">
                      {story.description}
                    </p>
                    <Link href={`/stories/${story.slug || ''}`} className="inline-block border border-[#5B6454] text-[#5B6454] hover:bg-[#5B6454] hover:text-[#FAF8F5] hover:border-[#5B6454] px-7 py-2.5 rounded-full text-[11px] uppercase tracking-[0.2em] font-medium transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer">
                      View Story
                    </Link>
                  </>
                ) : (
                  <span className="text-[11px] uppercase tracking-wider text-[#5B6454] group-hover:underline inline-flex items-center gap-1 mt-2">
                    View Complete Story ↗
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. STUDIO PILLARS & SERVICES (4 Editorial Grid Cards with Mini Photo Collages) */}
      <section className="py-24 px-6 sm:px-12 bg-[#ECEFEA] border-t border-[#DDD7CD]/70">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center mb-16">
            <span className="text-[10px] uppercase tracking-[0.35em] text-[#5B6454] font-semibold block mb-2">
              OUR OFFERINGS
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl text-[#1E221D] italic font-normal">
              Studio Pillars & Services
            </h2>
            <div className="w-16 h-[1px] bg-[#5B6454]/40 mx-auto mt-4"></div>
          </div>

          {/* 4 Services Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* CARD 1: Destination Wedding Photography */}
            <div className="bg-white rounded-3xl p-6 border border-[#DDD7CD] shadow-sm flex flex-col justify-between text-center group hover:shadow-md hover:-translate-y-1.5 transition-all duration-300">
              <div>
                <h3 className="font-serif text-xl text-[#1E221D] min-h-[52px] flex items-center justify-center mb-5 font-normal leading-snug">
                  Destination Wedding <br />Photography
                </h3>

                {/* Mini Photo Collage */}
                <div className="grid grid-cols-4 gap-1.5 mb-6 rounded-2xl overflow-hidden p-1.5 bg-[#FAF8F5] border border-[#EAE6DE]">
                  {[
                    "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=200&q=80",
                    "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=200&q=80",
                    "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=200&q=80",
                    "https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=200&q=80",
                    "https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=200&q=80",
                    "https://images.unsplash.com/photo-1545232979-8bf68ee9b1af?auto=format&fit=crop&w=200&q=80",
                    "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=200&q=80",
                    "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=200&q=80"
                  ].map((img, i) => (
                    <div key={i} className="aspect-square overflow-hidden rounded-md bg-gray-100">
                      <img src={img} alt="Destination shoot" className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
                    </div>
                  ))}
                </div>

                <p className="text-xs text-[#525B4C] font-light leading-relaxed mb-6">
                  If you want your wedding to be a thing outside the world, then a destination wedding is the right choice for you.
                </p>
              </div>

              <Link className="inline-block border border-[#5B6454]/60 text-[#5B6454] hover:bg-[#5B6454] hover:text-[#FAF8F5] py-2.5 px-6 rounded-full text-[11px] uppercase tracking-[0.2em] font-medium transition" href="/services">
                Learn More
              </Link>
            </div>

            {/* CARD 2: Candid Style Wedding Photography */}
            <div className="bg-white rounded-3xl p-6 border border-[#DDD7CD] shadow-sm flex flex-col justify-between text-center group hover:shadow-md hover:-translate-y-1.5 transition-all duration-300">
              <div>
                <h3 className="font-serif text-xl text-[#1E221D] min-h-[52px] flex items-center justify-center mb-5 font-normal leading-snug">
                  Candid Style Wedding <br />Photography
                </h3>

                {/* Mini Photo Collage */}
                <div className="grid grid-cols-4 gap-1.5 mb-6 rounded-2xl overflow-hidden p-1.5 bg-[#FAF8F5] border border-[#EAE6DE]">
                  {[
                    "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=200&q=80",
                    "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=200&q=80",
                    "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=200&q=80",
                    "https://images.unsplash.com/photo-1545232979-8bf68ee9b1af?auto=format&fit=crop&w=200&q=80",
                    "https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=200&q=80",
                    "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=200&q=80",
                    "https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=200&q=80",
                    "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=200&q=80"
                  ].map((img, i) => (
                    <div key={i} className="aspect-square overflow-hidden rounded-md bg-gray-100">
                      <img src={img} alt="Candid shoot" className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
                    </div>
                  ))}
                </div>

                <p className="text-xs text-[#525B4C] font-light leading-relaxed mb-6">
                  Candid photography is nothing but capturing real moments, feelings and expressions rather than posed ones.
                </p>
              </div>

              <Link className="inline-block border border-[#5B6454]/60 text-[#5B6454] hover:bg-[#5B6454] hover:text-[#FAF8F5] py-2.5 px-6 rounded-full text-[11px] uppercase tracking-[0.2em] font-medium transition" href="/services">
                Learn More
              </Link>
            </div>

            {/* CARD 3: Wedding Cinematography & Films */}
            <div className="bg-white rounded-3xl p-6 border border-[#DDD7CD] shadow-sm flex flex-col justify-between text-center group hover:shadow-md hover:-translate-y-1.5 transition-all duration-300">
              <div>
                <h3 className="font-serif text-xl text-[#1E221D] min-h-[52px] flex items-center justify-center mb-5 font-normal leading-snug">
                  Wedding Cinematography & <br />Films
                </h3>

                {/* Mini Photo Collage */}
                <div className="grid grid-cols-4 gap-1.5 mb-6 rounded-2xl overflow-hidden p-1.5 bg-[#FAF8F5] border border-[#EAE6DE]">
                  {[
                    "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=200&q=80",
                    "https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=200&q=80",
                    "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=200&q=80",
                    "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=200&q=80",
                    "https://images.unsplash.com/photo-1545232979-8bf68ee9b1af?auto=format&fit=crop&w=200&q=80",
                    "https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=200&q=80",
                    "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=200&q=80",
                    "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=200&q=80"
                  ].map((img, i) => (
                    <div key={i} className="aspect-square overflow-hidden rounded-md bg-gray-100">
                      <img src={img} alt="Cinema visual" className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
                    </div>
                  ))}
                </div>

                <p className="text-xs text-[#525B4C] font-light leading-relaxed mb-6">
                  A wedding is like a movie of so many beautiful things coming together into one big happy story that is timeless.
                </p>
              </div>

              <Link className="inline-block border border-[#5B6454]/60 text-[#5B6454] hover:bg-[#5B6454] hover:text-[#FAF8F5] py-2.5 px-6 rounded-full text-[11px] uppercase tracking-[0.2em] font-medium transition" href="/services">
                Learn More
              </Link>
            </div>

            {/* CARD 4: Prewedding Photography & Videos */}
            <div className="bg-white rounded-3xl p-6 border border-[#DDD7CD] shadow-sm flex flex-col justify-between text-center group hover:shadow-md hover:-translate-y-1.5 transition-all duration-300">
              <div>
                <h3 className="font-serif text-xl text-[#1E221D] min-h-[52px] flex items-center justify-center mb-5 font-normal leading-snug">
                  Prewedding Photography & <br />Videos
                </h3>

                {/* Mini Photo Collage */}
                <div className="grid grid-cols-4 gap-1.5 mb-6 rounded-2xl overflow-hidden p-1.5 bg-[#FAF8F5] border border-[#EAE6DE]">
                  {[
                    "https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=200&q=80",
                    "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=200&q=80",
                    "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=200&q=80",
                    "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=200&q=80",
                    "https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=200&q=80",
                    "https://images.unsplash.com/photo-1545232979-8bf68ee9b1af?auto=format&fit=crop&w=200&q=80",
                    "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=200&q=80",
                    "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=200&q=80"
                  ].map((img, i) => (
                    <div key={i} className="aspect-square overflow-hidden rounded-md bg-gray-100">
                      <img src={img} alt="Prewedding visual" className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
                    </div>
                  ))}
                </div>

                <p className="text-xs text-[#525B4C] font-light leading-relaxed mb-6">
                  Your unmatched love story with you and your beloved in the frame captured months before your big celebration.
                </p>
              </div>

              <Link className="inline-block border border-[#5B6454]/60 text-[#5B6454] hover:bg-[#5B6454] hover:text-[#FAF8F5] py-2.5 px-6 rounded-full text-[11px] uppercase tracking-[0.2em] font-medium transition" href="/services">
                Learn More
              </Link>
            </div>

          </div>

        </div>
      </section>


      {/* 5. CINEMATIC WEDDING FILMS SHOWCASE (WEDDINGPUR YOUTUBE REEL) */}
      <section className="py-24 px-6 sm:px-12 bg-[#FAF8F5] border-t border-[#EAE6DE]">
        <div className="max-w-7xl mx-auto">
          
          {/* Header */}
          <div className="text-center mb-16">
            <span className="text-[10px] uppercase tracking-[0.35em] text-[#5B6454] font-semibold block mb-2">
              MOTION & SOUND STORIES
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl text-[#1E221D] italic font-normal">
              Cinematic Wedding Films
            </h2>
            <p className="text-xs text-[#7A8275] tracking-[0.25em] uppercase mt-2">
              Teasers & 4K highlight films streaming on YouTube
            </p>
            <div className="w-16 h-[1px] bg-[#5B6454]/40 mx-auto mt-4"></div>
          </div>

          {/* MAIN FEATURED CINEMA HERO BANNER */}
          <div className="max-w-5xl mx-auto mb-14">
            <a
              href="https://www.youtube.com/@WeddingPur"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block aspect-[16/9] sm:aspect-[21/9] rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-black cursor-pointer"
            >
              <img
                src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=85"
                alt="Sandhya & Pratik Wedding Teaser"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>

              {/* YouTube Branding & Center Play Button */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-red-600/90 group-hover:bg-red-600 flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-7 h-7 sm:w-8 sm:h-8 fill-current ml-1" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                <span className="text-[11px] tracking-[0.3em] uppercase mt-4 text-white/90 font-medium group-hover:text-white">
                  Watch Teaser on YouTube ↗
                </span>
              </div>

              {/* Bottom Film Title Tag */}
              <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between text-white gap-2">
                <div>
                  <span className="text-[10px] tracking-widest uppercase text-amber-300 font-semibold block mb-1">Featured Teaser • 4K Film</span>
                  <h3 className="font-serif text-2xl sm:text-3xl italic">Sandhya & Pratik — Vishwanath Farms, Patna</h3>
                </div>
                <span className="text-xs text-white/70 tracking-wider">Streaming in 4K UHD</span>
              </div>
            </a>
          </div>

          {/* 4 GRID FILM TEASERS (Direct YouTube Cards) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {[
              {
                couple: "Pankaj & Shritika",
                subtitle: "Treasured Symphony • Shangri-La Palace, Patna",
                img: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80",
                link: "https://www.youtube.com/@WeddingPur"
              },
              {
                couple: "Abhishek & Ruchi",
                subtitle: "Joyful Reverie • Royal Destination Wedding",
                img: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80",
                link: "https://www.youtube.com/@WeddingPur"
              },
              {
                couple: "Ritik & Kajal",
                subtitle: "Engagement Highlight • Heritage Grand, Patna",
                img: "https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=800&q=80",
                link: "https://www.youtube.com/@WeddingPur"
              },
              {
                couple: "Tanya & Rishabh",
                subtitle: "Latest Engagement Teaser • Hotel Maurya, Patna",
                img: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=800&q=80",
                link: "https://www.youtube.com/@WeddingPur"
              }
            ].map((film, idx) => (
              <a
                key={idx}
                href={film.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white border border-[#DDD7CD] rounded-3xl p-4 shadow-sm hover:shadow-xl hover:border-[#5B6454] transition-all duration-300 block"
              >
                <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-black mb-4">
                  <img
                    src={film.img}
                    alt={film.couple}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
                  />
                  {/* Dark Vignette Overlay */}
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors"></div>

                  {/* YouTube Badge Icon */}
                  <div className="absolute center inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-red-600/90 group-hover:bg-red-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <svg className="w-5 h-5 fill-white ml-0.5" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>

                  {/* Watch on YouTube Pill */}
                  <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full text-[10px] text-white flex items-center gap-1.5 font-medium">
                    <span>Watch on YouTube</span>
                    <span>↗</span>
                  </div>
                </div>

                <div className="px-2 pb-2">
                  <h4 className="font-serif text-xl text-[#1E221D] italic mb-1 group-hover:text-[#5B6454] transition-colors">
                    {film.couple}
                  </h4>
                  <p className="text-[11px] uppercase tracking-wider text-[#7A8275]">
                    {film.subtitle}
                  </p>
                </div>
              </a>
            ))}
          </div>

          {/* YouTube Channel CTA Button */}
          <div className="text-center mt-12">
            <a
              href="https://www.youtube.com/@WeddingPur"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#5B6454] hover:bg-[#485042] text-[#FAF8F5] px-10 py-3.5 rounded-full text-xs tracking-[0.25em] uppercase font-medium shadow-md transition-all duration-300"
            >
              <span>Subscribe & Watch More Films</span>
              <span>↗</span>
            </a>
          </div>

          {/* Editorial Quote */}
          <div className="text-center pt-14 border-t border-[#EAE6DE] mt-16">
            <blockquote className="font-serif text-2xl sm:text-3xl text-[#1E221D] italic max-w-2xl mx-auto">
              "You will forget the flowers and the food, but you will never forget how it felt."
            </blockquote>
          </div>

        </div>
      </section>


      {/* 6. VERIFIED GOOGLE REVIEWS SECTION (REAL CLIENT FEEDBACK) */}
      <section className="py-24 px-6 sm:px-12 bg-[#1E221D] text-[#FAF8F5]">
        <div className="max-w-7xl mx-auto">
          
          {/* Header */}
          <div className="text-center mb-16">
            <div className="flex justify-center items-center gap-1 text-[#E6B85C] text-sm mb-2 tracking-widest">
              ★★★★★
            </div>
            <span className="text-[10px] uppercase tracking-[0.35em] text-[#A2ADA0] font-semibold block mb-2">
              VERIFIED 5-STAR GOOGLE REVIEWS
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl italic font-normal text-white">
              Client Praise on Google
            </h2>
            <div className="w-16 h-[1px] bg-[#A2ADA0]/40 mx-auto mt-4"></div>
          </div>

          {/* Interactive Auto-Playing Google Review Carousel */}
          <div 
            className="max-w-4xl mx-auto relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Left Button */}
            <button 
              onClick={handlePrevReview}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 sm:-translate-x-12 w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/50 hover:text-[#E6B85C] hover:border-[#E6B85C] transition-all z-10"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" /></svg>
            </button>

            {/* Carousel Track */}
            <div className="overflow-hidden relative min-h-[300px]">
              {realGoogleReviews.map((review, idx) => (
                <div 
                  key={idx}
                  className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${idx === reviewIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                >
                  <div className="flex flex-col justify-between h-full border-l border-white/15 pl-8 py-4">
                    <div>
                      <div className="flex items-center gap-1 text-[#E6B85C] text-sm mb-4">
                        ★★★★★
                      </div>
                      <p className="text-sm sm:text-base md:text-lg text-gray-300 italic leading-relaxed mb-8 font-light">
                        "{review.text}"
                      </p>
                    </div>

                    <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                      <div>
                        <span className="text-xs uppercase tracking-wider font-semibold block text-[#ECEFEA]">
                          {review.name}
                        </span>
                        <span className="text-[10px] text-[#A2ADA0] block tracking-wide">
                          {review.date} • {review.role}
                        </span>
                      </div>
                      <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center p-1.5 shrink-0">
                        <svg viewBox="0 0 24 24" className="w-full h-full">
                          <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"/>
                          <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.35 24 12 24z"/>
                          <path fill="#FBBC05" d="M5.28 14.27A7.054 7.054 0 0 1 4.9 12c0-.79.14-1.56.38-2.27V6.58H1.25A11.96 11.96 0 0 0 0 12c0 1.92.45 3.74 1.25 5.42l4.03-3.15z"/>
                          <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.35 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Right Button */}
            <button 
              onClick={handleNextReview}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 sm:translate-x-12 w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/50 hover:text-[#E6B85C] hover:border-[#E6B85C] transition-all z-10"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" /></svg>
            </button>

            {/* Dots Indicator */}
            <div className="flex justify-center gap-2 mt-8">
              {realGoogleReviews.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setReviewIndex(idx)}
                  className={`h-1.5 rounded-full transition-all duration-500 ${idx === reviewIndex ? 'w-6 bg-[#E6B85C]' : 'w-2 bg-white/20 hover:bg-white/40'}`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>          </div>

          {/* Bottom Footer Rating Summary */}
          <div className="mt-16 pt-8 border-t border-white/10 text-center">
            <span className="text-[11px] uppercase tracking-widest text-[#A2ADA0] hover:text-white transition cursor-pointer inline-flex items-center gap-2">
              Rated 4.9 / 5.0 across 120+ Verified Google Reviews ↗
            </span>
          </div>

        </div>
      </section>


      {/* 6.5. FREQUENTLY ASKED QUESTIONS */}
      <section className="bg-[#FAF8F5] py-24 px-6 sm:px-12 border-t border-[#EAE6DE]">
        <div className="max-w-3xl mx-auto">
          <span className="text-[10px] uppercase tracking-[0.35em] text-[#5B6454] font-semibold block mb-2 text-center">
            FAQS
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl text-[#1E221D] font-normal text-center mb-14">
            Frequently Asked Questions
          </h2>

          <div className="space-y-4">
            {[
              {
                q: "How far in advance should we book your services?",
                a: "We typically book 6-12 months in advance for peak wedding seasons. To ensure we can dedicate our full creative energy to your celebration, we take on a limited number of commissions each year."
              },
              {
                q: "Do you travel for destination weddings?",
                a: "Absolutely. We love capturing love stories around the globe. Our team is well-versed in travel logistics and we offer custom collections for destination celebrations."
              },
              {
                q: "How many photographers will be present on our wedding day?",
                a: "Our standard luxury collections include a lead photographer (or cinematographer) and an associate to ensure every angle, fleeting moment, and grand detail is impeccably documented."
              },
              {
                q: "When will we receive our final photos and films?",
                a: "We carefully curate and meticulously edit each frame. You can expect your final gallery and cinematic films within 8-10 weeks following your celebration."
              }
            ].map((faq, index) => (
              <div 
                key={index}
                className="bg-white border border-[#DDD7CD] rounded-2xl shadow-sm overflow-hidden mb-4 transition-all duration-300 hover:border-[#5B6454]/60"
              >
                <button 
                  className="w-full px-6 py-5 flex justify-between items-center text-left focus:outline-none"
                  onClick={() => toggleFaq(index)}
                >
                  <h3 className="text-sm font-semibold text-[#1E221D]">{faq.q}</h3>
                  <span className={`text-[#5B6454] transition-transform duration-300 flex-shrink-0 ml-4 ${openFaq === index ? 'rotate-180' : ''}`}>
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </button>
                <div 
                  className={`px-6 overflow-hidden transition-all duration-500 ease-in-out ${openFaq === index ? 'max-h-40 pb-5 opacity-100' : 'max-h-0 opacity-0'}`}
                >
                  <p className="text-xs text-[#525B4C] font-light leading-relaxed border-t border-[#EAE6DE] pt-4">
                    {faq.a}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* 7. LIVE INSTAGRAM FEED SHOWCASE (@weddingpur) */}
      <section className="py-24 px-6 sm:px-12 bg-[#FAF8F5] border-t border-[#EAE6DE]">
        <div className="max-w-7xl mx-auto">
          
          {/* Instagram Profile Header */}
          <div className="flex flex-col items-center text-center mb-12">
            <a
              href="https://www.instagram.com/weddingpur/"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center"
            >
              <div className="w-20 h-20 rounded-full p-1 bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 mb-3 group-hover:scale-105 transition-transform duration-300">
                <div className="w-full h-full rounded-full bg-white p-0.5 overflow-hidden">
                  <div className="w-full h-full rounded-full bg-[#FAF8F5] flex items-center justify-center font-serif font-bold text-xl text-[#1E221D]">
                    W
                  </div>
                </div>
              </div>
              <h3 className="font-semibold text-lg text-[#1E221D] tracking-wide flex items-center gap-1.5 group-hover:text-[#5B6454] transition-colors">
                weddingpur
                <span className="text-blue-500 text-xs">✓</span>
              </h3>
            </a>

            {/* Bio Badges from reference image */}
            <p className="text-xs text-[#525B4C] max-w-2xl mx-auto mt-2 leading-relaxed font-light">
              🏆 Couples Choice Award 2024 Winner • 🏆 Wedding Awards 2025 Winner • 💍 Wedding Films Expert • 🌍 Available Worldwide
            </p>

            <a
              href="https://www.instagram.com/weddingpur/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 border border-[#5B6454]/70 text-[#5B6454] hover:bg-[#5B6454] hover:text-[#FAF8F5] px-7 py-2 rounded-full text-[11px] uppercase tracking-[0.2em] font-medium transition duration-300"
            >
              <span>Follow on Instagram</span>
              <span>↗</span>
            </a>
          </div>

          {/* 3x2 Instagram Post Grid (Direct External Links) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-6xl mx-auto">
            {[
              {
                img: "https://ik.imagekit.io/Dilshad/Cafe/Yatrikit/wedding-studio/wedding-editorial-shoot-weddingpur-scaled-e1773261531589.jpg",
                title: "Silhouette Bride Portrait"
              },
              {
                img: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
                title: "Nocturnal Courtyard Vows"
              },
              {
                img: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80",
                title: "Pink Sherwani Royal Spread"
              },
              {
                img: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80",
                title: "Intimate Haldi & Pheras"
              },
              {
                img: "https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=800&q=80",
                title: "Heritage Archways Sequence"
              },
              {
                img: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=800&q=80",
                title: "Royal Red Saree Heirloom"
              }
            ].map((post, i) => (
              <a
                key={i}
                href="https://www.instagram.com/weddingpur/"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative aspect-square bg-[#ECEFEA] rounded-2xl overflow-hidden shadow-sm block"
              >
                <img
                  src={post.img}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />

                {/* Multiple Posts / Carousel Square Indicator in Top-Right */}
                <div className="absolute top-3.5 right-3.5 bg-black/40 backdrop-blur-md p-1.5 rounded-lg text-white">
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="7" y="7" width="14" height="14" rx="2" ry="2"></rect>
                    <path d="M3 17V5a2 2 0 0 1 2-2h12"></path>
                  </svg>
                </div>

                {/* Hover Glass Veil with Instagram Logo */}
                <div className="absolute inset-0 bg-[#1E221D]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-white p-4">
                  <svg className="w-8 h-8 mb-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                  <span className="text-[10px] uppercase tracking-widest font-medium">View on Instagram ↗</span>
                </div>
              </a>
            ))}
          </div>

        </div>
      </section>

    </main>
  );
}
