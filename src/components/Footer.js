"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

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
    <footer className="bg-[#0B0D0E]/90 backdrop-blur-md border-t border-[#2B2519] text-[#F5F5F5] font-sans relative z-10">
      <div className="max-w-[1536px] mx-auto px-6 sm:px-10 lg:px-16 py-12 grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 items-start">
        
        {/* Left: Logo & Brand */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <Link href="/" className="inline-block mb-6 hover:scale-[1.02] transition-transform duration-300">
            <img 
              src="/logo lens.png" 
              alt="LensLoom Production" 
              className="h-10 sm:h-12 w-auto object-contain mix-blend-screen"
              style={{ mixBlendMode: 'screen' }}
            />
          </Link>
          <p className="text-xs text-[#F5F5F5]/70 font-light max-w-xs">
            Bespoke wedding cinema and photography capturing timeless love stories for modern couples worldwide.
          </p>
        </div>

        {/* Center: Informations */}
        <div className="flex flex-col items-center md:items-center">
          <div className="flex flex-col">
            <h4 className="text-[10px] tracking-[0.3em] uppercase text-[#C5B388] font-semibold mb-6 text-center md:text-left">
              INFORMATIONS
            </h4>
            <div className="flex flex-col sm:flex-row gap-6 sm:gap-12 text-xs text-[#F5F5F5]/70 font-light text-center md:text-left">
              <div className="flex flex-col gap-4">
                <a href="https://lensloom.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#D4AF37] transition-colors">
                  lensloom.com
                </a>
                <Link href="/contact" className="hover:text-[#D4AF37] transition-colors">Contact Us</Link>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Social & Copyright */}
        <div className="flex flex-col items-center md:items-end w-full gap-6">
          <div className="flex space-x-4">
            {[
              { icon: <InstagramIcon />, label: "Instagram", href: "https://www.instagram.com/lensloom_official?stkn=MTc3Zzl0c2c1dWo4ag%3D%3D" },
              { icon: <YoutubeIcon />, label: "YouTube", href: "https://www.youtube.com/@lensloom_official" },
              { icon: <PinterestIcon />, label: "Pinterest", href: "https://in.pinterest.com/lensloom_official/" },
              { icon: <FacebookIcon />, label: "Facebook", href: "https://www.facebook.com/lensloom_official/" }
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
          <p className="text-[10px] text-[#C5B388] tracking-[0.2em] uppercase text-center md:text-right">{settings.copyrightText}</p>
        </div>

      </div>
    </footer>
  );
}