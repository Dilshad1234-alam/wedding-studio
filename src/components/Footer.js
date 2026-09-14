"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const InstagramIcon = ({ size = 18 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

const YoutubeIcon = ({ size = 18 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/>
    <path d="m10 15 5-3-5-3z"/>
  </svg>
);

const PinterestIcon = ({ size = 18 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <path d="M12 22a9.92 9.92 0 0 0 2.2-.24 2.89 2.89 0 0 1-.36-1.5c.14-1.6.84-3.3 1.5-4.5.6-1.1-1.4-3.2-.2-5.4 1.2-2.2 4-2.8 5.4-1.1 1.4 1.7.3 5.4-1.1 7-1.4 1.6-4.5.7-4.5-1.1" />
  </svg>
);

const FacebookIcon = ({ size = 18 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

export default function Footer() {
  const [settings, setSettings] = useState({
    instagramUrl: "https://www.instagram.com/lensloom_official?stkn=MTc3Zzl0c2c1dWo4ag%3D%3D",
    youtubeUrl: "https://www.youtube.com/@lensloom_official",
    copyrightText: "© 2026 LensLoom Production. All rights reserved."
  });

  useEffect(() => {
    const fetchSettings = () => {
      fetch('/api/settings')
        .then(res => res.json())
        .then(data => {
          if (data.success && data.settings) setSettings(data.settings);
        })
        .catch(() => {});
    };
    fetchSettings();

    const handleStorageChange = (e) => {
      if (e.key === 'weddingpur_settings_updated' && e.newValue) {
        try {
          setSettings(JSON.parse(e.newValue));
        } catch (err) {}
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <footer className="bg-[#0B0D0E] border-t border-[#2B2519] text-[#F5F5F5] font-sans relative z-10 pt-16 pb-8">
      <div className="w-full px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          
          {/* Column 1: Brand & Logo */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <Link href="/" className="inline-block mb-6 hover:scale-[1.02] transition-transform duration-300">
              <Image 
                src="/logo lens (2).png" 
                alt="LensLoom Production" 
                width={300}
                height={107}
                quality={100}
                unoptimized
                className="h-10 sm:h-12 w-auto object-contain"
              />
            </Link>
            <p className="text-sm text-[#C5B388] font-light leading-relaxed mb-8 max-w-xs">
              Capturing pure elegance and timeless love stories through cinematic films and fine-art luxury photography.
            </p>
            <div className="flex flex-col gap-3 text-sm font-semibold tracking-wide text-[#F5F5F5]">
              <a href="https://lensloom.in" target="_blank" rel="noopener noreferrer" className="hover:text-[#D4AF37] transition-colors inline-block">
                lensloom.in
              </a>
              <Link href="/contact" className="hover:text-[#D4AF37] transition-colors inline-block">
                Contact Us
              </Link>
            </div>
          </div>

          {/* Column 2: Categories */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left mt-8 md:mt-0">
            <h4 className="text-[#D4AF37] text-xs uppercase tracking-[0.2em] font-semibold mb-6">Categories</h4>
            <ul className="flex flex-col gap-4 text-sm text-[#F5F5F5]/80 font-light">
              <li><Link href="/stories" className="hover:text-[#D4AF37] transition-colors">Stories</Link></li>
              <li><Link href="/portfolio" className="hover:text-[#D4AF37] transition-colors">Photography</Link></li>
              <li><Link href="/films" className="hover:text-[#D4AF37] transition-colors">Films</Link></li>
              <li><Link href="/services" className="hover:text-[#D4AF37] transition-colors">Services</Link></li>
            </ul>
          </div>

          {/* Column 3: Explore */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left mt-8 md:mt-0">
            <h4 className="text-[#D4AF37] text-xs uppercase tracking-[0.2em] font-semibold mb-6">Explore</h4>
            <ul className="flex flex-col gap-4 text-sm text-[#F5F5F5]/80 font-light">
              <li><Link href="/albums" className="hover:text-[#D4AF37] transition-colors">Albums</Link></li>
              <li><Link href="/blog" className="hover:text-[#D4AF37] transition-colors">Blog</Link></li>
              <li><Link href="/about" className="hover:text-[#D4AF37] transition-colors">About Us</Link></li>
              <li><Link href="/privacy" className="hover:text-[#D4AF37] transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Column 4: Contact & Socials */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left mt-8 lg:mt-0">
            <h4 className="text-[#D4AF37] text-xs uppercase tracking-[0.2em] font-semibold mb-6">Connect</h4>
            <div className="flex flex-col gap-3 text-sm text-[#F5F5F5]/80 font-light mb-8">
              <a href="mailto:hello@lensloom.in" className="hover:text-[#D4AF37] transition-colors">hello@lensloom.in</a>
              <span className="opacity-70 mt-2 text-xs uppercase tracking-widest text-[#C5B388]">Available Globally</span>
            </div>
            
            <div className="flex gap-4">
              {[
                { icon: <InstagramIcon />, label: "Instagram", href: "https://www.instagram.com/lensloom_official?stkn=MTc3Zzl0c2c1dWo4ag%3D%3D" },
                { icon: <YoutubeIcon />, label: "YouTube", href: "https://www.youtube.com/@lensloom_official" },
                // { icon: <PinterestIcon />, label: "Pinterest", href: "https://in.pinterest.com/lensloom_official/" },
                { icon: <FacebookIcon />, label: "Facebook", href: "https://www.facebook.com/people/LensLoom-Production/61586068716821/" }
              ].map((social, idx) => (
                <a 
                  key={idx}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full border border-[#2B2519] text-[#C5B388] flex items-center justify-center hover:border-[#D4AF37] hover:bg-[#D4AF37] hover:text-black hover:shadow-[0_0_15px_rgba(212,175,55,0.4)] transition-all duration-300"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom Row */}
        <div className="border-t border-[#2B2519] pt-8 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] sm:text-xs text-[#C5B388] tracking-widest uppercase">
          <p className="text-center md:text-left">{settings.copyrightText}</p>
          <p className="text-center md:text-right">Designed & Developed with passion</p>
        </div>

      </div>
    </footer>
  );
}