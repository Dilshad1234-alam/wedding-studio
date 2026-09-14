"use client";
import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useProtectedAction } from '@/hooks/useProtectedAction';

export default function LandingPage({ initialData = null }) {
  const { handleProtectedAction } = useProtectedAction();
  const [openFaq, setOpenFaq] = useState(null);
  const [reviewIndex, setReviewIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [landingConfig, setLandingConfig] = useState(initialData);
  const [loading, setLoading] = useState(!initialData);
  const [videoError, setVideoError] = useState(false);

  React.useEffect(() => {
    fetch('/api/landing')
      .then(res => res.json())
      .then(data => {
        if (data && Object.keys(data).length > 0) setLandingConfig(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching landing config:", err);
        setLoading(false);
      });
  }, []);



  const safeConfig = landingConfig || {};


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

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0B0D0E] flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#D4AF37]"></div>
      </div>
    );
  }

  const getYoutubeId = (url) => {
    if (!url) return null;
    const match = url.match(/[?&]v=([^&]+)/) || url.match(/youtu\.be\/([^?]+)/);
    return match ? match[1] : null;
  };

  const fallbackVideoUrl = "https://res.cloudinary.com/demo/video/upload/v1684497672/docs/nature.mp4"; 
  const configuredVideoUrl = safeConfig.heroVideoUrl || safeConfig.bgVideoUrl;
  const rawVideoUrl = configuredVideoUrl || fallbackVideoUrl; 
  const isDirectVideo = rawVideoUrl && (rawVideoUrl.toLowerCase().endsWith('.mp4') || rawVideoUrl.toLowerCase().endsWith('.webm') || rawVideoUrl.startsWith('/uploads/') || rawVideoUrl.includes('.mp4'));
  const heroVideoId = !isDirectVideo ? getYoutubeId(rawVideoUrl) : null;

  return (
    <main className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#D4AF37]/5 via-[#0B0D0E] to-[#0B0D0E] text-[#F5F5F5] font-sans antialiased selection:bg-[#D4AF37] selection:text-black">
      
      {/* 1. CINEMATIC PATNA HERO */}
      <section className="relative min-h-[92vh] flex flex-col justify-center items-center text-center px-6 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center z-0 scale-100 overflow-hidden flex justify-center items-center"
          style={{
            backgroundImage: (!heroVideoId && !isDirectVideo) ? `url('${safeConfig.heroImageUrl || safeConfig.bgImage || 'https://ik.imagekit.io/Dilshad/Cafe/Yatrikit/wedding-studio/youtube%202.avif'}')` : 'none'
          }}
        >
          {isDirectVideo && (
            <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
              <video
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                key={videoError ? 'fallback' : rawVideoUrl}
                src={videoError ? fallbackVideoUrl : rawVideoUrl}
                className="absolute inset-0 w-full h-full object-cover object-[70%_center] md:object-center"
                onError={() => setVideoError(true)}
              />
            </div>
          )}
          {heroVideoId && (
            <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
              <iframe
                className="absolute top-1/2 left-1/2 pointer-events-none -translate-x-1/2 -translate-y-1/2"
                style={{
                  width: '100vw',
                  height: '100vh',
                  minWidth: '177.77vh',
                  minHeight: '56.25vw'
                }}
                src={`https://www.youtube.com/embed/${heroVideoId}?autoplay=1&mute=1&loop=1&playlist=${heroVideoId}&controls=0&showinfo=0&autohide=1&modestbranding=1&iv_load_policy=3&disablekb=1`}
                frameBorder="0"
                allow="autoplay; encrypted-media"
                allowFullScreen
              ></iframe>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-[#1E221D]/75 via-[#1E221D]/55 to-[#1E221D]/85 z-10"></div>
        </div>

        <div className="w-full min-h-[90vh] flex flex-col justify-center items-center px-4 sm:px-8 pt-24 sm:pt-0 text-center relative z-10 mx-auto">

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif text-[#F5F5F5] tracking-tight leading-[1.15] sm:leading-[1.12] drop-shadow-md">
            {safeConfig.headlineWhite || safeConfig.titleLine1 || "Best Wedding Photographers"} <br className="hidden sm:inline" />
            <span className="italic font-light text-[#D4AF37] block sm:inline mt-2 sm:mt-0">{safeConfig.headlineGold || safeConfig.titleLine2 || "In Patna, Bihar"}</span>
          </h1>

          <p className="text-[#F5F5F5]/90 text-sm sm:text-lg font-light tracking-wide max-w-2xl mx-auto mt-6 sm:mt-6 mb-4 px-2">
            {safeConfig.subtitle || "We capture timeless weddings for modern couples who want their story told beautifully."}
          </p>

          <div className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center items-center mt-6 sm:mt-8 w-full sm:w-auto px-4 sm:px-0">
            <Link onClick={handleProtectedAction()} className="w-full sm:w-auto border border-[#2B2519] text-[#C5B388] hover:text-white hover:border-[#D4AF37] hover:bg-[#121518] px-6 sm:px-9 py-3.5 rounded-full text-[11px] sm:text-xs tracking-[0.2em] sm:tracking-[0.25em] uppercase font-medium backdrop-blur-sm transition-all duration-300" href="/portfolio">
              Explore Portfolio
            </Link>
            <Link onClick={handleProtectedAction()} className="w-full sm:w-auto bg-gradient-to-r from-[#D4AF37] to-[#B89018] text-black hover:from-[#F3E5AB] hover:to-[#D4AF37] shadow-lg shadow-[#D4AF37]/20 px-6 sm:px-9 py-3.5 rounded-full text-[11px] sm:text-xs tracking-[0.2em] sm:tracking-[0.25em] uppercase font-medium transition-all duration-300 font-black" href="/contact">
              Contact Us
            </Link>
          </div>

          <span className="text-[9px] sm:text-[10px] tracking-[0.25em] sm:tracking-[0.3em] uppercase text-[#C5B388] mt-10 sm:mt-12 px-4 text-center leading-relaxed">
            {safeConfig.footerCities || safeConfig.serviceCities || "Patna • Varanasi • Jaipur • Goa"}
          </span>
        </div>

        <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-none z-10 pointer-events-none">
          <svg className="relative block w-full h-12 sm:h-16 text-[#F5F5F5] fill-current" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,0 C300,90 900,90 1200,0 L1200,120 L0,120 Z"></path>
          </svg>
        </div>
      </section>


      {/* EDITORIAL PHILOSOPHY SECTION */}
      <section className="w-full bg-[#0B0D0E] py-16 sm:py-24 border-t border-[#1C1A14]">
        <div className="w-full max-w-[1536px] mx-auto px-6 sm:px-10 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            
            {/* LEFT: Expanded Grand Arch Portrait */}
            <div className="lg:col-span-6 flex justify-center lg:justify-start">
              <div className="relative w-full max-w-[500px] aspect-[4/5] sm:aspect-[3/4] rounded-t-[200px] rounded-b-3xl overflow-hidden border border-[#3A311D] shadow-[0_20px_60px_rgba(0,0,0,0.8)] bg-[#121518]">
                <img
                  src={safeConfig.philosophy?.image || "https://ik.imagekit.io/Dilshad/Cafe/Yatrikit/wedding-studio/wedding-editorial-shoot-weddingpur-scaled-e1773261531589.jpg"}
                  alt="Unposed Wedding Moments"
                  className="w-full h-full object-cover grayscale-[10%] hover:grayscale-0 transition-all duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0D0E]/60 via-transparent to-transparent pointer-events-none"></div>
              </div>
            </div>

            {/* RIGHT: Editorial Narrative & Expanded Metrics */}
            <div className="lg:col-span-6 space-y-7 text-center lg:text-left">
              
              {/* Eyebrow Badge */}
              <div>
                <span className="inline-block px-3.5 py-1.5 rounded-full bg-[#181B1F] border border-[#3A311D] text-[10px] font-black uppercase tracking-[0.3em] text-[#D4AF37]">
                  {safeConfig.philosophy?.badge || "OUR EDITORIAL PHILOSOPHY"}
                </span>
              </div>

              {/* Heading */}
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-white tracking-tight leading-[1.1]">
                {safeConfig.philosophy?.title || (
                  <>
                    Unposed. Pure. <br />
                    <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-[#F3E5AB] via-[#D4AF37] to-[#B89018]">
                      Poetic.
                    </span>
                  </>
                )}
              </h2>

              {/* Description */}
              <p className="text-sm sm:text-base text-[#D1C7A5] font-light leading-relaxed max-w-xl mx-auto lg:mx-0">
                {safeConfig.philosophy?.desc || "We believe the most breathtaking images are the ones you didn't know were being taken. Our documentary approach focuses on the raw, unscripted emotion of your day—capturing what poses simply cannot. We blend into your celebration to document your legacy as it organically unfolds."}
              </p>

              {/* Key Metrics Row */}
              <div className="grid grid-cols-3 gap-6 pt-4 border-t border-[#2B2519] max-w-lg mx-auto lg:mx-0">
                {(safeConfig.philosophy?.stats || [
                  { value: "150+", label: "WEDDINGS DOCUMENTED" },
                  { value: "10+", label: "AWARDS WON" },
                  { value: "100%", label: "RAW EMOTION" }
                ]).map((stat, i) => (
                  <div key={i}>
                    <span className="text-2xl sm:text-3xl font-black text-[#D4AF37] block">
                      {stat.value}
                    </span>
                    <span className="text-[10px] uppercase font-bold tracking-widest text-[#8A7D5C] block mt-1">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Action Button */}
              <div className="pt-2">
                <Link
                  href="/about"
                  className="inline-flex items-center justify-center px-8 py-3.5 rounded-full border border-[#3A311D] hover:border-[#D4AF37] bg-[#121518] hover:bg-gradient-to-r hover:from-[#F3E5AB] hover:to-[#D4AF37] text-[#C5B388] hover:text-black text-xs uppercase tracking-[0.2em] font-black transition-all duration-300 shadow-lg hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] active:scale-95 cursor-pointer"
                >
                  OUR STORY & CREW
                </Link>
              </div>

            </div>

          </div>
        </div>
      </section>


      {/* 3. FEATURED WEDDINGS (MAGAZINE SHOWCASE) */}
      <section className="bg-[#0B0D0E] border-t border-[#2B2519]">
        <div className="w-full max-w-[1536px] mx-auto px-4 sm:px-8 lg:px-12 py-16">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl sm:text-5xl text-white font-normal mb-2">
              Featured Weddings
            </h2>
            <p className="text-xs text-[#C5B388] tracking-[0.25em] uppercase">Curated weddings captured with cinematic depth</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 w-full">
            {(safeConfig.featuredWeddings && safeConfig.featuredWeddings.length > 0 ? safeConfig.featuredWeddings : [
              {
                title: "Abhishek & Ruchi",
                location: "ANANYA & KABIR • JAIPUR",
                img: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
                description: "Some weddings are beautiful. Some are unforgettable. Abhishek and Ruchi's wedding was one of a kind. A Marwadi wedding full of life, laughter, and love that every single frame told a story worth saving forever. Click on the button to feel every moment of this beautiful union."
              }
            ]).map((story, i) => (
              <div key={i} className="group cursor-pointer flex flex-col h-full bg-[#121518]/40 border border-[#2B2519]/50 hover:border-[#D4AF37]/40 hover:bg-[#121518] transition-all duration-500 rounded-[2rem] p-4 sm:p-5 overflow-hidden shadow-lg hover:shadow-2xl">
                <div className="w-full aspect-[4/5] rounded-[1.5rem] overflow-hidden mb-6 bg-[#0B0D0E] relative">
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
                  <img 
                    src={story.img} 
                    alt={story.title || story.names} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]" 
                  />
                </div>
                
                <div className="flex flex-col flex-grow px-2 pb-2">
                  <p className="text-[10px] tracking-[0.3em] font-semibold uppercase text-[#D4AF37] mb-3">{story.location || story.sub}</p>
                  <h3 className="font-serif text-3xl text-white mb-4 group-hover:text-[#D4AF37] transition-colors duration-300">{story.title || story.names}</h3>
                  
                  {story.description ? (
                    <>
                      <p className="text-[#A0A0A0] text-sm leading-relaxed mb-8 line-clamp-3 font-light">
                        {story.description}
                      </p>
                      <div className="mt-auto">
                        <Link href={`/stories/${story.slug || ''}`} className="inline-flex items-center justify-center border border-[#D4AF37]/50 text-[#D4AF37] hover:bg-gradient-to-r hover:from-[#F3E5AB] hover:to-[#D4AF37] hover:text-black hover:border-transparent px-8 py-3.5 rounded-full text-[11px] uppercase tracking-[0.2em] font-bold transition-all duration-300 w-full sm:w-auto shadow-sm group-hover:shadow-[0_0_15px_rgba(212,175,55,0.3)]">
                          View Story
                        </Link>
                      </div>
                    </>
                  ) : (
                    <span className="mt-auto text-[11px] uppercase tracking-wider text-[#D4AF37] group-hover:underline inline-flex items-center gap-1 font-semibold">
                      View Complete Story <span className="text-lg leading-none">&rarr;</span>
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. STUDIO PILLARS & SERVICES (4 Editorial Grid Cards with Mini Photo Collages) */}
      <section className="bg-[#121518] border-t border-[#2B2519]">
        <div className="w-full max-w-[1536px] mx-auto px-4 sm:px-8 lg:px-12 py-16">
          
          <div className="text-center mb-16">
            <span className="text-[10px] uppercase tracking-[0.35em] text-[#D4AF37] bg-[#D4AF37]/10 border border-[#D4AF37]/20 px-3 py-1 rounded-full font-semibold inline-block mb-3">
              OUR OFFERINGS
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl text-white italic font-normal">
              Studio Pillars & Services
            </h2>
            <div className="w-16 h-[1px] bg-[#5B6454]/40 mx-auto mt-4"></div>
          </div>

          {/* Services Carousel Dynamic */}
          <div 
            className="flex overflow-hidden w-full py-4"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            
            <div 
              className="flex w-max animate-marquee gap-6 px-3"
              style={{ animationPlayState: isHovered ? 'paused' : 'running' }}
            >
              {[...(safeConfig.servicesPillars || []), ...(safeConfig.servicesPillars || [])].map((pillar, i) => (
                <div key={`set1-${i}`} className="w-[85vw] max-w-[300px] sm:max-w-none sm:w-[350px] shrink-0 bg-[#121518] rounded-3xl p-6 sm:p-8 border border-[#2B2519] shadow-sm flex flex-col justify-between text-center group/card hover:shadow-xl hover:border-[#D4AF37]/50 hover:-translate-y-1.5 transition-all duration-500 min-h-[460px]">
                  <div>
                    <div className="w-full h-[240px] mb-6 rounded-2xl overflow-hidden bg-[#0B0D0E] border border-[#2B2519]">
                      <img 
                        src={pillar.image} 
                        alt={pillar.title} 
                        className="w-full h-full object-cover object-top group-hover/card:scale-105 transition-transform duration-700 opacity-90 group-hover/card:opacity-100" 
                      />
                    </div>
                    <h3 className="font-serif text-2xl text-white mb-3 font-normal leading-snug group-hover/card:text-[#D4AF37] transition-colors">
                      {pillar.title}
                    </h3>
                    <p className="text-sm text-[#C5B388] font-light leading-relaxed mb-6 max-w-sm mx-auto line-clamp-3">
                      {pillar.desc}
                    </p>
                  </div>
                  <div className="mt-auto pt-2">
                    <Link 
                      className="inline-block border border-[#2B2519] text-[#C5B388] hover:text-black hover:border-[#D4AF37] hover:bg-gradient-to-r hover:from-[#F3E5AB] hover:to-[#D4AF37] py-3 px-8 rounded-full text-xs uppercase tracking-[0.2em] font-medium transition-all duration-300 shadow-sm" 
                      href={pillar.link || "/services"}
                    >
                      Learn More
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused] gap-6 px-3" aria-hidden="true">
              {[...(safeConfig.servicesPillars || []), ...(safeConfig.servicesPillars || [])].map((pillar, i) => (
                <div key={`set2-${i}`} className="w-[85vw] max-w-[300px] sm:max-w-none sm:w-[350px] shrink-0 bg-[#121518] rounded-3xl p-6 sm:p-8 border border-[#2B2519] shadow-sm flex flex-col justify-between text-center group/card hover:shadow-xl hover:border-[#D4AF37]/50 hover:-translate-y-1.5 transition-all duration-500 min-h-[460px]">
                  <div>
                    <div className="w-full h-[240px] mb-6 rounded-2xl overflow-hidden bg-[#0B0D0E] border border-[#2B2519]">
                      <img 
                        src={pillar.image} 
                        alt={pillar.title} 
                        className="w-full h-full object-cover object-top group-hover/card:scale-105 transition-transform duration-700 opacity-90 group-hover/card:opacity-100" 
                      />
                    </div>
                    <h3 className="font-serif text-2xl text-white mb-3 font-normal leading-snug group-hover/card:text-[#D4AF37] transition-colors">
                      {pillar.title}
                    </h3>
                    <p className="text-sm text-[#C5B388] font-light leading-relaxed mb-6 max-w-sm mx-auto line-clamp-3">
                      {pillar.desc}
                    </p>
                  </div>
                  <div className="mt-auto pt-2">
                    <Link 
                      className="inline-block border border-[#2B2519] text-[#C5B388] hover:text-black hover:border-[#D4AF37] hover:bg-gradient-to-r hover:from-[#F3E5AB] hover:to-[#D4AF37] py-3 px-8 rounded-full text-xs uppercase tracking-[0.2em] font-medium transition-all duration-300 shadow-sm" 
                      href={pillar.link || "/services"}
                    >
                      Learn More
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>


      {/* 5. CINEMATIC WEDDING FILMS SHOWCASE (WEDDINGPUR YOUTUBE REEL) */}
      <section className="bg-[#0B0D0E] border-t border-[#2B2519]">
        <div className="w-full max-w-[1536px] mx-auto px-4 sm:px-8 lg:px-12 pt-16 pb-4">
          
          {/* Header */}
          <div className="text-center mb-16">
            <span className="text-[10px] uppercase tracking-[0.35em] text-[#D4AF37] bg-[#D4AF37]/10 border border-[#D4AF37]/20 px-3 py-1 rounded-full font-semibold inline-block mb-3">
              {safeConfig.cinematicFilms?.badge || "MOTION & SOUND STORIES"}
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl text-white italic font-normal">
              {safeConfig.cinematicFilms?.title || "Cinematic Wedding Films"}
            </h2>
            <p className="text-xs text-[#C5B388] tracking-[0.25em] uppercase mt-2">
              {safeConfig.cinematicFilms?.subtitle || "Teasers & 4K highlight films streaming on YouTube"}
            </p>
            <div className="w-16 h-[1px] bg-[#5B6454]/40 mx-auto mt-4"></div>
          </div>

          {/* MAIN FEATURED CINEMA HERO BANNER */}
          <div className="w-full mb-8">
            <a
              href={safeConfig.cinematicFilms?.mainVideoUrl || "https://www.youtube.com/watch?v=3ImICPkGAkg"}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block w-full aspect-[16/9] sm:aspect-[21/9] rounded-3xl overflow-hidden shadow-2xl border-4 border-[#2B2519] hover:border-[#D4AF37] hover:shadow-[0_0_40px_rgba(212,175,55,0.35)] transition-all duration-500 bg-black cursor-pointer"
            >
              <img
                src={safeConfig.cinematicFilms?.mainThumb || "https://ik.imagekit.io/Dilshad/Cafe/Yatrikit/wedding-studio/youtube%202.avif"}
                alt="Nitika weds Abhinav | Darjeeling Pre Wedding"
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
                  <span className="text-[10px] tracking-widest uppercase text-[#D4AF37] font-semibold block mb-1">Featured Teaser • 4K Film</span>
                  <h3 className="font-serif text-2xl sm:text-3xl italic">Nitika weds Abhinav | Darjeeling Pre Wedding</h3>
                </div>
                <span className="text-xs text-white/70 tracking-wider">Streaming in 4K UHD</span>
              </div>
            </a>
          </div>

          {/* 4 GRID FILM TEASERS (Direct YouTube Cards) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 w-full">
            {(safeConfig.cinematicFilms?.grid && safeConfig.cinematicFilms.grid.length > 0 ? safeConfig.cinematicFilms.grid : [
              {
                couple: "Nitika weds Abhinav",
                subtitle: "Treasured Symphony • Shangri-La Palace, Patna",
                img: "https://ik.imagekit.io/Dilshad/Cafe/Yatrikit/wedding-studio/youtube%201.avif",
                link: "https://www.youtube.com/watch?v=BL6gFtSKTjk"
              },
              {
                couple: "Nitika weds Abhinav",
                subtitle: "Treasured Symphony • Shangri-La Palace, Patna",
                img: "https://ik.imagekit.io/Dilshad/Cafe/Yatrikit/wedding-studio/youtube%203.avif",
                link: "https://www.youtube.com/watch?v=ioNQNyoh6eQ"
              }
            ]).map((film, idx) => (
              <a
                key={idx}
                href={film.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-[#121518] border border-[#2B2519] rounded-3xl p-4 shadow-sm hover:shadow-[0_0_25px_rgba(212,175,55,0.3)] hover:border-[#D4AF37] transition-all duration-300 block cursor-pointer"
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
                  <h4 className="font-serif text-xl text-white italic mb-1 group-hover:text-[#D4AF37] transition-colors">
                    {film.couple}
                  </h4>
                  <p className="text-[11px] uppercase tracking-wider text-[#C5B388]">
                    {film.subtitle}
                  </p>
                </div>
              </a>
            ))}
          </div>

          {/* YouTube Channel CTA Button */}
          <div className="text-center mt-12">
            <a
              href="https://www.youtube.com/@lensloom_official"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#E5C158] to-[#B89018] hover:from-[#F3E5AB] hover:to-[#D4AF37] text-black font-black text-xs uppercase tracking-[0.2em] shadow-lg shadow-[#D4AF37]/20 hover:shadow-[0_0_25px_rgba(212,175,55,0.45)] active:scale-[0.98] transition-all duration-300 cursor-pointer"
            >
              <span>Subscribe & Watch More Films</span>
              <span>↗</span>
            </a>
          </div>

          {/* Editorial Quote */}
          {/* <div className="text-center pt-14 border-t border-[#2B2519] mt-16">
            <blockquote className="font-serif text-2xl sm:text-3xl text-white italic max-w-2xl mx-auto">
              "You will forget the flowers and the food, but you will never forget how it felt."
            </blockquote>
          </div> */}

        </div>
      </section>


      {/* 6. VERIFIED GOOGLE REVIEWS SECTION (REAL CLIENT FEEDBACK) */}
      <section className="bg-[#0B0D0E] text-[#F5F5F5]">
        <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-10 pt-4 pb-16">
          
          {/* Header */}
          <div className="text-center mb-16">
            <div className="flex justify-center items-center gap-1 text-[#D4AF37] text-sm mb-2 tracking-widest">
              ★★★★★
            </div>
            <span className="text-[10px] uppercase tracking-[0.35em] text-[#D4AF37] bg-[#D4AF37]/10 border border-[#D4AF37]/20 px-3 py-1 rounded-full font-semibold inline-block mb-3">
              VERIFIED 5-STAR GOOGLE REVIEWS
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl italic font-normal text-white">
              Client Praise on Google
            </h2>
            <div className="w-16 h-[1px] bg-[#A2ADA0]/40 mx-auto mt-4"></div>
          </div>

          {/* Interactive Auto-Playing Google Review Carousel */}
          <div 
            className="w-full mx-auto relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Left Button */}
            <button 
              onClick={handlePrevReview}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 sm:-translate-x-12 w-10 h-10 rounded-full border border-[#2B2519] flex items-center justify-center text-white/50 hover:text-[#D4AF37] hover:border-[#D4AF37] transition-all z-10"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" /></svg>
            </button>

            {/* Carousel Track */}
            <div className="overflow-hidden relative min-h-[550px] sm:min-h-[450px] py-4">
              {realGoogleReviews.map((review, idx) => (
                <div 
                  key={idx}
                  className={`absolute inset-0 transition-opacity duration-1000 ease-in-out flex justify-center items-center px-4 ${idx === reviewIndex ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'}`}
                >
                  <div className="bg-[#14171A] border border-[#2B2519] rounded-[2rem] p-8 sm:p-12 shadow-2xl max-w-4xl w-full flex flex-col justify-between h-full hover:border-[#D4AF37]/50 transition-colors duration-500">
                    <div>
                      <div className="flex justify-center items-center gap-1 text-[#D4AF37] text-xl mb-6">
                        ★★★★★
                      </div>
                      <p className="text-base sm:text-lg md:text-xl text-[#F5F5F5] italic leading-relaxed mb-8 font-light text-center">
                        "{review.text}"
                      </p>
                    </div>

                    <div className="pt-6 border-t border-[#2B2519] flex items-center justify-between">
                      <div className="text-left">
                        <span className="text-xs sm:text-sm uppercase tracking-wider font-semibold block text-[#F5F5F5]">
                          {review.name}
                        </span>
                        <span className="text-[10px] sm:text-xs text-[#8A7D5C] block tracking-wide mt-1">
                          {review.date} • {review.role}
                        </span>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-[#121518]/10 flex items-center justify-center p-1.5 shrink-0">
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
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 sm:translate-x-12 w-10 h-10 rounded-full border border-[#2B2519] flex items-center justify-center text-white/50 hover:text-[#D4AF37] hover:border-[#D4AF37] transition-all z-10"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" /></svg>
            </button>

            {/* Dots Indicator */}
            <div className="flex justify-center gap-2 mt-8">
              {realGoogleReviews.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setReviewIndex(idx)}
                  className={`h-1.5 rounded-full transition-all duration-500 ${idx === reviewIndex ? 'w-6 bg-[#D4AF37]' : 'w-2 bg-[#121518]/20 hover:bg-[#121518]/40'}`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>          </div>



        </div>
      </section>


      {/* 6.5. FREQUENTLY ASKED QUESTIONS */}
      <section className="bg-[#0B0D0E] border-t border-[#2B2519]">
        <div className="w-full max-w-[1200px] mx-auto px-6 sm:px-8 pt-16 pb-4">
          <span className="text-[10px] uppercase tracking-[0.35em] text-[#D4AF37] bg-[#D4AF37]/10 border border-[#D4AF37]/20 px-3 py-1 rounded-full font-semibold inline-block mb-3">
            FAQS
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl text-white font-normal text-center mb-14">
            Frequently Asked Questions
          </h2>

          <div className="space-y-4">
            {[
              {
                q: "What is the signature style of LensLoom Production?",
                a: "Our signature style at LensLoom is a blend of cinematic storytelling and fine-art portraiture. We focus on natural, candid moments infused with a touch of editorial luxury, ensuring your memories look timeless and grand."
              },
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
                a: "Our standard luxury collections include a lead photographer, a cinematographer, and an associate to ensure every angle, fleeting moment, and grand detail is impeccably documented."
              },
              {
                q: "Do you provide raw footage of our wedding?",
                a: "As a premium production house, we deliver meticulously edited, color-graded, and sound-designed final films that reflect the true essence of your day. We typically do not provide unedited raw footage, but extended cuts can be curated upon request."
              },
              {
                q: "How does the booking process work?",
                a: "Once you reach out via our contact page, we'll schedule a personalized consultation to understand your vision. After finalizing your bespoke collection, a signed agreement and retainer secure your date on our calendar."
              },
              {
                q: "When will we receive our final photos and films?",
                a: "We carefully curate and meticulously edit each frame. You can expect your final gallery and cinematic films within 8-10 weeks following your celebration."
              }
            ].map((faq, index) => (
              <div 
                key={index}
                className="bg-[#121518] border border-[#2B2519] rounded-2xl shadow-sm overflow-hidden mb-4 transition-all duration-300 hover:border-[#D4AF37]"
              >
                <button 
                  className="w-full px-6 py-5 flex justify-between items-center text-left focus:outline-none"
                  onClick={() => toggleFaq(index)}
                >
                  <h3 className="text-base sm:text-lg font-semibold text-white pr-4">{faq.q}</h3>
                  <span className={`text-[#D4AF37] transition-transform duration-300 flex-shrink-0 ml-4 ${openFaq === index ? 'rotate-180' : ''}`}>
                    <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </button>
                <div 
                  className={`px-6 overflow-hidden transition-all duration-500 ease-in-out ${openFaq === index ? 'max-h-60 pb-5 opacity-100' : 'max-h-0 opacity-0'}`}
                >
                  <p className="text-sm sm:text-base text-[#C5B388] font-light leading-relaxed border-t border-[#2B2519] pt-4">
                    {faq.a}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* 7. LIVE INSTAGRAM FEED SHOWCASE (@weddingpur) */}
      <section className="bg-[#0B0D0E]">
        <div className="w-full max-w-[1536px] mx-auto px-4 sm:px-8 pt-4 pb-16">
          
          {/* Instagram Profile Header Dynamic */}
          <div className="flex flex-col items-center text-center mb-12">
            <a
              href={safeConfig.instagram?.profileUrl || "https://www.instagram.com/lensloom_official/"}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center"
            >
              <div className="w-20 h-20 rounded-full p-1 bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 mb-3 group-hover:scale-105 transition-transform duration-300">
                <div className="w-full h-full rounded-full bg-[#121518] p-0.5 overflow-hidden">
                  <div className="w-full h-full rounded-full bg-[#0B0D0E] flex items-center justify-center font-serif font-bold text-xl text-white">
                    {(safeConfig.instagram?.handle || "@lensloom_official").replace('@', '').charAt(0).toUpperCase()}
                  </div>
                </div>
              </div>
              <h3 className="font-semibold text-lg text-white tracking-wide flex items-center gap-1.5 group-hover:text-[#D4AF37] transition-colors">
                {(safeConfig.instagram?.handle || "@lensloom_official").replace('@', '')}
                <span className="text-blue-500 text-xs">✓</span>
              </h3>
            </a>

            {/* <p className="text-xs text-[#C5B388] max-w-2xl mx-auto mt-2 leading-relaxed font-light">
              {safeConfig.instagram?.badges 
                ? (typeof safeConfig.instagram.badges === 'string' ? safeConfig.instagram.badges.split(',').join(' • ') : safeConfig.instagram.badges.join(' • '))
                : "🏆 Couples Choice Award 2024 Winner • 🏆 Wedding Awards 2025 Winner • 💍 Wedding Films Expert • 🌍 Available Worldwide"}
            </p> */}

            <a
              href={safeConfig.instagram?.profileUrl || "https://www.instagram.com/lensloom_official/"}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 border border-[#5B6454]/70 text-[#D4AF37] hover:bg-[#5B6454] hover:text-[#F5F5F5] px-7 py-2 rounded-full text-[11px] uppercase tracking-[0.2em] font-medium transition duration-300 cursor-pointer"
            >
              <span>Follow on Instagram</span>
              <span>↗</span>
            </a>
          </div>

          {/* 3x2 Instagram Post Grid (Direct External Links) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 w-full mx-auto">
            {(safeConfig.instagram?.gridImages || [
              "https://ik.imagekit.io/Dilshad/Cafe/Yatrikit/wedding-studio/wedding-editorial-shoot-weddingpur-scaled-e1773261531589.jpg",
              "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
              "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80",
              "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80",
              "https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=800&q=80",
              "https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=800&q=80"
            ]).map((imgSrc, i) => (
              <a
                key={i}
                href={safeConfig.instagram?.profileUrl || "https://www.instagram.com/lensloom_official/"}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative aspect-square bg-[#121518] rounded-2xl overflow-hidden shadow-sm block cursor-pointer"
              >
                <img
                  src={imgSrc}
                  alt="Instagram Post"
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
                <div className="absolute inset-0 bg-[#0B0D0E]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-white p-4">
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
