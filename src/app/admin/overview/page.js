"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function OverviewPage() {
  const [currentDate, setCurrentDate] = useState('');
  const [timeFilter, setTimeFilter] = useState('1M'); // '1M', '6M', '1Y'
  
  const [weddingClients, setWeddingClients] = useState([]);
  const [commercialClients, setCommercialClients] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const d = new Date();
    setCurrentDate(d.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }));

    // Fetch real data from MongoDB APIs
    async function fetchAllData() {
      try {
        const [weddingRes, commercialRes] = await Promise.all([
          fetch('/api/wedding/clients'),
          fetch('/api/commercial/clients')
        ]);

        const weddingData = await weddingRes.json();
        const commercialData = await commercialRes.json();

        if (Array.isArray(weddingData)) setWeddingClients(weddingData);
        if (Array.isArray(commercialData)) setCommercialClients(commercialData);
      } catch (err) {
        console.error("Error fetching overview data:", err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchAllData();
  }, []);

  const parseBudget = (budgetStr) => {
    if (!budgetStr) return 0;
    const clean = String(budgetStr).replace(/[^0-9.]/g, '');
    return parseFloat(clean) || 0;
  };

  // Filter based on selected time window (1M, 6M, 1Y)
  const filterByTime = (item) => {
    const month = item.month || 'SEP';
    const year = item.year || 2026;

    if (timeFilter === '1M') {
      return month === 'SEP' && year === 2026;
    } else if (timeFilter === '6M') {
      const allowedMonths = ['APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP'];
      return allowedMonths.includes(month) && year === 2026;
    } else if (timeFilter === '1Y') {
      return year === 2026;
    }
    return true;
  };

  const filteredWeddings = weddingClients.filter(filterByTime);
  const filteredCommercials = commercialClients.filter(filterByTime);

  const weddingTotalNum = filteredWeddings.reduce((acc, c) => acc + parseBudget(c.totalBudget), 0);
  const commercialTotalNum = filteredCommercials.reduce((acc, c) => acc + parseBudget(c.totalBudget), 0);
  const combinedTotalNum = weddingTotalNum + commercialTotalNum;

  const formatCurrencyLakhs = (num) => {
    if (num === 0) return '₹0';
    if (num >= 100000) {
      return `₹${(num / 100000).toFixed(2)}L`;
    }
    return `₹${num.toLocaleString('en-IN')}`;
  };

  const coreModules = [
    {
      id: "MODULE 1",
      title: "Wedding Management",
      desc: "Live field assignments, ritual schedules, crew logistics, and revenue receivables.",
      link: "/admin/wedding-management",
      actionText: "Launch Management Suite →",
      icon: "💍",
      badge: `${weddingClients.length} Active Shoots`
    },
    {
      id: "MODULE 2",
      title: "Commercial Management",
      desc: "Master roster of directors, DPs, drone pilots, and corporate ad campaigns.",
      link: "/admin/commercial-management",
      actionText: "Manage Commercial Suite →",
      icon: "👥",
      badge: `${commercialClients.length} Campaigns`
    },
    {
      id: "MODULE 3",
      title: "Website Management",
      desc: "Upload, curate, and categorize high-resolution portfolio stills, teasers, and wedding albums.",
      link: "/admin/website",
      actionText: "Manage Galleries & Stories →",
      icon: "🖼️",
      badge: "Live Sync"
    },
    {
      id: "MODULE 4",
      title: "Client Inquiries",
      desc: "Review wedding dates, package requests, budget tiers, and client transmission notes.",
      link: "/admin/inquiries",
      actionText: "View Inquiries & CRM →",
      icon: "✉️",
      badge: "12 New Leads"
    },
    {
      id: "MODULE 5",
      title: "Settings",
      desc: "Master studio configuration, brand credentials, telemetry logs, and access control.",
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
                MongoDB Database Connected
              </span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white font-sans">
              Good morning, <span className="text-[#D4AF37] font-black">Sanjeet Sharma</span>
            </h1>
            
            <p className="text-xs sm:text-sm text-[#A89D84] font-normal max-w-2xl leading-relaxed">
              Weddingpur Master Command Center • Real-time crew dispatch from MongoDB, portfolio media pipelines, active inquiries, and live revenue analytics across Bihar & Pan-India.
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

      {/* TIME FILTER TOGGLE BAR (1 Month / 6 Months / Year) */}
      <div className="flex items-center justify-between flex-wrap gap-4 bg-[#121518] border border-[#2B2519] p-4 rounded-2xl shadow-xl">
        <div>
          <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">Revenue Analytics Filter</h3>
          <p className="text-xs text-[#8A7D5C]">Select timeframe to compute real database earnings</p>
        </div>

        <div className="flex items-center gap-1.5 bg-[#0B0D0E] p-1.5 rounded-xl border border-[#2B2519]">
          <button
            type="button"
            onClick={() => setTimeFilter('1M')}
            className={`px-4 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
              timeFilter === '1M' ? 'bg-gradient-to-r from-[#D4AF37] to-[#B89018] text-black font-black shadow-md' : 'text-[#8A7D5C] hover:text-white'
            }`}
          >
            1 Month
          </button>
          <button
            type="button"
            onClick={() => setTimeFilter('6M')}
            className={`px-4 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
              timeFilter === '6M' ? 'bg-gradient-to-r from-[#D4AF37] to-[#B89018] text-black font-black shadow-md' : 'text-[#8A7D5C] hover:text-white'
            }`}
          >
            6 Months
          </button>
          <button
            type="button"
            onClick={() => setTimeFilter('1Y')}
            className={`px-4 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
              timeFilter === '1Y' ? 'bg-gradient-to-r from-[#D4AF37] to-[#B89018] text-black font-black shadow-md' : 'text-[#8A7D5C] hover:text-white'
            }`}
          >
            Year 2026
          </button>
        </div>
      </div>

      {/* 2. TOP REVENUE LOGISTICS ROW (REAL DATA FROM MONGODB) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        
        {/* Card 1: Wedding Management */}
        <div className="bg-[#121518] border border-[#2B2519] rounded-2xl p-6 shadow-xl space-y-3 relative hover:border-[#D4AF37]/40 transition-colors">
          <div className="flex justify-between items-center">
            <span className="text-[10px] font-sans font-semibold uppercase tracking-wider text-[#8A7D5C]">WEDDING MANAGEMENT</span>
            <span className="px-2 py-0.5 rounded text-[9px] font-sans font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/30">
              {timeFilter === '1M' ? 'SEPTEMBER 2026' : timeFilter === '6M' ? 'LAST 6 MONTHS' : 'YEAR 2026'}
            </span>
          </div>
          <h4 className="text-3xl font-sans font-bold tracking-tight text-white font-mono">
            {isLoading ? "..." : formatCurrencyLakhs(weddingTotalNum)}
          </h4>
          <p className="text-[11px] font-sans text-[#A89D84]">
            {filteredWeddings.length} Active wedding shoots in database
          </p>
          <Link className="inline-block text-xs font-sans font-semibold tracking-tight text-[#D4AF37] hover:text-[#F3E5AB] pt-1" href="/admin/wedding-management">
            View Wedding Ledger →
          </Link>
        </div>

        {/* Card 2: Commercial Management */}
        <div className="bg-[#121518] border border-[#2B2519] rounded-2xl p-6 shadow-xl space-y-3 relative hover:border-[#D4AF37]/40 transition-colors">
          <div className="flex justify-between items-center">
            <span className="text-[10px] font-sans font-semibold uppercase tracking-wider text-[#8A7D5C]">COMMERCIAL MANAGEMENT</span>
            <span className="px-2 py-0.5 rounded text-[9px] font-sans font-semibold bg-purple-500/10 text-purple-400 border border-purple-500/30">
              B2B CAMPAIGNS
            </span>
          </div>
          <h4 className="text-3xl font-sans font-bold tracking-tight text-white font-mono">
            {isLoading ? "..." : formatCurrencyLakhs(commercialTotalNum)}
          </h4>
          <p className="text-[11px] font-sans text-[#A89D84]">
            {filteredCommercials.length} Brand campaigns in database
          </p>
          <Link className="inline-block text-xs font-sans font-semibold tracking-tight text-[#D4AF37] hover:text-[#F3E5AB] pt-1" href="/admin/commercial-management">
            View Commercial Ledger →
          </Link>
        </div>

        {/* Card 3: Combined Monthly Total */}
        <div className="bg-gradient-to-br from-[#1C1A14] to-[#121518] border border-[#D4AF37]/40 rounded-2xl p-6 shadow-xl space-y-3 relative shadow-[0_0_25px_rgba(212,175,55,0.1)]">
          <div className="flex justify-between items-center">
            <span className="text-[10px] font-sans font-semibold uppercase tracking-wider text-[#D4AF37]">TOTAL COMBINED REVENUE</span>
            <span className="px-2 py-0.5 rounded text-[9px] font-sans font-semibold bg-[#D4AF37]/20 text-[#F3E5AB] border border-[#D4AF37]/40 shadow-[0_0_10px_rgba(212,175,55,0.3)]">
              NET EARNINGS
            </span>
          </div>
          <h4 className="text-3xl font-sans font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-500 font-mono">
            {isLoading ? "..." : formatCurrencyLakhs(combinedTotalNum)}
          </h4>
          <p className="text-[11px] font-sans text-[#A89D84]">
            Wedding + Commercial total revenue
          </p>
          <Link className="inline-block text-xs font-sans font-semibold tracking-tight text-[#D4AF37] hover:text-[#F3E5AB] pt-1" href="/admin/wedding-management">
            Consolidated Statement →
          </Link>
        </div>

      </div>

      {/* 3. CORE STUDIO MODULES (Clickable Cards) */}
      <div className="space-y-6">
        <div>
          <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white flex items-center gap-3">
            <span>5 Core Essential Studio Modules</span>
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
            <Link
              key={i}
              href={module.link}
              className="bg-[#121518] border border-[#2B2519] hover:border-[#D4AF37] rounded-3xl p-7 shadow-xl flex flex-col justify-between space-y-6 group transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(212,175,55,0.15)] cursor-pointer block"
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
                  <h4 className="text-base font-sans font-semibold tracking-tight text-white group-hover:text-[#D4AF37] transition-colors">
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
                <div className="w-full py-2.5 rounded-xl border border-[#2B2519] bg-[#16191F] group-hover:bg-gradient-to-r group-hover:from-[#D4AF37] group-hover:to-[#B89018] group-hover:text-black group-hover:border-[#D4AF37] text-[#D4AF37] text-xs font-sans font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-300 shadow-md">
                  {module.actionText}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

    </div>
  );
}