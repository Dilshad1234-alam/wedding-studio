"use client";
import React, { useState } from 'react';
import Link from 'next/link';

export default function WeddingManagementPage() {
  // Clients Data (Kept for KPI calculations)
  const [clients] = useState([
    { id: "WP-101", status: "SCHEDULED" },
    { id: "WP-102", status: "SCHEDULED" },
    { id: "WP-103", status: "CONFIRMED" },
    { id: "WP-104", status: "SCHEDULED" },
    { id: "WP-105", status: "DELIVERED" },
    { id: "WP-106", status: "DELIVERED" }
  ]);

  // Team Data (Kept for KPI calculations)
  const [team] = useState([
    { id: "T-01", isBusy: true },
    { id: "T-02", isBusy: true },
    { id: "T-03", isBusy: true },
    { id: "T-04", isBusy: false },
    { id: "T-05", isBusy: true },
    { id: "T-06", isBusy: false }
  ]);

  // Counts
  const busyCrew = team.filter(t => t.isBusy).length;
  const freeCrew = team.length - busyCrew;
  const deliveredEvents = clients.filter(c => c.status === 'DELIVERED').length;
  const pendingEvents = clients.length - deliveredEvents;

  return (
    <div className="min-h-screen bg-[#0B0D0E] text-[#F5F5F5] font-sans antialiased p-6 lg:p-10 space-y-8 selection:bg-[#D4AF37] selection:text-black">
      
      {/* 1. TOP HEADER */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-[#1F242D]">
        <div>
          <span className="text-[10px] font-mono font-bold tracking-[0.25em] text-[#D4AF37] uppercase block mb-1">
            WEDDING OPERATIONS CONTROL
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Wedding Management
          </h1>
          <p className="text-xs text-[#8A7D5C] mt-1">
            Master financial health, crew allocation bandwidth, and event command cards.
          </p>
        </div>
      </div>

      {/* 2. TOP MONTHLY REVENUE DECK */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-[#121518] border border-[#2B2519] rounded-2xl p-6 shadow-xl space-y-2">
          <span className="text-[10px] font-bold text-[#8A7D5C] uppercase tracking-wider block">Total Target (Sept 2026)</span>
          <div className="text-3xl font-black text-white">₹63.75L</div>
          <p className="text-[11px] text-[#A89D84]">{clients.length} Ceremonies Active</p>
        </div>

        <div className="bg-[#121518] border border-[#2B2519] rounded-2xl p-6 shadow-xl space-y-2">
          <span className="text-[10px] font-bold text-[#8A7D5C] uppercase tracking-wider block">Advance Realized</span>
          <div className="text-3xl font-black text-emerald-400">₹41.44L</div>
          <p className="text-[11px] text-[#A89D84]">65% Collections Secured</p>
        </div>

        <div className="bg-[#121518] border border-[#2B2519] rounded-2xl p-6 shadow-xl space-y-2">
          <span className="text-[10px] font-bold text-[#8A7D5C] uppercase tracking-wider block">Pending Receivables</span>
          <div className="text-3xl font-black text-[#F3E5AB]">₹22.31L</div>
          <p className="text-[11px] text-[#8A7D5C]">Due on Final Deliveries</p>
        </div>

        <div className="bg-[#121518] border border-[#2B2519] rounded-2xl p-6 shadow-xl space-y-2">
          <span className="text-[10px] font-bold text-[#8A7D5C] uppercase tracking-wider block">Average Deal Value</span>
          <div className="text-3xl font-black text-[#D4AF37]">₹3.90L</div>
          <p className="text-[11px] text-[#A89D84]">Cinema + Candid Suite</p>
        </div>
      </div>



      {/* SECTION 1: TEAM & CREW ROSTER */}
      <div className="pt-4 space-y-6">
        <div>
          <h2 className="text-xl font-extrabold text-white">Studio Crew & Roster Hub</h2>
          <p className="text-xs text-[#8A7D5C] mt-1">Manage personnel, monitor availability, and track live deployments.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* CARD 1: FULL TEAM DIRECTORY */}
          <Link className="group relative bg-gradient-to-b from-[#15181D] to-[#101215] border border-[#2B2519] hover:border-[#D4AF37] rounded-3xl p-7 shadow-2xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between space-y-5 block" href="/admin/team">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-[#1C2027] border border-[#3A311D] flex items-center justify-center text-xl group-hover:scale-110 group-hover:border-[#D4AF37] transition-all">
                  👥
                </div>
                <span className="text-[10px] font-mono font-bold text-[#D4AF37] bg-[#1C1812] border border-[#3A311D] px-2.5 py-1 rounded-full">
                  18 Crew Members
                </span>
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-white group-hover:text-[#F3E5AB] transition-colors">Master Team Directory</h3>
                <p className="text-xs text-[#A89D84] mt-1.5 leading-relaxed">Complete personnel roster. View addresses, direct phone lines, daily agreed payout rates, and active assignments.</p>
              </div>
            </div>
            <div className="pt-4 border-t border-[#1C1F24] flex items-center justify-between text-xs font-black uppercase tracking-wider text-[#D4AF37] group-hover:text-white">
              <span>Open Full Roster</span>
              <span className="text-base group-hover:translate-x-1 transition-transform">→</span>
            </div>
          </Link>

          {/* CARD 2: AVAILABLE / FREE CREW */}
          <Link className="group relative bg-gradient-to-b from-[#15181D] to-[#101215] border border-emerald-500/30 hover:border-emerald-400 rounded-3xl p-7 shadow-2xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between space-y-5 block" href="/admin/team/available">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 flex items-center justify-center text-xl group-hover:scale-110 transition-all text-emerald-400">
                  ⚡
                </div>
                <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-1 rounded-full animate-pulse">
                  Ready for Dispatch
                </span>
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-white group-hover:text-emerald-300 transition-colors">Available / Free Crew</h3>
                <p className="text-xs text-[#A89D84] mt-1.5 leading-relaxed">Personnel with zero conflicting bookings. Directly assign these available photographers and drone operators to new wedding inquiries.</p>
              </div>
            </div>
            <div className="pt-4 border-t border-[#1C1F24] flex items-center justify-between text-xs font-black uppercase tracking-wider text-emerald-400 group-hover:text-white">
              <span>View Free Personnel</span>
              <span className="text-base group-hover:translate-x-1 transition-transform">→</span>
            </div>
          </Link>

          {/* CARD 3: ASSIGNED / BUSY CREW */}
          <Link className="group relative bg-gradient-to-b from-[#15181D] to-[#101215] border border-rose-500/30 hover:border-rose-400 rounded-3xl p-7 shadow-2xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between space-y-5 block" href="/admin/team/busy">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-rose-950/40 border border-rose-500/40 flex items-center justify-center text-xl group-hover:scale-110 transition-all text-rose-400">
                  🔥
                </div>
                <span className="text-[10px] font-mono font-bold text-rose-400 bg-rose-500/10 border border-rose-500/30 px-2.5 py-1 rounded-full">
                  Locked On Duty
                </span>
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-white group-hover:text-rose-300 transition-colors">Assigned / Busy Crew</h3>
                <p className="text-xs text-[#A89D84] mt-1.5 leading-relaxed">Track personnel currently out on field missions. Monitor their exact client assignments, destinations, and return dates.</p>
              </div>
            </div>
            <div className="pt-4 border-t border-[#1C1F24] flex items-center justify-between text-xs font-black uppercase tracking-wider text-rose-400 group-hover:text-white">
              <span>View Busy Roster</span>
              <span className="text-base group-hover:translate-x-1 transition-transform">→</span>
            </div>
          </Link>
          
        </div>
      </div>

      {/* SECTION 2: CLIENT CEREMONIES & OPERATIONS */}
      <div className="pt-4 border-t border-[#1F242D] space-y-6">
        <div>
          <h2 className="text-xl font-extrabold text-white">Client Operations Hub</h2>
          <p className="text-xs text-[#8A7D5C] mt-1">Manage booked weddings, active contracts, and financials.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* CARD 1: FULL DISPATCH TABLE */}
          <Link className="group relative bg-gradient-to-b from-[#15181D] to-[#101215] border border-[#2B2519] hover:border-[#D4AF37] rounded-3xl p-7 shadow-2xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between space-y-5 block" href="/admin/dispatch">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-[#1C2027] border border-[#3A311D] flex items-center justify-center text-xl group-hover:scale-110 group-hover:border-[#D4AF37] transition-all">
                  💍
                </div>
                <span className="text-[10px] font-mono font-bold text-[#D4AF37] bg-[#1C1812] border border-[#3A311D] px-2.5 py-1 rounded-full">
                  51 Active Missions
                </span>
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-white group-hover:text-[#F3E5AB] transition-colors">All Weddings & Ceremonies</h3>
                <p className="text-xs text-[#A89D84] mt-1.5 leading-relaxed">Open the complete dispatch table. View all active client missions, update shoot statuses, manage dates, and schedule new bookings.</p>
              </div>
            </div>
            <div className="pt-4 border-t border-[#1C1F24] flex items-center justify-between text-xs font-black uppercase tracking-wider text-[#D4AF37] group-hover:text-white">
              <span>Open Master Dispatch</span>
              <span className="text-base group-hover:translate-x-1 transition-transform">→</span>
            </div>
          </Link>

          {/* CARD 2: COMPLETED / DELIVERED */}
          <Link className="group relative bg-gradient-to-b from-[#15181D] to-[#101215] border border-emerald-500/30 hover:border-emerald-400 rounded-3xl p-7 shadow-2xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between space-y-5 block" href="/admin/dispatch/completed">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 flex items-center justify-center text-xl group-hover:scale-110 transition-all text-emerald-400">
                  ✅
                </div>
                <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-1 rounded-full">
                  22 Total Completed
                </span>
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-white group-hover:text-emerald-300 transition-colors">Delivered Client Weddings</h3>
                <p className="text-xs text-[#A89D84] mt-1.5 leading-relaxed">List of client contracts where shooting, color grading, and final media deliveries have been successfully executed.</p>
              </div>
            </div>
            <div className="pt-4 border-t border-[#1C1F24] flex items-center justify-between text-xs font-black uppercase tracking-wider text-emerald-400 group-hover:text-white">
              <span>View Completed</span>
              <span className="text-base group-hover:translate-x-1 transition-transform">→</span>
            </div>
          </Link>

          {/* CARD 3: PENDING / UPCOMING */}
          <Link className="group relative bg-gradient-to-b from-[#15181D] to-[#101215] border border-amber-500/30 hover:border-amber-400 rounded-3xl p-7 shadow-2xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between space-y-5 block" href="/admin/dispatch/pending">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-amber-950/40 border border-amber-500/40 flex items-center justify-center text-xl group-hover:scale-110 transition-all text-amber-400">
                  ⏳
                </div>
                <span className="text-[10px] font-mono font-bold text-amber-400 bg-amber-500/10 border border-amber-500/30 px-2.5 py-1 rounded-full animate-pulse">
                  29 Total Pending
                </span>
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-white group-hover:text-amber-300 transition-colors">Upcoming Client Weddings</h3>
                <p className="text-xs text-[#A89D84] mt-1.5 leading-relaxed">List of active client contracts requiring shooting, color grading, and final media deliveries.</p>
              </div>
            </div>
            <div className="pt-4 border-t border-[#1C1F24] flex items-center justify-between text-xs font-black uppercase tracking-wider text-amber-400 group-hover:text-white">
              <span>View Pending</span>
              <span className="text-base group-hover:translate-x-1 transition-transform">→</span>
            </div>
          </Link>

        </div>
      </div>

    </div>
  );
}
