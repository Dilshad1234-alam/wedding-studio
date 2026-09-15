"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function WeddingManagementPage() {
  const [clients, setClients] = useState([]);
  const [team, setTeam] = useState([]);
  const [timeFilter, setTimeFilter] = useState('1M'); // '1M', '6M', '1Y'

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedClients = localStorage.getItem('weddingpur_dispatch_clients');
      if (savedClients) {
        try {
          setClients(JSON.parse(savedClients));
        } catch (e) {
          console.error(e);
        }
      }
    }

    fetch('/api/wedding/team')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setTeam(data);
        }
      })
      .catch(err => console.error(err));
  }, []);

  const parseBudget = (budgetStr) => {
    if (!budgetStr) return 0;
    const clean = String(budgetStr).replace(/[^0-9.]/g, '');
    return parseFloat(clean) || 0;
  };

  const filteredClients = clients.filter(c => {
    const month = c.month;
    const year = c.year || 2026;

    if (timeFilter === '1M') {
      return month === 'SEP' && year === 2026;
    } else if (timeFilter === '6M') {
      const allowedMonths = ['APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP'];
      return allowedMonths.includes(month) && year === 2026;
    } else if (timeFilter === '1Y') {
      return year === 2026;
    }
    return true;
  });

  const totalTargetNum = filteredClients.reduce((acc, c) => acc + parseBudget(c.totalBudget), 0);

  const formatCurrencyLakhs = (num) => {
    if (num === 0) return '₹0';
    if (num >= 100000) {
      return `₹${(num / 100000).toFixed(2)}L`;
    }
    return `₹${num.toLocaleString('en-IN')}`;
  };

  const busyCrew = team.filter(t => t.isBusy || t.status === 'BUSY').length || 4;
  const freeCrew = Math.max(0, team.length - busyCrew);
  const deliveredEvents = clients.filter(c => c.status === 'DELIVERED').length;
  const pendingEvents = clients.length - deliveredEvents;

  return (
    <div className="min-h-screen bg-[#0B0D0E] text-[#F5F5F5] font-sans antialiased p-6 lg:p-10 space-y-8 selection:bg-[#D4AF37] selection:text-black">
      
      {/* 1. TOP HEADER & TIME FILTER TOGGLE */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-[#1F242D]">
        <div>
          <span className="text-[10px] font-mono font-bold tracking-[0.25em] text-[#D4AF37] uppercase block mb-1">
            WEDDING OPERATIONS CONTROL
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white font-sans">
            Wedding Management
          </h1>
          <p className="text-xs font-sans text-[#8A7D5C] mt-1 font-normal">
            Master financial health, crew allocation bandwidth, and event command cards.
          </p>
        </div>

        {/* 1 Month / 6 Months / Year Filter Buttons */}
        <div className="flex flex-wrap items-center gap-1.5 bg-[#121518] p-1.5 rounded-2xl border border-[#2B2519] self-start lg:self-auto">
          <button
            type="button"
            onClick={() => setTimeFilter('1M')}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
              timeFilter === '1M'
                ? 'bg-gradient-to-r from-[#D4AF37] to-[#B89018] text-black font-black shadow-md'
                : 'text-[#8A7D5C] hover:text-white'
            }`}
          >
            1 Month
          </button>
          <button
            type="button"
            onClick={() => setTimeFilter('6M')}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
              timeFilter === '6M'
                ? 'bg-gradient-to-r from-[#D4AF37] to-[#B89018] text-black font-black shadow-md'
                : 'text-[#8A7D5C] hover:text-white'
            }`}
          >
            6 Months
          </button>
          <button
            type="button"
            onClick={() => setTimeFilter('1Y')}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
              timeFilter === '1Y'
                ? 'bg-gradient-to-r from-[#D4AF37] to-[#B89018] text-black font-black shadow-md'
                : 'text-[#8A7D5C] hover:text-white'
            }`}
          >
            Year 2026
          </button>
        </div>
      </div>

      {/* 2. TOP DYNAMIC FINANCIAL DECK (COMPACT CARDS) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        
        {/* CARD 1: REAL TOTAL TARGET */}
        <div className="bg-[#121518] border border-[#2B2519] rounded-3xl p-5 shadow-xl space-y-1.5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-[#D4AF37]/5 rounded-full blur-xl pointer-events-none"></div>
          <span className="text-[10px] font-sans font-semibold text-[#8A7D5C] uppercase tracking-wider block">
            Total Target Revenue ({timeFilter === '1M' ? 'September 2026' : timeFilter === '6M' ? 'Last 6 Months' : 'Full Year 2026'})
          </span>
          <div className="text-3xl font-sans font-bold tracking-tight text-white font-mono">
            {formatCurrencyLakhs(totalTargetNum)}
          </div>
          <p className="text-[11px] font-sans text-[#A89D84] font-medium">
            {filteredClients.length} Real Ceremonies Active in this period
          </p>
        </div>

        {/* CARD 2: REAL ACTIVE CONTRACTS / PIPELINE */}
        <div className="bg-[#121518] border border-[#2B2519] rounded-3xl p-5 shadow-xl space-y-1.5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-xl pointer-events-none"></div>
          <span className="text-[10px] font-sans font-semibold text-[#8A7D5C] uppercase tracking-wider block">
            Active Client Contracts ({timeFilter === '1M' ? 'September 2026' : timeFilter === '6M' ? 'Last 6 Months' : 'Full Year 2026'})
          </span>
          <div className="text-3xl font-sans font-bold tracking-tight text-emerald-400 font-mono">
            {filteredClients.length} Bookings
          </div>
          <p className="text-[11px] font-sans text-[#A89D84] font-medium">
            Fully synced with Master Dispatch Ledger
          </p>
        </div>

      </div>

      {/* SECTION 1: TEAM & CREW ROSTER */}
      <div className="pt-4 space-y-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white font-sans">Studio Crew & Roster Hub</h2>
          <p className="text-xs font-sans text-[#8A7D5C] mt-1 font-normal">Manage personnel, monitor availability, and track live deployments.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <Link className="group relative bg-[#121518] border border-[#2B2519] hover:border-[#D4AF37] rounded-3xl p-7 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(212,175,55,0.15)] flex flex-col justify-between space-y-6 block cursor-pointer" href="/admin/team">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-[#1A1E24] border border-[#2B2519] flex items-center justify-center text-xl group-hover:scale-110 group-hover:border-[#D4AF37] transition-all">
                  👥
                </div>
                <span className="text-[10px] font-mono font-bold text-[#D4AF37] bg-[#1C1812] border border-[#3A311D] px-2.5 py-1 rounded-lg">
                  18 Crew Members
                </span>
              </div>
              <div>
                <h3 className="text-base font-sans font-semibold tracking-tight text-white group-hover:text-[#D4AF37] transition-colors">Master Team Directory</h3>
                <span className="text-[10px] font-sans font-semibold text-[#8A7D5C] uppercase tracking-wider block mb-2 mt-1">STATUS: Active Directory</span>
                <p className="text-xs font-sans text-[#A89D84] font-normal leading-relaxed">Complete personnel roster. View addresses, direct phone lines, daily agreed payout rates, and active assignments.</p>
              </div>
            </div>
            <div className="pt-4 border-t border-[#1C1F24]">
              <div className="w-full py-2.5 rounded-xl border border-[#2B2519] bg-[#16191F] group-hover:bg-gradient-to-r group-hover:from-[#D4AF37] group-hover:to-[#B89018] group-hover:text-black group-hover:border-[#D4AF37] text-[#D4AF37] text-xs font-sans font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-300 shadow-md">
                <span>Open Full Roster</span>
                <span>→</span>
              </div>
            </div>
          </Link>

          <Link className="group relative bg-[#121518] border border-emerald-500/30 hover:border-emerald-400 rounded-3xl p-7 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(52,211,153,0.15)] flex flex-col justify-between space-y-6 block cursor-pointer" href="/admin/team/available">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 flex items-center justify-center text-xl group-hover:scale-110 transition-all text-emerald-400">
                  ⚡
                </div>
                <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-1 rounded-lg animate-pulse">
                  Ready for Dispatch
                </span>
              </div>
              <div>
                <h3 className="text-base font-sans font-semibold tracking-tight text-white group-hover:text-emerald-300 transition-colors">Available / Free Crew</h3>
                <span className="text-[10px] font-sans font-semibold text-emerald-400/80 uppercase tracking-wider block mb-2 mt-1">STATUS: {freeCrew} Unassigned</span>
                <p className="text-xs font-sans text-[#A89D84] font-normal leading-relaxed">Personnel with zero conflicting bookings. Directly assign these available photographers and drone operators to new wedding inquiries.</p>
              </div>
            </div>
            <div className="pt-4 border-t border-[#1C1F24]">
              <div className="w-full py-2.5 rounded-xl border border-[#2B2519] bg-[#16191F] group-hover:bg-gradient-to-r group-hover:from-emerald-400 group-hover:to-teal-500 group-hover:text-black text-emerald-400 text-xs font-sans font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-300 shadow-md">
                <span>View Free Personnel</span>
                <span>→</span>
              </div>
            </div>
          </Link>

          <Link className="group relative bg-[#121518] border border-rose-500/30 hover:border-rose-400 rounded-3xl p-7 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(251,113,133,0.15)] flex flex-col justify-between space-y-6 block cursor-pointer" href="/admin/team/busy">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-rose-950/40 border border-rose-500/40 flex items-center justify-center text-xl group-hover:scale-110 transition-all text-rose-400">
                  🔥
                </div>
                <span className="text-[10px] font-mono font-bold text-rose-400 bg-rose-500/10 border border-rose-500/30 px-2.5 py-1 rounded-lg">
                  Locked On Duty
                </span>
              </div>
              <div>
                <h3 className="text-base font-sans font-semibold tracking-tight text-white group-hover:text-rose-300 transition-colors">Assigned / Busy Crew</h3>
                <span className="text-[10px] font-sans font-semibold text-rose-400/80 uppercase tracking-wider block mb-2 mt-1">STATUS: {busyCrew} Field Active</span>
                <p className="text-xs font-sans text-[#A89D84] font-normal leading-relaxed">Track personnel currently out on field missions. Monitor their exact client assignments, destinations, and return dates.</p>
              </div>
            </div>
            <div className="pt-4 border-t border-[#1C1F24]">
              <div className="w-full py-2.5 rounded-xl border border-[#2B2519] bg-[#16191F] group-hover:bg-gradient-to-r group-hover:from-rose-400 group-hover:to-red-500 group-hover:text-black text-rose-400 text-xs font-sans font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-300 shadow-md">
                <span>View Busy Roster</span>
                <span>→</span>
              </div>
            </div>
          </Link>
          
        </div>
      </div>

      {/* SECTION 2: CLIENT CEREMONIES & OPERATIONS */}
      <div className="pt-4 border-t border-[#1F242D] space-y-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white font-sans">Client Operations Hub</h2>
          <p className="text-xs font-sans text-[#8A7D5C] mt-1 font-normal">Manage booked weddings, active contracts, and financials.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <Link className="group relative bg-[#121518] border border-[#2B2519] hover:border-[#D4AF37] rounded-3xl p-7 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(212,175,55,0.15)] flex flex-col justify-between space-y-6 block cursor-pointer" href="/admin/dispatch">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-[#1A1E24] border border-[#2B2519] flex items-center justify-center text-xl group-hover:scale-110 group-hover:border-[#D4AF37] transition-all">
                  💍
                </div>
                <span className="text-[10px] font-mono font-bold text-[#D4AF37] bg-[#1C1812] border border-[#3A311D] px-2.5 py-1 rounded-lg">
                  {clients.length} Active Missions
                </span>
              </div>
              <div>
                <h3 className="text-base font-sans font-semibold tracking-tight text-white group-hover:text-[#D4AF37] transition-colors">All Weddings & Ceremonies</h3>
                <span className="text-[10px] font-sans font-semibold text-[#8A7D5C] uppercase tracking-wider block mb-2 mt-1">STATUS: Master Ledger</span>
                <p className="text-xs font-sans text-[#A89D84] font-normal leading-relaxed">Open the complete dispatch table. View all active client missions, update shoot statuses, manage dates, and schedule new bookings.</p>
              </div>
            </div>
            <div className="pt-4 border-t border-[#1C1F24]">
              <div className="w-full py-2.5 rounded-xl border border-[#2B2519] bg-[#16191F] group-hover:bg-gradient-to-r group-hover:from-[#D4AF37] group-hover:to-[#B89018] group-hover:text-black group-hover:border-[#D4AF37] text-[#D4AF37] text-xs font-sans font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-300 shadow-md">
                <span>Open Master Dispatch</span>
                <span>→</span>
              </div>
            </div>
          </Link>

          <Link className="group relative bg-[#121518] border border-emerald-500/30 hover:border-emerald-400 rounded-3xl p-7 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(52,211,153,0.15)] flex flex-col justify-between space-y-6 block cursor-pointer" href="/admin/dispatch/completed">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 flex items-center justify-center text-xl group-hover:scale-110 transition-all text-emerald-400">
                  ✅
                </div>
                <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-1 rounded-lg">
                  {deliveredEvents} Completed
                </span>
              </div>
              <div>
                <h3 className="text-base font-sans font-semibold tracking-tight text-white group-hover:text-emerald-300 transition-colors">Delivered Client Weddings</h3>
                <span className="text-[10px] font-sans font-semibold text-emerald-400/80 uppercase tracking-wider block mb-2 mt-1">STATUS: Fully Settled</span>
                <p className="text-xs font-sans text-[#A89D84] font-normal leading-relaxed">List of client contracts where shooting, color grading, and final media deliveries have been successfully executed.</p>
              </div>
            </div>
            <div className="pt-4 border-t border-[#1C1F24]">
              <div className="w-full py-2.5 rounded-xl border border-[#2B2519] bg-[#16191F] group-hover:bg-gradient-to-r group-hover:from-emerald-400 group-hover:to-teal-500 group-hover:text-black text-emerald-400 text-xs font-sans font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-300 shadow-md">
                <span>View Completed</span>
                <span>→</span>
              </div>
            </div>
          </Link>

          <Link className="group relative bg-[#121518] border border-amber-500/30 hover:border-amber-400 rounded-3xl p-7 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(251,191,36,0.15)] flex flex-col justify-between space-y-6 block cursor-pointer" href="/admin/dispatch/pending">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-amber-950/40 border border-amber-500/40 flex items-center justify-center text-xl group-hover:scale-110 transition-all text-amber-400">
                  ⏳
                </div>
                <span className="text-[10px] font-mono font-bold text-amber-400 bg-amber-500/10 border border-amber-500/30 px-2.5 py-1 rounded-lg animate-pulse">
                  {pendingEvents} Active Pipeline
                </span>
              </div>
              <div>
                <h3 className="text-base font-sans font-semibold tracking-tight text-white group-hover:text-amber-300 transition-colors">Upcoming Client Weddings</h3>
                <span className="text-[10px] font-sans font-semibold text-amber-400/80 uppercase tracking-wider block mb-2 mt-1">STATUS: Production Pipeline</span>
                <p className="text-xs font-sans text-[#A89D84] font-normal leading-relaxed">List of active client contracts requiring shooting, color grading, and final media deliveries.</p>
              </div>
            </div>
            <div className="pt-4 border-t border-[#1C1F24]">
              <div className="w-full py-2.5 rounded-xl border border-[#2B2519] bg-[#16191F] group-hover:bg-gradient-to-r group-hover:from-[#D4AF37] group-hover:to-[#B89018] group-hover:text-black text-[#D4AF37] text-xs font-sans font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-300 shadow-md">
                <span>View Pending</span>
                <span>→</span>
              </div>
            </div>
          </Link>

        </div>
      </div>

    </div>
  );
}