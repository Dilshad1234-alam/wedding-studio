"use client";
import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';

function BusyCrewContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [teamMembers, setTeamMembers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [memberToDelete, setMemberToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [expandedCrewId, setExpandedCrewId] = useState(null);

  const monthsList = [
    { label: "All Months", value: "ALL" },
    { label: "January", value: "January" },
    { label: "February", value: "February" },
    { label: "March", value: "March" },
    { label: "April", value: "April" },
    { label: "May", value: "May" },
    { label: "June", value: "June" },
    { label: "July", value: "July" },
    { label: "August", value: "August" },
    { label: "September", value: "September" },
    { label: "October", value: "October" },
    { label: "November", value: "November" },
    { label: "December", value: "December" }
  ];

  // URL Query reading for Month Filter (Prevents refresh flicker)
  const queryMonth = searchParams.get('month');
  const matchedMonth = monthsList.find(m => m.value.toLowerCase() === (queryMonth || '').toLowerCase());
  const selectedMonth = matchedMonth ? matchedMonth.value : 'ALL';

  // 1. Fetch Master Directory Team Members from Backend
  useEffect(() => {
    fetch('/api/wedding/team')
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

  // 2. Master Client Shoots Roster Database
  const allClientAssignments = [
    { crewName: "Rohit", clientName: "PRIYA KUMARI", date: "22 Apr", month: "April", eventName: "Rituals (Bride)", location: "Sitamarhi Home", roleAssigned: "Traditional Photographer" },
    { crewName: "Rohit", clientName: "PRIYA KUMARI", date: "23 Apr", month: "April", eventName: "Haldi Shoot", location: "Sitamarhi Home", roleAssigned: "Traditional Photographer" },
    { crewName: "Rohit", clientName: "PRIYA KUMARI", date: "25 Apr", month: "April", eventName: "Rituals (Groom)", location: "Begusarai Home", roleAssigned: "Traditional Photographer" },
    { crewName: "Rohit", clientName: "PRIYA KUMARI", date: "26 Apr", month: "April", eventName: "Wedding Day", location: "Hajipur, Patna", roleAssigned: "Traditional Photographer" },
    { crewName: "Rohit", clientName: "RAVI RANJAN", date: "04 May", month: "May", eventName: "Sangeet", location: "Hotel Anand Sagar, Kankarbagh", roleAssigned: "Traditional Photographer" },
    { crewName: "Rohit", clientName: "RAVI RANJAN", date: "05 May", month: "May", eventName: "Haldi, Mehndi", location: "Biscomaun Colony, Kumhrar", roleAssigned: "Traditional Photographer" },
    { crewName: "Rohit", clientName: "RAVI RANJAN", date: "06 May", month: "May", eventName: "Madwa", location: "Biscomaun Colony, Kumhrar", roleAssigned: "Traditional Photographer" },
    { crewName: "Rohit", clientName: "RAVI RANJAN", date: "07 May", month: "May", eventName: "Wedding Day", location: "Bhagwat Banquet Hall", roleAssigned: "Traditional Photographer" },
    { crewName: "Rohit", clientName: "ABHINAV KRISHNA", date: "08 May", month: "May", eventName: "Haldi Kutai", location: "Bihar Sharif", roleAssigned: "Traditional Photographer" },
    { crewName: "Rohit", clientName: "ABHINAV KRISHNA", date: "09 May", month: "May", eventName: "Tilak", location: "Bihar Sharif", roleAssigned: "Traditional Photographer" },
    { crewName: "Rohit", clientName: "ABHINAV KRISHNA", date: "10 May", month: "May", eventName: "Puja & Matkor", location: "Bihar Sharif", roleAssigned: "Traditional Photographer" },
    { crewName: "Rohit", clientName: "NIKITA KUMARI", date: "27 Apr", month: "April", eventName: "Engagement", location: "Begusarai", roleAssigned: "Traditional Photographer" },
    { crewName: "Rohit", clientName: "NIKITA KUMARI", date: "22 June", month: "June", eventName: "Haldi", location: "Barh", roleAssigned: "Traditional Photographer" },
    { crewName: "Rohit", clientName: "NIKITA KUMARI", date: "24 June", month: "June", eventName: "Wedding Day", location: "Patna Bailey Road", roleAssigned: "Traditional Photographer" },
    { crewName: "Rohit", clientName: "APARNA", date: "01 Dec", month: "December", eventName: "Rituals (Groom)", location: "Patliputra, Patna", roleAssigned: "Traditional Photographer" },
    { crewName: "Rohit", clientName: "SHYAMLI SHARMA", date: "23 Nov", month: "November", eventName: "Rituals (Bride)", location: "Sherghati", roleAssigned: "Traditional Photographer" },
    { crewName: "Rohit", clientName: "ANKIT KUMAR", date: "29 Nov", month: "November", eventName: "Tilak", location: "Patna to Siwan", roleAssigned: "Traditional Photographer" },

    { crewName: "Sanoj", clientName: "PRIYA KUMARI", date: "22 Apr", month: "April", eventName: "Rituals (Bride)", location: "Sitamarhi Home", roleAssigned: "Traditional Videographer & Drone" },
    { crewName: "Sanoj", clientName: "PRIYA KUMARI", date: "23 Apr", month: "April", eventName: "Haldi Shoot", location: "Sitamarhi Home", roleAssigned: "Traditional Videographer" },
    { crewName: "Sanoj", clientName: "PRIYA KUMARI", date: "25 Apr", month: "April", eventName: "Rituals (Groom)", location: "Begusarai Home", roleAssigned: "Traditional Videographer" },
    { crewName: "Sanoj", clientName: "RAVI RANJAN", date: "04-07 May", month: "May", eventName: "Full 4 Days Coverage", location: "Kankarbagh & Kumhrar", roleAssigned: "Traditional Videographer" },
    { crewName: "Sanoj", clientName: "ABHINAV KRISHNA", date: "08-10 May", month: "May", eventName: "3 Days Rituals", location: "Bihar Sharif", roleAssigned: "Traditional Videographer" },
    { crewName: "Sanoj", clientName: "FREELANCE GAYA", date: "22 June", month: "June", eventName: "Engagement", location: "Gaya", roleAssigned: "Traditional Photographer" },
    { crewName: "Sanoj", clientName: "ROHIT KUMAR", date: "24 June", month: "June", eventName: "Pre-Wed & Wedding", location: "Rajgir", roleAssigned: "Cinematographer" },
    { crewName: "Sanoj", clientName: "APARNA", date: "02 Dec", month: "December", eventName: "Wedding Day", location: "Dakbunglow, Patna", roleAssigned: "Traditional Videographer" },
    { crewName: "Sanoj", clientName: "KINSHUK SHANKAR", date: "24-25 Nov", month: "November", eventName: "Haldi & Wedding", location: "Munger Club", roleAssigned: "Traditional Video & Cinema" },

    { crewName: "Sanjeet", clientName: "PRIYA KUMARI", date: "26 Apr", month: "April", eventName: "Wedding Day", location: "Hajipur, Patna", roleAssigned: "Candid Photographer" },
    { crewName: "Sanjeet", clientName: "RAVI RANJAN", date: "07 May", month: "May", eventName: "Wedding Ceremony", location: "Bhagwat Banquet Hall", roleAssigned: "Candid Photographer" },
    { crewName: "Sanjeet", clientName: "NIKITA KUMARI", date: "27 Apr & 24 June", month: "April & June", eventName: "Engagement & Wedding", location: "Begusarai / Patna", roleAssigned: "Candid Photographer" },
    { crewName: "Sanjeet", clientName: "APARNA", date: "02 Dec", month: "December", eventName: "Wedding Day", location: "Dakbunglow, Patna", roleAssigned: "Candid Photographer" },

    { crewName: "Ritik Saw Kolkata", clientName: "PRIYA KUMARI", date: "26 Apr", month: "April", eventName: "Grand Wedding Day", location: "Hajipur, Patna", roleAssigned: "Lead Cinematographer" },
    { crewName: "Ritik Saw Kolkata", clientName: "NIKITA KUMARI", date: "27 Apr", month: "April", eventName: "Engagement Ceremony", location: "Begusarai", roleAssigned: "Cinematographer" },

    { crewName: "Manikant (Monu)", clientName: "PRIYA KUMARI", date: "26 Apr", month: "April", eventName: "Wedding Day", location: "Hajipur, Patna", roleAssigned: "Professional Drone Pilot" },
    { crewName: "Manikant (Monu)", clientName: "RAVI RANJAN", date: "07 May", month: "May", eventName: "Wedding Day", location: "Bhagwat Banquet Hall", roleAssigned: "Drone Pilot" },
    { crewName: "Manikant (Monu)", clientName: "NIKITA KUMARI", date: "24 June", month: "June", eventName: "Wedding Day", location: "Patna Bailey Road", roleAssigned: "Drone Pilot" },
    { crewName: "Manikant (Monu)", clientName: "SURAJ SINHA", date: "21 Nov", month: "November", eventName: "Wedding Day", location: "Bhusaula Danapur", roleAssigned: "Drone Pilot" },
    { crewName: "Manikant (Monu)", clientName: "SHYAMLI SHARMA", date: "24 Nov", month: "November", eventName: "Wedding Day", location: "Sherghati", roleAssigned: "Drone Pilot" },

    { crewName: "Sumit", clientName: "PRIYA KUMARI", date: "26 Apr", month: "April", eventName: "Wedding Day", location: "Hajipur, Patna", roleAssigned: "Production Assistant" },

    { crewName: "Sikandar", clientName: "AMAR KUMAR VIVEK", date: "01-02 Dec", month: "December", eventName: "Rituals & Wedding", location: "Begusarai", roleAssigned: "Traditional Video & Photo" },
    { crewName: "Sikandar", clientName: "ANKIT & SNEHA", date: "02-06 Dec", month: "December", eventName: "3 Days Wedding Festival", location: "Bhagalpur Palace", roleAssigned: "Traditional Lead" },

    { crewName: "Vinod Kumar", clientName: "GUDDU KUMAR", date: "18-20 Nov", month: "November", eventName: "3-Day Wedding", location: "Akangarsarai", roleAssigned: "Traditional Photographer" },
    { crewName: "Vinod Kumar", clientName: "ANURADHA RANI", date: "19-21 Nov", month: "November", eventName: "3-Day Wedding", location: "Akangarsarai", roleAssigned: "Traditional Photographer" },
    { crewName: "Vinod Kumar", clientName: "ROHIT KUMAR", date: "24 June", month: "June", eventName: "Pre-Wed & Wedding", location: "Rajgir", roleAssigned: "Traditional Photographer" },

    { crewName: "Pintu Kumar", clientName: "NIKITA KUMARI", date: "24 June", month: "June", eventName: "Wedding Day", location: "Patna Bailey Road", roleAssigned: "Traditional Videographer" }
  ];

  const handleMonthChange = (monthValue) => {
    setExpandedCrewId(null);
    if (monthValue === 'ALL') {
      router.replace('/admin/team/busy', { scroll: false });
    } else {
      router.replace(`/admin/team/busy?month=${monthValue}`, { scroll: false });
    }
  };

  // Helper to get active assignments for a member
  const getAssignmentsForCrew = (memberName) => {
    return allClientAssignments.filter((a) => {
      const matchCrew = a.crewName.toLowerCase().trim() === memberName.toLowerCase().trim();
      if (!matchCrew) return false;
      if (selectedMonth === 'ALL') return true;
      return a.month.toLowerCase().includes(selectedMonth.toLowerCase());
    });
  };

  // Filter ONLY members who have shoots booked (BUSY)
  const busyMembers = teamMembers.filter((member) => {
    const assignments = getAssignmentsForCrew(member.name);
    return assignments.length > 0;
  });

  const confirmDeleteMember = async () => {
    if (!memberToDelete) return;
    setIsDeleting(true);

    const id = memberToDelete._id || memberToDelete.id;

    setTeamMembers(prev => prev.filter(m => (m._id || m.id) !== id));

    try {
      await fetch(`/api/wedding/team?id=${id}`, {
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
    <div className="min-h-screen bg-[#0B0D0E] text-[#F5F5F5] font-sans antialiased p-6 lg:p-10 space-y-6 selection:bg-rose-500 selection:text-white">
      
      {/* 1. TOP HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#1F242D]">
        <div>
          <span className="text-[10px] font-mono font-bold tracking-[0.25em] text-rose-400 uppercase block mb-1">
            ACTIVE FLEET DEPLOYMENTS
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white font-sans flex items-center gap-3">
            <span>Assigned / Busy Crew Roster</span>
            <span className="text-xl">🔥</span>
          </h1>
          <p className="text-xs text-[#8A7D5C] mt-1 font-normal font-sans">
            Tracking personnel currently locked on client shoots {selectedMonth !== 'ALL' ? `for ${selectedMonth}` : 'across all months'}.
          </p>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <Link className="px-4 py-2.5 rounded-xl border border-[#2B2519] bg-[#121518] hover:border-[#D4AF37] text-[#D4AF37] text-xs font-sans font-semibold uppercase tracking-wider transition-all shadow-md" href="/admin/wedding-management">
            ← Back to Hub
          </Link>
          <Link className="px-4 py-2.5 rounded-xl border border-emerald-500/30 bg-[#121518] hover:border-emerald-400 text-emerald-400 text-xs font-sans font-semibold uppercase tracking-wider transition-all shadow-md" href="/admin/team/available">
            View Free Bench (Available) ⚡
          </Link>
        </div>
      </div>

      {/* 2. MONTH CALENDAR BAR */}
      <div className="bg-[#121518] border border-[#2B2519] rounded-2xl p-3 flex flex-col md:flex-row md:items-center justify-between gap-3 shadow-xl">
        <div className="flex items-center gap-2 pl-2 shrink-0">
          <span className="text-base">📅</span>
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-rose-400 block leading-none">
              Deployment Calendar
            </span>
            <span className="text-xs font-sans text-[#8A7D5C]">Filter active shoots by month:</span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-1 md:pb-0 w-full md:w-auto">
          {monthsList.map((m) => {
            const isActive = selectedMonth === m.value;
            return (
              <button
                key={m.value}
                onClick={() => handleMonthChange(m.value)}
                className={`px-3.5 py-2 rounded-xl text-xs font-sans font-semibold uppercase tracking-wider transition-all duration-200 cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-gradient-to-r from-rose-500 to-red-600 text-white shadow-md shadow-rose-600/30 font-bold'
                    : 'bg-[#181B20] text-[#A89D84] hover:text-white hover:bg-[#1E232A] border border-[#2B2519]'
                }`}
              >
                {m.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. TABLE OF BUSY CREW */}
      <div className="bg-[#121518] border border-[#2B2519] rounded-3xl p-6 lg:p-8 shadow-2xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-extrabold text-white font-sans">Active Field Missions</h2>
            <p className="text-xs text-[#8A7D5C] mt-0.5 font-sans">
              Showing {busyMembers.length} team member{busyMembers.length === 1 ? '' : 's'} currently deployed on live wedding bookings
            </p>
          </div>
          <span className="px-3 py-1 rounded-lg text-[10px] font-mono font-bold bg-rose-500/10 text-rose-400 border border-rose-500/30 uppercase tracking-wider">
            Locked On Duty
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead>
              <tr className="border-b border-[#20252F] text-[10px] font-mono font-bold tracking-wider uppercase text-[#8A7D5C] bg-[#15191F]">
                <th className="py-4 px-6">TEAM MEMBER</th>
                <th className="py-4 px-6">ROLE / CRAFT</th>
                <th className="py-4 px-6">LATEST ASSIGNED CLIENT</th>
                <th className="py-4 px-6">PRIMARY DESTINATION</th>
                <th className="py-4 px-6">DEPLOYMENT DATES</th>
                <th className="py-4 px-6">AGREED RATE</th>
                <th className="py-4 px-6">DIRECT LINE</th>
                <th className="py-4 px-6 text-center">ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#181B22] text-xs font-sans">
              {isLoading ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-xs font-mono text-rose-400 animate-pulse">
                    Loading Active Field Deployments...
                  </td>
                </tr>
              ) : busyMembers.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-xs font-mono text-[#8A7D5C]">
                    <div className="flex flex-col items-center justify-center space-y-2">
                      <span className="text-3xl">✨</span>
                      <p className="text-white font-sans font-semibold text-sm">
                        No Active Field Deployments {selectedMonth !== 'ALL' ? `in ${selectedMonth}` : ''}
                      </p>
                      <p className="text-[#8A7D5C] text-xs font-sans">
                        All crew members are free or no shoots are logged for this period. Check the <Link href="/admin/team/available" className="text-emerald-400 underline">Available Bench</Link>.
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                busyMembers.map((member, idx) => {
                  const memberId = member._id || member.id || `busy-${idx}`;
                  const assignments = getAssignmentsForCrew(member.name);
                  const latestShoot = assignments[0] || {};
                  const isExpanded = expandedCrewId === memberId;

                  return (
                    <React.Fragment key={memberId}>
                      <tr 
                        onClick={() => setExpandedCrewId(isExpanded ? null : memberId)}
                        className={`cursor-pointer transition-colors duration-150 select-none ${
                          isExpanded ? 'bg-[#151921]' : 'hover:bg-[#161A20]'
                        }`}
                      >
                        {/* Member Name + Expand Arrow */}
                        <td className="py-4 px-6 font-semibold text-white text-[13px] tracking-tight">
                          <div className="flex items-center gap-2.5">
                            <span
                              className={`text-[10px] text-rose-400 transition-transform duration-200 inline-block ${
                                isExpanded ? 'rotate-90 text-rose-300' : ''
                              }`}
                            >
                              ▶
                            </span>
                            <span className="hover:text-rose-300 transition-colors font-bold">
                              {member.name}
                            </span>
                            <span className="px-2 py-0.5 rounded-md text-[9px] font-mono font-bold bg-rose-950/40 text-rose-400 border border-rose-500/30">
                              {assignments.length} {assignments.length === 1 ? 'Shoot' : 'Shoots'}
                            </span>
                          </div>
                        </td>

                        {/* Craft / Role */}
                        <td className="py-4 px-6 font-mono text-[11px] font-bold text-[#D4AF37] tracking-wider uppercase">
                          {member.craftRole || member.role}
                        </td>

                        {/* Assigned Client & Event */}
                        <td className="py-4 px-6">
                          <span className="text-white font-bold block">{latestShoot.clientName || "Assigned Shoot"}</span>
                          <span className="text-[11px] text-[#A89D84]">{latestShoot.eventName || "Wedding Ceremony"}</span>
                        </td>

                        {/* Destination */}
                        <td className="py-4 px-6 text-[#C5B388]">
                          {latestShoot.location || member.city || "Patna"}
                        </td>

                        {/* Dates */}
                        <td className="py-4 px-6 font-mono text-[#D1C7A5]">
                          {latestShoot.date || "Scheduled"}
                        </td>

                        {/* Payout */}
                        <td className="py-4 px-6 text-emerald-400 font-mono font-bold">
                          {member.agreedRate || member.rate || "₹4,000 / Day"}
                        </td>

                        {/* Direct Line WhatsApp */}
                        <td className="py-4 px-6">
                          <a
                            href={`https://wa.me/91${(member.phone || member.whatsapp || '').replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(member.name)},%20checking%20in%20on%20your%20current%20shoot%20dispatch.`}
                            target="_blank"
                            rel="noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="font-mono text-white hover:text-emerald-400 transition-colors"
                          >
                            +91 {member.phone || member.whatsapp || "N/A"}
                          </a>
                        </td>

                        {/* Action (Delete) */}
                        <td className="py-4 px-6 text-center">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setMemberToDelete(member);
                            }}
                            title="Delete Crew Member"
                            className="p-2 rounded-xl border border-[#2B2519] bg-[#16191F] text-[#8A7D5C] hover:text-rose-400 hover:border-rose-500/50 hover:bg-rose-500/10 transition-all duration-200 cursor-pointer inline-flex items-center justify-center"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </td>

                      </tr>

                      {/* EXPANDABLE ACCORDION DRAWER */}
                      {isExpanded && (
                        <tr className="bg-[#0B0D10] border-b border-[#20252F]">
                          <td colSpan={8} className="p-6">
                            <div className="bg-[#12151B] border border-[#222834] rounded-2xl p-5 space-y-4 shadow-inner">
                              
                              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#1D222B] pb-3">
                                <div>
                                  <span className="text-[9px] font-mono font-bold tracking-[0.2em] text-rose-400 uppercase block">
                                    ALL BOOKED COMMISSIONS {selectedMonth !== 'ALL' && `• ${selectedMonth.toUpperCase()}`}
                                  </span>
                                  <h4 className="text-sm font-sans font-semibold text-white mt-0.5">
                                    Full Schedule for {member.name}
                                  </h4>
                                </div>

                                <a
                                  href={`https://wa.me/91${(member.phone || member.whatsapp || '').replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(member.name)},%20here%20is%20your%20dispatch%20duty%20status.`}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="px-3 py-1.5 rounded-lg bg-rose-600/20 text-rose-400 border border-rose-500/30 text-[10px] font-mono font-bold uppercase hover:bg-rose-600 hover:text-white transition-all self-start sm:self-auto"
                                >
                                  WhatsApp Duty Alert ↗
                                </a>
                              </div>

                              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                                {assignments.map((shoot, sIdx) => (
                                  <div
                                    key={sIdx}
                                    className="bg-[#161922] border border-[#222733] p-3.5 rounded-xl space-y-2"
                                  >
                                    <div className="flex items-center justify-between border-b border-[#20252F] pb-1.5">
                                      <span className="text-xs font-bold text-white">
                                        {shoot.clientName}
                                      </span>
                                      <span className="text-[10px] font-mono text-[#D4AF37] font-bold">
                                        {shoot.date}
                                      </span>
                                    </div>

                                    <div className="space-y-1 text-[11px] text-[#A89D84]">
                                      <p className="text-white font-medium">✨ {shoot.eventName}</p>
                                      <p className="truncate">📍 {shoot.location}</p>
                                      <p className="font-mono text-[10px] text-rose-400 pt-0.5">
                                        Duty: {shoot.roleAssigned}
                                      </p>
                                    </div>
                                  </div>
                                ))}
                              </div>

                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 4. CONFIRM DELETE MODAL (YES / NO) */}
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

export default function BusyCrewPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0B0D0E] flex items-center justify-center text-rose-400 font-mono text-sm">Loading Assigned Roster...</div>}>
      <BusyCrewContent />
    </Suspense>
  );
}