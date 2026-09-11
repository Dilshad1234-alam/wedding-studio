"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function CommercialDispatchPage() {
  const [selectedYear, setSelectedYear] = useState(2026);
  const [selectedMonth, setSelectedMonth] = useState('OCT');
  const [expandedCampaignId, setExpandedCampaignId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const monthsList = [
    { key: 'JAN', name: 'JAN' }, { key: 'FEB', name: 'FEB' }, { key: 'MAR', name: 'MAR' },
    { key: 'APR', name: 'APR' }, { key: 'MAY', name: 'MAY' }, { key: 'JUN', name: 'JUN' },
    { key: 'JUL', name: 'JUL' }, { key: 'AUG', name: 'AUG' }, { key: 'SEP', name: 'SEP' },
    { key: 'OCT', name: 'OCT' }, { key: 'NOV', name: 'NOV' }, { key: 'DEC', name: 'DEC' }
  ];

  const yearsList = [2026, 2027, 2028, 2029, 2030];

  const defaultCampaigns = [
    {
      id: 201,
      brandName: "MANYAVAR MOHEY",
      destination: "Udaipur Palace",
      totalBudget: "₹12,50,000",
      status: "SCHEDULED",
      daysCount: 3,
      year: 2026,
      month: "OCT",
      schedule: [
        { dayNo: 1, date: "12 OCT 2026", eventName: "Diwali Fest TVC Day 1", location: "Udaipur Studio", director: "Rohit", dp: "Ritik Photo", drone: "Priyanshu", lighting: "Sikandar", reportingTime: "08:00 AM" },
        { dayNo: 2, date: "13 OCT 2026", eventName: "Social Shorts Production", location: "City Palace", director: "Rohit", dp: "Ritik Photo", drone: "Priyanshu", lighting: "Sikandar", reportingTime: "09:00 AM" },
        { dayNo: 3, date: "15 OCT 2026", eventName: "Product Packshots & Wrap", location: "Udaipur Resort", director: "Rohit", dp: "Ritik Photo", drone: "—", lighting: "Sikandar", reportingTime: "10:00 AM" }
      ]
    },
    {
      id: 202,
      brandName: "TANISHQ",
      destination: "Jaipur Heritage Fort",
      totalBudget: "₹8,00,000",
      status: "CONFIRMED",
      daysCount: 1,
      year: 2026,
      month: "OCT",
      schedule: [
        { dayNo: 1, date: "20 OCT 2026", eventName: "Bridal Collection Launch Video", location: "Amber Fort, Jaipur", director: "Sikandar", dp: "Ritik Cinema", drone: "Priyanshu", lighting: "Vinod", reportingTime: "07:00 AM" }
      ]
    },
    {
      id: 203,
      brandName: "KALYAN JEWELLERS",
      destination: "Kochi Beach Resort",
      totalBudget: "₹15,00,000",
      status: "DELIVERED",
      daysCount: 1,
      year: 2026,
      month: "SEP",
      schedule: [
        { dayNo: 1, date: "05 SEP 2026", eventName: "Onam Special Ad Shoot", location: "Kochi Studio", director: "Rohit", dp: "Sanoj", drone: "Priyanshu", lighting: "Pintu", reportingTime: "08:30 AM" }
      ]
    }
  ];

  const [campaigns, setCampaigns] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('weddingpur_commercial_dispatch');
      if (saved) {
        try { return JSON.parse(saved); } catch (e) { console.error(e); }
      }
    }
    return defaultCampaigns;
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('weddingpur_commercial_dispatch', JSON.stringify(campaigns));
    }
  }, [campaigns]);

  const [formData, setFormData] = useState({
    brandName: "",
    destination: "",
    totalBudget: "",
    status: "SCHEDULED",
    year: selectedYear,
    month: selectedMonth,
    days: [
      {
        dayNo: 1,
        dayOfMonth: "12",
        eventName: "TVC Commercial Shoot",
        location: "",
        director: "",
        dp: "",
        drone: "",
        lighting: "",
        reportingTime: "09:00 AM"
      }
    ]
  });

  const formatFullDate = (dayNum, month, year) => {
    if (!dayNum) return '';
    const cleanDay = String(dayNum).trim().padStart(2, '0');
    return `${cleanDay} ${month} ${year}`;
  };

  const filteredCampaigns = campaigns.filter(
    (c) => c.year === selectedYear && c.month === selectedMonth
  );

  const getMonthCampaignCount = (mKey) => {
    return campaigns.filter((c) => c.year === selectedYear && c.month === mKey).length;
  };

  const addDayRow = () => {
    const nextDayNo = formData.days.length + 1;
    setFormData({
      ...formData,
      days: [
        ...formData.days,
        {
          dayNo: nextDayNo,
          dayOfMonth: String(parseInt(formData.days[formData.days.length - 1]?.dayOfMonth || "12", 10) + 1),
          eventName: "Additional Coverage / Wrap",
          location: formData.days[0]?.location || "",
          director: "",
          dp: "",
          drone: "",
          lighting: "",
          reportingTime: "10:00 AM"
        }
      ]
    });
  };

  const removeDayRow = (idxToRemove) => {
    if (formData.days.length === 1) return;
    const updated = formData.days.filter((_, idx) => idx !== idxToRemove).map((item, idx) => ({ ...item, dayNo: idx + 1 }));
    setFormData({ ...formData, days: updated });
  };

  const updateDayField = (idx, field, value) => {
    const updated = [...formData.days];
    updated[idx][field] = value;
    setFormData({ ...formData, days: updated });
  };

  const handleSaveCampaign = (e) => {
    e.preventDefault();
    const formattedSchedule = formData.days.map(day => ({
      ...day,
      date: formatFullDate(day.dayOfMonth, formData.month, formData.year)
    }));

    const newCampaign = {
      id: Date.now(),
      brandName: formData.brandName || "Unnamed Brand",
      destination: formData.destination || "Patna Studio",
      totalBudget: formData.totalBudget.startsWith('₹') ? formData.totalBudget : `₹${formData.totalBudget}`,
      status: formData.status,
      daysCount: formData.days.length,
      year: parseInt(formData.year, 10),
      month: formData.month,
      schedule: formattedSchedule
    };

    setCampaigns([newCampaign, ...campaigns]);
    setExpandedCampaignId(newCampaign.id);
    setIsModalOpen(false);

    setSelectedYear(newCampaign.year);
    setSelectedMonth(newCampaign.month);
  };

  const deleteCampaign = (id) => {
    setCampaigns(campaigns.filter((c) => c.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#0B0D0E] text-[#F5F5F5] font-sans antialiased p-6 lg:p-10 space-y-6 selection:bg-[#D4AF37] selection:text-black">
      
      {/* TOP HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#1F242D]">
        <div>
          <span className="text-[10px] font-mono font-bold tracking-[0.25em] text-[#D4AF37] uppercase block mb-1">
            BRAND CAMPAIGN OPERATIONS CONTROL
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white font-sans">
            Commercial Dispatch
          </h1>
          <p className="text-xs text-[#8A7D5C] mt-1 font-normal">
            Month-by-month corporate ad shoots, multi-day call sheets, crew allocations, and agency deliverables.
          </p>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <Link className="px-4 py-2.5 rounded-xl border border-[#2B2519] bg-[#121518] hover:border-emerald-400 text-emerald-400 text-xs font-sans font-semibold uppercase tracking-wider transition-all" href="/admin/commercial/dispatch/completed">
            ✅ Completed Archive
          </Link>
          <Link className="px-4 py-2.5 rounded-xl border border-[#2B2519] bg-[#121518] hover:border-amber-400 text-amber-400 text-xs font-sans font-semibold uppercase tracking-wider transition-all" href="/admin/commercial/dispatch/pending">
            ⏳ Pending Pipeline
          </Link>
          <Link className="px-4 py-2.5 rounded-xl border border-[#2B2519] bg-[#121518] hover:border-[#D4AF37] text-[#D4AF37] text-xs font-sans font-semibold uppercase tracking-wider transition-all" href="/admin/commercial-management">
            ← Hub
          </Link>
          <button
            onClick={() => {
              setFormData((prev) => ({ ...prev, year: selectedYear, month: selectedMonth }));
              setIsModalOpen(true);
            }}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B89018] hover:from-[#F3E5AB] hover:to-[#D4AF37] text-black text-xs font-sans font-semibold uppercase tracking-wider shadow-lg shadow-[#D4AF37]/25 transition-all cursor-pointer"
          >
            + Add Campaign
          </button>
        </div>
      </div>

      {/* YEAR & 12-MONTH TIMELINE NAVIGATION BAR */}
      <div className="bg-[#121518] border border-[#2B2519] rounded-3xl p-4 sm:p-5 shadow-2xl space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#1F242D] pb-3.5">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-[#8A7D5C] uppercase tracking-wider">OPERATIONAL YEAR:</span>
            <div className="flex items-center gap-1.5 bg-[#0B0D0E] p-1 rounded-xl border border-[#2B2519]">
              {yearsList.map((yr) => (
                <button
                  key={yr}
                  type="button"
                  onClick={() => setSelectedYear(yr)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                    selectedYear === yr ? 'bg-gradient-to-r from-[#D4AF37] to-[#B89018] text-black font-bold shadow-md' : 'text-[#8A7D5C] hover:text-white'
                  }`}
                >
                  {yr}
                </button>
              ))}
            </div>
          </div>
          <div className="text-xs font-mono text-[#D4AF37]">
            Active Schedule: <span className="font-bold text-white uppercase">{selectedMonth} {selectedYear}</span>
          </div>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-6 lg:grid-cols-12 gap-1.5">
          {monthsList.map((m) => {
            const isCurrentMonth = selectedMonth === m.key;
            const count = getMonthCampaignCount(m.key);
            return (
              <button
                key={m.key}
                type="button"
                onClick={() => { setSelectedMonth(m.key); setExpandedCampaignId(null); }}
                className={`py-2.5 px-2 rounded-xl text-xs font-mono font-bold uppercase transition-all cursor-pointer flex flex-col items-center justify-center gap-1 relative ${
                  isCurrentMonth ? 'bg-[#D4AF37] text-black font-bold shadow-lg shadow-[#D4AF37]/25' : 'bg-[#181B20] text-[#A89D84] hover:text-white hover:bg-[#20252E] border border-[#2B2519]'
                }`}
              >
                <span>{m.name}</span>
                {count > 0 ? (
                  <span className={`text-[9px] px-1.5 py-0.2 rounded-full font-mono font-bold ${isCurrentMonth ? 'bg-black text-[#D4AF37]' : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'}`}>
                    {count} {count === 1 ? 'campaign' : 'campaigns'}
                  </span>
                ) : (
                  <span className="text-[9px] opacity-30">—</span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* CAMPAIGNS LIST */}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#D4AF37]"></span>
            <span className="text-sm font-bold text-white uppercase tracking-wider font-mono">
              Booked Brand Campaigns for {selectedMonth} {selectedYear} ({filteredCampaigns.length})
            </span>
          </div>
        </div>

        {filteredCampaigns.length === 0 ? (
          <div className="bg-[#121518] border border-dashed border-[#2B2519] rounded-3xl p-12 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#181B20] border border-[#2B2519] text-2xl flex items-center justify-center mx-auto text-[#8A7D5C]">🎬</div>
            <div>
              <h3 className="text-lg font-bold text-white">No Commercial Campaigns Scheduled in {selectedMonth} {selectedYear}</h3>
              <p className="text-xs text-[#8A7D5C] max-w-sm mx-auto mt-1">There are no brand dispatch records logged for this month yet.</p>
            </div>
            <button
              onClick={() => { setFormData((prev) => ({ ...prev, year: selectedYear, month: selectedMonth })); setIsModalOpen(true); }}
              className="px-5 py-2.5 rounded-xl bg-[#20252E] hover:bg-[#D4AF37] hover:text-black text-[#D4AF37] text-xs font-sans font-semibold uppercase tracking-wider border border-[#D4AF37]/40 transition-all cursor-pointer"
            >
              + Add Campaign for {selectedMonth} {selectedYear}
            </button>
          </div>
        ) : (
          filteredCampaigns.map((client, sIdx) => {
            const isExpanded = expandedCampaignId === client.id;
            const serialNo = sIdx + 1;

            return (
              <div key={client.id} className="bg-[#121518] border border-[#2B2519] hover:border-[#D4AF37]/40 rounded-3xl overflow-hidden shadow-2xl transition-all">
                <div
                  onClick={() => setExpandedCampaignId(isExpanded ? null : client.id)}
                  className="p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer hover:bg-[#15191F] transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-2xl bg-[#0B0D0E] border border-[#2B2519] text-[#D4AF37] flex items-center justify-center font-black text-sm font-mono shrink-0">
                      #{serialNo}
                    </div>
                    <div className="w-12 h-10 rounded-xl bg-[#1C2027] border border-[#2B2519] text-[#F3E5AB] flex items-center justify-center font-bold text-xs font-mono shrink-0">
                      {client.daysCount}D
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">{client.brandName}</h3>
                      <span className="text-xs text-[#8A7D5C] font-mono block sm:inline">📍 {client.destination} • {client.daysCount} Days Commercial Production</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-5 self-end md:self-auto flex-wrap">
                    <div className="text-right">
                      <span className="text-[10px] text-[#8A7D5C] uppercase font-bold block font-mono">Contract Budget</span>
                      <span className="text-lg sm:text-xl font-bold font-mono text-emerald-400">{client.totalBudget}</span>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase ${
                      client.status === 'CONFIRMED' ? 'bg-blue-500/15 text-blue-400 border border-blue-500/30' : client.status === 'DELIVERED' ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30' : 'bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/30'
                    }`}>
                      {client.status}
                    </span>
                    <button
                      type="button"
                      onClick={(e) => { e.stopPropagation(); deleteCampaign(client.id); }}
                      className="p-2 rounded-xl border border-[#2B2519] bg-[#16191F] text-[#8A7D5C] hover:text-rose-400 hover:border-rose-500/50 transition-all cursor-pointer inline-flex items-center justify-center"
                      title="Delete Campaign"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                    <span className="text-xs text-[#8A7D5C] font-mono">{isExpanded ? '▲ HIDE' : '▼ ROSTER'}</span>
                  </div>
                </div>

                {isExpanded && (
                  <div className="border-t border-[#1F242D] bg-[#0E1013] p-6 space-y-4 overflow-x-auto">
                    <table className="w-full text-left text-xs border-collapse min-w-[850px]">
                      <thead>
                        <tr className="bg-[#181B20] text-[#D4AF37] border-y border-[#2B2519] text-[10px] font-mono font-bold uppercase">
                          <th className="p-3">Day</th>
                          <th className="p-3">Date</th>
                          <th className="p-3">Production Focus</th>
                          <th className="p-3">Location</th>
                          <th className="p-3">Director</th>
                          <th className="p-3">DP</th>
                          <th className="p-3">Drone</th>
                          <th className="p-3">Lighting</th>
                          <th className="p-3">Reporting Time</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#1C2027]">
                        {client.schedule.map((day) => (
                          <tr key={day.dayNo} className="hover:bg-[#151921] transition-colors">
                            <td className="p-3 font-mono font-bold text-white bg-[#121518]">Day {day.dayNo}</td>
                            <td className="p-3 font-mono font-bold text-[#D4AF37]">{day.date}</td>
                            <td className="p-3 font-semibold text-white">{day.eventName}</td>
                            <td className="p-3 text-[#A89D84]">{day.location}</td>
                            <td className="p-3 text-white">{day.director || '—'}</td>
                            <td className="p-3 text-[#C5B388]">{day.dp || '—'}</td>
                            <td className="p-3 text-cyan-400">{day.drone || '—'}</td>
                            <td className="p-3 text-amber-400">{day.lighting || '—'}</td>
                            <td className="p-3 font-mono text-[#D4AF37]">{day.reportingTime || '—'}</td>
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

      {/* ADD CAMPAIGN MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 overflow-y-auto">
          <div className="bg-[#121518] border border-[#2B2519] rounded-3xl p-6 sm:p-8 max-w-4xl w-full space-y-6 shadow-2xl my-8">
            <div className="flex items-center justify-between border-b border-[#20252F] pb-4">
              <div>
                <span className="text-[10px] font-mono font-bold text-[#D4AF37] uppercase tracking-wider block">COMMERCIAL PRODUCTION BUILDER</span>
                <h3 className="text-xl font-bold text-white">Add Brand Campaign & Crew Call Sheet</h3>
              </div>
              <button type="button" onClick={() => setIsModalOpen(false)} className="text-[#8A7D5C] hover:text-white text-lg cursor-pointer">✕</button>
            </div>

            <form onSubmit={handleSaveCampaign} className="space-y-6 text-xs">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#0B0D0E] p-4 rounded-2xl border border-[#2B2519]">
                <div>
                  <label className="block text-[#8A7D5C] uppercase font-bold mb-1 text-[10px] font-mono">Year</label>
                  <select value={formData.year} onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value, 10) })} className="w-full bg-[#181B20] border border-[#2B2519] rounded-xl px-3 py-2 text-white font-mono font-bold">
                    {yearsList.map((y) => <option key={y} value={y}>{y}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-[#8A7D5C] uppercase font-bold mb-1 text-[10px] font-mono">Month</label>
                  <select value={formData.month} onChange={(e) => setFormData({ ...formData, month: e.target.value })} className="w-full bg-[#181B20] border border-[#2B2519] rounded-xl px-3 py-2 text-[#D4AF37] font-mono font-bold">
                    {monthsList.map((m) => <option key={m.key} value={m.key}>{m.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-[#8A7D5C] uppercase font-bold mb-1 text-[10px] font-mono">Budget (₹)</label>
                  <input type="text" required placeholder="10,00,000" value={formData.totalBudget} onChange={(e) => setFormData({ ...formData, totalBudget: e.target.value })} className="w-full bg-[#181B20] border border-[#2B2519] rounded-xl px-3 py-2 text-emerald-400 font-mono font-bold" />
                </div>
                <div>
                  <label className="block text-[#8A7D5C] uppercase font-bold mb-1 text-[10px] font-mono">Status</label>
                  <select value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })} className="w-full bg-[#181B20] border border-[#2B2519] rounded-xl px-3 py-2 text-white font-semibold">
                    <option value="SCHEDULED">SCHEDULED</option>
                    <option value="CONFIRMED">CONFIRMED</option>
                    <option value="DELIVERED">DELIVERED</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-[#15191F] p-4 rounded-2xl border border-[#2B2519]">
                <div>
                  <label className="block text-[#8A7D5C] uppercase font-bold mb-1 text-[10px] font-mono">Brand / Client Name</label>
                  <input type="text" required placeholder="e.g. Manyavar Mohey" value={formData.brandName} onChange={(e) => setFormData({ ...formData, brandName: e.target.value })} className="w-full bg-[#181B20] border border-[#2B2519] rounded-xl px-3 py-2 text-white font-bold" />
                </div>
                <div>
                  <label className="block text-[#8A7D5C] uppercase font-bold mb-1 text-[10px] font-mono">Production Destination</label>
                  <input type="text" required placeholder="e.g. Udaipur Palace" value={formData.destination} onChange={(e) => setFormData({ ...formData, destination: e.target.value })} className="w-full bg-[#181B20] border border-[#2B2519] rounded-xl px-3 py-2 text-white" />
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-white uppercase tracking-wider font-mono">Schedule By Day ({formData.days.length} Days)</h4>
                  <button type="button" onClick={addDayRow} className="px-4 py-1.5 rounded-xl bg-[#20252E] hover:bg-[#D4AF37] hover:text-black text-[#D4AF37] text-xs font-semibold uppercase tracking-wider border border-[#D4AF37]/40 transition-all cursor-pointer">
                    + Add Day {formData.days.length + 1}
                  </button>
                </div>

                <div className="space-y-4 max-h-[350px] overflow-y-auto pr-1">
                  {formData.days.map((day, idx) => (
                    <div key={day.dayNo} className="bg-[#181B20] border border-[#2B2519] rounded-2xl p-4 space-y-3">
                      <div className="flex items-center justify-between pb-2 border-b border-[#20252F]">
                        <span className="px-3 py-0.5 rounded-lg bg-[#0B0D0E] text-[#D4AF37] font-mono font-bold text-xs border border-[#2B2519]">DAY {day.dayNo}</span>
                        {formData.days.length > 1 && <button type="button" onClick={() => removeDayRow(idx)} className="text-rose-400 text-xs hover:underline cursor-pointer">Remove Day</button>}
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div>
                          <label className="block text-[#8A7D5C] text-[10px] font-mono uppercase font-bold mb-1">Date (Day)</label>
                          <div className="flex items-center gap-1.5">
                            <input type="text" required placeholder="12" value={day.dayOfMonth} onChange={(e) => updateDayField(idx, 'dayOfMonth', e.target.value)} className="w-20 bg-[#121518] border border-[#2B2519] rounded-lg px-2.5 py-1.5 text-white font-mono text-center font-bold" />
                            <span className="px-2.5 py-1.5 rounded-lg bg-[#0B0D0E] border border-[#2B2519] text-[#D4AF37] font-mono font-bold text-xs">{formData.month} {formData.year}</span>
                          </div>
                        </div>
                        <div>
                          <label className="block text-[#8A7D5C] text-[10px] font-mono uppercase font-bold mb-1">Production Focus</label>
                          <input type="text" required placeholder="TVC Ad Shoot" value={day.eventName} onChange={(e) => updateDayField(idx, 'eventName', e.target.value)} className="w-full bg-[#121518] border border-[#2B2519] rounded-lg px-2.5 py-1.5 text-white font-bold" />
                        </div>
                        <div>
                          <label className="block text-[#8A7D5C] text-[10px] font-mono uppercase font-bold mb-1">Location / Set</label>
                          <input type="text" required placeholder="Studio / Venue" value={day.location} onChange={(e) => updateDayField(idx, 'location', e.target.value)} className="w-full bg-[#121518] border border-[#2B2519] rounded-lg px-2.5 py-1.5 text-white" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-[#1C1F24] flex items-center justify-end gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 rounded-xl text-gray-400 hover:text-white cursor-pointer font-semibold">Cancel</button>
                <button type="submit" className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B89018] text-black font-bold uppercase tracking-wider shadow-md cursor-pointer">Save & Schedule</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}