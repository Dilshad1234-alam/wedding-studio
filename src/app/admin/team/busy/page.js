"use client";
import React, { useState } from 'react';
import Link from 'next/link';

export default function BusyCrewPage() {
  const [busyCrew, setBusyCrew] = useState([
    {
      name: "Rohit Kumar",
      role: "Lead Cinematographer",
      phone: "+91 98350 12345",
      client: "Md Ahmed & Farheen",
      event: "Royal Reception",
      destination: "Patna",
      dates: "16th Nov",
      payout: "₹12,000 / Day",
      status: "ON SET / SHOOTING"
    },
    {
      name: "Ritik Photo",
      role: "Master Candid Photographer",
      phone: "+91 91220 54321",
      client: "Ankit & Sneha",
      event: "Grand Wedding & Vows",
      destination: "Bhagalpur",
      dates: "6th Dec",
      payout: "₹10,500 / Day",
      status: "TRAVELING / BOOKED"
    },
    {
      name: "Priyanshu Roy",
      role: "Drone Specialist & Gaffer",
      phone: "+91 82100 98765",
      client: "Md Ahmed & Farheen",
      event: "Royal Reception",
      destination: "Patna",
      dates: "16th Nov",
      payout: "₹7,500 / Day",
      status: "ON SET / SHOOTING"
    },
    {
      name: "Sanoj Sharma",
      role: "Colorist & Senior Editor",
      phone: "+91 70040 11223",
      client: "Arman & Zoya",
      event: "Post-Production / Nikah Film",
      destination: "Patna Studio HQ",
      dates: "19th - 25th Nov",
      payout: "₹45,000 / Month",
      status: "IN STUDIO EDIT"
    }
  ]);

  return (
    <div className="min-h-screen bg-[#0B0D0E] text-[#F5F5F5] font-sans antialiased p-6 lg:p-10 space-y-8 selection:bg-[#D4AF37] selection:text-black">
      
      {/* 1. TOP HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#1F242D]">
        <div>
          <span className="text-[10px] font-mono font-bold tracking-[0.25em] text-rose-400 uppercase block mb-1">
            ACTIVE FLEET DEPLOYMENTS
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white font-sans">
            Assigned / Busy Crew Roster
          </h1>
          <p className="text-xs text-[#8A7D5C] mt-1">
            Track crew members currently dispatched to active wedding shoots, their assigned couple, destination, and event dates.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link className="px-4 py-2 rounded-xl border border-[#2B2519] bg-[#121518] hover:border-[#D4AF37] text-[#D4AF37] text-xs font-black uppercase tracking-wider transition-all cursor-pointer" href="/admin/wedding-management">
            ← Back to Wedding Management
          </Link>
          <Link className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B89018] text-black text-xs font-black uppercase tracking-wider transition-all shadow-md" href="/admin/dispatch">
            View Client Dispatch →
          </Link>
        </div>
      </div>

      {/* 2. TABLE OF BUSY CREW */}
      <div className="bg-[#121518] border border-[#2B2519] rounded-3xl p-6 lg:p-8 shadow-2xl space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-extrabold text-white">Active Shooting Missions</h2>
            <p className="text-xs text-[#8A7D5C] mt-0.5">Showing {busyCrew.length} team members currently engaged on field</p>
          </div>
          <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold bg-rose-500/10 text-rose-400 border border-rose-500/30">
            LOCKED ON DUTY
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#20252F] text-xs uppercase font-bold tracking-widest text-[#8A7D5C]">
                <th className="py-3 px-4">Team Member</th>
                <th className="py-3 px-4">Role / Craft</th>
                <th className="py-3 px-4">Direct Contact</th>
                <th className="py-3 px-4">Assigned Client & Event</th>
                <th className="py-3 px-4">Destination</th>
                <th className="py-3 px-4">Dates</th>
                <th className="py-3 px-4">Daily Payout</th>
                <th className="py-3 px-4">Deployment Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#181B22] text-sm font-medium">
              {busyCrew.map((member, idx) => (
                <tr key={idx} className="hover:bg-[#161A20] transition-colors">
                  
                  <td className="py-4 px-4 font-extrabold text-white text-base tracking-tight whitespace-nowrap">
                    {member.name}
                  </td>

                  <td className="py-4 px-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-1 rounded bg-[#181C22] border border-[#2B2519] text-[#D4AF37] font-mono text-[10px] uppercase font-bold tracking-wider">
                      {member.role}
                    </span>
                  </td>

                  <td className="py-4 px-4 font-mono text-white whitespace-nowrap">
                    {member.phone}
                  </td>

                  <td className="py-4 px-4 whitespace-nowrap">
                    <span className="text-white font-bold block">{member.client}</span>
                    <span className="text-xs text-[#D1C7A5]">{member.event}</span>
                  </td>

                  <td className="py-4 px-4 text-white font-medium whitespace-nowrap">
                    {member.destination}
                  </td>

                  <td className="py-4 px-4 font-mono text-[#D1C7A5] whitespace-nowrap">
                    {member.dates}
                  </td>

                  <td className="py-4 px-4 text-emerald-400 font-mono font-bold whitespace-nowrap">
                    {member.payout}
                  </td>

                  <td className="py-4 px-4 whitespace-nowrap">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-rose-500/10 text-rose-400 border border-rose-500/20">
                      {member.status}
                    </span>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
