'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Hide sidebar on auth pages
  const isAuthPage = pathname === '/admin';

  if (isAuthPage) {
    return <main className="min-h-screen bg-[#0B0D0E] w-full">{children}</main>;
  }

  const navItems = [
    { label: 'PLATFORM OVERVIEW', href: '/admin/overview' },
    { label: 'WEDDING MANAGEMENT', href: '/admin/wedding-management' },
    { label: 'COMMERCIAL MANAGEMENT', href: '/admin/commercial-management' },
    { label: 'WEBSITE MANAGEMENT', href: '/admin/website-management' },
    { label: 'CLIENT INQUIRIES', href: '/admin/inquiries' },
    { label: 'LEADS MANAGEMENT', href: '/admin/leads' },
    { label: 'SETTINGS', href: '/admin/settings' },
  ];

  const handleLogout = () => {
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    sessionStorage.removeItem('weddingpur_user');
    sessionStorage.removeItem('weddingpur_token');
    window.location.href = '/admin';
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-[#0B0D0E] text-[#F5F5F5] font-sans">
      
      {/* Mobile Top Header (Visible only on small screens) */}
      <div className="lg:hidden flex items-center justify-between bg-[#0E1114] border-b border-[#1F242D] p-4 sticky top-0 z-40">
        <div className="flex items-center -ml-4 pointer-events-none">
          <img 
            src="/lensloom-logo.png" 
            alt="LensLoom Production" 
            className="h-12 w-auto object-contain scale-[3.0] origin-left"
          />
        </div>
        <button 
          onClick={() => setIsSidebarOpen(true)}
          className="p-2 text-[#8A7D5C] hover:text-white"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Permanent Admin Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50
        transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 transition-transform duration-300 ease-in-out
        w-[280px] border-r border-[#1F242D] bg-[#0E1114] flex flex-col justify-between p-6 shrink-0 lg:sticky lg:top-0 h-screen overflow-y-auto overflow-x-hidden
      `}>
        <div>
          <div className="flex items-center justify-between mb-10">
            {/* Logo (Desktop only) */}
            <div className="hidden lg:flex bg-transparent items-center justify-start -ml-8 pointer-events-none">
              <img 
                src="/lensloom-logo.png" 
                alt="LensLoom Production" 
                className="h-24 w-auto object-contain scale-[3.5] origin-left"
              />
            </div>
            
            {/* Close Button (Mobile only) */}
            <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden text-[#8A7D5C] hover:text-white ml-auto cursor-pointer">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-2 relative z-10">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  prefetch={false}
                  onClick={() => setIsSidebarOpen(false)}
                  className={`block px-4 py-3 rounded-xl text-[11px] font-mono font-bold tracking-wider uppercase whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-[#D4AF37] text-black shadow-lg shadow-[#D4AF37]/20 font-black'
                      : 'text-[#8A7D5C] hover:text-white hover:bg-[#15191F]'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer Profile & Logout */}
        <div className="pt-6 border-t border-[#1F242D] space-y-4">
          <div>
            <span className="text-[9px] font-mono text-[#8A7D5C] uppercase tracking-wider block">
              AUTHORIZED CONSOLE
            </span>
            <span className="text-xs font-bold text-white block mt-0.5">
              MD DILSHAD
            </span>
          </div>

          <div className="flex flex-col gap-2">
            <Link
              href="/"
              target="_blank"
              onClick={() => setIsSidebarOpen(false)}
              className="text-[11px] text-[#8A7D5C] hover:text-[#D4AF37] flex items-center gap-1.5 font-mono transition-colors"
            >
              ↗ OPEN LIVE SITE
            </Link>

            <button
              onClick={handleLogout}
              className="text-left text-[11px] text-rose-400 hover:text-rose-300 font-mono font-bold uppercase tracking-wider transition-colors cursor-pointer"
            >
              ⏻ SECURE LOGOUT
            </button>
          </div>
        </div>
      </aside>

      {/* Main Admin Content Dashboard */}
      <main className="flex-1 min-w-0 overflow-x-hidden overflow-y-auto">
        {children}
      </main>
    </div>
  );
}