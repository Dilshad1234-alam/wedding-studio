"use client";
import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';

function CrewDirectoryContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [expandedCrewId, setExpandedCrewId] = useState(null);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [memberToDelete, setMemberToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [newMember, setNewMember] = useState({ name: '', craftRole: '', city: '', agreedRate: '', phone: '' });
  const [teamMembers, setTeamMembers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // January to December complete months
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

  // 1. Direct synchronous URL read - No state jump, No flicker
  const queryMonth = searchParams.get('month');
  const matchedMonth = monthsList.find(m => m.value.toLowerCase() === (queryMonth || '').toLowerCase());
  const selectedMonth = matchedMonth ? matchedMonth.value : 'ALL';

  // 2. Fetch Team Members
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
        console.error(err);
        setIsLoading(false);
      });
  }, []);

  // 3. Month Change Handler using Router
  const handleMonthChange = (monthValue) => {
    setExpandedCrewId(null);
    if (monthValue === 'ALL') {
      router.replace('/admin/team', { scroll: false });
    } else {
      router.replace(`/admin/team?month=${monthValue}`, { scroll: false });
    }
  };

  const handleAddMember = async (e) => {
    e.preventDefault();
    if (!newMember.name || !newMember.craftRole) return;
    
    try {
      const res = await fetch('/api/wedding/team', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newMember)
      });
      const data = await res.json();
      
      if (data.success) {
        setTeamMembers(prev => [data.member, ...prev]);
        setNewMember({ name: '', craftRole: '', city: '', agreedRate: '', phone: '' });
        setIsRegisterModalOpen(false);
      }
    } catch (err) {
      console.error(err);
    }
  };

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

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState({ id: '', name: '', craftRole: '', city: '', agreedRate: '', phone: '', availabilityStatus: '' });

  const handleEditClick = (member) => {
    setEditingMember({ 
      id: member._id || member.id,
      name: member.name || '',
      craftRole: member.craftRole || member.role || '',
      city: member.city || '',
      agreedRate: member.agreedRate || member.rate || '',
      phone: member.phone || member.whatsapp || '',
      availabilityStatus: member.availabilityStatus || member.status || 'AVAILABLE'
    });
    setIsEditModalOpen(true);
  };

  const handleUpdateMember = async (e) => {
    e.preventDefault();
    if (!editingMember.name || !editingMember.craftRole) return;
    
    try {
      const res = await fetch('/api/wedding/team', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingMember)
      });
      const data = await res.json();
      
      if (data.success) {
        setTeamMembers(prev => prev.map(m => (m._id || m.id) === editingMember.id ? data.member : m));
        setIsEditModalOpen(false);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Master Client Shoots Roster Database
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

  const getAssignmentsForCrew = (memberName) => {
    return allClientAssignments.filter((a) => {
      const matchCrew = a.crewName.toLowerCase().trim() === memberName.toLowerCase().trim();
      if (!matchCrew) return false;
      if (selectedMonth === 'ALL') return true;
      return a.month.toLowerCase().includes(selectedMonth.toLowerCase());
    });
  };

  const displayedMembers = teamMembers.filter((member) => {
    if (selectedMonth === 'ALL') return true;
    const assignments = getAssignmentsForCrew(member.name);
    return assignments.length > 0;
  });

  return (
    <div className="min-h-screen bg-[#0B0D0E] text-[#F5F5F5] font-sans antialiased p-6 lg:p-10 space-y-6 selection:bg-[#D4AF37] selection:text-black">
      
      {/* 1. TOP HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#1F242D]">
        <div>
          <span className="text-[10px] font-mono font-bold tracking-[0.25em] text-[#D4AF37] uppercase block mb-1">
            STUDIO LOGISTICS & PAYOUTS
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-sans">
            Studio Crew Directory & Payouts
          </h1>
          <p className="text-xs text-[#8A7D5C] mt-1 font-normal font-sans">
            Showing {displayedMembers.length} active crew member{displayedMembers.length === 1 ? '' : 's'} {selectedMonth !== 'ALL' ? `assigned in ${selectedMonth}` : 'across all months'}.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link className="px-4 py-2.5 rounded-xl border border-[#2B2519] bg-[#121518] hover:border-[#D4AF37] text-[#D4AF37] text-xs font-sans font-semibold uppercase tracking-wider transition-all shadow-md" href="/admin/wedding-management">
            ← Back
          </Link>
          <button onClick={() => setIsRegisterModalOpen(true)} className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B89018] hover:from-[#F3E5AB] hover:to-[#D4AF37] text-black text-xs font-sans font-semibold uppercase tracking-wider shadow-lg shadow-[#D4AF37]/25 transition-all cursor-pointer">
            + Add Team Member
          </button>
        </div>
      </div>

      {/* 2. ALL 12 MONTHS CALENDAR BAR */}
      <div className="bg-[#121518] border border-[#2B2519] rounded-2xl p-3 flex flex-col md:flex-row md:items-center justify-between gap-3 shadow-xl">
        <div className="flex items-center gap-2 pl-2 shrink-0">
          <span className="text-base">📅</span>
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#D4AF37] block leading-none">
              Annual Calendar
            </span>
            <span className="text-xs font-sans text-[#8A7D5C]">Filter crew by shoot month:</span>
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
                    ? 'bg-gradient-to-r from-[#D4AF37] to-[#B89018] text-black shadow-md shadow-[#D4AF37]/20 font-bold'
                    : 'bg-[#181B20] text-[#A89D84] hover:text-white hover:bg-[#1E232A] border border-[#2B2519]'
                }`}
              >
                {m.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. CREW TABLE WITH ACTIONS & DELETE COLUMN */}
      <div className="bg-[#121518] border border-[#2B2519] rounded-3xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse min-w-[980px]">
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
            <tbody className="divide-y divide-[#1C2027]">
              {displayedMembers.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-xs font-mono text-[#8A7D5C]">
                    <div className="flex flex-col items-center justify-center space-y-2">
                      <span className="text-3xl">🗓️</span>
                      <p className="text-white font-sans font-semibold text-sm">
                        No team members booked in {selectedMonth}
                      </p>
                      <p className="text-[#8A7D5C] text-xs">
                        Select another month or choose <button onClick={() => handleMonthChange('ALL')} className="text-[#D4AF37] underline cursor-pointer">All Months</button> to view all team members.
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                displayedMembers.map((member, index) => {
                  const memberId = member._id || member.orderIndex || member.id || `crew-${index}`;
                  const assignments = getAssignmentsForCrew(member.name);
                  const shootCount = assignments.length;
                  const isExpanded = expandedCrewId === memberId;

                  return (
                    <React.Fragment key={memberId}>
                      <tr
                        onClick={() => setExpandedCrewId(isExpanded ? null : memberId)}
                        className={`cursor-pointer transition-colors duration-150 select-none ${
                          isExpanded ? 'bg-[#151921]' : 'hover:bg-[#12161D]'
                        }`}
                      >
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-2.5">
                            <span
                              className={`text-[10px] text-[#D4AF37] transition-transform duration-200 inline-block ${
                                isExpanded ? 'rotate-90 text-[#F3E5AB]' : ''
                              }`}
                            >
                              ▶
                            </span>

                            <span className="font-sans font-semibold text-white text-[13px] hover:text-[#D4AF37] transition-colors">
                              {member.name}
                            </span>

                            {shootCount > 0 && (
                              <span className="px-2 py-0.5 rounded-md text-[9px] font-mono font-bold bg-[#1C1812] text-[#D4AF37] border border-[#3A311D] shadow-sm">
                                {shootCount} {shootCount === 1 ? 'Shoot' : 'Shoots'}
                                {selectedMonth !== 'ALL' && ` in ${selectedMonth}`}
                              </span>
                            )}
                          </div>
                        </td>

                        <td className="py-4 px-6 font-mono text-[11px] font-bold text-[#D4AF37] tracking-wider uppercase">
                          {member.craftRole || member.role}
                        </td>

                        <td className="py-4 px-6 text-[#A89D84] font-sans">
                          {member.city || 'Patna'}
                        </td>

                        <td className="py-4 px-6 font-mono font-semibold text-emerald-400">
                          {member.agreedRate || member.rate || '₹4,000 / Day'}
                        </td>

                        <td className="py-4 px-6">
                          <span className="px-2.5 py-1 rounded-md text-[9px] font-mono font-bold tracking-widest uppercase bg-emerald-950/40 text-emerald-400 border border-emerald-500/30">
                            {member.availabilityStatus || member.status || 'AVAILABLE'}
                          </span>
                        </td>

                        <td className="py-4 px-6">
                          <a
                            href={`https://wa.me/91${member.phone || member.whatsapp}`}
                            target="_blank"
                            rel="noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="font-mono text-white hover:text-emerald-400 transition-colors font-medium"
                          >
                            +91 {member.phone || member.whatsapp}
                          </a>
                        </td>

                        <td className="py-4 px-6 text-center">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEditClick(member);
                            }}
                            title="Edit Crew Member"
                            className="p-2 rounded-xl border border-[#2B2519] bg-[#16191F] text-[#8A7D5C] hover:text-[#D4AF37] hover:border-[#D4AF37]/50 hover:bg-[#D4AF37]/10 transition-all duration-200 cursor-pointer inline-flex items-center justify-center mr-2"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                            </svg>
                          </button>
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
                          <td colSpan={7} className="p-6">
                            <div className="bg-[#12151B] border border-[#222834] rounded-2xl p-5 space-y-4 shadow-inner">
                              
                              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#1D222B] pb-3">
                                <div>
                                  <span className="text-[9px] font-mono font-bold tracking-[0.2em] text-[#D4AF37] uppercase block">
                                    ASSIGNED WEDDING COMMISSIONS {selectedMonth !== 'ALL' && `• ${selectedMonth.toUpperCase()}`}
                                  </span>
                                  <h4 className="text-sm font-sans font-semibold text-white mt-0.5">
                                    Active Shoot Roster for {member.name}
                                  </h4>
                                </div>

                                <div className="flex items-center gap-2">
                                  <span className="text-xs font-mono text-[#8A7D5C]">
                                    Deployments: <strong className="text-white">{shootCount} Events</strong>
                                  </span>
                                  <a
                                    href={`https://wa.me/91${member.phone || member.whatsapp}?text=Hello%20${encodeURIComponent(member.name)},%20here%20is%20your%20dispatch%20schedule%20update.`}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="px-3 py-1.5 rounded-lg bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-mono font-bold uppercase hover:bg-emerald-600 hover:text-white transition-all"
                                  >
                                    Send WhatsApp Roster ↗
                                  </a>
                                </div>
                              </div>

                              {shootCount === 0 ? (
                                <div className="text-center py-6 text-xs text-[#8A7D5C] font-mono">
                                  No active wedding shoots found for {member.name} {selectedMonth !== 'ALL' ? `in ${selectedMonth}` : ''}.
                                </div>
                              ) : (
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
                                        <p className="text-white font-medium">
                                          ✨ {shoot.eventName}
                                        </p>
                                        <p className="truncate">
                                          📍 {shoot.location}
                                        </p>
                                        {shoot.callTime && (
                                          <p className="font-mono text-[10px] text-emerald-400 pt-0.5">
                                            ⏱ Call Time: {shoot.callTime}
                                          </p>
                                        )}
                                        {shoot.roleAssigned && (
                                          <p className="font-mono text-[10px] text-emerald-400 pt-0.5">
                                            Duty: {shoot.roleAssigned}
                                          </p>
                                        )}
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              )}

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

      {/* 4. REGISTER CREW MEMBER MODAL */}
      {isRegisterModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 font-sans">
          <div className="bg-[#121518] border border-[#2B2519] rounded-3xl p-8 shadow-2xl max-w-md w-full relative">
            <button 
              onClick={() => setIsRegisterModalOpen(false)}
              className="absolute top-5 right-5 text-[#8A7D5C] hover:text-[#D4AF37] text-2xl leading-none cursor-pointer"
            >
              ✕
            </button>
            <h2 className="text-xl font-sans font-semibold tracking-tight text-white mb-6">Add New Team Member</h2>
            <form onSubmit={handleAddMember} className="space-y-4">
              <div>
                <label className="block text-[10px] uppercase font-semibold tracking-wider text-[#8A7D5C] mb-1">Name *</label>
                <input type="text" required value={newMember.name} onChange={e => setNewMember({...newMember, name: e.target.value})} className="w-full bg-[#0B0D0E] border border-[#2B2519] rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#D4AF37]" placeholder="E.g. Arjun Kumar" />
              </div>
              <div>
                <label className="block text-[10px] uppercase font-semibold tracking-wider text-[#8A7D5C] mb-1">Craft / Role *</label>
                <input type="text" required value={newMember.craftRole} onChange={e => setNewMember({...newMember, craftRole: e.target.value})} className="w-full bg-[#0B0D0E] border border-[#2B2519] rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#D4AF37]" placeholder="E.g. LEAD CINEMATOGRAPHER" />
              </div>
              <div>
                <label className="block text-[10px] uppercase font-semibold tracking-wider text-[#8A7D5C] mb-1">City / Address</label>
                <input type="text" value={newMember.city} onChange={e => setNewMember({...newMember, city: e.target.value})} className="w-full bg-[#0B0D0E] border border-[#2B2519] rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#D4AF37]" placeholder="E.g. Patna" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] uppercase font-semibold tracking-wider text-[#8A7D5C] mb-1">Payout Rate</label>
                  <input type="text" value={newMember.agreedRate} onChange={e => setNewMember({...newMember, agreedRate: e.target.value})} className="w-full bg-[#0B0D0E] border border-[#2B2519] rounded-xl px-4 py-3 text-xs font-mono text-emerald-400 focus:outline-none focus:border-[#D4AF37]" placeholder="E.g. ₹5,000 / Day" />
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-semibold tracking-wider text-[#8A7D5C] mb-1">Mobile</label>
                  <input type="text" value={newMember.phone} onChange={e => setNewMember({...newMember, phone: e.target.value})} className="w-full bg-[#0B0D0E] border border-[#2B2519] rounded-xl px-4 py-3 text-xs font-mono text-white focus:outline-none focus:border-[#D4AF37]" placeholder="9876543210" />
                </div>
              </div>
              <button type="submit" className="w-full mt-4 py-3.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B89018] hover:from-[#F3E5AB] hover:to-[#D4AF37] text-black text-xs font-sans font-semibold uppercase tracking-wider transition-all cursor-pointer shadow-md">
                Submit & Register
              </button>
            </form>
          </div>
        </div>
      )}

      {/* 5. CONFIRM DELETE MODAL (YES / NO) */}
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

      {/* EDIT CREW MEMBER MODAL */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 font-sans">
          <div className="bg-[#121518] border border-[#2B2519] rounded-3xl p-8 shadow-2xl max-w-md w-full relative">
            <button 
              onClick={() => setIsEditModalOpen(false)}
              className="absolute top-5 right-5 text-[#8A7D5C] hover:text-[#D4AF37] text-2xl leading-none cursor-pointer"
            >
              ✕
            </button>
            <h2 className="text-xl font-sans font-semibold tracking-tight text-white mb-6">Edit Team Member</h2>
            <form onSubmit={handleUpdateMember} className="space-y-4">
              <div>
                <label className="block text-[10px] uppercase font-semibold tracking-wider text-[#8A7D5C] mb-1">Name *</label>
                <input type="text" required value={editingMember.name} onChange={e => setEditingMember({...editingMember, name: e.target.value})} className="w-full bg-[#0B0D0E] border border-[#2B2519] rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#D4AF37]" placeholder="E.g. Arjun Kumar" />
              </div>
              <div>
                <label className="block text-[10px] uppercase font-semibold tracking-wider text-[#8A7D5C] mb-1">Craft / Role *</label>
                <input type="text" required value={editingMember.craftRole} onChange={e => setEditingMember({...editingMember, craftRole: e.target.value})} className="w-full bg-[#0B0D0E] border border-[#2B2519] rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#D4AF37]" placeholder="E.g. LEAD CINEMATOGRAPHER" />
              </div>
              <div>
                <label className="block text-[10px] uppercase font-semibold tracking-wider text-[#8A7D5C] mb-1">City / Address</label>
                <input type="text" value={editingMember.city} onChange={e => setEditingMember({...editingMember, city: e.target.value})} className="w-full bg-[#0B0D0E] border border-[#2B2519] rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#D4AF37]" placeholder="E.g. Patna" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] uppercase font-semibold tracking-wider text-[#8A7D5C] mb-1">Payout Rate</label>
                  <input type="text" value={editingMember.agreedRate} onChange={e => setEditingMember({...editingMember, agreedRate: e.target.value})} className="w-full bg-[#0B0D0E] border border-[#2B2519] rounded-xl px-4 py-3 text-xs font-mono text-emerald-400 focus:outline-none focus:border-[#D4AF37]" placeholder="E.g. ₹5,000 / Day" />
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-semibold tracking-wider text-[#8A7D5C] mb-1">Mobile</label>
                  <input type="text" value={editingMember.phone} onChange={e => setEditingMember({...editingMember, phone: e.target.value})} className="w-full bg-[#0B0D0E] border border-[#2B2519] rounded-xl px-4 py-3 text-xs font-mono text-white focus:outline-none focus:border-[#D4AF37]" placeholder="9876543210" />
                </div>
              </div>
              <div>
                <label className="block text-[10px] uppercase font-semibold tracking-wider text-[#8A7D5C] mb-1">Availability</label>
                <select value={editingMember.availabilityStatus} onChange={e => setEditingMember({...editingMember, availabilityStatus: e.target.value})} className="w-full bg-[#0B0D0E] border border-[#2B2519] rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#D4AF37]">
                  <option value="AVAILABLE">AVAILABLE</option>
                  <option value="BOOKED">BOOKED</option>
                  <option value="UNAVAILABLE">UNAVAILABLE</option>
                </select>
              </div>
              <button type="submit" className="w-full mt-4 py-3.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B89018] hover:from-[#F3E5AB] hover:to-[#D4AF37] text-black text-xs font-sans font-semibold uppercase tracking-wider transition-all cursor-pointer shadow-md">
                Save Changes
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

export default function StudioCrewDirectory() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0B0D0E] flex items-center justify-center text-[#D4AF37] font-mono text-sm">Loading Roster...</div>}>
      <CrewDirectoryContent />
    </Suspense>
  );
}