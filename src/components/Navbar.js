"use client";
import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Phone, ChevronDown } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isKnowMoreOpen, setIsKnowMoreOpen] = useState(false);
  const [isMobileKnowMoreOpen, setIsMobileKnowMoreOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex flex-col w-full text-espresso">
      {/* a. Top Announcement Bar */}
      <div className="hidden lg:flex justify-between items-center px-4 sm:px-6 lg:px-8 py-2 bg-champagne-card border-b border-champagne-border text-xs text-espresso-light">
        <div className="flex items-center space-x-6">
          <a href="tel:+918235109707" className="flex items-center space-x-2 hover:text-bronze-500 transition-colors">
            <Phone size={12} />
            <span className="font-medium">+91 8235109707</span>
          </a>
          <a href="tel:+917992406637" className="flex items-center space-x-2 hover:text-bronze-500 transition-colors">
            <Phone size={12} />
            <span className="font-medium">+91 7992406637</span>
          </a>
        </div>
        <div className="flex items-center space-x-6 font-medium">
          <span className="text-bronze-600">⭐ 5.0 out of 396+ Reviews</span>
          <span className="text-espresso">Trusted by 800+ Couples</span>
        </div>
      </div>

      {/* b. Sticky Main Navigation Bar */}
      <nav className="bg-champagne-bg/95 backdrop-blur-md border-b border-champagne-border w-full shadow-sm">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Left: Brand Logo */}
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-2xl font-light tracking-widest text-espresso">
                LUMEN <span className="text-bronze-500 font-medium">WEDDINGS</span>
              </Link>
            </div>
            
            {/* Center Links */}
            <div className="hidden xl:flex items-center space-x-6 text-sm font-medium">
              <Link href="#stories" className="text-espresso-light hover:text-bronze-500 transition-colors">Stories</Link>
              <Link href="#portfolio" className="text-espresso-light hover:text-bronze-500 transition-colors">Photography</Link>
              <Link href="#films" className="text-espresso-light hover:text-bronze-500 transition-colors">Films</Link>
              <Link href="#services" className="text-espresso-light hover:text-bronze-500 transition-colors">Services</Link>
              <Link href="#albums" className="text-espresso-light hover:text-bronze-500 transition-colors">Albums</Link>
              <Link href="#blog" className="text-espresso-light hover:text-bronze-500 transition-colors">Blog</Link>
              <Link href="#contact" className="text-espresso-light hover:text-bronze-500 transition-colors">Contact us</Link>
              <Link href="#about" className="text-espresso-light hover:text-bronze-500 transition-colors">About us</Link>
              
              {/* Dropdown menu */}
              <div 
                className="relative"
                onMouseEnter={() => setIsKnowMoreOpen(true)}
                onMouseLeave={() => setIsKnowMoreOpen(false)}
              >
                <button className="flex items-center space-x-1 text-espresso-light hover:text-bronze-500 transition-colors focus:outline-none py-2">
                  <span>Know More</span>
                  <ChevronDown size={14} className={`transform transition-transform ${isKnowMoreOpen ? 'rotate-180' : ''}`} />
                </button>
                {/* Dropdown Content */}
                {isKnowMoreOpen && (
                  <div className="absolute top-full right-0 mt-1 w-48 bg-champagne-card border border-champagne-border rounded-md shadow-xl py-2 z-50">
                    <Link href="#faqs" className="block px-4 py-2 text-sm text-espresso-light hover:text-bronze-600 hover:bg-champagne-bg/50">FAQs</Link>
                    <Link href="#terms" className="block px-4 py-2 text-sm text-espresso-light hover:text-bronze-600 hover:bg-champagne-bg/50">Terms & Conditions</Link>
                    <Link href="#privacy" className="block px-4 py-2 text-sm text-espresso-light hover:text-bronze-600 hover:bg-champagne-bg/50">Privacy Policy</Link>
                  </div>
                )}
              </div>
            </div>

            {/* Right CTAs */}
            <div className="hidden lg:flex items-center space-x-6">
              <a href="tel:+918235109707" className="flex items-center space-x-2 text-espresso-light hover:text-bronze-500 transition-colors">
                <Phone size={18} />
              </a>
              <Link 
                href="#contact"
                className="bg-bronze-600 hover:bg-bronze-500 text-white px-7 py-2.5 rounded-full font-medium transition-colors shadow-md shadow-bronze-600/20"
              >
                Book Now
              </Link>
            </div>

            {/* Mobile menu hamburger icon toggle */}
            <div className="xl:hidden flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-espresso hover:text-bronze-500 p-2"
                aria-label="Toggle menu"
              >
                {isOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>

        {/* c. Mobile Responsive Sliding Drawer */}
        <div 
          className={`xl:hidden absolute top-full w-full bg-champagne-bg/98 backdrop-blur-xl border-b border-champagne-border transition-all duration-300 ease-in-out shadow-2xl ${isOpen ? 'max-h-[85vh] opacity-100 overflow-y-auto pb-6' : 'max-h-0 opacity-0 overflow-hidden'}`}
        >
          <div className="px-4 pt-2 space-y-1">
            <Link onClick={() => setIsOpen(false)} href="#stories" className="block px-3 py-3.5 text-base font-medium text-espresso hover:text-bronze-600 border-b border-champagne-border/50">Stories</Link>
            <Link onClick={() => setIsOpen(false)} href="#portfolio" className="block px-3 py-3.5 text-base font-medium text-espresso hover:text-bronze-600 border-b border-champagne-border/50">Photography</Link>
            <Link onClick={() => setIsOpen(false)} href="#films" className="block px-3 py-3.5 text-base font-medium text-espresso hover:text-bronze-600 border-b border-champagne-border/50">Films</Link>
            <Link onClick={() => setIsOpen(false)} href="#services" className="block px-3 py-3.5 text-base font-medium text-espresso hover:text-bronze-600 border-b border-champagne-border/50">Services</Link>
            <Link onClick={() => setIsOpen(false)} href="#albums" className="block px-3 py-3.5 text-base font-medium text-espresso hover:text-bronze-600 border-b border-champagne-border/50">Albums</Link>
            <Link onClick={() => setIsOpen(false)} href="#blog" className="block px-3 py-3.5 text-base font-medium text-espresso hover:text-bronze-600 border-b border-champagne-border/50">Blog</Link>
            <Link onClick={() => setIsOpen(false)} href="#contact" className="block px-3 py-3.5 text-base font-medium text-espresso hover:text-bronze-600 border-b border-champagne-border/50">Contact us</Link>
            <Link onClick={() => setIsOpen(false)} href="#about" className="block px-3 py-3.5 text-base font-medium text-espresso hover:text-bronze-600 border-b border-champagne-border/50">About us</Link>
            
            {/* Mobile Dropdown */}
            <div className="border-b border-champagne-border/50">
              <button 
                onClick={() => setIsMobileKnowMoreOpen(!isMobileKnowMoreOpen)}
                className="flex items-center justify-between w-full px-3 py-3.5 text-base font-medium text-espresso hover:text-bronze-600"
              >
                <span>Know More</span>
                <ChevronDown size={18} className={`transform transition-transform ${isMobileKnowMoreOpen ? 'rotate-180' : ''}`} />
              </button>
              {isMobileKnowMoreOpen && (
                <div className="pl-6 pb-2 space-y-1">
                  <Link onClick={() => setIsOpen(false)} href="#faqs" className="block px-3 py-2.5 text-sm text-espresso-light hover:text-bronze-600">FAQs</Link>
                  <Link onClick={() => setIsOpen(false)} href="#terms" className="block px-3 py-2.5 text-sm text-espresso-light hover:text-bronze-600">Terms & Conditions</Link>
                  <Link onClick={() => setIsOpen(false)} href="#privacy" className="block px-3 py-2.5 text-sm text-espresso-light hover:text-bronze-600">Privacy Policy</Link>
                </div>
              )}
            </div>

            <div className="pt-6 pb-4 space-y-5 px-3">
              <a href="tel:+918235109707" className="flex items-center space-x-3 text-espresso-light hover:text-bronze-600">
                <Phone size={20} />
                <span className="font-medium tracking-wide">+91 8235109707</span>
              </a>
              <a href="tel:+917992406637" className="flex items-center space-x-3 text-espresso-light hover:text-bronze-600">
                <Phone size={20} />
                <span className="font-medium tracking-wide">+91 7992406637</span>
              </a>
              <a 
                href="https://wa.me/918235109707" 
                target="_blank"
                rel="noopener noreferrer"
                className="block mt-6 w-full bg-bronze-600 text-white text-center px-6 py-3.5 rounded-lg font-semibold tracking-wide shadow-md"
              >
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}