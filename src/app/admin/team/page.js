"use client";
import React, { useState } from 'react';
import Link from 'next/link';

export default function StudioCrewDirectory() {
  const [expandedCrewId, setExpandedCrewId] = useState(null);

  // 1. All Registered 26 Team Members with Exact Phone Numbers from Excel
  const [teamMembers, setTeamMembers] = useState([
    { id: 1, name: "Vinod Kumar", role: "TRADITIONAL PHOTOGRAPHER", city: "Jehanabad", rate: "₹4,000 / Day", phone: "9304743192", status: "AVAILABLE" },
    { id: 2, name: "Raja Da", role: "CANDID PHOTOGRAPHER", city: "Kolkata", rate: "₹6,000 / Day", phone: "9051024878", status: "AVAILABLE" },
    { id: 3, name: "Debu Mukherjee", role: "LEAD CINEMATOGRAPHER", city: "Kolkata", rate: "₹8,000 / Day", phone: "9093180897", status: "AVAILABLE" },
    { id: 4, name: "Vikas Kumar", role: "DRONE PILOT", city: "Jehanabad", rate: "₹4,500 / Day", phone: "7870254008", status: "AVAILABLE" },
    { id: 5, name: "Ganesh Kumar", role: "DRONE PILOT", city: "Jehanabad", rate: "₹4,500 / Day", phone: "9341962640", status: "AVAILABLE" },
    { id: 6, name: "Bittu Kumar", role: "TRADITIONAL PHOTOGRAPHER", city: "Patna", rate: "₹3,500 / Day", phone: "6205865658", status: "AVAILABLE" },
    { id: 7, name: "Sarvan Kumar", role: "TRADITIONAL VIDEOGRAPHER & PHOTOGRAPHER", city: "Patna", rate: "₹4,000 / Day", phone: "6206152800", status: "AVAILABLE" },
    { id: 8, name: "Amar Kumar", role: "TRADITIONAL PHOTOGRAPHER", city: "Patna", rate: "₹3,500 / Day", phone: "8252546642", status: "AVAILABLE" },
    { id: 9, name: "Vikas Kumar (Video)", role: "TRADITIONAL VIDEOGRAPHER", city: "Jehanabad", rate: "₹4,000 / Day", phone: "8541094731", status: "AVAILABLE" },
    { id: 10, name: "Krish Raj Gupta", role: "TRADITIONAL VIDEOGRAPHER & PHOTOGRAPHER", city: "Patna", rate: "₹4,000 / Day", phone: "9546818478", status: "AVAILABLE" },
    { id: 11, name: "Rajesh Kumar", role: "LEAD CINEMATOGRAPHER", city: "Patna", rate: "₹6,500 / Day", phone: "9386263412", status: "AVAILABLE" },
    { id: 12, name: "Manu Kumar", role: "TRADITIONAL PHOTOGRAPHER", city: "Jehanabad", rate: "₹3,500 / Day", phone: "9608549112", status: "AVAILABLE" },
    { id: 13, name: "Pankaj Kumar", role: "TRADITIONAL PHOTOGRAPHER", city: "Patna City", rate: "₹3,500 / Day", phone: "7258067341", status: "AVAILABLE" },
    { id: 14, name: "Rohit", role: "TRADITIONAL PHOTOGRAPHER", city: "Jehanabad / Patna", rate: "₹4,000 / Day", phone: "8271987782", status: "AVAILABLE" },
    { id: 15, name: "Rocky Kumar", role: "DRONE PILOT", city: "Nalanda / Patna", rate: "₹5,000 / Day", phone: "9304569728", status: "AVAILABLE" },
    { id: 16, name: "Indrajeet Kumar", role: "DRONE PILOT", city: "Ekangarsarai", rate: "₹4,500 / Day", phone: "7296035011", status: "AVAILABLE" },
    { id: 17, name: "Surya Kumar", role: "TRADITIONAL PHOTOGRAPHER", city: "Bhagalpur", rate: "₹4,000 / Day", phone: "8789103481", status: "AVAILABLE" },
    { id: 18, name: "Sikandar", role: "TRADITIONAL VIDEOGRAPHER & PHOTOGRAPHER", city: "Kako, Jehanabad", rate: "₹4,000 / Day", phone: "6203445149", status: "AVAILABLE" },
    { id: 19, name: "Abhijeet Kumar", role: "LEAD CINEMATOGRAPHER", city: "Patna City", rate: "₹6,000 / Day", phone: "9534095619", status: "AVAILABLE" },
    { id: 20, name: "Gaurav Kumar", role: "LED BALL / LIGHTING SPECIALIST", city: "Patna", rate: "₹2,500 / Day", phone: "9576769523", status: "AVAILABLE" },
    { id: 21, name: "Lucky Kumar", role: "DRONE PILOT", city: "Bihar", rate: "₹4,500 / Day", phone: "7061128351", status: "AVAILABLE" },
    { id: 22, name: "Ritik Saw Kolkata", role: "LEAD CINEMATOGRAPHER", city: "Kolkata", rate: "₹8,000 / Day", phone: "9875571312", status: "AVAILABLE" },
    { id: 23, name: "Sanoj", role: "TRADITIONAL VIDEOGRAPHER", city: "Rajgir & Patna", rate: "₹4,000 / Day", phone: "9955193095", status: "AVAILABLE" },
    { id: 24, name: "Pintu Kumar", role: "ALL TYPES (PHOTO & CINEMA)", city: "Rajgir & Patna", rate: "₹4,500 / Day", phone: "8651418067", status: "AVAILABLE" },
    { id: 25, name: "Vikash Kumar (All)", role: "ALL TYPES (PHOTO & CINEMA)", city: "Rajgir & Patna", rate: "₹4,500 / Day", phone: "6200236091", status: "AVAILABLE" },
    { id: 26, name: "Shashi Kr.", role: "TRADITIONAL PHOTOGRAPHER", city: "Rajgir", rate: "₹3,500 / Day", phone: "8409869500", status: "AVAILABLE" },
    { id: 27, name: "Sanjeet", role: "CANDID PHOTOGRAPHER", city: "Patna", rate: "₹5,000 / Day", phone: "9835011223", status: "AVAILABLE" },
    { id: 28, name: "Manikant (Monu)", role: "DRONE PILOT", city: "Patna", rate: "₹5,000 / Day", phone: "9123456780", status: "AVAILABLE" },
    { id: 29, name: "Sumit", role: "ASSISTANT / PRODUCTION BOY", city: "Patna", rate: "₹1,500 / Day", phone: "9508112233", status: "AVAILABLE" }
  ]);

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
          <button className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B89018] hover:from-[#F3E5AB] hover:to-[#D4AF37] text-black text-xs font-black uppercase tracking-wider shadow-lg shadow-[#D4AF37]/25 transition-all cursor-pointer">
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
              {teamMembers.map((member) => {
                const isExpanded = expandedCrewId === member.id;
                const assignments = getAssignmentsForCrew(member.name);

                return (
                  <React.Fragment key={member.id}>
                    {/* Main Clickable Crew Row */}
                    <tr
                      onClick={() => setExpandedCrewId(isExpanded ? null : member.id)}
                      className={`cursor-pointer transition-all ${
                        isExpanded ? 'bg-[#181D24]' : 'hover:bg-[#15191F]'
                      }`}
                    >
                      {/* Name with Expand Arrow */}
                      <td className="py-4 px-6 font-bold text-white text-sm">
                        <div className="flex items-center gap-2.5">
                          <span className={`text-[10px] text-[#D4AF37] transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`}>
                            ▶
                          </span>
                          <span className="hover:text-[#F3E5AB]">{member.name}</span>
                          {assignments.length > 0 && (
                            <span className="px-2 py-0.5 rounded-full text-[9px] font-mono font-black bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/30">
                              {assignments.length} {assignments.length === 1 ? 'Shoot' : 'Shoots'}
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Craft / Role */}
                      <td className="py-4 px-6 font-mono font-bold text-[#D4AF37] text-[11px]">
                        {member.role}
                      </td>

                      {/* City */}
                      <td className="py-4 px-6 text-[#A89D84]">
                        {member.city}
                      </td>

                      {/* Rate */}
                      <td className="py-4 px-6 font-mono font-black text-emerald-400 text-sm">
                        {member.rate}
                      </td>

                      {/* Availability */}
                      <td className="py-4 px-6">
                        <span className="px-3 py-1 rounded-full text-[9px] font-mono font-black tracking-wider uppercase bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                          {member.status}
                        </span>
                      </td>

                      {/* Direct Mobile Number Column */}
                      <td className="py-4 px-6 text-right font-mono font-bold text-white text-sm">
                        <a
                          href={`tel:${member.phone}`}
                          onClick={(e) => e.stopPropagation()}
                          className="text-[#F5F5F5] hover:text-[#D4AF37] hover:underline"
                        >
                          +91 {member.phone}
                        </a>
                      </td>
                    </tr>

                    {/* Expandable Client Roster & Dates Sub-Panel */}
                    {isExpanded && (
                      <tr>
                        <td colSpan={6} className="p-0 bg-[#0B0D0E] border-y border-[#2B2519]">
                          <div className="p-6 space-y-3 bg-gradient-to-b from-[#121518] to-[#0B0D0E]">
                            <div className="flex items-center justify-between border-b border-[#20252F] pb-2.5">
                              <div className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-[#D4AF37]"></span>
                                <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#D4AF37]">
                                  ASSIGNED CLIENT SHOOTS & DATES FOR {member.name.toUpperCase()}
                                </span>
                              </div>
                              <span className="text-[11px] font-mono text-[#8A7D5C]">
                                Total Booked Events: {assignments.length}
                              </span>
                            </div>

                            {assignments.length > 0 ? (
                              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 pt-1">
                                {assignments.map((item, aIdx) => (
                                  <div
                                    key={aIdx}
                                    className="bg-[#15191F] border border-[#2B2519] hover:border-[#D4AF37]/50 rounded-2xl p-4 space-y-2 shadow-lg transition-all"
                                  >
                                    <div className="flex items-start justify-between gap-2">
                                      <h4 className="text-sm font-extrabold text-white">
                                        {item.clientName}
                                      </h4>
                                      <span className="px-2 py-0.5 rounded-lg bg-[#0B0D0E] text-[#D4AF37] font-mono font-black text-xs border border-[#2B2519]">
                                        {item.date}
                                      </span>
                                    </div>

                                    <div className="space-y-1 text-xs">
                                      <div className="text-white font-medium">
                                        ✨ {item.eventName}
                                      </div>
                                      <div className="text-[#8A7D5C] text-[11px]">
                                        📍 {item.location}
                                      </div>
                                      <div className="pt-1 text-[10px] font-mono text-emerald-400">
                                        Duty: {item.roleAssigned}
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <div className="p-4 rounded-2xl bg-[#121518] border border-[#20252F] flex items-center justify-between">
                                <span className="text-xs text-[#8A7D5C]">
                                  No booked client assignments found for this crew member in current dispatch records.
                                </span>
                                <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                  ✓ Available / Free for Allocation
                                </span>
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

    </div>
  );
}
