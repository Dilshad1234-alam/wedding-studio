"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function ClientDispatchConsole() {
  const [selectedYear, setSelectedYear] = useState(2026);
  const [selectedMonth, setSelectedMonth] = useState('SEP');
  const [expandedClientId, setExpandedClientId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingClientId, setEditingClientId] = useState(null);
  const [uploadingPdfId, setUploadingPdfId] = useState(null);

  const monthsList = [
    { key: 'JAN', name: 'JAN', num: 1 },
    { key: 'FEB', name: 'FEB', num: 2 },
    { key: 'MAR', name: 'MAR', num: 3 },
    { key: 'APR', name: 'APR', num: 4 },
    { key: 'MAY', name: 'MAY', num: 5 },
    { key: 'JUN', name: 'JUN', num: 6 },
    { key: 'JUL', name: 'JUL', num: 7 },
    { key: 'AUG', name: 'AUG', num: 8 },
    { key: 'SEP', name: 'SEP', num: 9 },
    { key: 'OCT', name: 'OCT', num: 10 },
    { key: 'NOV', name: 'NOV', num: 11 },
    { key: 'DEC', name: 'DEC', num: 12 }
  ];

  const yearsList = [2026, 2027, 2028, 2029, 2030];

  const eventOptionsList = [
    "Engagement",
    "Pre-Wedding Shoot",
    "Rituals (Bride)",
    "Rituals (Groom)",
    "Haldi Shoot",
    "Haldi (Haldi Kutai)",
    "Mehndi Ceremony",
    "Haldi, Mehndi & Sangeet",
    "Sangeet Night",
    "Tilak Ceremony",
    "Madwa & Matkor",
    "Puja & Matkor",
    "Lagan Ceremony",
    "Grand Wedding Day",
    "Royal Reception",
    "Birthday / Anniversary",
    "Other / Custom Ritual"
  ];

  const defaultClients = [
    {
      id: 1,
      serialNo: 1,
      clientName: "PRIYA KUMARI",
      destination: "Sitamarhi / Begusarai / Patna",
      totalBudget: "₹3,50,000",
      status: "SCHEDULED",
      daysCount: 4,
      year: 2026,
      month: "APR",
      schedule: [
        { dayNo: 1, date: "22 APR 2026", eventName: "Rituals (Bride)", location: "Sitamarhi Home", tradPhoto: "Rohit", candidPhoto: "—", allTypePhoto: "—", tradVideo: "Sanoj", cinema: "—", drone: "Sanoj", reportingTime: "10:00 AM" },
        { dayNo: 2, date: "23 APR 2026", eventName: "Haldi Shoot", location: "Sitamarhi Home", tradPhoto: "Rohit", candidPhoto: "—", allTypePhoto: "—", tradVideo: "Sanoj", cinema: "—", drone: "—", reportingTime: "11:00 AM" },
        { dayNo: 3, date: "25 APR 2026", eventName: "Rituals (Groom)", location: "Begusarai Home", tradPhoto: "Rohit", candidPhoto: "—", allTypePhoto: "—", tradVideo: "Sanoj", cinema: "—", drone: "—", reportingTime: "04:00 PM" },
        { dayNo: 4, date: "26 APR 2026", eventName: "Grand Wedding Day", location: "Hajipur, Patna", tradPhoto: "Rohit", candidPhoto: "Sanjeet", allTypePhoto: "—", tradVideo: "Aman", cinema: "Ritik Saw Kolkata", drone: "Manikant (Monu)", reportingTime: "06:00 PM" }
      ]
    },
    {
      id: 2,
      serialNo: 2,
      clientName: "RAVI RANJAN",
      destination: "Kankarbagh / Kumhrar / Patna",
      totalBudget: "₹3,20,000",
      status: "SCHEDULED",
      daysCount: 4,
      year: 2026,
      month: "MAY",
      schedule: [
        { dayNo: 1, date: "04 MAY 2026", eventName: "Sangeet Night", location: "Hotel Anand Sagar", tradPhoto: "Rohit", candidPhoto: "—", allTypePhoto: "—", tradVideo: "Sanoj", cinema: "—", drone: "—", reportingTime: "05:00 PM" },
        { dayNo: 2, date: "05 MAY 2026", eventName: "Haldi, Mehndi & Sangeet", location: "Biscomaun Colony", tradPhoto: "Rohit", candidPhoto: "—", allTypePhoto: "—", tradVideo: "Sanoj", cinema: "—", drone: "—", reportingTime: "11:00 AM" },
        { dayNo: 3, date: "06 MAY 2026", eventName: "Madwa & Matkor", location: "Biscomaun Colony", tradPhoto: "Rohit", candidPhoto: "—", allTypePhoto: "—", tradVideo: "Sanoj", cinema: "—", drone: "—", reportingTime: "04:00 PM" },
        { dayNo: 4, date: "07 MAY 2026", eventName: "Grand Wedding Day", location: "Bhagwat Banquet Hall", tradPhoto: "Rohit", candidPhoto: "Sanjeet", allTypePhoto: "—", tradVideo: "Sanoj", cinema: "Suraj", drone: "Manikant (Monu)", reportingTime: "06:00 PM" }
      ]
    }
  ];

  // 1. Initial State from localStorage (Prevents data loss on refresh)
  const [clients, setClients] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('weddingpur_dispatch_clients');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          console.error(e);
        }
      }
    }
    return defaultClients;
  });

  // Restore Active Tab on Refresh
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedYr = localStorage.getItem('weddingpur_active_year');
      const savedMo = localStorage.getItem('weddingpur_active_month');
      if (savedYr) setSelectedYear(parseInt(savedYr, 10));
      if (savedMo) setSelectedMonth(savedMo);
    }
  }, []);

  // Sync clients to localStorage whenever updated
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('weddingpur_dispatch_clients', JSON.stringify(clients));
    }
  }, [clients]);

  const [registeredCrew, setRegisteredCrew] = useState([]);

  useEffect(() => {
    fetch('/api/wedding/team')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setRegisteredCrew(data);
        }
      })
      .catch((err) => console.error("Error loading team members:", err));
  }, []);

  const [formData, setFormData] = useState({
    clientName: "",
    destination: "",
    totalBudget: "",
    status: "SCHEDULED",
    year: selectedYear,
    month: selectedMonth,
    days: [
      {
        dayNo: 1,
        dayOfMonth: "15",
        eventName: "Haldi Shoot",
        location: "",
        tradPhoto: "",
        candidPhoto: "",
        allTypePhoto: "",
        tradVideo: "",
        cinema: "",
        drone: "",
        reportingTime: "10:00 AM"
      }
    ]
  });

  const cleanDate = (d) => (d || '').toLowerCase().replace(/[^a-z0-9]/g, '');

  const formatFullDate = (dayNum, month, year) => {
    if (!dayNum) return '';
    const cleanDay = String(dayNum).trim().padStart(2, '0');
    return `${cleanDay} ${month} ${year}`;
  };

  const isMemberBusyOnDate = (memberName, fullTargetDate, currentDayIdx) => {
    if (!memberName || !fullTargetDate) return false;
    const normTarget = cleanDate(fullTargetDate);
    if (!normTarget) return false;

    const normMember = memberName.toLowerCase().trim();

    for (const client of clients) {
      for (const day of client.schedule) {
        if (cleanDate(day.date) === normTarget) {
          const booked = [
            day.tradPhoto,
            day.candidPhoto,
            day.allTypePhoto,
            day.tradVideo,
            day.cinema,
            day.drone
          ].map(n => (n || '').toLowerCase().trim());

          if (booked.includes(normMember)) {
            return true;
          }
        }
      }
    }

    if (formData.days && formData.days[currentDayIdx]) {
      const thisDay = formData.days[currentDayIdx];
      const thisDayFull = formatFullDate(thisDay.dayOfMonth, formData.month, formData.year);
      if (cleanDate(thisDayFull) === normTarget) {
        const assignedInSameFormRow = [
          thisDay.tradPhoto,
          thisDay.candidPhoto,
          thisDay.allTypePhoto,
          thisDay.tradVideo,
          thisDay.cinema,
          thisDay.drone
        ].map(n => (n || '').toLowerCase().trim());

        const count = assignedInSameFormRow.filter(n => n === normMember).length;
        if (count > 1) return true;
      }
    }

    return false;
  };

  const getAvailableCrewForCategory = (categoryType, fullTargetDate, currentDayIdx) => {
    return registeredCrew.filter((m) => {
      const role = (m.craftRole || m.role || '').toLowerCase();
      let matchesCategory = false;

      if (categoryType === 'tradPhoto') {
        matchesCategory = role.includes('traditional') && role.includes('photo');
      } else if (categoryType === 'candidPhoto') {
        matchesCategory = role.includes('candid');
      } else if (categoryType === 'allTypePhoto') {
        matchesCategory = role.includes('all') || role.includes('multi') || (role.includes('photo') && !role.includes('traditional') && !role.includes('candid'));
      } else if (categoryType === 'tradVideo') {
        matchesCategory = role.includes('traditional') && role.includes('video');
      } else if (categoryType === 'cinema') {
        matchesCategory = role.includes('cinema') || role.includes('director');
      } else if (categoryType === 'drone') {
        matchesCategory = role.includes('drone');
      }

      if (!matchesCategory) return false;

      const isBusy = isMemberBusyOnDate(m.name, fullTargetDate, currentDayIdx);
      return !isBusy;
    });
  };

  const filteredClients = clients.filter(
    (c) => c.year === selectedYear && c.month === selectedMonth
  );

  const getMonthClientCount = (mKey) => {
    return clients.filter((c) => c.year === selectedYear && c.month === mKey).length;
  };

  const handleYearTabChange = (yr) => {
    setSelectedYear(yr);
    if (typeof window !== 'undefined') localStorage.setItem('weddingpur_active_year', yr);
  };

  const handleMonthTabChange = (mKey) => {
    setSelectedMonth(mKey);
    setExpandedClientId(null);
    if (typeof window !== 'undefined') localStorage.setItem('weddingpur_active_month', mKey);
  };

  const addDayRow = () => {
    const nextDayNo = formData.days.length + 1;
    const prevDayNum = parseInt(formData.days[formData.days.length - 1]?.dayOfMonth || "15", 10);
    const nextDayNum = isNaN(prevDayNum) ? "16" : String(prevDayNum + 1);

    setFormData({
      ...formData,
      days: [
        ...formData.days,
        {
          dayNo: nextDayNo,
          dayOfMonth: nextDayNum,
          eventName: nextDayNo === 2 ? "Sangeet Night" : nextDayNo === 3 ? "Grand Wedding Day" : "Royal Reception",
          location: formData.days[0]?.location || "",
          tradPhoto: "",
          candidPhoto: "",
          allTypePhoto: "",
          tradVideo: "",
          cinema: "",
          drone: "",
          reportingTime: "04:00 PM"
        }
      ]
    });
  };

  const removeDayRow = (idxToRemove) => {
    if (formData.days.length === 1) return;
    const updated = formData.days
      .filter((_, idx) => idx !== idxToRemove)
      .map((item, idx) => ({ ...item, dayNo: idx + 1 }));
    setFormData({ ...formData, days: updated });
  };

  const updateDayField = (idx, field, value) => {
    const updated = [...formData.days];
    updated[idx][field] = value;
    setFormData({ ...formData, days: updated });
  };

  const handleSaveClient = (e) => {
    e.preventDefault();
    
    const formattedSchedule = formData.days.map(day => ({
      ...day,
      date: formatFullDate(day.dayOfMonth, formData.month, formData.year)
    }));

    if (editingClientId) {
      setClients(prev => prev.map(c => {
        if (c.id === editingClientId) {
          const updated = {
            ...c,
            clientName: formData.clientName || "Unnamed Client",
            destination: formData.destination || "Patna",
            totalBudget: formData.totalBudget.startsWith('₹') ? formData.totalBudget : `₹${formData.totalBudget}`,
            status: formData.status,
            daysCount: formData.days.length,
            year: parseInt(formData.year, 10),
            month: formData.month,
            schedule: formattedSchedule
          };
          if (updated._id) {
            fetch('/api/wedding/clients', {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(updated)
            }).catch(console.error);
          }
          return updated;
        }
        return c;
      }));
      setExpandedClientId(editingClientId);
      handleYearTabChange(parseInt(formData.year, 10));
      handleMonthTabChange(formData.month);
    } else {
      const newClient = {
        id: Date.now(),
        clientName: formData.clientName || "Unnamed Client",
        destination: formData.destination || "Patna",
        totalBudget: formData.totalBudget.startsWith('₹') ? formData.totalBudget : `₹${formData.totalBudget}`,
        status: formData.status,
        daysCount: formData.days.length,
        year: parseInt(formData.year, 10),
        month: formData.month,
        schedule: formattedSchedule
      };

      const updatedClients = [newClient, ...clients];
      setClients(updatedClients);
      setExpandedClientId(newClient.id);
      
      handleYearTabChange(newClient.year);
      handleMonthTabChange(newClient.month);
    }

    setIsModalOpen(false);
    setEditingClientId(null);
    setFormData({
      clientName: "",
      destination: "",
      totalBudget: "",
      status: "SCHEDULED",
      year: selectedYear,
      month: selectedMonth,
      days: [
        {
          dayNo: 1,
          dayOfMonth: "15",
          eventName: "Haldi Shoot",
          location: "",
          tradPhoto: "",
          candidPhoto: "",
          allTypePhoto: "",
          tradVideo: "",
          cinema: "",
          drone: "",
          reportingTime: "10:00 AM"
        }
      ]
    });
  };

  const openEditModal = (client) => {
    setEditingClientId(client.id);
    setFormData({
      clientName: client.clientName || "",
      destination: client.destination || "",
      totalBudget: client.totalBudget || "",
      status: client.status || "SCHEDULED",
      year: client.year || selectedYear,
      month: client.month || selectedMonth,
      days: client.schedule && client.schedule.length > 0 ? client.schedule.map(d => ({
        ...d,
        dayOfMonth: d.date ? d.date.split(' ')[0] : ''
      })) : [
        { dayNo: 1, dayOfMonth: "", eventName: "Event", location: "", tradPhoto: "", candidPhoto: "", allTypePhoto: "", tradVideo: "", cinema: "", drone: "", reportingTime: "10:00 AM" }
      ]
    });
    setIsModalOpen(true);
  };

  const handlePdfUpload = async (e, clientId) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadingPdfId(clientId);
    const formUpload = new FormData();
    formUpload.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formUpload,
      });
      const data = await res.json();
      
      if (data.success) {
        setClients(prev => prev.map(c => {
          if (c.id === clientId) {
            const updated = { ...c, documentUrl: data.url };
            if (updated._id) {
               fetch('/api/wedding/clients', {
                 method: 'PUT',
                 headers: { 'Content-Type': 'application/json' },
                 body: JSON.stringify(updated)
               }).catch(console.error);
            }
            return updated;
          }
          return c;
        }));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setUploadingPdfId(null);
    }
  };

  const deleteClient = (id) => {
    const remaining = clients.filter((c) => c.id !== id);
    setClients(remaining);
  };

  return (
    <div className="min-h-screen bg-[#0B0D0E] text-[#F5F5F5] font-sans antialiased p-6 lg:p-10 space-y-6 selection:bg-[#D4AF37] selection:text-black">
      
      {/* 1. TOP OPERATIONS HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#1F242D]">
        <div>
          <span className="text-[10px] font-mono font-bold tracking-[0.25em] text-[#D4AF37] uppercase block mb-1">
            WEDDING OPERATIONS CONTROL
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white font-sans">
            Client Dispatch Console
          </h1>
          <p className="text-xs text-[#8A7D5C] mt-1 font-normal font-sans">
            Month-by-month shoot roster, auto-conflict detection, multi-day call sheets, and crew bookings.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link className="px-4 py-2.5 rounded-xl border border-[#2B2519] bg-[#121518] hover:border-[#D4AF37] text-[#D4AF37] text-xs font-sans font-semibold uppercase tracking-wider transition-all" href="/admin/wedding-management">
            ← Back to Wedding Management
          </Link>
          <button
            onClick={() => {
              setEditingClientId(null);
              setFormData({
                clientName: "",
                destination: "",
                totalBudget: "",
                status: "SCHEDULED",
                year: selectedYear,
                month: selectedMonth,
                days: [
                  {
                    dayNo: 1,
                    dayOfMonth: "15",
                    eventName: "Haldi Shoot",
                    location: "",
                    tradPhoto: "",
                    candidPhoto: "",
                    allTypePhoto: "",
                    tradVideo: "",
                    cinema: "",
                    drone: "",
                    reportingTime: "10:00 AM"
                  }
                ]
              });
              setIsModalOpen(true);
            }}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B89018] hover:from-[#F3E5AB] hover:to-[#D4AF37] text-black text-xs font-sans font-semibold uppercase tracking-wider shadow-lg shadow-[#D4AF37]/25 transition-all cursor-pointer"
          >
            + Add New Client
          </button>
        </div>
      </div>

      {/* 2. YEAR & 12-MONTH TIMELINE NAVIGATION BAR */}
      <div className="bg-[#121518] border border-[#2B2519] rounded-3xl p-4 sm:p-5 shadow-2xl space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#1F242D] pb-3.5">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-[#8A7D5C] uppercase tracking-wider">
              OPERATIONAL YEAR:
            </span>
            <div className="flex items-center gap-1.5 bg-[#0B0D0E] p-1 rounded-xl border border-[#2B2519]">
              {yearsList.map((yr) => (
                <button
                  key={yr}
                  type="button"
                  onClick={() => handleYearTabChange(yr)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                    selectedYear === yr
                      ? 'bg-gradient-to-r from-[#D4AF37] to-[#B89018] text-black font-bold shadow-md'
                      : 'text-[#8A7D5C] hover:text-white'
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

        {/* 12 Months Ribbon */}
        <div className="grid grid-cols-3 sm:grid-cols-6 lg:grid-cols-12 gap-1.5">
          {monthsList.map((m) => {
            const isCurrentMonth = selectedMonth === m.key;
            const count = getMonthClientCount(m.key);

            return (
              <button
                key={m.key}
                type="button"
                onClick={() => handleMonthTabChange(m.key)}
                className={`py-2.5 px-2 rounded-xl text-xs font-mono font-bold uppercase transition-all cursor-pointer flex flex-col items-center justify-center gap-1 relative ${
                  isCurrentMonth
                    ? 'bg-[#D4AF37] text-black font-bold shadow-lg shadow-[#D4AF37]/25'
                    : 'bg-[#181B20] text-[#A89D84] hover:text-white hover:bg-[#20252E] border border-[#2B2519]'
                }`}
              >
                <span>{m.name}</span>
                {count > 0 ? (
                  <span className={`text-[9px] px-1.5 py-0.2 rounded-full font-mono font-bold ${
                    isCurrentMonth ? 'bg-black text-[#D4AF37]' : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                  }`}>
                    {count} {count === 1 ? 'shoot' : 'shoots'}
                  </span>
                ) : (
                  <span className="text-[9px] opacity-30">—</span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. ROSTER SUMMARY HEADER & SERIAL-WISE CLIENT CARDS */}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#D4AF37]"></span>
            <span className="text-sm font-bold text-white uppercase tracking-wider font-mono">
              Booked Clients for {selectedMonth} {selectedYear} ({filteredClients.length})
            </span>
          </div>
          <span className="text-xs text-[#8A7D5C] font-mono">
            Showing serial by event date
          </span>
        </div>

        {/* Empty State */}
        {filteredClients.length === 0 && (
          <div className="bg-[#121518] border border-dashed border-[#2B2519] rounded-3xl p-12 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#181B20] border border-[#2B2519] text-2xl flex items-center justify-center mx-auto text-[#8A7D5C]">
              📅
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">No Weddings Scheduled in {selectedMonth} {selectedYear}</h3>
              <p className="text-xs text-[#8A7D5C] max-w-sm mx-auto mt-1">
                There are no client dispatch records logged for this month yet.
              </p>
            </div>
            <button
              onClick={() => {
                setFormData((prev) => ({ ...prev, year: selectedYear, month: selectedMonth }));
                setIsModalOpen(true);
              }}
              className="px-5 py-2.5 rounded-xl bg-[#20252E] hover:bg-[#D4AF37] hover:text-black text-[#D4AF37] text-xs font-sans font-semibold uppercase tracking-wider border border-[#D4AF37]/40 transition-all cursor-pointer"
            >
              + Book Client for {selectedMonth} {selectedYear}
            </button>
          </div>
        )}

        {/* Serial-Wise Clients List */}
        {filteredClients.map((client, sIdx) => {
          const isExpanded = expandedClientId === client.id;
          const serialNo = sIdx + 1;

          return (
            <div
              key={client.id}
              className="bg-[#121518] border border-[#2B2519] hover:border-[#D4AF37]/40 rounded-3xl overflow-hidden shadow-2xl transition-all"
            >
              <div
                onClick={() => setExpandedClientId(isExpanded ? null : client.id)}
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
                    <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                      {client.clientName}
                    </h3>
                    <span className="text-xs text-[#8A7D5C] font-mono block sm:inline">
                      📍 {client.destination} • {client.daysCount} Days Multi-Day Ceremony
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-5 self-end md:self-auto">
                  <div className="text-right">
                    <span className="text-[10px] text-[#8A7D5C] uppercase font-bold block font-mono">Contract Fee</span>
                    <span className="text-lg sm:text-xl font-bold font-mono text-[#D4AF37]">{client.totalBudget}</span>
                  </div>

                  <span className={`px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase ${
                    client.status === 'CONFIRMED'
                      ? 'bg-blue-500/15 text-blue-400 border border-blue-500/30'
                      : client.status === 'DELIVERED'
                      ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                      : 'bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/30'
                  }`}>
                    {client.status}
                  </span>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      openEditModal(client);
                    }}
                    className="p-2 rounded-xl border border-[#2B2519] bg-[#16191F] text-[#8A7D5C] hover:text-[#D4AF37] hover:border-[#D4AF37]/50 hover:bg-[#D4AF37]/10 transition-all duration-200 cursor-pointer inline-flex items-center justify-center"
                    title="Edit Record"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                  </button>

                  <label 
                    onClick={(e) => e.stopPropagation()}
                    className={`p-2 rounded-xl border border-[#2B2519] bg-[#16191F] text-[#8A7D5C] hover:text-emerald-400 hover:border-emerald-500/50 hover:bg-emerald-500/10 transition-all duration-200 cursor-pointer inline-flex items-center justify-center ${uploadingPdfId === client.id ? 'animate-pulse' : ''}`}
                    title="Upload Document / PDF"
                  >
                    <input type="file" className="hidden" accept=".pdf,image/*" onChange={(e) => handlePdfUpload(e, client.id)} />
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                    </svg>
                  </label>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteClient(client.id);
                    }}
                    className="p-2 rounded-xl border border-[#2B2519] bg-[#16191F] text-[#8A7D5C] hover:text-rose-400 hover:border-rose-500/50 hover:bg-rose-500/10 transition-all duration-200 cursor-pointer inline-flex items-center justify-center"
                    title="Delete Record"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>

                  {client.documentUrl && (
                    <a
                      href={client.documentUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/25 transition-all"
                    >
                      View PDF
                    </a>
                  )}

                  <span className="text-xs text-[#8A7D5C] font-mono">
                    {isExpanded ? '▲ HIDE' : '▼ ROSTER'}
                  </span>
                </div>
              </div>

              {/* Day-Wise Roster Table */}
              {isExpanded && (
                <div className="border-t border-[#1F242D] bg-[#0E1013] p-6 space-y-4 overflow-x-auto">
                  <div className="flex items-center justify-between pb-2">
                    <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#D4AF37]">
                      SL. NO. {serialNo} — {client.clientName} ({client.daysCount} DAYS CREW DEPLOYMENT)
                    </span>
                    <span className="text-[10px] text-emerald-400 font-mono font-bold">
                      ✓ All specialist crew confirmed
                    </span>
                  </div>

                  <table className="w-full text-left text-xs border-collapse min-w-[950px]">
                    <thead>
                      <tr className="bg-[#181B20] text-[#D4AF37] border-y border-[#2B2519] text-[10px] font-mono font-bold uppercase">
                        <th className="p-3">Day</th>
                        <th className="p-3">Date</th>
                        <th className="p-3">Event / Ritual</th>
                        <th className="p-3">Location</th>
                        <th className="p-3">Trad. Photo</th>
                        <th className="p-3">Candid Photo</th>
                        <th className="p-3">All-Type Photo</th>
                        <th className="p-3">Trad. Video</th>
                        <th className="p-3">Cinema Lead</th>
                        <th className="p-3">Drone Pilot</th>
                        <th className="p-3">Call Time</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#1C2027]">
                      {client.schedule.map((day) => (
                        <tr key={day.dayNo} className="hover:bg-[#151921] transition-colors">
                          <td className="p-3 font-mono font-bold text-white bg-[#121518]">Day {day.dayNo}</td>
                          <td className="p-3 font-mono font-bold text-[#D4AF37]">{day.date}</td>
                          <td className="p-3 font-semibold text-white">{day.eventName}</td>
                          <td className="p-3 text-[#A89D84]">{day.location}</td>
                          <td className="p-3 text-[#F5F5F5] font-medium">{day.tradPhoto || '—'}</td>
                          <td className="p-3 text-[#C5B388] font-medium">{day.candidPhoto || '—'}</td>
                          <td className="p-3 text-cyan-400 font-medium">{day.allTypePhoto || '—'}</td>
                          <td className="p-3 text-[#F5F5F5] font-medium">{day.tradVideo || '—'}</td>
                          <td className="p-3 text-emerald-400 font-bold">{day.cinema || '—'}</td>
                          <td className="p-3 text-amber-400">{day.drone || '—'}</td>
                          <td className="p-3 font-mono text-[#D4AF37]">{day.reportingTime || '—'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* 4. MULTI-DAY CLIENT SCHEDULER MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 overflow-y-auto">
          <div className="bg-[#121518] border border-[#2B2519] rounded-3xl p-6 sm:p-8 max-w-5xl w-full space-y-6 shadow-2xl my-8">
            
            <div className="flex items-center justify-between border-b border-[#20252F] pb-4">
              <div>
                <span className="text-[10px] font-mono font-bold text-[#D4AF37] uppercase tracking-wider block">
                  WEDDING SHOOT BUILDER
                </span>
                <h3 className="text-xl font-bold text-white">
                  {editingClientId ? "Edit Client & Multi-Day Crew Roster" : "Add New Client & Multi-Day Crew Roster"}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-[#8A7D5C] hover:text-white text-lg cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveClient} className="space-y-6 text-xs">
              
              {/* Year & Month Selector */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#0B0D0E] p-4 rounded-2xl border border-[#2B2519]">
                <div>
                  <label className="block text-[#8A7D5C] uppercase font-bold mb-1 text-[10px] font-mono">Booking Year</label>
                  <select
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value, 10) })}
                    className="w-full bg-[#181B20] border border-[#2B2519] rounded-xl px-3 py-2 text-white font-mono font-bold"
                  >
                    {yearsList.map((y) => (
                      <option key={y} value={y}>{y}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[#8A7D5C] uppercase font-bold mb-1 text-[10px] font-mono">Booking Month</label>
                  <select
                    value={formData.month}
                    onChange={(e) => setFormData({ ...formData, month: e.target.value })}
                    className="w-full bg-[#181B20] border border-[#2B2519] rounded-xl px-3 py-2 text-[#D4AF37] font-mono font-bold"
                  >
                    {monthsList.map((m) => (
                      <option key={m.key} value={m.key}>{m.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[#8A7D5C] uppercase font-bold mb-1 text-[10px] font-mono">Contract Fee (₹)</label>
                  <input
                    type="text"
                    required
                    placeholder="3,50,000"
                    value={formData.totalBudget}
                    onChange={(e) => setFormData({ ...formData, totalBudget: e.target.value })}
                    className="w-full bg-[#181B20] border border-[#2B2519] rounded-xl px-3 py-2 text-emerald-400 font-mono font-bold"
                  />
                </div>

                <div>
                  <label className="block text-[#8A7D5C] uppercase font-bold mb-1 text-[10px] font-mono">Shoot Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full bg-[#181B20] border border-[#2B2519] rounded-xl px-3 py-2 text-white font-semibold"
                  >
                    <option value="SCHEDULED">SCHEDULED</option>
                    <option value="CONFIRMED">CONFIRMED</option>
                    <option value="DELIVERED">DELIVERED</option>
                  </select>
                </div>
              </div>

              {/* Client Name & Destination */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-[#15191F] p-4 rounded-2xl border border-[#2B2519]">
                <div>
                  <label className="block text-[#8A7D5C] uppercase font-bold mb-1 text-[10px] font-mono">Couple / Client Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. PRIYA KUMARI"
                    value={formData.clientName}
                    onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                    className="w-full bg-[#181B20] border border-[#2B2519] rounded-xl px-3 py-2 text-white font-bold"
                  />
                </div>

                <div>
                  <label className="block text-[#8A7D5C] uppercase font-bold mb-1 text-[10px] font-mono">Primary Destination</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sitamarhi / Patna"
                    value={formData.destination}
                    onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                    className="w-full bg-[#181B20] border border-[#2B2519] rounded-xl px-3 py-2 text-white"
                  />
                </div>
              </div>

              {/* Dynamic Day-Wise Crew Schedule Builder */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                      Schedule By Day ({formData.days.length} Days)
                    </h4>
                    <span className="text-[10px] text-emerald-400 font-mono block">
                      ⚡ Bas tareekh daalein — Year & Month upar se auto-lock honge
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={addDayRow}
                    className="px-4 py-1.5 rounded-xl bg-[#20252E] hover:bg-[#D4AF37] hover:text-black text-[#D4AF37] text-xs font-semibold uppercase tracking-wider border border-[#D4AF37]/40 transition-all cursor-pointer"
                  >
                    + Add Day {formData.days.length + 1}
                  </button>
                </div>

                <div className="space-y-4 max-h-[380px] overflow-y-auto pr-1">
                  {formData.days.map((day, idx) => {
                    const fullDateStr = formatFullDate(day.dayOfMonth, formData.month, formData.year);

                    const availableTradPhoto = getAvailableCrewForCategory('tradPhoto', fullDateStr, idx);
                    const availableCandidPhoto = getAvailableCrewForCategory('candidPhoto', fullDateStr, idx);
                    const availableAllTypePhoto = getAvailableCrewForCategory('allTypePhoto', fullDateStr, idx);
                    const availableTradVideo = getAvailableCrewForCategory('tradVideo', fullDateStr, idx);
                    const availableCinema = getAvailableCrewForCategory('cinema', fullDateStr, idx);
                    const availableDrone = getAvailableCrewForCategory('drone', fullDateStr, idx);

                    return (
                      <div
                        key={day.dayNo}
                        className="bg-[#181B20] border border-[#2B2519] rounded-2xl p-4 space-y-3"
                      >
                        <div className="flex items-center justify-between pb-2 border-b border-[#20252F]">
                          <span className="px-3 py-0.5 rounded-lg bg-[#0B0D0E] text-[#D4AF37] font-mono font-bold text-xs border border-[#2B2519]">
                            DAY {day.dayNo}
                          </span>
                          {formData.days.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeDayRow(idx)}
                              className="text-rose-400 text-xs hover:underline cursor-pointer"
                            >
                              Remove Day
                            </button>
                          )}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          <div>
                            <label className="block text-[#8A7D5C] text-[10px] font-mono uppercase font-bold mb-1">
                              Tareekh / Date (Day)
                            </label>
                            <div className="flex items-center gap-1.5">
                              <input
                                type="text"
                                required
                                placeholder="15"
                                value={day.dayOfMonth}
                                onChange={(e) => updateDayField(idx, 'dayOfMonth', e.target.value)}
                                className="w-20 bg-[#121518] border border-[#2B2519] rounded-lg px-2.5 py-1.5 text-white font-mono text-center font-bold focus:outline-none focus:border-[#D4AF37]"
                              />
                              <span className="px-2.5 py-1.5 rounded-lg bg-[#0B0D0E] border border-[#2B2519] text-[#D4AF37] font-mono font-bold text-xs">
                                {formData.month} {formData.year}
                              </span>
                            </div>
                          </div>

                          <div>
                            <label className="block text-[#8A7D5C] text-[10px] font-mono uppercase font-bold mb-1">Event / Ritual</label>
                            <select
                              value={day.eventName}
                              onChange={(e) => updateDayField(idx, 'eventName', e.target.value)}
                              className="w-full bg-[#121518] border border-[#2B2519] rounded-lg px-2.5 py-1.5 text-white font-bold focus:outline-none focus:border-[#D4AF37]"
                            >
                              <option value="">— Select Event / Ritual —</option>
                              {eventOptionsList.map((ev) => (
                                <option key={ev} value={ev}>
                                  {ev}
                                </option>
                              ))}
                            </select>
                          </div>

                          <div>
                            <label className="block text-[#8A7D5C] text-[10px] font-mono uppercase font-bold mb-1">Specific Location</label>
                            <input
                              type="text"
                              required
                              placeholder="e.g. Sitamarhi Home"
                              value={day.location}
                              onChange={(e) => updateDayField(idx, 'location', e.target.value)}
                              className="w-full bg-[#121518] border border-[#2B2519] rounded-lg px-2.5 py-1.5 text-white"
                            />
                          </div>
                        </div>

                        {/* Specialists selection row */}
                        <div className="pt-1">
                          <span className="text-[10px] text-[#D4AF37] font-mono font-bold uppercase block mb-2">
                            Assigned Specialists for Day {day.dayNo} (Free on {fullDateStr || "Date"}):
                          </span>

                          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-2">
                            
                            <div>
                              <label className="block text-[#8A7D5C] text-[9px] uppercase font-mono font-bold mb-1">Trad. Photo</label>
                              <select
                                value={day.tradPhoto}
                                onChange={(e) => updateDayField(idx, 'tradPhoto', e.target.value)}
                                className="w-full bg-[#121518] border border-[#2B2519] rounded-lg px-2 py-1.5 text-white text-[11px] focus:outline-none focus:border-[#D4AF37]"
                              >
                                <option value="">— Free Crew —</option>
                                {availableTradPhoto.map((m) => (
                                  <option key={m._id || m.id || m.name} value={m.name}>
                                    {m.name}
                                  </option>
                                ))}
                              </select>
                            </div>

                            <div>
                              <label className="block text-[#8A7D5C] text-[9px] uppercase font-mono font-bold mb-1">Candid Photo</label>
                              <select
                                value={day.candidPhoto}
                                onChange={(e) => updateDayField(idx, 'candidPhoto', e.target.value)}
                                className="w-full bg-[#121518] border border-[#2B2519] rounded-lg px-2 py-1.5 text-[#C5B388] text-[11px] focus:outline-none focus:border-[#D4AF37]"
                              >
                                <option value="">— Free Crew —</option>
                                {availableCandidPhoto.map((m) => (
                                  <option key={m._id || m.id || m.name} value={m.name}>
                                    {m.name}
                                  </option>
                                ))}
                              </select>
                            </div>

                            <div>
                              <label className="block text-[#8A7D5C] text-[9px] uppercase font-mono font-bold mb-1">All-Type Photo</label>
                              <select
                                value={day.allTypePhoto}
                                onChange={(e) => updateDayField(idx, 'allTypePhoto', e.target.value)}
                                className="w-full bg-[#121518] border border-[#2B2519] rounded-lg px-2 py-1.5 text-cyan-400 text-[11px] focus:outline-none focus:border-cyan-400"
                              >
                                <option value="">— Free Crew —</option>
                                {availableAllTypePhoto.map((m) => (
                                  <option key={m._id || m.id || m.name} value={m.name}>
                                    {m.name}
                                  </option>
                                ))}
                              </select>
                            </div>

                            <div>
                              <label className="block text-[#8A7D5C] text-[9px] uppercase font-mono font-bold mb-1">Trad. Video</label>
                              <select
                                value={day.tradVideo}
                                onChange={(e) => updateDayField(idx, 'tradVideo', e.target.value)}
                                className="w-full bg-[#121518] border border-[#2B2519] rounded-lg px-2 py-1.5 text-white text-[11px] focus:outline-none focus:border-[#D4AF37]"
                              >
                                <option value="">— Free Crew —</option>
                                {availableTradVideo.map((m) => (
                                  <option key={m._id || m.id || m.name} value={m.name}>
                                    {m.name}
                                  </option>
                                ))}
                              </select>
                            </div>

                            <div>
                              <label className="block text-[#8A7D5C] text-[9px] uppercase font-mono font-bold mb-1">Cinema Lead</label>
                              <select
                                value={day.cinema}
                                onChange={(e) => updateDayField(idx, 'cinema', e.target.value)}
                                className="w-full bg-[#121518] border border-[#2B2519] rounded-lg px-2 py-1.5 text-emerald-400 text-[11px] font-bold focus:outline-none focus:border-emerald-400"
                              >
                                <option value="">— Free Crew —</option>
                                {availableCinema.map((m) => (
                                  <option key={m._id || m.id || m.name} value={m.name}>
                                    {m.name}
                                  </option>
                                ))}
                              </select>
                            </div>

                            <div>
                              <label className="block text-[#8A7D5C] text-[9px] uppercase font-mono font-bold mb-1">Drone Pilot</label>
                              <select
                                value={day.drone}
                                onChange={(e) => updateDayField(idx, 'drone', e.target.value)}
                                className="w-full bg-[#121518] border border-[#2B2519] rounded-lg px-2 py-1.5 text-amber-400 text-[11px] focus:outline-none focus:border-amber-400"
                              >
                                <option value="">— Free Crew —</option>
                                {availableDrone.map((m) => (
                                  <option key={m._id || m.id || m.name} value={m.name}>
                                    {m.name}
                                  </option>
                                ))}
                              </select>
                            </div>

                            <div>
                              <label className="block text-[#8A7D5C] text-[9px] uppercase font-mono font-bold mb-1">Call Time</label>
                              <input
                                type="text"
                                placeholder="10:00 AM"
                                value={day.reportingTime}
                                onChange={(e) => updateDayField(idx, 'reportingTime', e.target.value)}
                                className="w-full bg-[#121518] border border-[#2B2519] rounded-lg px-2 py-1.5 text-[#D4AF37] text-[11px] font-mono focus:outline-none focus:border-[#D4AF37]"
                              />
                            </div>

                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4 border-t border-[#1C1F24] flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-gray-400 hover:text-white cursor-pointer font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B89018] text-black font-bold uppercase tracking-wider shadow-md hover:from-[#F3E5AB] hover:to-[#D4AF37] cursor-pointer"
                >
                  Save & Schedule
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
}