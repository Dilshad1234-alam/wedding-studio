"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function OverviewPage() {
  const [currentDate, setCurrentDate] = useState('');
  const [revenue, setRevenue] = useState({
    wedding: { amount: "₹38.50L", activeShoots: 31 },
    commercial: { amount: "₹25.25L" },
    total: "₹63.75L"
  });

  useEffect(() => {
    const d = new Date();
    setCurrentDate(d.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }));
  }, []);

  const coreModules = [
    {
      id: "MODULE 1",
      title: "Wedding Management",
      desc: "Live field assignments, ritual schedules, crew logistics, and revenue receivables.",
      link: "/admin/wedding-management",
      actionText: "Launch Management Suite →",
      icon: "💍",
      badge: "51 Active Shoots"
    },
    {
      id: "MODULE 2",
      title: "Crew Directory & Roster",
      desc: "Master roster of cinematographers, candid photographers, drone pilots, and editors.",
      link: "/admin/wedding-management",
      actionText: "Manage Roster →",
      icon: "👥",
      badge: "18 Members"
    },
    {
      id: "MODULE 3",
      title: "Image & Media CMS",
      desc: "Upload, curate, and categorize high-resolution portfolio stills, teasers, and wedding albums.",
      link: "/admin/media",
      actionText: "Manage Galleries →",
      icon: "🖼️",
      badge: "Live Sync"
    },
    {
      id: "MODULE 4",
      title: "Client Inquiries & CRM",
      desc: "Review wedding dates, package requests, budget tiers, and client transmission notes.",
      link: "/admin/inquiries",
      actionText: "View Inquiries →",
      icon: "✉️",
      badge: "12 New Leads"
    },
    {
      id: "MODULE 5",
      title: "Editorial Stories & Blogs",
      desc: "Publish couple narratives, featured wedding journals, and behind-the-scenes articles.",
      link: "/admin/stories",
      actionText: "Manage Stories →",
      icon: "📖",
      badge: "Published"
    },
    {
      id: "MODULE 6",
      title: "Console Settings & Telemetry",
      desc: "Master system configurations, API credentials, WhatsApp alert triggers, and staff access roles.",
      link: "/admin/settings",
      actionText: "Configure Studio →",
      icon: "⚙️",
      badge: "Operational"
    }
  ];

  return (
    <div className="min-h-screen bg-[#0B0D0E] text-[#F5F5F5] font-sans antialiased p-6 lg:p-10 space-y-8">
      
      {/* 1. TOP EXECUTIVE COMMAND BANNER */}
      <div className="w-full rounded-3xl bg-gradient-to-r from-[#171B20] via-[#1F252E] to-[#171B20] border border-[#2B2519] p-8 lg:p-10 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4AF37]/5 blur-[120px] pointer-events-none"></div>

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/40 text-[#D4AF37] text-[10px] font-black uppercase tracking-[0.2em]">
                ROYALE COMMAND • {currentDate || '2026'} • ENTERPRISE SUITE
              </span>
              <span className="flex items-center gap-1.5 text-[11px] text-emerald-400 font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                All Systems Operational
              </span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white font-sans">
              Good morning, <span className="text-[#D4AF37] font-black">MD Dilshad</span>
            </h1>
            
            <p className="text-xs sm:text-sm text-[#A89D84] font-normal max-w-2xl leading-relaxed">
              Weddingpur Master Command Center • Real-time crew dispatch, portfolio media pipelines, active inquiries, and live revenue logistics across Bihar & Pan-India.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0 flex-wrap">
            <Link className="px-5 py-2.5 rounded-xl border border-[#2B2519] bg-[#121518] hover:border-[#D4AF37] hover:text-[#D4AF37] text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer shadow-md" href="/" target="_blank">
              <span>View Live Site</span>
              <span className="text-sm">↗</span>
            </Link>

            <Link className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B89018] hover:from-[#F3E5AB] hover:to-[#D4AF37] text-black text-xs font-black uppercase tracking-[0.15em] shadow-lg shadow-[#D4AF37]/25 transition-all cursor-pointer" href="/admin/wedding-management">
              Open Wedding Suite →
            </Link>
          </div>
        </div>
      </div>

      {/* 2. TOP REVENUE LOGISTICS ROW */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        
        {/* Card 1: Wedding Management */}
        <div className="bg-[#121518] border border-[#2B2519] rounded-2xl p-6 shadow-xl space-y-3 relative hover:border-[#D4AF37]/40 transition-colors">
          <div className="flex justify-between items-center">
            <span className="text-[10px] font-sans font-semibold uppercase tracking-wider text-[#8A7D5C]">WEDDING MANAGEMENT</span>
            <span className="px-2 py-0.5 rounded text-[9px] font-sans font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/30">
              MONTHLY REVENUE
            </span>
          </div>
          <h4 className="text-3xl font-sans font-semibold tracking-tight text-white">{revenue.wedding.amount}</h4>
          <p className="text-[11px] font-sans text-[#A89D84]">{revenue.wedding.activeShoots} Active wedding shoots • Realized this month</p>
          <Link className="inline-block text-xs font-sans font-semibold tracking-tight text-[#D4AF37] hover:text-[#F3E5AB] pt-1" href="/admin/wedding-management">
            View Wedding Ledger →
          </Link>
        </div>

        {/* Card 2: Commercial Management */}
        <div className="bg-[#121518] border border-[#2B2519] rounded-2xl p-6 shadow-xl space-y-3 relative hover:border-[#D4AF37]/40 transition-colors">
          <div className="flex justify-between items-center">
            <span className="text-[10px] font-sans font-semibold uppercase tracking-wider text-[#8A7D5C]">COMMERCIAL MANAGEMENT</span>
            <span className="px-2 py-0.5 rounded text-[9px] font-sans font-semibold bg-purple-500/10 text-purple-400 border border-purple-500/30">
              COMMERCIAL B2B
            </span>
          </div>
          <h4 className="text-3xl font-sans font-semibold tracking-tight text-white">{revenue.commercial.amount}</h4>
          <p className="text-[11px] font-sans text-[#A89D84]">Corporate & Fashion shoots • Brand campaigns</p>
          <Link className="inline-block text-xs font-sans font-semibold tracking-tight text-[#D4AF37] hover:text-[#F3E5AB] pt-1" href="/admin/commercial">
            View Commercial Ledger →
          </Link>
        </div>

        {/* Card 3: Combined Monthly Total */}
        <div className="bg-gradient-to-br from-[#1C1A14] to-[#121518] border border-[#D4AF37]/40 rounded-2xl p-6 shadow-xl space-y-3 relative shadow-[0_0_25px_rgba(212,175,55,0.1)]">
          <div className="flex justify-between items-center">
            <span className="text-[10px] font-sans font-semibold uppercase tracking-wider text-[#D4AF37]">TOTAL COMBINED REVENUE</span>
            <span className="px-2 py-0.5 rounded text-[9px] font-sans font-semibold bg-[#D4AF37]/20 text-[#F3E5AB] border border-[#D4AF37]/40 shadow-[0_0_10px_rgba(212,175,55,0.3)]">
              NET MONTHLY
            </span>
          </div>
          <h4 className="text-3xl font-sans font-semibold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-500">
            {revenue.total}
          </h4>
          <p className="text-[11px] font-sans text-[#A89D84]">Wedding ({revenue.wedding.amount}) + Commercial ({revenue.commercial.amount})</p>
          <Link className="inline-block text-xs font-sans font-semibold tracking-tight text-[#D4AF37] hover:text-[#F3E5AB] pt-1" href="/admin/overview">
            Consolidated Statement →
          </Link>
        </div>

      </div>

      {/* 3. CORE STUDIO MODULES */}
      <div className="space-y-6">
        <div>
          <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white flex items-center gap-3">
            <span>6 Core Essential Studio Modules</span>
            <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-[#181B1F] border border-[#2B2519] text-[#D4AF37]">
              Single-Click Direct Access
            </span>
          </h3>
          <p className="text-xs text-[#8A7D5C] mt-1">
            Quickly navigate to any management suite in the Weddingpur studio workflow.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {coreModules.map((module, i) => (
            <div
              key={i}
              className="bg-[#121518] border border-[#2B2519] hover:border-[#D4AF37]/60 rounded-3xl p-7 shadow-xl flex flex-col justify-between space-y-6 group transition-all duration-300 hover:-translate-y-1"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-[#1A1E24] border border-[#2B2519] flex items-center justify-center text-xl group-hover:border-[#D4AF37] group-hover:scale-110 transition-all">
                    {module.icon}
                  </div>
                  <span className="text-[10px] font-mono font-bold text-[#D4AF37] bg-[#1C1812] border border-[#3A311D] px-2.5 py-1 rounded-lg">
                    {module.id}
                  </span>
                </div>

                <div>
                  <h4 className="text-base font-sans font-semibold tracking-tight text-white group-hover:text-[#F3E5AB] transition-colors">
                    {module.title}
                  </h4>
                  <span className="text-[10px] font-sans font-semibold text-[#8A7D5C] uppercase tracking-wider block mb-2 mt-1">
                    STATUS: {module.badge}
                  </span>
                  <p className="text-xs font-sans text-[#A89D84] font-normal leading-relaxed">
                    {module.desc}
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-[#1C1F24]">
                <Link className="w-full py-2.5 rounded-xl border border-[#2B2519] bg-[#16191F] group-hover:bg-gradient-to-r group-hover:from-[#D4AF37] group-hover:to-[#B89018] group-hover:text-black text-[#D4AF37] text-xs font-sans font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-300 shadow-md cursor-pointer" href={module.link}>
                  {module.actionText}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
