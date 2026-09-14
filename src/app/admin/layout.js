'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function AdminLayout({ children }) {
  const pathname = usePathname();

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
    <div className="flex min-h-screen bg-[#0B0D0E] text-[#F5F5F5] font-sans">
      {/* Permanent Admin Sidebar */}
      <aside className="w-64 border-r border-[#1F242D] bg-[#0E1114] flex flex-col justify-between p-6 shrink-0 sticky top-0 h-screen overflow-y-auto">
        <div>
          {/* Logo */}
          <div className="mb-10 bg-transparent">
            {/* <span className="text-[10px] font-mono tracking-[0.25em] text-[#8A7D5C] uppercase block mb-3">
              ROYALE COMMAND
            </span> */}
            <img 
              src="/lensloom-logo.png" 
              alt="LensLoom Production" 
              className="h-24 w-auto object-contain scale-[2.5] origin-left"
            />
          </div>

          {/* Navigation Links */}
          <nav className="space-y-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`block px-4 py-3 rounded-xl text-[11px] font-mono font-bold tracking-wider uppercase transition-all ${
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
      <main className="flex-1 min-w-0 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}