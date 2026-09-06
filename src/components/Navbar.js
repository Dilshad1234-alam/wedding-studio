"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Menu, X, ChevronDown } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
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

  const handleLogoClick = (e) => {
    e.preventDefault();
    if (pathname === '/' || pathname === '/landing') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    } else {
      router.push('/');
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  };

  const navLinks = [
    { name: 'Stories', href: '/stories' },
    { name: 'Photography', href: '/portfolio' },
    { name: 'Films', href: '/films' },
    { name: 'Services', href: '/services' },
    { name: 'Albums', href: '/albums' },
    { name: 'Blog', href: '/blog' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#FAF8F5]/90 backdrop-blur-md border-b border-[#E7E3DA] py-2 lg:py-0 px-6 sm:px-12 transition-all duration-300">
      <nav className="w-full">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex justify-between items-center h-20">
            
            {/* Left: Brand Identity */}
            <div className="flex-shrink-0 flex items-center">
              <a
                href="/"
                onClick={handleLogoClick}
                className="flex flex-col items-center lg:items-start text-left group cursor-pointer select-none transition-transform duration-300 hover:scale-[1.02] focus:outline-none"
              >
                <span className="font-serif tracking-[0.28em] text-xl sm:text-2xl font-semibold text-[#1E221D] group-hover:text-[#5B6454] transition-colors duration-300 leading-none">
                  WEDDINGPUR
                </span>
                <span className="text-[9px] uppercase tracking-[0.38em] text-[#3D4537] font-medium mt-1 group-hover:text-[#5B6454] transition-colors duration-300 text-center lg:text-left">
                  Studio & Cinema
                </span>
              </a>
            </div>
            
            {/* Center Nav Links with Button-Style Pill Hover & Active State */}
            <div className="hidden xl:flex items-center justify-center gap-1.5 flex-1 px-8">
              {navLinks.map((link, idx) => {
                const isActive = pathname === link.href;
                return (
                  <Link 
                    key={idx} 
                    href={link.href} 
                    className={`px-4 py-2 rounded-full text-[11px] uppercase tracking-[0.2em] transition-all duration-300 font-medium border ${isActive ? 'bg-[#5B6454] text-[#FAF8F5] border-[#5B6454] shadow-sm' : 'text-[#1E221D] border-transparent hover:border-[#5B6454] hover:text-[#5B6454]'}`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>

            {/* Right CTAs */}
            <div className="hidden lg:flex items-center space-x-6 shrink-0">
              {currentUser ? (
                <div className="flex items-center gap-2">
                  {currentUser.role === 'admin' ? (
                    <Link href="/admin" className={`px-4 py-1.5 rounded-full text-[11px] uppercase tracking-[0.2em] transition-all duration-300 font-medium border ${pathname === '/admin' ? 'bg-[#5B6454] text-[#FAF8F5] border-[#5B6454] shadow-sm' : 'text-[#1E221D] border-transparent hover:border-[#5B6454] hover:text-[#5B6454]'}`}>
                      Admin OS
                    </Link>
                  ) : (
                    <span className="px-4 py-1.5 rounded-full text-[11px] uppercase tracking-widest font-medium border border-[#DDD7CD] text-[#1E221D]">
                      {currentUser.name}
                    </span>
                  )}
                  <button onClick={handleLogout} className="px-4 py-1.5 rounded-full text-[11px] uppercase tracking-[0.2em] transition-all duration-300 font-medium border text-[#1E221D] border-transparent hover:border-[#5B6454] hover:text-[#5B6454] focus:outline-none">
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <Link href="/login" className={`px-4 py-1.5 rounded-full text-[11px] uppercase tracking-[0.2em] transition-all duration-300 font-medium border ${pathname === '/login' ? 'bg-[#5B6454] text-[#FAF8F5] border-[#5B6454] shadow-sm' : 'text-[#1E221D] border-transparent hover:border-[#5B6454] hover:text-[#5B6454]'}`}>
                    Login
                  </Link>
                  <span className="text-[#DDD7CD] text-xs">|</span>
                  <Link href="/register" className={`px-4 py-1.5 rounded-full text-[11px] uppercase tracking-[0.2em] transition-all duration-300 font-medium border ${pathname === '/register' ? 'bg-[#5B6454] text-[#FAF8F5] border-[#5B6454] shadow-sm' : 'text-[#1E221D] border-transparent hover:border-[#5B6454] hover:text-[#5B6454]'}`}>
                    Register
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile menu hamburger */}
            <div className="xl:hidden flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-[#1E221D] hover:text-[#626C59] p-2 focus:outline-none"
                aria-label="Toggle menu"
              >
                {isOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Responsive Sliding Drawer */}
        <div 
          className={`xl:hidden absolute top-full left-0 w-full bg-[#FAF8F5]/98 backdrop-blur-xl border-b border-[#E7E3DA] transition-all duration-300 ease-in-out shadow-2xl ${isOpen ? 'max-h-[85vh] opacity-100 overflow-y-auto pb-6' : 'max-h-0 opacity-0 overflow-hidden'}`}
        >
          <div className="px-6 pt-4 space-y-1">
            {navLinks.map((link) => (
               <Link 
                  key={link.name}
                  onClick={() => setIsOpen(false)} 
                  href={link.href} 
                  className={`block px-3 py-4 text-xs uppercase tracking-[0.2em] font-medium border-b border-[#E7E3DA]/60 ${pathname === link.href ? 'text-[#626C59]' : 'text-[#3E453A] hover:text-[#626C59]'}`}
               >
                  {link.name}
               </Link>
            ))}

            <div className="pt-8 pb-4 space-y-5 px-3">
              {currentUser ? (
                <div className="flex flex-col space-y-4">
                  {currentUser.role === 'admin' && (
                    <Link 
                      onClick={() => setIsOpen(false)} 
                      href="/admin" 
                      className="block w-full bg-[#626C59] text-center px-6 py-3.5 rounded-full text-xs tracking-[0.2em] uppercase font-semibold text-[#FAF8F5] hover:bg-[#4E5646]"
                    >
                      Admin OS
                    </Link>
                  )}
                  <button 
                    onClick={handleLogout} 
                    className="w-full bg-transparent border border-[#3E453A]/30 text-center px-6 py-3.5 rounded-full text-xs tracking-[0.2em] uppercase font-semibold text-[#3E453A] hover:bg-[#E7E3DA] focus:outline-none"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex flex-col space-y-4">
                  <Link 
                    onClick={() => setIsOpen(false)} 
                    href="/login" 
                    className="w-full bg-transparent border border-[#3E453A]/30 text-center px-6 py-3.5 rounded-full text-xs tracking-[0.2em] uppercase font-semibold text-[#3E453A] hover:bg-[#E7E3DA]"
                  >
                    LOGIN
                  </Link>
                  <Link 
                    onClick={() => setIsOpen(false)} 
                    href="/register" 
                    className="w-full bg-[#626C59] text-[#FAF8F5] text-center px-6 py-3.5 rounded-full text-xs tracking-[0.2em] uppercase font-semibold hover:bg-[#4E5646]"
                  >
                    REGISTER
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}