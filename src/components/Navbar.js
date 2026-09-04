"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Phone, ChevronDown } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isKnowMoreOpen, setIsKnowMoreOpen] = useState(false);
  const [isMobileKnowMoreOpen, setIsMobileKnowMoreOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const userStr = sessionStorage.getItem('weddingpur_user');
    if (userStr) {
      try {
        setCurrentUser(JSON.parse(userStr));
      } catch (e) {
        setCurrentUser(null);
      }
    }
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem('weddingpur_user');
    sessionStorage.removeItem('weddingpur_token');
    setCurrentUser(null);
    window.location.href = '/';
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#212639]/95 backdrop-blur-md border-b border-white/10 w-full text-white">
      <nav className="w-full">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Left: Brand Logo */}
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="flex items-center gap-2 group focus:outline-none">
                <svg 
                  width="250" 
                  height="48" 
                  viewBox="0 0 250 48" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-auto"
                >
                  {/* Aperture / Lens Icon */}
                  <circle cx="20" cy="24" r="14" stroke="#B38F4D" strokeWidth="1.5" fill="none"/>
                  <circle cx="20" cy="24" r="7" stroke="#EDEAE4" strokeWidth="1.2" fill="none"/>
                  <circle cx="20" cy="24" r="2.5" fill="#B38F4D"/>
                  
                  {/* Brand Title (Full WEDDINGPUR) */}
                  <text 
                    x="44" 
                    y="27" 
                    fontFamily="Playfair Display, Georgia, serif" 
                    fontSize="20" 
                    fontWeight="700" 
                    letterSpacing="0.06em" 
                    fill="#EDEAE4"
                  >
                    WEDDING<tspan fill="#B38F4D">PUR</tspan>
                  </text>
                  
                  {/* Subtitle */}
                  <text 
                    x="45" 
                    y="38" 
                    fontFamily="Montserrat, sans-serif" 
                    fontSize="7" 
                    fontWeight="500" 
                    letterSpacing="0.28em" 
                    fill="#A39E93"
                  >
                    STUDIO &amp; CINEMA
                  </text>
                </svg>
              </Link>
            </div>
            
            {/* Center Links */}
            <div className="hidden xl:flex items-center space-x-6 text-sm font-medium">
              <Link href="/stories" className={`transition-colors ${pathname === '/stories' ? 'text-[#B38F4D]' : 'text-[#F0EDE6] hover:text-[#B38F4D]'}`}>Stories</Link>
              <Link href="/portfolio" className={`transition-colors ${pathname === '/portfolio' ? 'text-[#B38F4D]' : 'text-[#F0EDE6] hover:text-[#B38F4D]'}`}>Photography</Link>
              <Link href="/films" className={`transition-colors ${pathname === '/films' ? 'text-[#B38F4D]' : 'text-[#F0EDE6] hover:text-[#B38F4D]'}`}>Films</Link>
              <Link href="/services" className={`transition-colors ${pathname === '/services' ? 'text-[#B38F4D]' : 'text-[#F0EDE6] hover:text-[#B38F4D]'}`}>Services</Link>
              <Link href="/albums" className={`transition-colors ${pathname === '/albums' ? 'text-[#B38F4D]' : 'text-[#F0EDE6] hover:text-[#B38F4D]'}`}>Albums</Link>
              <Link href="/blog" className={`transition-colors ${pathname === '/blog' ? 'text-[#B38F4D]' : 'text-[#F0EDE6] hover:text-[#B38F4D]'}`}>Blog</Link>
              <Link href="/contact" className={`transition-colors ${pathname === '/contact' ? 'text-[#B38F4D]' : 'text-[#F0EDE6] hover:text-[#B38F4D]'}`}>Contact us</Link>
              <Link href="/about" className={`transition-colors ${pathname === '/about' ? 'text-[#B38F4D]' : 'text-[#F0EDE6] hover:text-[#B38F4D]'}`}>About us</Link>
              
              {/* Dropdown menu */}
              <div 
                className="relative"
                onMouseEnter={() => setIsKnowMoreOpen(true)}
                onMouseLeave={() => setIsKnowMoreOpen(false)}
              >
                <button className="flex items-center space-x-1 text-[#F0EDE6] hover:text-[#B38F4D] transition-colors focus:outline-none py-2">
                  <span>Know More</span>
                  <ChevronDown size={14} className={`transform transition-transform ${isKnowMoreOpen ? 'rotate-180' : ''}`} />
                </button>
                {/* Dropdown Content */}
                {isKnowMoreOpen && (
                  <div className="absolute top-full right-0 mt-1 w-48 bg-[#2B3147] border border-white/10 rounded-md shadow-xl py-2 z-50">
                    <Link href="/faqs" className="block px-4 py-2 text-sm text-[#F0EDE6] hover:text-[#B38F4D] hover:bg-[#212639]/50">FAQs</Link>
                    <Link href="/terms" className="block px-4 py-2 text-sm text-[#F0EDE6] hover:text-[#B38F4D] hover:bg-[#212639]/50">Terms & Conditions</Link>
                    <Link href="/privacy" className="block px-4 py-2 text-sm text-[#F0EDE6] hover:text-[#B38F4D] hover:bg-[#212639]/50">Privacy Policy</Link>
                  </div>
                )}
              </div>
            </div>

            {/* Right CTAs */}
            <div className="hidden lg:flex items-center space-x-6">
              {/* Authentication Links */}
              {currentUser ? (
                <div className="flex items-center space-x-4">
                  {currentUser.role === 'admin' ? (
                    <Link href="/admin" className="text-[#B38F4D] hover:text-[#987538] transition text-xs uppercase tracking-wider font-semibold">
                      Admin OS
                    </Link>
                  ) : (
                    <span className="text-[#EDEAE4] text-xs uppercase tracking-wider font-medium">
                      {currentUser.name}
                    </span>
                  )}
                  <span className="text-white/20">|</span>
                  <button onClick={handleLogout} className="text-[#EDEAE4] hover:text-red-400 transition text-xs uppercase tracking-wider font-medium focus:outline-none">
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-4">
                  <Link href="/login" className="text-[#EDEAE4] hover:text-[#B38F4D] transition text-xs uppercase tracking-wider font-medium">
                    Login
                  </Link>
                  <span className="text-white/20">|</span>
                  <Link href="/register" className="text-[#EDEAE4] hover:text-[#B38F4D] transition text-xs uppercase tracking-wider font-medium">
                    Register
                  </Link>
                </div>
              )}

              <a href="tel:+918235109707" className="flex items-center space-x-2 text-[#F0EDE6] hover:text-[#B38F4D] transition-colors">
                <Phone size={18} />
              </a>
              <Link 
                href="/contact"
                className="bg-[#B38F4D] hover:bg-[#987538] text-white px-5 py-2 rounded-full text-xs font-semibold tracking-wider transition shadow-md shadow-bronze-600/20"
              >
                Book Now
              </Link>
            </div>

            {/* Mobile menu hamburger icon toggle */}
            <div className="xl:hidden flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-white hover:text-[#B38F4D] p-2"
                aria-label="Toggle menu"
              >
                {isOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>

        {/* c. Mobile Responsive Sliding Drawer */}
        <div 
          className={`xl:hidden absolute top-full w-full bg-[#212639]/98 backdrop-blur-xl border-b border-white/10 transition-all duration-300 ease-in-out shadow-2xl ${isOpen ? 'max-h-[85vh] opacity-100 overflow-y-auto pb-6' : 'max-h-0 opacity-0 overflow-hidden'}`}
        >
          <div className="px-4 pt-2 space-y-1">
            <Link onClick={() => setIsOpen(false)} href="/stories" className={`block px-3 py-3.5 text-base font-medium border-b border-white/10/50 ${pathname === '/stories' ? 'text-[#B38F4D]' : 'text-white hover:text-[#B38F4D]'}`}>Stories</Link>
            <Link onClick={() => setIsOpen(false)} href="/portfolio" className={`block px-3 py-3.5 text-base font-medium border-b border-white/10/50 ${pathname === '/portfolio' ? 'text-[#B38F4D]' : 'text-white hover:text-[#B38F4D]'}`}>Photography</Link>
            <Link onClick={() => setIsOpen(false)} href="/films" className={`block px-3 py-3.5 text-base font-medium border-b border-white/10/50 ${pathname === '/films' ? 'text-[#B38F4D]' : 'text-white hover:text-[#B38F4D]'}`}>Films</Link>
            <Link onClick={() => setIsOpen(false)} href="/services" className={`block px-3 py-3.5 text-base font-medium border-b border-white/10/50 ${pathname === '/services' ? 'text-[#B38F4D]' : 'text-white hover:text-[#B38F4D]'}`}>Services</Link>
            <Link onClick={() => setIsOpen(false)} href="/albums" className={`block px-3 py-3.5 text-base font-medium border-b border-white/10/50 ${pathname === '/albums' ? 'text-[#B38F4D]' : 'text-white hover:text-[#B38F4D]'}`}>Albums</Link>
            <Link onClick={() => setIsOpen(false)} href="/blog" className={`block px-3 py-3.5 text-base font-medium border-b border-white/10/50 ${pathname === '/blog' ? 'text-[#B38F4D]' : 'text-white hover:text-[#B38F4D]'}`}>Blog</Link>
            <Link onClick={() => setIsOpen(false)} href="/contact" className={`block px-3 py-3.5 text-base font-medium border-b border-white/10/50 ${pathname === '/contact' ? 'text-[#B38F4D]' : 'text-white hover:text-[#B38F4D]'}`}>Contact us</Link>
            <Link onClick={() => setIsOpen(false)} href="/about" className={`block px-3 py-3.5 text-base font-medium border-b border-white/10/50 ${pathname === '/about' ? 'text-[#B38F4D]' : 'text-white hover:text-[#B38F4D]'}`}>About us</Link>
            
            {/* Mobile Dropdown */}
            <div className="border-b border-white/10/50">
              <button 
                onClick={() => setIsMobileKnowMoreOpen(!isMobileKnowMoreOpen)}
                className="flex items-center justify-between w-full px-3 py-3.5 text-base font-medium text-white hover:text-[#B38F4D]"
              >
                <span>Know More</span>
                <ChevronDown size={18} className={`transform transition-transform ${isMobileKnowMoreOpen ? 'rotate-180' : ''}`} />
              </button>
              {isMobileKnowMoreOpen && (
                <div className="pl-6 pb-2 space-y-1">
                  <Link onClick={() => setIsOpen(false)} href="/faqs" className="block px-3 py-2.5 text-sm text-[#F0EDE6] hover:text-[#B38F4D]">FAQs</Link>
                  <Link onClick={() => setIsOpen(false)} href="/terms" className="block px-3 py-2.5 text-sm text-[#F0EDE6] hover:text-[#B38F4D]">Terms & Conditions</Link>
                  <Link onClick={() => setIsOpen(false)} href="/privacy" className="block px-3 py-2.5 text-sm text-[#F0EDE6] hover:text-[#B38F4D]">Privacy Policy</Link>
                </div>
              )}
            </div>

            <div className="pt-6 pb-4 space-y-5 px-3">
              {/* Mobile Authentication Links */}
              {currentUser ? (
                <div className="flex flex-col space-y-3">
                  {currentUser.role === 'admin' && (
                    <Link 
                      onClick={() => setIsOpen(false)} 
                      href="/admin" 
                      className="block w-full bg-[#B38F4D] text-center px-6 py-3 rounded-lg font-semibold tracking-wide text-white hover:bg-[#987538]"
                    >
                      Admin OS
                    </Link>
                  )}
                  <button 
                    onClick={handleLogout} 
                    className="w-full bg-[#2B324B] border border-white/10 text-center px-6 py-3 rounded-lg font-semibold tracking-wide text-white hover:text-red-400 focus:outline-none"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex space-x-3">
                  <Link 
                    onClick={() => setIsOpen(false)} 
                    href="/login" 
                    className="w-1/2 bg-transparent border border-white/20 text-white text-center px-4 py-3 rounded-lg font-semibold tracking-wide hover:bg-white/5"
                  >
                    Login
                  </Link>
                  <Link 
                    onClick={() => setIsOpen(false)} 
                    href="/register" 
                    className="w-1/2 bg-[#B38F4D] text-white text-center px-4 py-3 rounded-lg font-semibold tracking-wide hover:bg-[#987538]"
                  >
                    Register
                  </Link>
                </div>
              )}

              <a href="tel:+918235109707" className="flex items-center space-x-3 text-[#F0EDE6] hover:text-[#B38F4D]">
                <Phone size={20} />
                <span className="font-medium tracking-wide">+91 8235109707</span>
              </a>
              <a href="tel:+917992406637" className="flex items-center space-x-3 text-[#F0EDE6] hover:text-[#B38F4D]">
                <Phone size={20} />
                <span className="font-medium tracking-wide">+91 7992406637</span>
              </a>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}