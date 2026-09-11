"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
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
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0B0D0E]/85 backdrop-blur-lg border-b border-[#2B2519] py-2 lg:py-0 px-6 sm:px-12 transition-all duration-300">
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
                {settings.logoType === 'IMAGE' && settings.logoImageUrl ? (
                  <img src={settings.logoImageUrl} alt={settings.brandName} className="h-10 object-contain" />
                ) : (
                  <>
                    <span className="font-serif tracking-[0.28em] text-xl sm:text-2xl font-semibold text-[#D4AF37] group-hover:text-[#F3E5AB] transition-colors duration-300 leading-none">
                      {settings.brandName || "WEDDINGPUR"}
                    </span>
                    <span className="text-[9px] uppercase tracking-[0.38em] text-[#C5B388] font-medium mt-1 group-hover:text-[#D4AF37] transition-colors duration-300 text-center lg:text-left">
                      {settings.brandTagline || "Studio & Cinema"}
                    </span>
                  </>
                )}
              </a>
            </div>
            
            {/* Center Nav Links */}
            <div className="hidden xl:flex items-center justify-center gap-1.5 flex-1 px-8">
              {navLinks.map((link, idx) => {
                const isActive = pathname === link.href;
                return (
                  <Link 
                    key={idx} 
                    href={link.href} 
                    className={`px-4 py-2 rounded-full text-[11px] uppercase tracking-[0.2em] transition-all duration-300 font-medium border ${isActive ? 'bg-[#121518] text-white border-[#D4AF37] shadow-sm' : 'text-[#C5B388] border-transparent hover:border-[#D4AF37] hover:text-[#D4AF37] hover:bg-[#121518]'}`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>

            {/* Right CTAs */}
            <div className="hidden lg:flex items-center space-x-6 shrink-0">
              {currentUser && (
                <div className="flex items-center gap-2">
                  {currentUser.role === 'admin' ? (
                    <Link href="/admin" className={`px-4 py-1.5 rounded-full text-[11px] uppercase tracking-[0.2em] transition-all duration-300 font-medium border ${pathname === '/admin' ? 'bg-[#121518] text-white border-[#D4AF37] shadow-sm' : 'text-[#C5B388] border-[#2B2519] hover:border-[#D4AF37] hover:text-white hover:bg-[#121518]'}`}>
                      Admin OS
                    </Link>
                  ) : (
                    <span className="px-4 py-1.5 rounded-full text-[11px] uppercase tracking-widest font-medium border border-[#2B2519] text-[#C5B388]">
                      {currentUser.name}
                    </span>
                  )}
                  <button onClick={handleLogout} className="px-4 py-1.5 rounded-full text-[11px] uppercase tracking-[0.2em] transition-all duration-300 font-medium border border-[#2B2519] text-[#C5B388] hover:border-[#D4AF37] hover:text-white hover:bg-[#121518] focus:outline-none">
                    Logout
                  </button>
                </div>
              )}
            </div>

            {/* Mobile menu hamburger */}
            <div className="xl:hidden flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-[#C5B388] hover:text-[#D4AF37] p-2 focus:outline-none"
                aria-label="Toggle menu"
              >
                {isOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Responsive Sliding Drawer */}
        <div 
          className={`xl:hidden absolute top-full left-0 w-full bg-[#0B0D0E]/95 backdrop-blur-xl border-b border-[#2B2519] transition-all duration-300 ease-in-out shadow-2xl ${isOpen ? 'max-h-[85vh] opacity-100 overflow-y-auto pb-6' : 'max-h-0 opacity-0 overflow-hidden'}`}
        >
          <div className="px-6 pt-4 space-y-1">
            {navLinks.map((link) => (
               <Link 
                  key={link.name}
                  onClick={() => setIsOpen(false)} 
                  href={link.href} 
                  className={`block px-3 py-4 text-xs uppercase tracking-[0.2em] font-medium border-b border-[#2B2519] ${pathname === link.href ? 'text-[#D4AF37]' : 'text-[#C5B388] hover:text-[#D4AF37]'}`}
               >
                  {link.name}
               </Link>
            ))}

            <div className="pt-8 pb-4 space-y-5 px-3">
              {currentUser && (
                <div className="flex flex-col space-y-4">
                  {currentUser.role === 'admin' && (
                    <Link 
                      onClick={() => setIsOpen(false)} 
                      href="/admin" 
                      className="block w-full bg-[#121518] border border-[#D4AF37] text-center px-6 py-3.5 rounded-full text-xs tracking-[0.2em] uppercase font-semibold text-white hover:bg-[#D4AF37] hover:text-black"
                    >
                      Admin OS
                    </Link>
                  )}
                  <button 
                    onClick={handleLogout} 
                    className="w-full bg-transparent border border-[#2B2519] text-center px-6 py-3.5 rounded-full text-xs tracking-[0.2em] uppercase font-semibold text-[#C5B388] hover:bg-[#121518] hover:text-white hover:border-[#D4AF37] focus:outline-none"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}