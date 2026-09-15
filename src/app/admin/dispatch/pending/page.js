"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function PendingClientsPage() {
  const [clientToDelete, setClientToDelete] = useState(null);
  const [selectedYear, setSelectedYear] = useState(2026);
  const [selectedMonth, setSelectedMonth] = useState('SEP');
  const [expandedClientId, setExpandedClientId] = useState(null);

  const monthsList = [
    { key: 'JAN', name: 'JAN', num: 1 },
    { key: 'FEB', name: 'FEB', num: 2 },
    { key: 'MAR', name: 'MAR', num: 3 },
    { key: 'APR', name: 'APR', num: 4 },
    { key: 'MAY', name: 'MAY', num: 5 },
    { key: 'JUN', name: 'JUN', num: 6 },
    { key: 'JUL', name: 'JUL', num: 7 },
    { key: 'AUG', name: 'AUG', num: 8 },
    { key: 'SEP', name: 'SEP', num: 9 },
    { key: 'OCT', name: 'OCT', num: 10 },
    { key: 'NOV', name: 'NOV', num: 11 },
    { key: 'DEC', name: 'DEC', num: 12 }
  ];

  const yearsList = [2026, 2027, 2028, 2029, 2030];

  const parseDateString = (dateStr) => {
    if (!dateStr) return null;
    const parsed = new Date(dateStr);
    return isNaN(parsed.getTime()) ? null : parsed;
  };

  const [pendingList, setPendingList] = useState([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const allClientsRaw = localStorage.getItem('weddingpur_dispatch_clients');
      let allClients = [];
      if (allClientsRaw) {
        try { allClients = JSON.parse(allClientsRaw); } catch(e){}
      }

      const today = new Date();

      // Filter clients whose dates are still upcoming or ongoing (not completed yet)
      const upcomingClients = allClients.filter(client => {
        if (!client.schedule || client.schedule.length === 0) return true;
        const lastDay = client.schedule[client.schedule.length - 1];
        const endDate = parseDateString(lastDay?.date);
        
        if (endDate) {
          return endDate >= today; // Still active or upcoming
        }
        return true; // Keep if date format is custom
      });

      setPendingList(upcomingClients);
    }
  }, []);

  const filteredClients = pendingList.filter(
    (c) => c.year === selectedYear && c.month === selectedMonth
  );

  const getMonthClientCount = (mKey) => {
    return pendingList.filter((c) => c.year === selectedYear && c.month === mKey).length;
  };

  const confirmDeletePendingClient = () => {
    if (!clientToDelete) return;
    const updated = pendingList.filter(c => c.id !== clientToDelete.id);
    setPendingList(updated);
    if (typeof window !== 'undefined') {
      localStorage.setItem('weddingpur_dispatch_clients', JSON.stringify(updated));
    }
    setClientToDelete(null);
  };

  return (
    <div className="min-h-screen bg-[#0B0D0E] text-[#F5F5F5] font-sans antialiased p-6 lg:p-10 space-y-6 selection:bg-[#D4AF37] selection:text-black">
      
      {/* 1. TOP HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#1F242D]">
        <div>
          <span className="text-[10px] font-mono font-bold tracking-[0.25em] text-amber-400 uppercase block mb-1">
            PENDING & UPCOMING OPERATIONS
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white font-sans">
            Pending / Upcoming Weddings
          </h1>
          <p className="text-xs text-[#8A7D5C] mt-1">
            Month-by-month active client contracts requiring shooting, color grading, and final media deliveries.
          </p>
        </div>

        <Link className="px-4 py-2.5 rounded-xl border border-[#2B2519] bg-[#121518] hover:border-[#D4AF37] text-[#D4AF37] text-xs font-black uppercase tracking-wider transition-all cursor-pointer self-start sm:self-auto" href="/admin/wedding-management">
          ← Back to Wedding Management
        </Link>
      </div>

      {/* 2. YEAR & 12-MONTH TIMELINE NAVIGATION BAR */}
      <div className="bg-[#121518] border border-[#2B2519] rounded-3xl p-4 sm:p-5 shadow-2xl space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#1F242D] pb-3.5">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-[#8A7D5C] uppercase tracking-wider">
              OPERATIONAL YEAR:
            </span>
            <div className="flex items-center gap-1.5 bg-[#0B0D0E] p-1 rounded-xl border border-[#2B2519]">
              {yearsList.map((yr) => (
                <button
                  key={yr}
                  type="button"
                  onClick={() => setSelectedYear(yr)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                    selectedYear === yr
                      ? 'bg-gradient-to-r from-amber-400 to-amber-600 text-black font-bold shadow-md'
                      : 'text-[#8A7D5C] hover:text-white'
                  }`}
                >
                  {yr}
                </button>
              ))}
            </div>
          </div>

          <div className="text-xs font-mono text-amber-400">
            Active Schedule: <span className="font-bold text-white uppercase">{selectedMonth} {selectedYear}</span>
          </div>
        </div>

        {/* 12 Months Ribbon */}
        <div className="grid grid-cols-3 sm:grid-cols-6 lg:grid-cols-12 gap-1.5">
          {monthsList.map((m) => {
            const isCurrentMonth = selectedMonth === m.key;
            const count = getMonthClientCount(m.key);

            return (
              <button
                key={m.key}
                type="button"
                onClick={() => {
                  setSelectedMonth(m.key);
                  setExpandedClientId(null);
                }}
                className={`py-2.5 px-2 rounded-xl text-xs font-mono font-bold uppercase transition-all cursor-pointer flex flex-col items-center justify-center gap-1 relative ${
                  isCurrentMonth
                    ? 'bg-amber-400 text-black font-bold shadow-lg shadow-amber-400/25'
                    : 'bg-[#181B20] text-[#A89D84] hover:text-white hover:bg-[#20252E] border border-[#2B2519]'
                }`}
              >
                <span>{m.name}</span>
                {count > 0 ? (
                  <span className={`text-[9px] px-1.5 py-0.2 rounded-full font-mono font-bold ${
                    isCurrentMonth ? 'bg-black text-amber-400' : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                  }`}>
                    {count} {count === 1 ? 'pending' : 'pending'}
                  </span>
                ) : (
                  <span className="text-[9px] opacity-30">—</span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. ROSTER SUMMARY & EXPANDABLE CLIENT CARDS */}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
            <span className="text-sm font-bold text-white uppercase tracking-wider font-mono">
              Pending Weddings for {selectedMonth} {selectedYear} ({filteredClients.length})
            </span>
          </div>
          <span className="text-xs text-[#8A7D5C] font-mono">
            Click card to inspect daily work & crew assignment
          </span>
        </div>

        {filteredClients.length === 0 ? (
          <div className="bg-[#121518] border border-dashed border-[#2B2519] rounded-3xl p-12 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#181B20] border border-[#2B2519] text-2xl flex items-center justify-center mx-auto text-[#8A7D5C]">
              ⏳
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">No Pending Weddings in {selectedMonth} {selectedYear}</h3>
              <p className="text-xs text-[#8A7D5C] max-w-sm mx-auto mt-1">
                There are no active or upcoming client dispatch records logged for this month yet.
              </p>
            </div>
          </div>
        ) : (
          filteredClients.map((client, sIdx) => {
            const isExpanded = expandedClientId === client.id;
            const serialNo = sIdx + 1;

            return (
              <div
                key={client.id}
                className="bg-[#121518] border border-[#2B2519] hover:border-amber-500/40 rounded-3xl overflow-hidden shadow-2xl transition-all"
              >
                {/* Card Header */}
                <div
                  onClick={() => setExpandedClientId(isExpanded ? null : client.id)}
                  className="p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer hover:bg-[#15191F] transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-2xl bg-[#0B0D0E] border border-[#2B2519] text-amber-400 flex items-center justify-center font-black text-sm font-mono shrink-0">
                      #{serialNo}
                    </div>

                    <div className="w-12 h-10 rounded-xl bg-[#1C2027] border border-[#2B2519] text-amber-300 flex items-center justify-center font-bold text-xs font-mono shrink-0">
                      {client.daysCount}D
                    </div>

                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                        {client.clientName}
                      </h3>
                      <span className="text-xs text-[#8A7D5C] font-mono block sm:inline">
                        📍 {client.destination} • {client.daysCount} Days Multi-Day Ceremony
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-5 self-end md:self-auto flex-wrap">
                    <div className="text-right">
                      <span className="text-[10px] text-[#8A7D5C] uppercase font-bold block font-mono">Contract Fee</span>
                      <span className="text-lg sm:text-xl font-bold font-mono text-emerald-400">{client.totalBudget}</span>
                    </div>

                    <div className="text-right">
                      <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase bg-amber-500/10 text-amber-400 border border-amber-500/20 block">
                        {client.status || "SCHEDULED / PENDING"}
                      </span>
                      <span className="text-[10px] text-[#8A7D5C] block mt-1">Active Work Pending</span>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setClientToDelete(client);
                      }}
                      className="p-2 rounded-xl border border-[#2B2519] bg-[#16191F] text-[#8A7D5C] hover:text-rose-400 hover:border-rose-500/50 hover:bg-rose-500/10 transition-all duration-200 cursor-pointer inline-flex items-center justify-center"
                      title="Delete Record"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>

                    <span className="text-xs text-[#8A7D5C] font-mono">
                      {isExpanded ? '▲ HIDE' : '▼ ROSTER'}
                    </span>
                  </div>
                </div>

                {/* Expanded Day-Wise Roster Table */}
                {isExpanded && (
                  <div className="border-t border-[#1F242D] bg-[#0E1013] p-6 space-y-4 overflow-x-auto">
                    <div className="flex items-center justify-between pb-2">
                      <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-amber-400">
                        SL. NO. {serialNo} — {client.clientName} ({client.daysCount} DAYS PENDING DEPLOYMENT)
                      </span>
                      <span className="text-[10px] text-amber-400 font-mono font-bold">
                        ⏳ Shoot & Deliverables Pending
                      </span>
                    </div>

                    <table className="w-full text-left text-xs border-collapse min-w-[950px]">
                      <thead>
                        <tr className="bg-[#181B20] text-amber-400 border-y border-[#2B2519] text-[10px] font-mono font-bold uppercase">
                          <th className="p-3">Day</th>
                          <th className="p-3">Date</th>
                          <th className="p-3">Event / Ritual</th>
                          <th className="p-3">Location</th>
                          <th className="p-3">Trad. Photo</th>
                          <th className="p-3">Candid Photo</th>
                          <th className="p-3">All-Type Photo</th>
                          <th className="p-3">Trad. Video</th>
                          <th className="p-3">Cinema Lead</th>
                          <th className="p-3">Drone Pilot</th>
                          <th className="p-3">Call Time</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#1C2027]">
                        {client.schedule.map((day) => (
                          <tr key={day.dayNo} className="hover:bg-[#151921] transition-colors">
                            <td className="p-3 font-mono font-bold text-white bg-[#121518]">Day {day.dayNo}</td>
                            <td className="p-3 font-mono font-bold text-amber-400">{day.date}</td>
                            <td className="p-3 font-semibold text-white">{day.eventName}</td>
                            <td className="p-3 text-[#A89D84]">{day.location}</td>
                            <td className="p-3 text-[#F5F5F5] font-medium">{day.tradPhoto || '—'}</td>
                            <td className="p-3 text-[#C5B388] font-medium">{day.candidPhoto || '—'}</td>
                            <td className="p-3 text-cyan-400 font-medium">{day.allTypePhoto || '—'}</td>
                            <td className="p-3 text-[#F5F5F5] font-medium">{day.tradVideo || '—'}</td>
                            <td className="p-3 text-emerald-400 font-bold">{day.cinema || '—'}</td>
                            <td className="p-3 text-amber-400">{day.drone || '—'}</td>
                            <td className="p-3 font-mono text-amber-300">{day.reportingTime || '—'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* DELETE CONFIRMATION MODAL */}
      {clientToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 font-sans">
          <div className="bg-[#121518] border border-[#2B2519] rounded-3xl p-7 shadow-2xl max-w-sm w-full relative space-y-5 animate-in fade-in zoom-in duration-200">
            
            <div className="w-12 h-12 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400 mx-auto">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </div>

            <div className="text-center space-y-1.5">
              <h3 className="text-base font-sans font-semibold text-white">
                Delete Client Record?
              </h3>
              <p className="text-xs text-[#A89D84] leading-relaxed">
                Are you sure you want to remove <strong className="text-white">{clientToDelete.clientName}</strong>? This action cannot be undone.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                type="button"
                onClick={() => setClientToDelete(null)}
                className="w-full py-2.5 rounded-xl border border-[#2B2519] bg-[#16191F] text-[#A89D84] hover:text-white hover:border-[#D4AF37]/50 text-xs font-sans font-semibold uppercase tracking-wider transition-all cursor-pointer"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={confirmDeletePendingClient}
                className="w-full py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-sans font-semibold uppercase tracking-wider transition-all shadow-md shadow-rose-600/30 cursor-pointer"
              >
                Yes, Delete
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}