"use client";
import React, { useState, useEffect } from 'react';

export default function TeamPage() {
  const [teamMembers, setTeamMembers] = useState([]);
  const [dispatches, setDispatches] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form state
  const [name, setName] = useState('');
  const [role, setRole] = useState('Traditional Photographer');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [instagram, setInstagram] = useState('');
  const [gear, setGear] = useState('');

  const loadData = async () => {
    try {
      const [teamRes, dispRes] = await Promise.all([
        fetch('/api/admin/team'),
        fetch('/api/dispatches')
      ]);
      const teamData = await teamRes.json();
      const dispData = await dispRes.json();

      if (teamData.success || Array.isArray(teamData)) {
        setTeamMembers(teamData.team || teamData.data || (Array.isArray(teamData) ? teamData : []));
      }
      if (dispData.success || Array.isArray(dispData)) {
        setDispatches(dispData.data || dispData.dispatches || []);
      }
    } catch (err) {
      console.error("Failed to load team data:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleAddMember = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    try {
      const res = await fetch('/api/admin/team', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, role, phone, city, instagram, gear })
      });
      if (res.ok) {
        setName('');
        setRole('Traditional Photographer');
        setPhone('');
        setCity('');
        setInstagram('');
        setGear('');
        setIsModalOpen(false);
        loadData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteMember = async (id) => {
    try {
      await fetch(`/api/admin/team?id=${id}`, { method: 'DELETE' });
      loadData();
    } catch (err) {
      console.error(err);
    }
  };

  const getActiveDispatch = (memberName) => {
    if (!dispatches || dispatches.length === 0) return null;
    return dispatches.find((d) => {
      const match =
        (d.memberName && d.memberName.toLowerCase().includes(memberName.toLowerCase())) ||
        (Array.isArray(d.assignedCrew) &&
          d.assignedCrew.some((c) =>
            (typeof c === 'string' ? c : c.name).toLowerCase().includes(memberName.toLowerCase())
          ));
      return match && d.status !== 'completed' && d.status !== 'cancelled' && d.status !== 'Returned' && d.status !== 'Production Completed';
    });
  };

  const onDutyCount = teamMembers.filter((m) => getActiveDispatch(m.name)).length;
  const availableCount = teamMembers.length - onDutyCount;

  return (
    <div className="w-full font-sans antialiased text-[#F5F5F5] px-6 sm:px-10 py-8 bg-[#0B0D0E] min-h-screen">
      
      {/* 1. Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 w-full">
        <div>
          <span className="text-[11px] font-black uppercase tracking-[0.3em] text-[#D4AF37] block mb-1">
            ROYALE CREW OPERATIONS
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Team & Crew Roster
          </h1>
        </div>

        <div className="flex items-center gap-4">
          {/* High-Contrast Bold Metric Badge */}
          <div className="flex items-center bg-[#121518] border border-[#2B2519] rounded-xl px-5 py-2.5 text-xs text-white font-semibold gap-3.5 shadow-2xl">
            <span className="font-bold text-white">{teamMembers.length} Total Crew</span>
            <span className="text-[#3A3222]">|</span>
            <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></span>
              {availableCount} Available
            </span>
            <span className="text-[#3A3222]">|</span>
            <span className="flex items-center gap-1.5 text-[#D4AF37] font-bold">
              <span className="w-2.5 h-2.5 rounded-full bg-[#D4AF37] shadow-[0_0_8px_rgba(212,175,55,0.5)]"></span>
              {onDutyCount} On Shoot
            </span>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-gradient-to-r from-[#D4AF37] to-[#B89018] hover:from-[#F3E5AB] hover:to-[#D4AF37] text-black px-6 py-2.5 rounded-xl text-xs uppercase tracking-wider font-black shadow-lg shadow-[#D4AF37]/20 transition-all flex items-center gap-2 cursor-pointer"
          >
            <span>+</span>
            <span>ADD MEMBER</span>
          </button>
        </div>
      </div>

      {/* Structured Black & Gold Table Matching Live Crew Dispatch */}
      <div className="w-full border border-[#2B2519] rounded-2xl shadow-2xl overflow-hidden bg-[#121518]">
        
        {/* Table Title Bar */}
        <div className="px-6 py-4 bg-[#16191D] border-b border-[#2B2519] flex items-center justify-between">
          <h2 className="font-bold text-lg text-white tracking-wide">
            Active Crew Directory
          </h2>
          <span className="text-xs font-bold text-[#D4AF37]">
            {teamMembers.length} Registered Crew Members
          </span>
        </div>

        {/* Dedicated Column Headings */}
        <div className="grid grid-cols-12 gap-3 px-6 py-3.5 bg-[#0E1012] text-[11px] uppercase tracking-wider text-[#C5B388] font-bold border-b border-[#2B2519]">
          <div className="col-span-2">MEMBER</div>
          <div className="col-span-2">ROLE</div>
          <div className="col-span-2">PHONE NUMBER</div>
          <div className="col-span-1">CITY</div>
          <div className="col-span-1">INSTAGRAM ID</div>
          <div className="col-span-2">ASSIGNED GEAR</div>
          <div className="col-span-1">STATUS</div>
          <div className="col-span-1 text-right">ACTIONS</div>
        </div>

        {/* Rows */}
        {isLoading ? (
          <div className="py-14 text-center text-[#D4AF37] text-xs font-bold tracking-widest animate-pulse">
            LOADING CREW DIRECTORY...
          </div>
        ) : teamMembers.length === 0 ? (
          <div className="py-16 text-center text-[#8A7D5C] font-medium text-sm">
            No crew members registered yet. Click "+ ADD MEMBER" above.
          </div>
        ) : (
          <div className="divide-y divide-[#201D16]">
            {teamMembers.map((member) => {
              const activeJob = getActiveDispatch(member.name);
              const isDispatched = !!activeJob;

              // Format clean Instagram Handle
              const cleanInsta = member.instagram
                ? member.instagram.replace(/^https?:\/\/(www\.)?instagram\.com\//, '').replace(/\/$/, '')
                : '';

              return (
                <div
                  key={member._id || member.id || member.name}
                  className="grid grid-cols-12 gap-3 px-6 py-4 items-center bg-[#121518] hover:bg-[#181B1F] transition-colors text-xs"
                >
                  {/* 1. MEMBER */}
                  <div className="col-span-2 flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#D4AF37] to-[#8C6B08] text-black flex items-center justify-center font-black text-xs shrink-0 shadow-sm">
                      {member.name.charAt(0).toUpperCase()}
                    </div>
                    <span className="font-bold text-sm text-white truncate">
                      {member.name}
                    </span>
                  </div>

                  {/* 2. ROLE */}
                  <div className="col-span-2 text-[#D4AF37] font-bold text-xs uppercase tracking-wider truncate">
                    {member.role}
                  </div>

                  {/* 3. PHONE NUMBER */}
                  <div className="col-span-2 font-mono text-xs font-semibold text-[#EAEAEA]">
                    {member.phone ? (
                      <a
                        href={`tel:${member.phone}`}
                        className="hover:text-[#D4AF37] hover:underline transition-colors flex items-center gap-1.5"
                      >
                        <span className="text-[#D4AF37]">📞</span>
                        <span>{member.phone}</span>
                      </a>
                    ) : (
                      <span className="text-[#554C34]">—</span>
                    )}
                  </div>

                  {/* 4. CITY */}
                  <div className="col-span-1 text-[#C5B388] font-bold text-xs capitalize truncate">
                    {member.city ? (
                      <span className="inline-flex items-center gap-1">
                        <span>📍</span>
                        <span>{member.city}</span>
                      </span>
                    ) : (
                      <span className="text-[#554C34]">Patna</span>
                    )}
                  </div>

                  {/* 5. INSTAGRAM ID */}
                  <div className="col-span-1 text-xs truncate">
                    {cleanInsta ? (
                      <a
                        href={member.instagram.startsWith('http') ? member.instagram : `https://instagram.com/${cleanInsta}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#D4AF37] hover:text-[#F3E5AB] hover:underline font-mono"
                        title={cleanInsta}
                      >
                        @{cleanInsta}
                      </a>
                    ) : (
                      <span className="text-[#554C34] font-mono">—</span>
                    )}
                  </div>

                  {/* 6. ASSIGNED GEAR */}
                  <div className="col-span-2 text-[#A89D84] text-xs font-medium truncate" title={member.gear}>
                    {member.gear || "Standard Studio Kit"}
                  </div>

                  {/* 7. STATUS */}
                  <div className="col-span-1">
                    {isDispatched ? (
                      <span className="bg-[#2B2310] text-[#D4AF37] border border-[#D4AF37]/40 px-2.5 py-1 rounded-full text-[9px] font-black tracking-wider uppercase inline-block">
                        ON SHOOT
                      </span>
                    ) : (
                      <span className="bg-[#0E2818] text-emerald-400 border border-emerald-500/40 px-2.5 py-1 rounded-full text-[9px] font-black tracking-wider uppercase inline-block">
                        READY
                      </span>
                    )}
                  </div>

                  {/* 8. ACTIONS */}
                  <div className="col-span-1 text-right">
                    <button
                      onClick={() => handleDeleteMember(member._id || member.id)}
                      className="p-1.5 rounded-lg text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 transition-all cursor-pointer border border-transparent hover:border-rose-500/20"
                      title="Delete Member"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4 h-4 ml-auto"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M3 6h18" />
                        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                        <line x1="10" y1="11" x2="10" y2="17" />
                        <line x1="14" y1="11" x2="14" y2="17" />
                      </svg>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Add Member Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#121518] border border-[#3A3222] rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-[#2B2519] mb-6">
              <h3 className="font-black text-xl text-white tracking-tight">Add Team Member</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-white text-lg cursor-pointer transition-colors"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddMember} className="space-y-4">
              <div>
                <label className="block text-[11px] uppercase tracking-wider font-bold text-[#D4AF37] mb-1">
                  FULL NAME *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#181B1F] border border-[#2B2519] text-white rounded-xl px-3.5 py-2.5 text-xs font-semibold focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider font-bold text-[#D4AF37] mb-1">
                  ROLE
                </label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full bg-[#181B1F] border border-[#2B2519] text-white rounded-xl px-3.5 py-2.5 text-xs font-semibold focus:outline-none focus:border-[#D4AF37]"
                >
                  <option value="Traditional Photographer">Traditional Photographer</option>
                  <option value="Candid Photographer">Candid Photographer</option>
                  <option value="Cinematographer">Cinematographer</option>
                  <option value="Drone Pilot">Drone Pilot</option>
                  <option value="Traditional Videographer">Traditional Videographer</option>
                  <option value="Traditional Photographer & Videographer">Traditional Photographer & Videographer</option>
                  <option value="LED Wall Operator (LED Ball / Display)">LED Wall Operator (LED Ball / Display)</option>
                  <option value="All Rounder (All Types / Multi-Skill)">All Rounder (All Types / Multi-Skill)</option>
                  <option value="Post-Production Editor">Post-Production Editor</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider font-bold text-[#D4AF37] mb-1">
                  PHONE / WHATSAPP *
                </label>
                <input
                  type="text"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-[#181B1F] border border-[#2B2519] text-white rounded-xl px-3.5 py-2.5 text-xs font-semibold focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider font-bold text-[#D4AF37] mb-1">
                  CITY / BASE LOCATION *
                </label>
                <input
                  type="text"
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="e.g. Patna, Ranchi"
                  className="w-full bg-[#181B1F] border border-[#2B2519] text-white rounded-xl px-3.5 py-2.5 text-xs font-semibold focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider font-bold text-[#D4AF37] mb-1">
                  INSTAGRAM / PORTFOLIO
                </label>
                <input
                  type="text"
                  value={instagram}
                  onChange={(e) => setInstagram(e.target.value)}
                  className="w-full bg-[#181B1F] border border-[#2B2519] text-white rounded-xl px-3.5 py-2.5 text-xs font-semibold focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider font-bold text-[#D4AF37] mb-1">
                  ASSIGNED GEAR
                </label>
                <input
                  type="text"
                  value={gear}
                  onChange={(e) => setGear(e.target.value)}
                  placeholder="e.g. Sony A7IV, FX3, Mavic 3 Pro"
                  className="w-full bg-[#181B1F] border border-[#2B2519] text-white rounded-xl px-3.5 py-2.5 text-xs font-semibold focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-2.5 rounded-full border border-[#2B2519] text-xs uppercase font-bold text-[#C5B388] hover:bg-[#181B1F] transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#AA820A] text-black text-xs uppercase font-black shadow-md hover:brightness-110 transition-all"
                >
                  Add Member
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
