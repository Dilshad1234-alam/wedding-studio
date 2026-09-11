"use client";
import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';

function AvailableCrewContent() {
  const [teamMembers, setTeamMembers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [memberToDelete, setMemberToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // 1. Fetch Master Directory Team Members from Backend
  useEffect(() => {
    fetch('/api/commercial/team')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setTeamMembers(data);
        }
        setIsLoading(false);
      })
      .catch(err => {
        console.error("Error fetching team members:", err);
        setIsLoading(false);
      });
  }, []);

  // 2. Master Brand/Commercial Shoots Roster Database (Cross-referenced to identify busy crew)
  const allClientAssignments = [
    { crewName: "John Doe" },
    { crewName: "Jane Smith" }
  ];

  // 3. Filter Members Who Have ZERO Shoots Across the Roster (Free / Available)
  const availableMembers = teamMembers.filter((member) => {
    const memberNameClean = (member.name || '').toLowerCase().trim();
    const isAssigned = allClientAssignments.some(
      a => a.crewName.toLowerCase().trim() === memberNameClean
    );
    return !isAssigned;
  });

  // Delete Crew Member Handler
  const confirmDeleteMember = async () => {
    if (!memberToDelete) return;
    setIsDeleting(true);

    const id = memberToDelete._id || memberToDelete.id;

    // Optimistic UI update
    setTeamMembers(prev => prev.filter(m => (m._id || m.id) !== id));

    try {
      await fetch(`/api/commercial/team?id=${id}`, {
        method: 'DELETE',
      });
    } catch (err) {
      console.error("Failed to delete crew member:", err);
    } finally {
      setIsDeleting(false);
      setMemberToDelete(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0D0E] text-[#F5F5F5] font-sans antialiased p-6 lg:p-10 space-y-6 selection:bg-emerald-400 selection:text-black">
      
      {/* 1. TOP BREADCRUMB & HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#1F242D]">
        <div>
          <span className="text-[10px] font-mono font-bold tracking-[0.25em] text-emerald-400 uppercase block mb-1">
            WEDDING OPERATIONS CONTROL
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white font-sans flex items-center gap-3">
            <span>Available Crew</span>
            <span className="text-xl">⚡</span>
          </h1>
          <p className="text-xs text-[#8A7D5C] mt-1 font-normal font-sans">
            Studio personnel with zero conflicting bookings across the master schedule. Ready for instant dispatch.
          </p>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <Link className="px-4 py-2.5 rounded-xl border border-[#2B2519] bg-[#121518] hover:border-emerald-400 text-emerald-400 text-xs font-sans font-semibold uppercase tracking-wider transition-all shadow-md" href="/admin/wedding-management">
            ← Back to Hub
          </Link>

          <Link className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B89018] hover:from-[#F3E5AB] hover:to-[#D4AF37] text-black text-xs font-sans font-semibold uppercase tracking-wider shadow-lg shadow-[#D4AF37]/25 transition-all" href="/admin/commercial-team">
            Master Directory ↗
          </Link>
        </div>
      </div>

      {/* 2. TABLE CONTAINER */}
      <div className="bg-[#121518] border border-emerald-900/30 rounded-3xl p-6 lg:p-8 shadow-2xl shadow-emerald-900/10 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-extrabold text-white font-sans">Free Personnel & Bench</h2>
            <p className="text-xs text-[#8A7D5C] mt-0.5 font-sans">
              Showing {availableMembers.length} unassigned crew member{availableMembers.length === 1 ? '' : 's'} available for new contracts
            </p>
          </div>
          <span className="px-3 py-1 rounded-lg text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 uppercase tracking-wider">
            Ready For Instant Dispatch
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[950px]">
            <thead>
              <tr className="border-b border-[#20252F] text-[10px] font-mono font-bold tracking-wider uppercase text-[#8A7D5C] bg-[#15191F]">
                <th className="py-4 px-6">TEAM MEMBER</th>
                <th className="py-4 px-6">CRAFT / ROLE</th>
                <th className="py-4 px-6">RESIDENTIAL ADDRESS / CITY</th>
                <th className="py-4 px-6">AGREED PAYOUT / RATE</th>
                <th className="py-4 px-6">AVAILABILITY</th>
                <th className="py-4 px-6">MOBILE NUMBER</th>
                <th className="py-4 px-6 text-center">ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#181B22] text-xs font-sans">
              {isLoading ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-xs font-mono text-emerald-400 animate-pulse">
                    Scanning Roster Bandwidth...
                  </td>
                </tr>
              ) : availableMembers.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-xs font-mono text-[#8A7D5C]">
                    <div className="flex flex-col items-center justify-center space-y-2">
                      <span className="text-3xl">🔥</span>
                      <p className="text-white font-sans font-semibold text-sm">
                        All Crew Members Are Currently Assigned On Shoots
                      </p>
                      <p className="text-[#8A7D5C] text-xs font-sans">
                        Zero free personnel available on bench. View active duties in the <Link href="/admin/commercial-team/busy" className="text-emerald-400 underline">Assigned Roster</Link>.
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                availableMembers.map((t, idx) => {
                  const memberId = t._id || t.id || `avail-${idx}`;
                  return (
                    <tr key={memberId} className="hover:bg-[#161A20] transition-colors">
                      
                      {/* Name */}
                      <td className="py-4 px-6 font-semibold text-white text-[13px] tracking-tight">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                          <span>{t.name}</span>
                        </div>
                      </td>

                      {/* Craft / Role */}
                      <td className="py-4 px-6 font-mono text-[11px] font-bold text-[#D4AF37] tracking-wider uppercase">
                        {t.craftRole || t.role}
                      </td>

                      {/* Residential Address */}
                      <td className="py-4 px-6 text-[#A89D84]">
                        {t.city || t.address || 'Patna, Bihar'}
                      </td>

                      {/* Agreed Payout */}
                      <td className="py-4 px-6 text-emerald-400 font-bold font-mono">
                        {t.agreedRate || t.payout || t.rate || '₹4,000 / Day'}
                      </td>

                      {/* Availability */}
                      <td className="py-4 px-6">
                        <span className="px-2.5 py-1 rounded-md text-[9px] font-mono font-bold uppercase bg-emerald-950/40 text-emerald-400 border border-emerald-500/30">
                          AVAILABLE
                        </span>
                      </td>

                      {/* Contact */}
                      <td className="py-4 px-6">
                        <a
                          href={`https://wa.me/91${(t.phone || t.whatsapp || '').replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(t.name)},%20we%20have%20an%20available%20shoot%20dispatch%20for%20you.`}
                          target="_blank"
                          rel="noreferrer"
                          className="font-mono text-white hover:text-emerald-400 transition-colors"
                        >
                          {t.phone || t.whatsapp || 'N/A'}
                        </a>
                      </td>

                      {/* Action (Delete) */}
                      <td className="py-4 px-6 text-center">
                        <button
                          type="button"
                          onClick={() => setMemberToDelete(t)}
                          title="Delete Crew Member"
                          className="p-2 rounded-xl border border-[#2B2519] bg-[#16191F] text-[#8A7D5C] hover:text-rose-400 hover:border-rose-500/50 hover:bg-rose-500/10 transition-all duration-200 cursor-pointer inline-flex items-center justify-center"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </td>

                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* CONFIRM DELETE MODAL (YES / NO) */}
      {memberToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 font-sans">
          <div className="bg-[#121518] border border-[#2B2519] rounded-3xl p-7 shadow-2xl max-w-sm w-full relative space-y-5 animate-in fade-in zoom-in duration-200">
            
            <div className="w-12 h-12 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400 mx-auto">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </div>

            <div className="text-center space-y-1.5">
              <h3 className="text-base font-sans font-semibold text-white">
                Delete Crew Member?
              </h3>
              <p className="text-xs text-[#A89D84] leading-relaxed">
                Are you sure you want to remove <strong className="text-white">{memberToDelete.name}</strong> from the studio roster? This action cannot be undone.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                type="button"
                onClick={() => setMemberToDelete(null)}
                disabled={isDeleting}
                className="w-full py-2.5 rounded-xl border border-[#2B2519] bg-[#16191F] text-[#A89D84] hover:text-white hover:border-[#D4AF37]/50 text-xs font-sans font-semibold uppercase tracking-wider transition-all cursor-pointer"
              >
                No, Cancel
              </button>

              <button
                type="button"
                onClick={confirmDeleteMember}
                disabled={isDeleting}
                className="w-full py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-sans font-semibold uppercase tracking-wider transition-all shadow-md shadow-rose-600/30 cursor-pointer disabled:opacity-50"
              >
                {isDeleting ? "Deleting..." : "Yes, Delete"}
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

export default function AvailableCrewPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0B0D0E] flex items-center justify-center text-emerald-400 font-mono text-sm">Checking Availability...</div>}>
      <AvailableCrewContent />
    </Suspense>
  );
}
