"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function AdminLayout({ children }) {
  const pathname = usePathname();

  const navItems = [
    { label: "CREW DISPATCH", href: "/admin/dispatch", icon: "🗓️" },
    { label: "TEAM DIRECTORY", href: "/admin/team", icon: "👥" },
    { label: "IMAGE CMS", href: "/admin/cms", icon: "🖼️" },
    { label: "CLIENT INQUIRIES", href: "/admin/inquiries", icon: "✉️" },
    { label: "EDITORIAL STORIES", href: "/admin/stories", icon: "📖" },
  ];

  return (
    <div className="flex min-h-screen bg-[#0B0D0E] font-sans antialiased text-[#F5F5F5]">
      {/* OBSIDIAN GOLD SIDEBAR */}
      <aside className="w-64 min-h-screen bg-[#070809] text-[#EAEAEA] border-r border-[#262117] flex flex-col justify-between p-6 shrink-0 select-none sticky top-0 h-screen shadow-2xl">
        <div>
          {/* Brand Header */}
          <div className="pb-6 border-b border-[#262117]">
            <span className="text-[10px] uppercase tracking-[0.35em] text-[#D4AF37] font-bold block mb-1">
              ROYALE COMMAND
            </span>
            <h2 className="text-xl font-black tracking-[0.25em] text-white uppercase">
              WEDDINGPUR
            </h2>
          </div>

          {/* Navigation Menu */}
          <nav className="mt-8 space-y-2">
            {navItems.map((item, idx) => {
              const isActive = pathname === item.href || (pathname === '/admin' && idx === 0);

              return (
                <Link
                  key={idx}
                  href={item.href}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs tracking-wider transition-all duration-200 font-bold ${
                    isActive
                      ? 'bg-gradient-to-r from-[#D4AF37] to-[#AA820A] text-black shadow-lg shadow-[#D4AF37]/10'
                      : 'text-[#C5B388] hover:bg-[#15181B] hover:text-[#F3E5AB]'
                  }`}
                >
                  <span className="text-base">{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer Admin Info */}
        <div className="pt-6 border-t border-[#262117] space-y-3">
          <div>
            <span className="text-[9px] uppercase tracking-wider text-[#8A7D5C] font-bold block">
              AUTHORIZED CONSOLE
            </span>
            <p className="text-xs font-black text-white tracking-wide mt-0.5">
              MD DILSHAD
            </p>
          </div>

          <div className="pt-2 flex flex-col gap-2">
            <Link
              href="/"
              target="_blank"
              className="text-[11px] uppercase tracking-wider text-[#D4AF37] hover:text-[#F3E5AB] transition-colors flex items-center gap-1.5 font-bold"
            >
              <span>↗</span>
              <span>Open Live Site</span>
            </Link>

            <button
              onClick={() => { window.location.href = '/login'; }}
              className="text-[11px] uppercase tracking-wider text-rose-400 hover:text-rose-300 text-left flex items-center gap-1.5 cursor-pointer font-bold transition-colors"
            >
              <span>•</span>
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* DYNAMIC VIEW */}
      <main className="flex-1 overflow-y-auto min-h-screen bg-[#0B0D0E]">
        {children}
      </main>
    </div>
  );
}
