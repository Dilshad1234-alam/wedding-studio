"use client";
import React, { useState, useEffect, useCallback, useMemo } from 'react';

export default function DispatchPage() {
  const [dispatches, setDispatches] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Form states
  const [clientName, setClientName] = useState('');
  const [destination, setDestination] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedCrew, setSelectedCrew] = useState([]);
  const [budget, setBudget] = useState('');

  const loadData = useCallback(async () => {
    setIsLoading(true);
    try {
      const [dispRes, teamRes] = await Promise.all([
        fetch('/api/dispatches', { cache: 'no-store' }),
        fetch('/api/admin/team', { cache: 'no-store' })
      ]);

      const dispData = await dispRes.json();
      const teamData = await teamRes.json();

      const list = Array.isArray(dispData) 
        ? dispData 
        : (dispData.data || dispData.dispatches || []);
      setDispatches(list);

      const teamList = Array.isArray(teamData) 
        ? teamData 
        : (teamData.data || teamData || []);
      setTeamMembers(teamList);
    } catch (err) {
      console.error("Failed to load dispatches:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Executive Revenue & Logistics Overview Calculations
  const metrics = useMemo(() => {
    const totalMissions = dispatches.length;
    const completedMissions = dispatches.filter(d => (d.status || '').toLowerCase() === 'completed').length;
    const activeMissions = dispatches.filter(d => (d.status || '').toLowerCase() !== 'completed' && (d.status || '').toLowerCase() !== 'cancelled').length;
    const onShootMissions = dispatches.filter(d => (d.status || '').toLowerCase() === 'traveling' || (d.status || '').toLowerCase() === 'on shoot').length;

    // Standard high-end wedding shoot benchmark (~₹1,25,000 per multi-day event or custom field)
    const baseRevenue = dispatches.reduce((acc, curr) => {
      const val = Number(curr.amount || curr.budget) || 125000;
      return acc + val;
    }, 0);

    const advanceRealized = Math.round(baseRevenue * 0.65); // 65% standard advance collected
    const pendingBalance = baseRevenue - advanceRealized;

    return {
      totalMissions,
      completedMissions,
      activeMissions,
      onShootMissions,
      baseRevenue,
      advanceRealized,
      pendingBalance
    };
  }, [dispatches]);

  const handleToggleCrew = (member) => {
    if (selectedCrew.some((c) => c.name === member.name)) {
      setSelectedCrew(selectedCrew.filter((c) => c.name !== member.name));
    } else {
      setSelectedCrew([...selectedCrew, member]);
    }
  };

  const handleCreateDispatch = async (e) => {
    e.preventDefault();
    if (!clientName.trim() || !destination.trim()) return;

    setIsSubmitting(true);
    const crewNames = selectedCrew.map((c) => c.name).join(', ');

    try {
      const res = await fetch('/api/dispatches', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clientEvent: clientName.trim(),
          clientName: clientName.trim(),
          memberName: crewNames || "Unassigned",
          destination: destination.trim(),
          startDate,
          endDate,
          dates: startDate && endDate ? `${startDate} to ${endDate}` : startDate || '',
          amount: budget ? Number(budget) : 125000,
          status: 'scheduled'
        })
      });

      if (res.ok) {
        setClientName('');
        setDestination('');
        setStartDate('');
        setEndDate('');
        setBudget('');
        setSelectedCrew([]);
        setIsModalOpen(false);
        loadData();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCSVUpload = async (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async ({ target }) => {
      try {
        const text = target.result;
        const lines = text.split('\n').map(l => l.trim()).filter(Boolean);
        if (lines.length <= 1) return;

        const parsedDispatches = [];
        for (let i = 1; i < lines.length; i++) {
          const cols = lines[i].split(',').map(c => c.replace(/^"|"$/g, '').trim());
          const client = cols[1] || cols[0];
          const date = cols[3] || cols[2] || '';
          const event = cols[4] || cols[3] || 'Wedding Event';
          const loc = cols[5] || cols[4] || 'Patna';
          const crew = cols.slice(6, 12).filter(c => c && c.toLowerCase() !== 'x').join(', ');

          if (client && client.toLowerCase() !== 'client name') {
            parsedDispatches.push({
              clientEvent: `${client} - ${event}`,
              clientName: client,
              destination: loc,
              dates: date,
              memberName: crew || 'Unassigned',
              status: 'scheduled'
            });
          }
        }

        if (parsedDispatches.length > 0) {
          const res = await fetch('/api/admin/dispatches/bulk', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ dispatches: parsedDispatches })
          });

          if (res.ok) {
            loadData();
            alert(`Imported ${parsedDispatches.length} missions successfully!`);
          }
        }
      } catch (err) {
        console.error("CSV parse error:", err);
      }
    };
    reader.readAsText(file);
    e.target.value = null;
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await fetch('/api/dispatches', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus })
      });
      loadData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteDispatch = async (id) => {
    if (!confirm("Are you sure you want to remove this dispatch?")) return;
    try {
      await fetch(`/api/dispatches?id=${id}`, { method: 'DELETE' });
      loadData();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="w-full font-sans antialiased text-[#F5F5F5] px-6 sm:px-10 py-8 bg-[#0B0D0E] min-h-screen">
      
      {/* 1. Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 w-full">
        <div>
          <span className="text-[11px] font-black uppercase tracking-[0.3em] text-[#D4AF37] block mb-1">
            ROYALE DISPATCH CONSOLE
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Operational Dashboard
          </h1>
        </div>

        <div className="flex items-center gap-3">
          {/* CSV Import */}
          <label className="border border-[#D4AF37]/50 text-[#D4AF37] hover:bg-[#D4AF37]/15 px-5 py-2.5 rounded-xl text-xs uppercase tracking-wider font-extrabold transition-all cursor-pointer flex items-center gap-2 shadow-md">
            <span>📥</span>
            <span>IMPORT CSV</span>
            <input type="file" accept=".csv" onChange={handleCSVUpload} className="hidden" />
          </label>

          {/* New Dispatch */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-gradient-to-r from-[#D4AF37] to-[#B89018] hover:from-[#F3E5AB] hover:to-[#D4AF37] text-black px-6 py-2.5 rounded-xl text-xs uppercase tracking-wider font-black shadow-lg shadow-[#D4AF37]/20 transition-all flex items-center gap-2 cursor-pointer"
          >
            <span>+</span>
            <span>NEW DISPATCH</span>
          </button>
        </div>
      </div>

      {/* 2. EXECUTIVE REVENUE & LOGISTICS OVERVIEW DECK */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        
        {/* Card 1: Total Projected Revenue */}
        <div className="bg-[#121518] border border-[#2B2519] hover:border-[#D4AF37]/40 rounded-2xl p-5 shadow-2xl transition-all">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] uppercase font-black tracking-widest text-[#8A7D5C]">
              PROJECTED REVENUE
            </span>
            <span className="w-7 h-7 rounded-lg bg-[#262013] text-[#D4AF37] flex items-center justify-center text-sm font-bold">
              ₹
            </span>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#FFFFFF] via-[#F3E5AB] to-[#D4AF37]">
            ₹{(metrics.baseRevenue / 100000).toFixed(2)}L
          </div>
          <div className="flex items-center gap-1.5 mt-2 text-[11px] text-[#A89D84]">
            <span className="text-emerald-400 font-bold">↑ Active Pipeline</span>
            <span>• {metrics.totalMissions} Contracts</span>
          </div>
        </div>

        {/* Card 2: Advance Collected */}
        <div className="bg-[#121518] border border-[#2B2519] hover:border-emerald-500/40 rounded-2xl p-5 shadow-2xl transition-all">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] uppercase font-black tracking-widest text-[#8A7D5C]">
              ADVANCE REALIZED
            </span>
            <span className="w-7 h-7 rounded-lg bg-[#0F291B] text-emerald-400 flex items-center justify-center text-xs font-black">
              ✓
            </span>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white">
            ₹{(metrics.advanceRealized / 100000).toFixed(2)}L
          </div>
          <div className="flex items-center gap-1.5 mt-2 text-[11px] text-emerald-400 font-bold">
            <span>65% Secured in Bank</span>
          </div>
        </div>

        {/* Card 3: Pending Balance */}
        <div className="bg-[#121518] border border-[#2B2519] hover:border-amber-500/40 rounded-2xl p-5 shadow-2xl transition-all">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] uppercase font-black tracking-widest text-[#8A7D5C]">
              PENDING RECEIVABLES
            </span>
            <span className="w-7 h-7 rounded-lg bg-[#2B2011] text-amber-400 flex items-center justify-center text-xs font-bold">
              ⏳
            </span>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-amber-200">
            ₹{(metrics.pendingBalance / 100000).toFixed(2)}L
          </div>
          <div className="flex items-center gap-1.5 mt-2 text-[11px] text-amber-400/80 font-bold">
            <span>Due on Final Delivery</span>
          </div>
        </div>

        {/* Card 4: Fleet & Deployments */}
        <div className="bg-[#121518] border border-[#2B2519] hover:border-[#D4AF37]/40 rounded-2xl p-5 shadow-2xl transition-all">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] uppercase font-black tracking-widest text-[#8A7D5C]">
              FLEET DEPLOYMENTS
            </span>
            <span className="w-7 h-7 rounded-lg bg-[#1B2129] text-[#38BDF8] flex items-center justify-center text-xs font-bold">
              ⚡
            </span>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white flex items-baseline gap-2">
            <span>{metrics.activeMissions}</span>
            <span className="text-xs text-[#8A7D5C] font-semibold">Active</span>
          </div>
          <div className="flex items-center gap-2 mt-2 text-[11px]">
            <span className="text-[#D4AF37] font-bold">
              📍 {metrics.onShootMissions} Traveling
            </span>
            <span className="text-[#3A3222]">•</span>
            <span className="text-[#8A7D5C] font-bold">
              {metrics.completedMissions} Delivered
            </span>
          </div>
        </div>

      </div>

      {/* 3. Black & Gold Table Container */}
      <div className="w-full border border-[#2B2519] rounded-2xl shadow-2xl overflow-hidden bg-[#121518]">
        <div className="px-6 py-4 bg-[#16191D] border-b border-[#2B2519] flex items-center justify-between">
          <h2 className="font-bold text-lg text-white tracking-wide">
            Live Crew Dispatch
          </h2>
          <span className="text-xs font-bold text-[#D4AF37]">
            {dispatches.length} Active {dispatches.length === 1 ? 'Mission' : 'Missions'}
          </span>
        </div>

        {/* Headings */}
        <div className="grid grid-cols-12 gap-4 px-6 py-3.5 bg-[#0E1012] text-[11px] uppercase tracking-wider text-[#C5B388] font-bold border-b border-[#2B2519]">
          <div className="col-span-3">CLIENT / EVENT</div>
          <div className="col-span-3">ASSIGNED CREW</div>
          <div className="col-span-2">DESTINATION</div>
          <div className="col-span-2">DATES</div>
          <div className="col-span-1">STATUS</div>
          <div className="col-span-1 text-right">ACTIONS</div>
        </div>

        {/* Table Rows */}
        {isLoading ? (
          <div className="py-14 text-center text-[#D4AF37] text-xs font-bold tracking-widest animate-pulse">
            SYNCHRONIZING FLEET OPERATIONS & REVENUE METRICS...
          </div>
        ) : dispatches.length === 0 ? (
          <div className="py-16 text-center text-[#8A7D5C] font-medium text-sm">
            No active dispatches found. Click "+ NEW DISPATCH" or "IMPORT CSV" to load missions.
          </div>
        ) : (
          <div className="divide-y divide-[#201D16]">
            {dispatches.map((item) => (
              <div
                key={item._id || item.id}
                className="grid grid-cols-12 gap-4 px-6 py-4 items-center bg-[#121518] hover:bg-[#181B1F] transition-colors text-xs"
              >
                {/* Client / Event */}
                <div className="col-span-3">
                  <span className="font-bold text-sm text-white block">
                    {item.clientEvent || item.clientName || 'Wedding Mission'}
                  </span>
                  <span className="text-[10px] text-[#8A7D5C] font-medium">
                    {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : ''}
                  </span>
                </div>

                {/* Assigned Crew */}
                <div className="col-span-3 text-[#EAEAEA] font-bold">
                  {item.memberName || 'Unassigned'}
                </div>

                {/* Destination */}
                <div className="col-span-2 text-[#D4AF37] flex items-center gap-1.5 font-bold">
                  <span>📍</span>
                  <span>{item.destination || 'Patna'}</span>
                </div>

                {/* Dates */}
                <div className="col-span-2 text-[#C5B388] font-mono text-[11px] font-semibold">
                  {item.dates || `${item.startDate ? String(item.startDate).slice(0, 10) : ''} to ${item.endDate ? String(item.endDate).slice(0, 10) : ''}`}
                </div>

                {/* Status Pill */}
                <div className="col-span-1">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-[#262013] text-[#D4AF37] border border-[#D4AF37]/40 shadow-sm">
                    {item.status}
                  </span>
                </div>

                {/* Actions */}
                <div className="col-span-1 text-right flex items-center justify-end gap-2">
                  <select
                    value={item.status}
                    onChange={(e) => handleStatusChange(item._id || item.id, e.target.value)}
                    className="bg-[#1C2025] text-[#D4AF37] border border-[#3A3222] text-[10px] font-bold rounded-lg px-2 py-1 focus:outline-none cursor-pointer"
                  >
                    <option value="scheduled">SCHEDULED</option>
                    <option value="traveling">TRAVELING</option>
                    <option value="confirmed">CONFIRMED</option>
                    <option value="completed">COMPLETED</option>
                  </select>
                  <button
                    onClick={() => handleDeleteDispatch(item._id || item.id)}
                    className="text-rose-400 hover:text-rose-300 p-1 cursor-pointer font-bold text-sm"
                    title="Delete"
                  >
                    🗑
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#121518] border border-[#3A3222] rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-[#2B2519] mb-6">
              <h3 className="font-black text-xl text-white tracking-tight">Create New Dispatch</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white text-lg cursor-pointer">✕</button>
            </div>

            <form onSubmit={handleCreateDispatch} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-bold text-[#D4AF37] mb-1">CLIENT NAME *</label>
                  <input
                    type="text"
                    required
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="e.g. Priya Kumari"
                    className="w-full bg-[#181B1F] border border-[#2B2519] text-white rounded-xl px-3.5 py-2.5 text-xs font-semibold focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-bold text-[#D4AF37] mb-1">DESTINATION CITY *</label>
                  <input
                    type="text"
                    required
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    placeholder="e.g. Sitamarhi"
                    className="w-full bg-[#181B1F] border border-[#2B2519] text-white rounded-xl px-3.5 py-2.5 text-xs font-semibold focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-bold text-[#D4AF37] mb-1">START DATE</label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full bg-[#181B1F] border border-[#2B2519] text-white rounded-xl px-3.5 py-2 text-xs font-semibold"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-bold text-[#D4AF37] mb-1">END DATE</label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full bg-[#181B1F] border border-[#2B2519] text-white rounded-xl px-3.5 py-2 text-xs font-semibold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider font-bold text-[#D4AF37] mb-1">CONTRACT / PACKAGE VALUE (₹)</label>
                <input
                  type="number"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  placeholder="e.g. 150000"
                  className="w-full bg-[#181B1F] border border-[#2B2519] text-white rounded-xl px-3.5 py-2 text-xs font-semibold focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider font-bold text-[#D4AF37] mb-2">ASSIGN CREW MEMBERS</label>
                <div className="bg-[#181B1F] border border-[#2B2519] rounded-xl p-3 max-h-48 overflow-y-auto space-y-2">
                  {teamMembers.map((m) => {
                    const isChecked = selectedCrew.some((c) => c.name === m.name);
                    return (
                      <label key={m._id || m.id || m.name} className="flex items-center gap-3 text-xs cursor-pointer p-1.5 hover:bg-[#20242A] rounded-lg">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => handleToggleCrew(m)}
                          className="accent-[#D4AF37] w-4 h-4 rounded cursor-pointer"
                        />
                        <span className="font-bold text-white">{m.name}</span>
                        <span className="text-[11px] text-[#8A7D5C]">({m.role})</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-2.5 rounded-full border border-[#2B2519] text-xs uppercase font-bold text-[#C5B388] hover:bg-[#181B1F]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#AA820A] text-black text-xs uppercase font-black shadow-md hover:brightness-110"
                >
                  {isSubmitting ? "Dispatching..." : "Confirm Dispatch"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
