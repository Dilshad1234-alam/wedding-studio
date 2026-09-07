"use client";
import React, { useState } from 'react';
import Link from 'next/link';

export default function AvailableCrewPage() {
  const [availableCrew] = useState([
    {
      name: "Sikandar Ali",
      role: "Traditional Stills Lead",
      phone: "+91 95460 67890",
      address: "Adampur, Bhagalpur, Bihar",
      payout: "₹6,000 / Day",
      isBusy: false
    },
    {
      name: "Gautam Verma",
      role: "Steadicam & Gimbal Director",
      phone: "+91 80840 99887",
      address: "Tajpur Road, Samastipur, Bihar",
      payout: "₹8,000 / Day",
      isBusy: false
    }
  ]);

  return (
    <div className="min-h-screen bg-[#0B0D0E] text-[#F5F5F5] font-sans antialiased p-6 lg:p-10 space-y-8 selection:bg-emerald-400 selection:text-black">
      
      {/* 1. TOP BREADCRUMB & HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#1F242D]">
        <div>
          <span className="text-[10px] font-mono font-bold tracking-[0.25em] text-emerald-400 uppercase block mb-1">
            WEDDING OPERATIONS CONTROL
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white font-sans flex items-center gap-3">
            Available Crew
            <span className="text-xl">⚡</span>
          </h1>
          <p className="text-xs text-[#8A7D5C] mt-1">
            Studio personnel with zero conflicting bookings. Ready for instant dispatch.
          </p>
        </div>

        <Link className="px-4 py-2 rounded-xl border border-[#2B2519] bg-[#121518] hover:border-emerald-400 text-emerald-400 text-xs font-black uppercase tracking-wider transition-all cursor-pointer self-start sm:self-auto" href="/admin/wedding-management">
          ← Back to Hub
        </Link>
      </div>

      {/* 2. TABLE CONTAINER */}
      <div className="bg-[#121518] border border-emerald-900/30 rounded-3xl p-6 lg:p-8 shadow-2xl shadow-emerald-900/10 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-extrabold text-white">Free Personnel & Bench</h2>
            <p className="text-xs text-[#8A7D5C] mt-0.5">Showing {availableCrew.length} available cinematographers and photographers</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#20252F] text-xs uppercase font-bold tracking-widest text-[#8A7D5C]">
                <th className="py-3 px-4">Team Member</th>
                <th className="py-3 px-4">Craft / Role</th>
                <th className="py-3 px-4">Direct Contact</th>
                <th className="py-3 px-4">Residential Address</th>
                <th className="py-3 px-4">Agreed Payout / Rate</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#181B22] text-sm font-medium">
              {availableCrew.map((t, idx) => (
                <tr key={idx} className="hover:bg-[#161A20] transition-colors">
                  
                  {/* Name */}
                  <td className="py-4 px-4 font-extrabold text-white text-base tracking-tight">
                    {t.name}
                  </td>

                  {/* Craft / Role */}
                  <td className="py-4 px-4 text-[#D4AF37] font-semibold">
                    {t.role}
                  </td>

                  {/* Contact */}
                  <td className="py-4 px-4 font-mono text-white">
                    {t.phone}
                  </td>

                  {/* Residential Address */}
                  <td className="py-4 px-4 text-[#C5B388]">
                    {t.address}
                  </td>

                  {/* Agreed Payout */}
                  <td className="py-4 px-4 text-emerald-400 font-bold font-mono tracking-tight text-sm">
                    {t.payout}
                  </td>

                  {/* Availability */}
                  <td className="py-4 px-4">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      AVAILABLE
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
