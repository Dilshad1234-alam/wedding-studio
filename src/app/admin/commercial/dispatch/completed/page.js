"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function CompletedCommercialPage() {
  const [selectedYear, setSelectedYear] = useState(2026);
  const [selectedMonth, setSelectedMonth] = useState('SEP');
  const [expandedCampaignId, setExpandedCampaignId] = useState(null);

  const monthsList = [
    { key: 'JAN', name: 'JAN' }, { key: 'FEB', name: 'FEB' }, { key: 'MAR', name: 'MAR' },
    { key: 'APR', name: 'APR' }, { key: 'MAY', name: 'MAY' }, { key: 'JUN', name: 'JUN' },
    { key: 'JUL', name: 'JUL' }, { key: 'AUG', name: 'AUG' }, { key: 'SEP', name: 'SEP' },
    { key: 'OCT', name: 'OCT' }, { key: 'NOV', name: 'NOV' }, { key: 'DEC', name: 'DEC' }
  ];

  const yearsList = [2026, 2027, 2028, 2029, 2030];

  const parseDateString = (dateStr) => {
    if (!dateStr) return null;
    const parsed = new Date(dateStr);
    return isNaN(parsed.getTime()) ? null : parsed;
  };

  const [completedList, setCompletedList] = useState([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const allCampaignsRaw = localStorage.getItem('weddingpur_commercial_dispatch');
      let allCampaigns = [];
      if (allCampaignsRaw) {
        try { allCampaigns = JSON.parse(allCampaignsRaw); } catch(e){}
      }

      const today = new Date();

      const autoCompleted = allCampaigns.filter(client => {
        if (client.status === 'DELIVERED') return true;
        if (!client.schedule || client.schedule.length === 0) return false;
        const lastDay = client.schedule[client.schedule.length - 1];
        const endDate = parseDateString(lastDay?.date);
        return endDate ? endDate < today : false;
      }).map(c => ({
        ...c,
        status: "DELIVERED & CLOSED"
      }));

      setCompletedList(autoCompleted);
    }
  }, []);

  const filteredCampaigns = completedList.filter(
    (c) => c.year === selectedYear && c.month === selectedMonth
  );

  const getMonthCount = (mKey) => {
    return completedList.filter((c) => c.year === selectedYear && c.month === mKey).length;
  };

  return (
    <div className="min-h-screen bg-[#0B0D0E] text-[#F5F5F5] font-sans antialiased p-6 lg:p-10 space-y-6 selection:bg-emerald-400 selection:text-black">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#1F242D]">
        <div>
          <span className="text-[10px] font-mono font-bold tracking-[0.25em] text-emerald-400 uppercase block mb-1">
            DELIVERED COMMERCIAL ARCHIVE
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white font-sans">
            Completed Brand Campaigns
          </h1>
          <p className="text-xs text-[#8A7D5C] mt-1 font-normal">
            Corporate ad campaigns and brand deliverables successfully executed and closed.
          </p>
        </div>

        <Link className="px-4 py-2.5 rounded-xl border border-[#2B2519] bg-[#121518] hover:border-emerald-400 text-emerald-400 text-xs font-black uppercase tracking-wider transition-all cursor-pointer" href="/admin/commercial/dispatch">
          ← Back to Commercial Dispatch
        </Link>
      </div>

      <div className="bg-[#121518] border border-[#2B2519] rounded-3xl p-4 sm:p-5 shadow-2xl space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#1F242D] pb-3.5">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-[#8A7D5C] uppercase tracking-wider">ARCHIVE YEAR:</span>
            <div className="flex items-center gap-1.5 bg-[#0B0D0E] p-1 rounded-xl border border-[#2B2519]">
              {yearsList.map((yr) => (
                <button
                  key={yr}
                  type="button"
                  onClick={() => setSelectedYear(yr)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                    selectedYear === yr ? 'bg-gradient-to-r from-emerald-400 to-teal-500 text-black font-bold shadow-md' : 'text-[#8A7D5C] hover:text-white'
                  }`}
                >
                  {yr}
                </button>
              ))}
            </div>
          </div>
          <div className="text-xs font-mono text-emerald-400">
            Active Archive: <span className="font-bold text-white uppercase">{selectedMonth} {selectedYear}</span>
          </div>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-6 lg:grid-cols-12 gap-1.5">
          {monthsList.map((m) => {
            const isCurrentMonth = selectedMonth === m.key;
            const count = getMonthCount(m.key);
            return (
              <button
                key={m.key}
                type="button"
                onClick={() => { setSelectedMonth(m.key); setExpandedCampaignId(null); }}
                className={`py-2.5 px-2 rounded-xl text-xs font-mono font-bold uppercase transition-all cursor-pointer flex flex-col items-center justify-center gap-1 relative ${
                  isCurrentMonth ? 'bg-emerald-400 text-black font-bold shadow-lg shadow-emerald-400/25' : 'bg-[#181B20] text-[#A89D84] hover:text-white hover:bg-[#20252E] border border-[#2B2519]'
                }`}
              >
                <span>{m.name}</span>
                {count > 0 ? (
                  <span className={`text-[9px] px-1.5 py-0.2 rounded-full font-mono font-bold ${isCurrentMonth ? 'bg-black text-emerald-400' : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'}`}>
                    {count} closed
                  </span>
                ) : (
                  <span className="text-[9px] opacity-30">—</span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
            <span className="text-sm font-bold text-white uppercase tracking-wider font-mono">
              Completed Campaigns for {selectedMonth} {selectedYear} ({filteredCampaigns.length})
            </span>
          </div>
        </div>

        {filteredCampaigns.length === 0 ? (
          <div className="bg-[#121518] border border-dashed border-[#2B2519] rounded-3xl p-12 text-center space-y-3">
            <span className="text-3xl">📁</span>
            <p className="text-white font-bold text-sm">No completed brand campaigns found for {selectedMonth} {selectedYear}.</p>
          </div>
        ) : (
          filteredCampaigns.map((client, sIdx) => {
            const isExpanded = expandedCampaignId === client.id;
            const serialNo = sIdx + 1;

            return (
              <div key={client.id} className="bg-[#121518] border border-[#2B2519] hover:border-emerald-500/40 rounded-3xl overflow-hidden shadow-2xl transition-all">
                <div
                  onClick={() => setExpandedCampaignId(isExpanded ? null : client.id)}
                  className="p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer hover:bg-[#15191F] transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-2xl bg-[#0B0D0E] border border-[#2B2519] text-emerald-400 flex items-center justify-center font-black text-sm font-mono shrink-0">
                      #{serialNo}
                    </div>
                    <div className="w-12 h-10 rounded-xl bg-[#1C2027] border border-[#2B2519] text-emerald-300 flex items-center justify-center font-bold text-xs font-mono shrink-0">
                      {client.daysCount}D
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">{client.brandName}</h3>
                      <span className="text-xs text-[#8A7D5C] font-mono block sm:inline">📍 {client.destination} • {client.daysCount} Days Production</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-5 self-end md:self-auto flex-wrap">
                    <div className="text-right">
                      <span className="text-[10px] text-[#8A7D5C] uppercase font-bold block font-mono">Budget</span>
                      <span className="text-lg sm:text-xl font-bold font-mono text-emerald-400">{client.totalBudget}</span>
                    </div>
                    <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      DELIVERED & CLOSED
                    </span>
                    <span className="text-xs text-[#8A7D5C] font-mono">
                      {isExpanded ? '▲ HIDE' : '▼ ROSTER'}
                    </span>
                  </div>
                </div>

                {isExpanded && (
                  <div className="border-t border-[#1F242D] bg-[#0E1013] p-6 space-y-4 overflow-x-auto">
                    <table className="w-full text-left text-xs border-collapse min-w-[850px]">
                      <thead>
                        <tr className="bg-[#181B20] text-emerald-400 border-y border-[#2B2519] text-[10px] font-mono font-bold uppercase">
                          <th className="p-3">Day</th>
                          <th className="p-3">Date</th>
                          <th className="p-3">Production Focus</th>
                          <th className="p-3">Location</th>
                          <th className="p-3">Director</th>
                          <th className="p-3">DP</th>
                          <th className="p-3">Drone</th>
                          <th className="p-3">Lighting</th>
                          <th className="p-3">Call Time</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#1C2027]">
                        {client.schedule.map((day) => (
                          <tr key={day.dayNo} className="hover:bg-[#151921] transition-colors">
                            <td className="p-3 font-mono font-bold text-white bg-[#121518]">{day.dayLabel || `Day ${day.dayNo}`}</td>
                            <td className="p-3 font-mono font-bold text-emerald-400">{day.date}</td>
                            <td className="p-3 font-semibold text-white">{day.eventName}</td>
                            <td className="p-3 text-[#A89D84]">{day.location}</td>
                            <td className="p-3 text-white">{day.director || '—'}</td>
                            <td className="p-3 text-[#C5B388]">{day.dp || '—'}</td>
                            <td className="p-3 text-cyan-400">{day.drone || '—'}</td>
                            <td className="p-3 text-amber-400">{day.lighting || '—'}</td>
                            <td className="p-3 font-mono text-emerald-300">{day.reportingTime || '—'}</td>
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
    </div>
  );
}