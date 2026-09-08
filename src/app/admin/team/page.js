"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function StudioCrewDirectory() {
  const [expandedCrewId, setExpandedCrewId] = useState(null);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [newMember, setNewMember] = useState({ name: '', craftRole: '', city: '', agreedRate: '', phone: '' });
  const [teamMembers, setTeamMembers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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

  // 2. Master Client Shoots Roster Database (Cross-referenced with crew names)
  const allClientAssignments = [
    // Rohit's assignments
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

    // Sanoj's assignments
    { crewName: "Sanoj", clientName: "PRIYA KUMARI", date: "22 Apr", month: "April", eventName: "Rituals (Bride)", location: "Sitamarhi Home", roleAssigned: "Traditional Videographer & Drone" },
    { crewName: "Sanoj", clientName: "PRIYA KUMARI", date: "23 Apr", month: "April", eventName: "Haldi Shoot", location: "Sitamarhi Home", roleAssigned: "Traditional Videographer" },
    { crewName: "Sanoj", clientName: "PRIYA KUMARI", date: "25 Apr", month: "April", eventName: "Rituals (Groom)", location: "Begusarai Home", roleAssigned: "Traditional Videographer" },
    { crewName: "Sanoj", clientName: "RAVI RANJAN", date: "04-07 May", month: "May", eventName: "Full 4 Days Coverage", location: "Kankarbagh & Kumhrar", roleAssigned: "Traditional Videographer" },
    { crewName: "Sanoj", clientName: "ABHINAV KRISHNA", date: "08-10 May", month: "May", eventName: "3 Days Rituals", location: "Bihar Sharif", roleAssigned: "Traditional Videographer" },
    { crewName: "Sanoj", clientName: "FREELANCE GAYA", date: "22 June", month: "June", eventName: "Engagement", location: "Gaya", roleAssigned: "Traditional Photographer" },
    { crewName: "Sanoj", clientName: "ROHIT KUMAR", date: "24 June", month: "June", eventName: "Pre-Wed & Wedding", location: "Rajgir", roleAssigned: "Cinematographer" },
    { crewName: "Sanoj", clientName: "APARNA", date: "02 Dec", month: "December", eventName: "Wedding Day", location: "Dakbunglow, Patna", roleAssigned: "Traditional Videographer" },
    { crewName: "Sanoj", clientName: "KINSHUK SHANKAR", date: "24-25 Nov", month: "November", eventName: "Haldi & Wedding", location: "Munger Club", roleAssigned: "Traditional Video & Cinema" },

    // Sanjeet's assignments
    { crewName: "Sanjeet", clientName: "PRIYA KUMARI", date: "26 Apr", month: "April", eventName: "Wedding Day", location: "Hajipur, Patna", roleAssigned: "Candid Photographer" },
    { crewName: "Sanjeet", clientName: "RAVI RANJAN", date: "07 May", month: "May", eventName: "Wedding Ceremony", location: "Bhagwat Banquet Hall", roleAssigned: "Candid Photographer" },
    { crewName: "Sanjeet", clientName: "NIKITA KUMARI", date: "27 Apr & 24 June", month: "April & June", eventName: "Engagement & Wedding", location: "Begusarai / Patna", roleAssigned: "Candid Photographer" },
    { crewName: "Sanjeet", clientName: "APARNA", date: "02 Dec", month: "December", eventName: "Wedding Day", location: "Dakbunglow, Patna", roleAssigned: "Candid Photographer" },

    // Ritik Saw Kolkata's assignments
    { crewName: "Ritik Saw Kolkata", clientName: "PRIYA KUMARI", date: "26 Apr", month: "April", eventName: "Grand Wedding Day", location: "Hajipur, Patna", roleAssigned: "Lead Cinematographer" },
    { crewName: "Ritik Saw Kolkata", clientName: "NIKITA KUMARI", date: "27 Apr", month: "April", eventName: "Engagement Ceremony", location: "Begusarai", roleAssigned: "Cinematographer" },

    // Manikant (Monu)'s assignments
    { crewName: "Manikant (Monu)", clientName: "PRIYA KUMARI", date: "26 Apr", month: "April", eventName: "Wedding Day", location: "Hajipur, Patna", roleAssigned: "Professional Drone Pilot" },
    { crewName: "Manikant (Monu)", clientName: "RAVI RANJAN", date: "07 May", month: "May", eventName: "Wedding Day", location: "Bhagwat Banquet Hall", roleAssigned: "Drone Pilot" },
    { crewName: "Manikant (Monu)", clientName: "NIKITA KUMARI", date: "24 June", month: "June", eventName: "Wedding Day", location: "Patna Bailey Road", roleAssigned: "Drone Pilot" },
    { crewName: "Manikant (Monu)", clientName: "SURAJ SINHA", date: "21 Nov", month: "November", eventName: "Wedding Day", location: "Bhusaula Danapur", roleAssigned: "Drone Pilot" },
    { crewName: "Manikant (Monu)", clientName: "SHYAMLI SHARMA", date: "24 Nov", month: "November", eventName: "Wedding Day", location: "Sherghati", roleAssigned: "Drone Pilot" },

    // Sumit's assignments
    { crewName: "Sumit", clientName: "PRIYA KUMARI", date: "26 Apr", month: "April", eventName: "Wedding Day", location: "Hajipur, Patna", roleAssigned: "Production Assistant" },

    // Sikandar's assignments
    { crewName: "Sikandar", clientName: "AMAR KUMAR VIVEK", date: "01-02 Dec", month: "December", eventName: "Rituals & Wedding", location: "Begusarai", roleAssigned: "Traditional Video & Photo" },
    { crewName: "Sikandar", clientName: "ANKIT & SNEHA", date: "02-06 Dec", month: "December", eventName: "3 Days Wedding Festival", location: "Bhagalpur Palace", roleAssigned: "Traditional Lead" },

    // Vinod Kumar's assignments
    { crewName: "Vinod Kumar", clientName: "GUDDU KUMAR", date: "18-20 Nov", month: "November", eventName: "3-Day Wedding", location: "Akangarsarai", roleAssigned: "Traditional Photographer" },
    { crewName: "Vinod Kumar", clientName: "ANURADHA RANI", date: "19-21 Nov", month: "November", eventName: "3-Day Wedding", location: "Akangarsarai", roleAssigned: "Traditional Photographer" },
    { crewName: "Vinod Kumar", clientName: "ROHIT KUMAR", date: "24 June", month: "June", eventName: "Pre-Wed & Wedding", location: "Rajgir", roleAssigned: "Traditional Photographer" },

    // Pintu Kumar's assignments
    { crewName: "Pintu Kumar", clientName: "NIKITA KUMARI", date: "24 June", month: "June", eventName: "Wedding Day", location: "Patna Bailey Road", roleAssigned: "Traditional Videographer" }
  ];

  // Helper to get assignments for any member
  const getAssignmentsForCrew = (memberName) => {
    return allClientAssignments.filter(
      (a) => a.crewName.toLowerCase().trim() === memberName.toLowerCase().trim()
    );
  };

  return (
    <div className="min-h-screen bg-[#0B0D0E] text-[#F5F5F5] font-sans antialiased p-6 lg:p-10 space-y-6 selection:bg-[#D4AF37] selection:text-black">
      
      {/* 1. TOP HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#1F242D]">
        <div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
            Studio Crew Directory & Payouts
          </h1>
          <p className="text-xs text-[#8A7D5C] mt-1 font-sans">
            Showing all {teamMembers.length} active cinematographers, photographers, and drone pilots. Click any member to see their booked clients and dates.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link className="px-4 py-2.5 rounded-xl border border-[#2B2519] bg-[#121518] hover:border-[#D4AF37] text-[#D4AF37] text-xs font-black uppercase tracking-wider transition-all" href="/admin/wedding-management">
            ← Back
          </Link>
          <button onClick={() => setIsRegisterModalOpen(true)} className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B89018] hover:from-[#F3E5AB] hover:to-[#D4AF37] text-black text-xs font-black uppercase tracking-wider shadow-lg shadow-[#D4AF37]/25 transition-all cursor-pointer">
            + REGISTER CREW MEMBER
          </button>
        </div>
      </div>

      {/* 2. CREW TABLE WITH MOBILE NUMBER & CLIENT SCHEDULE DRAWER */}
      <div className="bg-[#121518] border border-[#2B2519] rounded-3xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse min-w-[900px]">
            <thead>
              <tr className="border-b border-[#20252F] text-[10px] font-mono font-bold tracking-wider uppercase text-[#8A7D5C] bg-[#15191F]">
                <th className="py-4 px-6">TEAM MEMBER</th>
                <th className="py-4 px-6">CRAFT / ROLE</th>
                <th className="py-4 px-6">RESIDENTIAL ADDRESS / CITY</th>
                <th className="py-4 px-6">AGREED PAYOUT / RATE</th>
                <th className="py-4 px-6">AVAILABILITY</th>
                <th className="py-4 px-6 text-right">MOBILE NUMBER</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1C2027]">
              {teamMembers.map((member, index) => {
                const memberId = member._id || member.orderIndex || member.id || `crew-${index}`;
                const assignments = getAssignmentsForCrew(member.name);
                const shootCount = assignments.length;
                const isExpanded = expandedCrewId === memberId;

                return (
                  <React.Fragment key={memberId}>
                    {/* MAIN CLICKABLE ROW */}
                    <tr
                      onClick={() => setExpandedCrewId(isExpanded ? null : memberId)}
                      className={`cursor-pointer transition-colors duration-150 select-none ${
                        isExpanded ? 'bg-[#151921]' : 'hover:bg-[#12161D]'
                      }`}
                    >
                      {/* Member Name + Expandable Arrow + Shoots Badge */}
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2.5">
                          <span
                            className={`text-[10px] text-[#D4AF37] transition-transform duration-200 inline-block ${
                              isExpanded ? 'rotate-90 text-[#F3E5AB]' : ''
                            }`}
                          >
                            ▶
                          </span>

                          <span className="font-bold text-white text-[13px] hover:text-[#D4AF37] transition-colors">
                            {member.name}
                          </span>

                          {shootCount > 0 && (
                            <span className="px-2 py-0.5 rounded-full text-[9px] font-mono font-bold bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/30 shadow-sm">
                              {shootCount} {shootCount === 1 ? 'Shoot' : 'Shoots'}
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Craft / Role */}
                      <td className="py-4 px-6 font-mono text-[11px] font-semibold text-[#D4AF37] tracking-wider uppercase">
                        {member.craftRole || member.role}
                      </td>

                      {/* City / Address */}
                      <td className="py-4 px-6 text-[#A89D84]">
                        {member.city || 'Patna'}
                      </td>

                      {/* Agreed Payout Rate */}
                      <td className="py-4 px-6 font-mono font-bold text-emerald-400">
                        {member.agreedRate || member.rate || '₹4,000 / Day'}
                      </td>

                      {/* Availability Status */}
                      <td className="py-4 px-6">
                        <span className="px-2.5 py-1 rounded-full text-[9px] font-mono font-bold tracking-widest uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          {member.availabilityStatus || member.status || 'AVAILABLE'}
                        </span>
                      </td>

                      {/* Mobile Number & Quick Actions */}
                      <td className="py-4 px-6 text-right">
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
                    </tr>

                    {/* EXPANDABLE ACCORDION DRAWER (SHOWS ASSIGNED WEDDING SHOOTS) */}
                    {isExpanded && (
                      <tr className="bg-[#0B0D10] border-b border-[#20252F]">
                        <td colSpan={6} className="p-6">
                          <div className="bg-[#12151B] border border-[#222834] rounded-2xl p-5 space-y-4 shadow-inner">
                            
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#1D222B] pb-3">
                              <div>
                                <span className="text-[9px] font-mono font-bold tracking-[0.2em] text-[#D4AF37] uppercase block">
                                  ASSIGNED WEDDING COMMISSIONS
                                </span>
                                <h4 className="text-sm font-serif font-bold text-white mt-0.5">
                                  Active Shoot Roster for {member.name}
                                </h4>
                              </div>

                              <div className="flex items-center gap-2">
                                <span className="text-xs font-mono text-[#8A7D5C]">
                                  Total Deployments: <strong className="text-white">{shootCount} Events</strong>
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

                            {/* Shoots Grid / Cards */}
                            {shootCount === 0 ? (
                              <div className="text-center py-6 text-xs text-[#8A7D5C] font-mono">
                                No active wedding dates currently assigned to {member.name}.
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
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* 3. REGISTER CREW MEMBER MODAL */}
      {isRegisterModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-[#121518] border border-[#2B2519] rounded-3xl p-8 shadow-2xl max-w-md w-full relative">
            <button 
              onClick={() => setIsRegisterModalOpen(false)}
              className="absolute top-4 right-4 text-[#8A7D5C] hover:text-[#D4AF37] text-xl"
            >
              ✕
            </button>
            <h2 className="text-2xl font-serif text-white italic tracking-tight mb-6">Register New Crew Member</h2>
            <form onSubmit={handleAddMember} className="space-y-4">
              <div>
                <label className="block text-[10px] uppercase tracking-widest text-[#D4AF37] mb-1 font-bold">Name *</label>
                <input type="text" required value={newMember.name} onChange={e => setNewMember({...newMember, name: e.target.value})} className="w-full bg-[#0B0D0E] border border-[#2B2519] rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#D4AF37]" placeholder="E.g. Arjun Kumar" />
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-widest text-[#D4AF37] mb-1 font-bold">Craft / Role *</label>
                <input type="text" required value={newMember.craftRole} onChange={e => setNewMember({...newMember, craftRole: e.target.value})} className="w-full bg-[#0B0D0E] border border-[#2B2519] rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#D4AF37]" placeholder="E.g. LEAD CINEMATOGRAPHER" />
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-widest text-[#D4AF37] mb-1 font-bold">City / Address</label>
                <input type="text" value={newMember.city} onChange={e => setNewMember({...newMember, city: e.target.value})} className="w-full bg-[#0B0D0E] border border-[#2B2519] rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#D4AF37]" placeholder="E.g. Patna" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-[#D4AF37] mb-1 font-bold">Payout Rate</label>
                  <input type="text" value={newMember.agreedRate} onChange={e => setNewMember({...newMember, agreedRate: e.target.value})} className="w-full bg-[#0B0D0E] border border-[#2B2519] rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#D4AF37]" placeholder="E.g. ₹5,000 / Day" />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-[#D4AF37] mb-1 font-bold">Mobile</label>
                  <input type="text" value={newMember.phone} onChange={e => setNewMember({...newMember, phone: e.target.value})} className="w-full bg-[#0B0D0E] border border-[#2B2519] rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#D4AF37]" placeholder="9876543210" />
                </div>
              </div>
              <button type="submit" className="w-full mt-4 py-3.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B89018] hover:from-[#F3E5AB] hover:to-[#D4AF37] text-black text-xs font-black uppercase tracking-wider transition-all">
                Submit & Register
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
