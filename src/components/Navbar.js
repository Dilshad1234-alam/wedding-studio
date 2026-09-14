"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { Menu, X, ChevronDown } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [settings, setSettings] = useState({ 
    brandName: "LENSLOOM", 
    brandTagline: "Studio & Cinema", 
    logoType: "TEXT", 
    logoImageUrl: "" 
  });

  useEffect(() => {
    const userStr = sessionStorage.getItem('weddingpur_user');
    if (userStr) {
      try {
        setCurrentUser(JSON.parse(userStr));
      } catch (e) {
        setCurrentUser(null);
      }
    }

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
    { name: 'Home', href: '/' },
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
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0B0D0E]/85 backdrop-blur-lg border-b border-[#2B2519] py-2 lg:py-0 px-6 md:px-12 transition-all duration-300">
      <nav className="w-full">
        <div className="w-full relative">
          <div className="flex justify-between items-center h-20 sm:h-24">
            
            {/* Left Brand Identity */}
            <div className="flex-shrink-0 flex items-center z-30">
              <a
                href="/"
                onClick={handleLogoClick}
                className="flex flex-col items-center cursor-pointer select-none focus:outline-none bg-transparent"
              >
                <Image 
                  src="/lensloom-logo.png" 
                  alt="LensLoom Production" 
                  width={600}
                  height={213}
                  priority
                  quality={100}
                  unoptimized
                  className="h-16 sm:h-20 lg:h-24 w-auto object-contain -mt-2 lg:-mt-4" 
                />
              </a>
            </div>

            {/* Right Side Container */}
            <div className="flex items-center ml-auto gap-4 z-20">
              
              {/* Desktop Nav Links */}
              <div className="hidden lg:flex items-center justify-end gap-1 xl:gap-2">
                {navLinks.map((link, idx) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link 
                      key={idx} 
                      href={link.href} 
                      className={`px-3 xl:px-4 py-2 rounded-full text-[10px] xl:text-[11px] uppercase tracking-[0.2em] transition-all duration-300 font-medium border ${isActive ? 'bg-[#121518] text-white border-[#D4AF37] shadow-sm' : 'text-[#C5B388] border-transparent hover:border-[#D4AF37] hover:text-[#D4AF37] hover:bg-[#121518]'}`}
                    >
                      {link.name}
                    </Link>
                  );
                })}
              </div>

              {/* Desktop CTAs (Auth / Admin) */}
              {currentUser && (
                <div className="hidden lg:flex items-center gap-2">
                  {currentUser.role === 'admin' ? (
                    <Link href="/admin" className={`px-4 py-1.5 rounded-full text-[10px] xl:text-[11px] uppercase tracking-[0.2em] transition-all duration-300 font-medium border ${pathname === '/admin' ? 'bg-[#121518] text-white border-[#D4AF37] shadow-sm' : 'text-[#C5B388] border-[#2B2519] hover:border-[#D4AF37] hover:text-white hover:bg-[#121518]'}`}>
                      Admin OS
                    </Link>
                  ) : (
                    <span className="px-4 py-1.5 rounded-full text-[10px] xl:text-[11px] uppercase tracking-widest font-medium border border-[#2B2519] text-[#C5B388]">
                      {currentUser.name}
                    </span>
                  )}
                  <button onClick={handleLogout} className="px-4 py-1.5 rounded-full text-[10px] xl:text-[11px] uppercase tracking-[0.2em] transition-all duration-300 font-medium border border-[#2B2519] text-[#C5B388] hover:border-[#D4AF37] hover:text-white hover:bg-[#121518] focus:outline-none">
                    Logout
                  </button>
                </div>
              )}

              {/* Mobile Menu Hamburger */}
              <div className="lg:hidden flex items-center shrink-0">
                <button
                  onClick={() => setIsOpen(true)}
                  className="text-[#C5B388] hover:text-[#D4AF37] p-2 focus:outline-none transition-transform"
                  aria-label="Open menu"
                >
                  <Menu size={28} />
                </button>
              </div>

            </div>
            
          </div>
        </div>

        {/* Mobile Responsive Slide-Out Drawer */}
        {/* Overlay */}
        <div 
          className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] transition-opacity duration-300 lg:hidden ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
          onClick={() => setIsOpen(false)}
        ></div>

        {/* Drawer */}
        <div 
          className={`fixed top-0 right-0 h-[100dvh] w-[85vw] max-w-[400px] bg-[#0B0D0E] border-l border-[#2B2519] z-[70] transform transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] flex flex-col shadow-2xl lg:hidden ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
        >
          <div className="flex justify-between items-center p-6 border-b border-[#2B2519]">
            <Image 
              src="/lensloom-logo.png" 
              alt="LensLoom Production" 
              width={300}
              height={107}
              priority
              quality={100}
              unoptimized
              className="h-10 w-auto object-contain" 
            />
            <button
              onClick={() => setIsOpen(false)}
              className="text-[#C5B388] hover:text-[#D4AF37] p-2 focus:outline-none transition-transform hover:rotate-90"
              aria-label="Close menu"
            >
              <X size={28} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto py-8 px-6 space-y-2">
            {navLinks.map((link) => (
               <Link 
                  key={link.name}
                  onClick={() => setIsOpen(false)} 
                  href={link.href} 
                  className={`block px-4 py-4 text-xs sm:text-sm uppercase tracking-[0.25em] font-medium rounded-xl transition-all duration-300 ${pathname === link.href ? 'bg-[#121518] text-[#D4AF37] border border-[#D4AF37]/30' : 'text-[#C5B388] hover:text-[#D4AF37] hover:bg-[#121518]/50 border border-transparent'}`}
               >
                  {link.name}
               </Link>
            ))}
          </div>

          <div className="p-6 border-t border-[#2B2519] space-y-4 shrink-0">
            {currentUser && (
              <div className="flex flex-col space-y-3 mt-4">
                {currentUser.role === 'admin' && (
                  <Link 
                    onClick={() => setIsOpen(false)} 
                    href="/admin" 
                    className="block w-full bg-[#121518] border border-[#2B2519] text-center px-6 py-3.5 rounded-full text-xs tracking-[0.2em] uppercase font-medium text-[#C5B388] hover:border-[#D4AF37] hover:text-white"
                  >
                    Admin OS
                  </Link>
                )}
                <button 
                  onClick={handleLogout} 
                  className="w-full bg-transparent border border-[#2B2519] text-center px-6 py-3.5 rounded-full text-xs tracking-[0.2em] uppercase font-medium text-[#C5B388] hover:bg-[#121518] hover:text-white hover:border-[#D4AF37] focus:outline-none"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}