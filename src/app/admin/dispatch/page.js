"use client";
import React, { useState } from 'react';
import Link from 'next/link';

export default function ClientDispatchConsole() {
  // Calendar Filter States (Default: September 2026)
  const [selectedYear, setSelectedYear] = useState(2026);
  const [selectedMonth, setSelectedMonth] = useState('SEP'); // 'JAN' - 'DEC'
  const [expandedClientId, setExpandedClientId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const monthsList = [
    { key: 'JAN', name: 'January', num: 1 },
    { key: 'FEB', name: 'February', num: 2 },
    { key: 'MAR', name: 'March', num: 3 },
    { key: 'APR', name: 'April', num: 4 },
    { key: 'MAY', name: 'May', num: 5 },
    { key: 'JUN', name: 'June', num: 6 },
    { key: 'JUL', name: 'July', num: 7 },
    { key: 'AUG', name: 'August', num: 8 },
    { key: 'SEP', name: 'September', num: 9 },
    { key: 'OCT', name: 'October', num: 10 },
    { key: 'NOV', name: 'November', num: 11 },
    { key: 'DEC', name: 'December', num: 12 }
  ];

  const yearsList = [2024, 2025, 2026, 2027];

  const [clients, setClients] = useState([
  // SL 1: PRIYA KUMARI (APRIL)
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
      { dayNo: 1, date: "22 Apr 2026", eventName: "Rituals (Bride)", location: "Sitamarhi Home", tradPhoto: "Rohit", tradVideo: "Sanoj", candidPhoto: "—", cinema: "—", drone: "Sanoj", assistance: "—", reportingTime: "10:00 AM" },
      { dayNo: 2, date: "23 Apr 2026", eventName: "Haldi Shoot", location: "Sitamarhi Home", tradPhoto: "Rohit", tradVideo: "Sanoj", candidPhoto: "—", cinema: "—", drone: "—", assistance: "—", reportingTime: "11:00 AM" },
      { dayNo: 3, date: "25 Apr 2026", eventName: "Rituals (Groom)", location: "Begusarai Home", tradPhoto: "Rohit", tradVideo: "Sanoj", candidPhoto: "—", cinema: "—", drone: "—", assistance: "—", reportingTime: "04:00 PM" },
      { dayNo: 4, date: "26 Apr 2026", eventName: "Wedding Day", location: "Hajipur, Patna", tradPhoto: "Rohit", tradVideo: "Aman (8579044481)", candidPhoto: "Sanjeet", cinema: "Ritik Saw Kolkata", drone: "Manikant (Monu)", assistance: "Sumit", reportingTime: "06:00 PM" }
    ]
  },

  // SL 2: RAVI RANJAN (MAY)
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
      { dayNo: 1, date: "04 May 2026", eventName: "Sangeet", location: "Hotel Anand Sagar, Kankarbagh", tradPhoto: "Rohit", tradVideo: "Sanoj", candidPhoto: "—", cinema: "—", drone: "—", assistance: "—", reportingTime: "05:00 PM" },
      { dayNo: 2, date: "05 May 2026", eventName: "Haldi, Mehndi", location: "Biscomaun Colony, Kumhrar", tradPhoto: "Rohit", tradVideo: "Sanoj", candidPhoto: "—", cinema: "—", drone: "—", assistance: "—", reportingTime: "11:00 AM" },
      { dayNo: 3, date: "06 May 2026", eventName: "Madwa", location: "Biscomaun Colony, Kumhrar", tradPhoto: "Rohit", tradVideo: "Sanoj", candidPhoto: "—", cinema: "—", drone: "—", assistance: "—", reportingTime: "04:00 PM" },
      { dayNo: 4, date: "07 May 2026", eventName: "Wedding Day", location: "Bhagwat Banquet Hall, Patna", tradPhoto: "Rohit", tradVideo: "Sanoj", candidPhoto: "Sanjeet", cinema: "Suraj", drone: "Manikant (Monu)", assistance: "Banty", reportingTime: "06:00 PM" }
    ]
  },

  // SL 3: ABHINAV KRISHNA (MAY)
  {
    id: 3,
    serialNo: 3,
    clientName: "ABHINAV KRISHNA",
    destination: "Bihar Sharif",
    totalBudget: "₹2,10,000",
    status: "SCHEDULED",
    daysCount: 3,
    year: 2026,
    month: "MAY",
    schedule: [
      { dayNo: 1, date: "08 May 2026", eventName: "Haldi (Haldi Kutai)", location: "Bihar Sharif Home", tradPhoto: "Rohit", tradVideo: "Sanoj", candidPhoto: "—", cinema: "—", drone: "—", assistance: "—", reportingTime: "10:30 AM" },
      { dayNo: 2, date: "09 May 2026", eventName: "Tilak", location: "Bihar Sharif", tradPhoto: "Rohit", tradVideo: "Sanoj", candidPhoto: "—", cinema: "—", drone: "—", assistance: "—", reportingTime: "05:00 PM" },
      { dayNo: 3, date: "10 May 2026", eventName: "Puja & Matkor etc.", location: "Bihar Sharif", tradPhoto: "Rohit", tradVideo: "Sanoj", candidPhoto: "—", cinema: "—", drone: "—", assistance: "—", reportingTime: "09:00 AM" }
    ]
  },

  // SL 4: NIKITA KUMARI (JUNE)
  {
    id: 4,
    serialNo: 4,
    clientName: "NIKITA KUMARI",
    destination: "Begusarai / Darjeeling / Barh / Patna",
    totalBudget: "₹4,80,000",
    status: "SCHEDULED",
    daysCount: 6,
    year: 2026,
    month: "JUN",
    schedule: [
      { dayNo: 1, date: "27 Apr 2026", eventName: "Engagement", location: "Begusarai", tradPhoto: "Rohit", tradVideo: "Sanoj", candidPhoto: "Sanjeet", cinema: "Ritik Saw", drone: "—", assistance: "—", reportingTime: "05:00 PM" },
      { dayNo: 2, date: "03-07 June 2026", eventName: "Prewedding Shoot", location: "Darjeeling", tradPhoto: "—", tradVideo: "—", candidPhoto: "Suraj", cinema: "Vikash Jaishwal", drone: "Suraj", assistance: "—", reportingTime: "07:00 AM" },
      { dayNo: 3, date: "21 June 2026", eventName: "Tilak", location: "Barh", tradPhoto: "Suraj", tradVideo: "Priyanshu", candidPhoto: "—", cinema: "—", drone: "—", assistance: "Rohit", reportingTime: "08:00 AM" },
      { dayNo: 4, date: "22 June 2026", eventName: "Haldi", location: "Barh", tradPhoto: "Rohit", tradVideo: "Priyanshu", candidPhoto: "—", cinema: "—", drone: "—", assistance: "—", reportingTime: "10:00 AM" },
      { dayNo: 5, date: "23 June 2026", eventName: "Mehndi", location: "Barh", tradPhoto: "Suraj", tradVideo: "Priyanshu", candidPhoto: "—", cinema: "—", drone: "—", assistance: "Rohit", reportingTime: "04:00 PM" },
      { dayNo: 6, date: "24 June 2026", eventName: "Wedding Day", location: "Patna Bailey Road", tradPhoto: "Rohit", tradVideo: "Pintu (7870082937)", candidPhoto: "Sanjeet", cinema: "Suraj", drone: "Monu", assistance: "Banty", reportingTime: "06:00 PM" }
    ]
  },

  // SL 5: FREELANCE (JUNE - GAYA)
  {
    id: 5,
    serialNo: 5,
    clientName: "FREELANCE (GAYA ENGAGEMENT)",
    destination: "Gaya",
    totalBudget: "₹65,000",
    status: "CONFIRMED",
    daysCount: 1,
    year: 2026,
    month: "JUN",
    schedule: [
      { dayNo: 1, date: "22 June 2026", eventName: "Engagement", location: "Gaya", tradPhoto: "Sanoj", tradVideo: "—", candidPhoto: "—", cinema: "Suraj", drone: "—", assistance: "Banty", reportingTime: "04:00 PM" }
    ]
  },

  // SL 6: ROHIT KUMAR (JUNE - RAJGIR)
  {
    id: 6,
    serialNo: 6,
    clientName: "ROHIT KUMAR",
    destination: "Rajgir",
    totalBudget: "₹1,40,000",
    status: "CONFIRMED",
    daysCount: 1,
    year: 2026,
    month: "JUN",
    schedule: [
      { dayNo: 1, date: "24 June 2026", eventName: "Engagement, Pre-Wed & Wedding", location: "Rajgir", tradPhoto: "Vinod", tradVideo: "—", candidPhoto: "—", cinema: "Sanoj", drone: "—", assistance: "Banty", reportingTime: "11:00 AM" }
    ]
  },

  // SL 7: FREELANCE (JUNE - NAWADA)
  {
    id: 7,
    serialNo: 7,
    clientName: "FREELANCE (NAWADA ENGAGEMENT)",
    destination: "Nawada",
    totalBudget: "₹50,000",
    status: "CONFIRMED",
    daysCount: 1,
    year: 2026,
    month: "JUN",
    schedule: [
      { dayNo: 1, date: "24 June 2026", eventName: "Engagement", location: "Nawada", tradPhoto: "—", tradVideo: "—", candidPhoto: "—", cinema: "Priyanshu", drone: "—", assistance: "—", reportingTime: "05:00 PM" }
    ]
  },

  // SL 8: BIRTHDAY (JULY)
  {
    id: 8,
    serialNo: 8,
    clientName: "BIRTHDAY CELEBRATION",
    destination: "Punpun, Patna",
    totalBudget: "₹35,000",
    status: "DELIVERED",
    daysCount: 1,
    year: 2026,
    month: "JUL",
    schedule: [
      { dayNo: 1, date: "03 July 2026", eventName: "Birthday Shoot", location: "Punpun", tradPhoto: "Rohit / Sanoj", tradVideo: "—", candidPhoto: "Suraj", cinema: "Priyanshu", drone: "—", assistance: "—", reportingTime: "06:00 PM" }
    ]
  },

  // SL 9: APARNA (DECEMBER)
  {
    id: 9,
    serialNo: 9,
    clientName: "APARNA",
    destination: "Patliputra / Dakbunglow, Patna",
    totalBudget: "₹3,20,000",
    status: "SCHEDULED",
    daysCount: 3,
    year: 2026,
    month: "DEC",
    schedule: [
      { dayNo: 1, date: "01 Dec 2026", eventName: "Rituals (Groom)", location: "Patliputra, Patna", tradPhoto: "Rohit", tradVideo: "Shubham Jeh (7061128351)", candidPhoto: "—", cinema: "—", drone: "—", assistance: "—", reportingTime: "11:00 AM" },
      { dayNo: 2, date: "02 Dec 2026", eventName: "Rituals (Groom)", location: "Patliputra, Patna", tradPhoto: "Rohit", tradVideo: "Shubham Jeh (7061128351)", candidPhoto: "—", cinema: "—", drone: "—", assistance: "—", reportingTime: "02:00 PM" },
      { dayNo: 3, date: "02 Dec 2026", eventName: "Wedding Day", location: "Dakbunglow, Patna", tradPhoto: "Aman", tradVideo: "Sanoj", candidPhoto: "Sanjeet", cinema: "Suraj", drone: "Aditya", assistance: "Mithlesh", reportingTime: "06:00 PM" }
    ]
  },

  // SL 10: KINSHUK SHANKAR (NOVEMBER)
  {
    id: 10,
    serialNo: 10,
    clientName: "KINSHUK SHANKAR",
    destination: "Munger / Munger Club",
    totalBudget: "₹2,60,000",
    status: "SCHEDULED",
    daysCount: 2,
    year: 2026,
    month: "NOV",
    schedule: [
      { dayNo: 1, date: "24 Nov 2026", eventName: "Haldi, Mehndi", location: "Munger Home", tradPhoto: "Aman (8435428039)", tradVideo: "Sanoj", candidPhoto: "—", cinema: "—", drone: "—", assistance: "Mithlesh", reportingTime: "10:30 AM" },
      { dayNo: 2, date: "25 Nov 2026", eventName: "Wedding Day", location: "Munger Club", tradPhoto: "Aman (8435428039)", tradVideo: "Shubham (7061128351)", candidPhoto: "—", cinema: "Sanoj", drone: "Aditya Lucky", assistance: "Mithlesh", reportingTime: "05:30 PM" }
    ]
  },

  // SL 11: SHYAMLI SHARMA (NOVEMBER)
  {
    id: 11,
    serialNo: 11,
    clientName: "SHYAMLI SHARMA",
    destination: "Sherghati",
    totalBudget: "₹2,10,000",
    status: "SCHEDULED",
    daysCount: 2,
    year: 2026,
    month: "NOV",
    schedule: [
      { dayNo: 1, date: "23 Nov 2026", eventName: "Rituals (Bride)", location: "Sherghati Home", tradPhoto: "Rohit", tradVideo: "Sanoj", candidPhoto: "—", cinema: "—", drone: "—", assistance: "—", reportingTime: "11:00 AM" },
      { dayNo: 2, date: "24 Nov 2026", eventName: "Wedding Day", location: "Sherghati", tradPhoto: "Rohit", tradVideo: "Sanoj", candidPhoto: "—", cinema: "—", drone: "Monu", assistance: "Banty", reportingTime: "06:00 PM" }
    ]
  },

  // SL 12: ANKIT KUMAR (NOVEMBER - DECEMBER)
  {
    id: 12,
    serialNo: 12,
    clientName: "ANKIT KUMAR",
    destination: "Patna to Siwan / Bailey Road",
    totalBudget: "₹3,40,000",
    status: "SCHEDULED",
    daysCount: 3,
    year: 2026,
    month: "NOV",
    schedule: [
      { dayNo: 1, date: "29 Nov 2026", eventName: "Tilak", location: "Patna to Siwan", tradPhoto: "Rohit", tradVideo: "Shubham", candidPhoto: "—", cinema: "—", drone: "—", assistance: "—", reportingTime: "08:00 AM" },
      { dayNo: 2, date: "01 Dec 2026", eventName: "Haldi Mehndi Sangeet", location: "Bailey Road (Hotel Vibrant)", tradPhoto: "—", tradVideo: "Suraj", candidPhoto: "—", cinema: "—", drone: "—", assistance: "—", reportingTime: "05:00 PM" },
      { dayNo: 3, date: "02 Dec 2026", eventName: "Wedding Day", location: "Bailey Road (Hotel Vibrant)", tradPhoto: "Rohit", tradVideo: "Shubham", candidPhoto: "—", cinema: "Priyanshu", drone: "Monu", assistance: "—", reportingTime: "06:00 PM" }
    ]
  },

  // SL 13: GUDDU KUMAR (NOVEMBER)
  {
    id: 13,
    serialNo: 13,
    clientName: "GUDDU KUMAR",
    destination: "Akangarsarai",
    totalBudget: "₹2,50,000",
    status: "SCHEDULED",
    daysCount: 3,
    year: 2026,
    month: "NOV",
    schedule: [
      { dayNo: 1, date: "18 Nov 2026", eventName: "Haldi, Mehndi", location: "Akangarsarai", tradPhoto: "Vinod", tradVideo: "Suraj", candidPhoto: "—", cinema: "—", drone: "—", assistance: "—", reportingTime: "11:00 AM" },
      { dayNo: 2, date: "19 Nov 2026", eventName: "Rituals & Sangeet", location: "Akangarsarai", tradPhoto: "Vinod", tradVideo: "Suraj", candidPhoto: "—", cinema: "—", drone: "—", assistance: "—", reportingTime: "04:30 PM" },
      { dayNo: 3, date: "20 Nov 2026", eventName: "Wedding Day", location: "Akangarsarai", tradPhoto: "Vinod", tradVideo: "—", candidPhoto: "—", cinema: "Suraj", drone: "Aditya", assistance: "—", reportingTime: "06:00 PM" }
    ]
  },

  // SL 14: ANURADHA RANI (NOVEMBER)
  {
    id: 14,
    serialNo: 14,
    clientName: "ANURADHA RANI",
    destination: "Akangarsarai",
    totalBudget: "₹2,70,000",
    status: "SCHEDULED",
    daysCount: 3,
    year: 2026,
    month: "NOV",
    schedule: [
      { dayNo: 1, date: "19 Nov 2026", eventName: "Lagan, Mehndi", location: "Akangarsarai", tradPhoto: "—", tradVideo: "Vinod", candidPhoto: "—", cinema: "—", drone: "—", assistance: "—", reportingTime: "03:00 PM" },
      { dayNo: 2, date: "20 Nov 2026", eventName: "Haldi", location: "Akangarsarai", tradPhoto: "Suraj", tradVideo: "Vinod", candidPhoto: "—", cinema: "—", drone: "—", assistance: "—", reportingTime: "10:00 AM" },
      { dayNo: 3, date: "21 Nov 2026", eventName: "Wedding Day", location: "Akangarsarai", tradPhoto: "Vinod", tradVideo: "Lead Lead", candidPhoto: "Suraj", cinema: "—", drone: "Aditya", assistance: "—", reportingTime: "06:00 PM" }
    ]
  },

  // SL 15: SURAJ SINHA (NOVEMBER)
  {
    id: 15,
    serialNo: 15,
    clientName: "SURAJ SINHA",
    destination: "Patna (AIIMS) / Danapur",
    totalBudget: "₹3,60,000",
    status: "SCHEDULED",
    daysCount: 4,
    year: 2026,
    month: "NOV",
    schedule: [
      { dayNo: 1, date: "18 Nov 2026", eventName: "Haldi and Matkor", location: "Patna (AIIMS)", tradPhoto: "Shubham Patna", tradVideo: "Priyanshu", candidPhoto: "—", cinema: "—", drone: "—", assistance: "—", reportingTime: "10:00 AM" },
      { dayNo: 2, date: "19 Nov 2026", eventName: "Mehndi", location: "Patna (AIIMS)", tradPhoto: "Shubham Patna", tradVideo: "Priyanshu", candidPhoto: "—", cinema: "—", drone: "—", assistance: "—", reportingTime: "04:00 PM" },
      { dayNo: 3, date: "20 Nov 2026", eventName: "Madwa", location: "Patna (AIIMS)", tradPhoto: "Shubham Patna", tradVideo: "Priyanshu", candidPhoto: "—", cinema: "—", drone: "—", assistance: "—", reportingTime: "02:00 PM" },
      { dayNo: 4, date: "21 Nov 2026", eventName: "Wedding Day", location: "Bhusaula Danapur", tradPhoto: "Shubham Patna", tradVideo: "Shubham Jeh", candidPhoto: "—", cinema: "Priyanshu", drone: "Manikant (Monu)", assistance: "—", reportingTime: "06:00 PM" }
    ]
  },

  // SL 16: RAUSHAN SINGH (NOVEMBER)
  {
    id: 16,
    serialNo: 16,
    clientName: "RAUSHAN SINGH",
    destination: "Muzaffarpur",
    totalBudget: "₹2,20,000",
    status: "SCHEDULED",
    daysCount: 2,
    year: 2026,
    month: "NOV",
    schedule: [
      { dayNo: 1, date: "29 Nov 2026", eventName: "Rituals Haldi & Mehndi", location: "Muzaffarpur", tradPhoto: "—", tradVideo: "—", candidPhoto: "—", cinema: "—", drone: "—", assistance: "—", reportingTime: "11:00 AM" },
      { dayNo: 2, date: "30 Nov 2026", eventName: "Wedding Day", location: "Muzaffarpur", tradPhoto: "—", tradVideo: "Shubham Jeh", candidPhoto: "Suraj", cinema: "Priyanshu", drone: "—", assistance: "—", reportingTime: "06:00 PM" }
    ]
  },

  // SL 17: FREELANCE (DECEMBER - NAWADA)
  {
    id: 17,
    serialNo: 17,
    clientName: "FREELANCE (NAWADA WEDDING)",
    destination: "Nawada",
    totalBudget: "₹75,000",
    status: "SCHEDULED",
    daysCount: 1,
    year: 2026,
    month: "DEC",
    schedule: [
      { dayNo: 1, date: "09 Dec 2026", eventName: "Wedding Day", location: "Nawada", tradPhoto: "—", tradVideo: "—", candidPhoto: "—", cinema: "Suraj", drone: "—", assistance: "Mithlesh", reportingTime: "06:00 PM" }
    ]
  },

  // SL 18: AMAR KUMAR VIVEK (DECEMBER)
  {
    id: 18,
    serialNo: 18,
    clientName: "AMAR KUMAR VIVEK",
    destination: "Begusarai",
    totalBudget: "₹2,40,000",
    status: "SCHEDULED",
    daysCount: 2,
    year: 2026,
    month: "DEC",
    schedule: [
      { dayNo: 1, date: "01 Dec 2026", eventName: "Rituals", location: "Begusarai Home", tradPhoto: "Sikandar Kr", tradVideo: "—", candidPhoto: "—", cinema: "Ritik", drone: "—", assistance: "—", reportingTime: "11:00 AM" },
      { dayNo: 2, date: "02 Dec 2026", eventName: "Wedding Day", location: "Begusarai", tradPhoto: "Ritik Photo", tradVideo: "Sikandar Kr", candidPhoto: "—", cinema: "Ritik", drone: "—", assistance: "—", reportingTime: "06:00 PM" }
    ]
  }
]);

  // Form State for Adding Multi-Day Client
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
        date: `15 ${selectedMonth} ${selectedYear}`,
        eventName: "Rituals / Haldi",
        location: "",
        tradPhoto: "",
        tradVideo: "",
        candidPhoto: "",
        cinema: "",
        drone: "",
        assistance: "",
        reportingTime: "10:00 AM"
      }
    ]
  });

  // Filter clients by active year & month
  const filteredClients = clients.filter(
    (c) => c.year === selectedYear && c.month === selectedMonth
  );

  // Helper to count clients per month for badges
  const getMonthClientCount = (mKey) => {
    return clients.filter((c) => c.year === selectedYear && c.month === mKey).length;
  };

  // Add Day to Builder Form
  const addDayRow = () => {
    const nextDayNo = formData.days.length + 1;
    setFormData({
      ...formData,
      days: [
        ...formData.days,
        {
          dayNo: nextDayNo,
          date: `16 ${formData.month} ${formData.year}`,
          eventName: nextDayNo === 2 ? "Sangeet" : nextDayNo === 3 ? "Wedding Day" : "Reception",
          location: formData.days[0]?.location || "",
          tradPhoto: "",
          tradVideo: "",
          candidPhoto: "",
          cinema: "",
          drone: "",
          assistance: "",
          reportingTime: "04:00 PM"
        }
      ]
    });
  };

  // Remove Day
  const removeDayRow = (idxToRemove) => {
    if (formData.days.length === 1) return;
    const updated = formData.days
      .filter((_, idx) => idx !== idxToRemove)
      .map((item, idx) => ({ ...item, dayNo: idx + 1 }));
    setFormData({ ...formData, days: updated });
  };

  // Update field in builder
  const updateDayField = (idx, field, value) => {
    const updated = [...formData.days];
    updated[idx][field] = value;
    setFormData({ ...formData, days: updated });
  };

  // Submit client
  const handleSaveClient = (e) => {
    e.preventDefault();
    const newClient = {
      id: Date.now(),
      clientName: formData.clientName || "Unnamed Client",
      destination: formData.destination || "Patna",
      totalBudget: formData.totalBudget.startsWith('₹') ? formData.totalBudget : `₹${formData.totalBudget}`,
      status: formData.status,
      daysCount: formData.days.length,
      year: parseInt(formData.year, 10),
      month: formData.month,
      schedule: formData.days
    };

    setClients([newClient, ...clients]);
    setExpandedClientId(newClient.id);
    setIsModalOpen(false);

    // Switch view to created client's month & year
    setSelectedYear(newClient.year);
    setSelectedMonth(newClient.month);

    // Reset
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
          date: "",
          eventName: "Rituals / Haldi",
          location: "",
          tradPhoto: "",
          tradVideo: "",
          candidPhoto: "",
          cinema: "",
          drone: "",
          assistance: "",
          reportingTime: "10:00 AM"
        }
      ]
    });
  };

  const deleteClient = (id) => {
    setClients(clients.filter((c) => c.id !== id));
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
          <p className="text-xs text-[#8A7D5C] mt-1">
            Month-by-month shoot roster, assigned specialists, multi-day call sheets, and contract payments.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link className="px-4 py-2.5 rounded-xl border border-[#2B2519] bg-[#121518] hover:border-[#D4AF37] text-[#D4AF37] text-xs font-black uppercase tracking-wider transition-all" href="/admin/wedding-management">
            ← Back to Wedding Management
          </Link>
          <button
            onClick={() => {
              setFormData((prev) => ({ ...prev, year: selectedYear, month: selectedMonth }));
              setIsModalOpen(true);
            }}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B89018] hover:from-[#F3E5AB] hover:to-[#D4AF37] text-black text-xs font-black uppercase tracking-wider shadow-lg shadow-[#D4AF37]/25 transition-all cursor-pointer"
          >
            + Add New Client
          </button>
        </div>
      </div>

      {/* 2. YEAR & 12-MONTH TIMELINE NAVIGATION BAR */}
      <div className="bg-[#121518] border border-[#2B2519] rounded-3xl p-4 sm:p-5 shadow-2xl space-y-4">
        {/* Year Selector Row */}
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
                  onClick={() => setSelectedYear(yr)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                    selectedYear === yr
                      ? 'bg-gradient-to-r from-[#D4AF37] to-[#B89018] text-black font-black shadow-md'
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

        {/* 12 Months Horizontal Tabs Ribbon */}
        <div className="grid grid-cols-3 sm:grid-cols-6 lg:grid-cols-12 gap-1.5">
          {monthsList.map((m) => {
            const isCurrentMonth = selectedMonth === m.key;
            const count = getMonthClientCount(m.key);

            return (
              <button
                key={m.key}
                type="button"
                onClick={() => {
                  setSelectedMonth(m.key);
                  setExpandedClientId(null);
                }}
                className={`py-2.5 px-2 rounded-xl text-xs font-mono font-bold uppercase transition-all cursor-pointer flex flex-col items-center justify-center gap-1 relative ${
                  isCurrentMonth
                    ? 'bg-[#D4AF37] text-black font-black shadow-lg shadow-[#D4AF37]/25'
                    : 'bg-[#181B20] text-[#A89D84] hover:text-white hover:bg-[#20252E] border border-[#2B2519]'
                }`}
              >
                <span>{m.key}</span>
                {count > 0 ? (
                  <span className={`text-[9px] px-1.5 py-0.2 rounded-full font-sans font-black ${
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
          <span className="text-xs text-[#8A7D5C]">
            Showing serial by event date
          </span>
        </div>

        {/* Empty State if No Shoots in that Month */}
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
              className="px-5 py-2.5 rounded-xl bg-[#20252E] hover:bg-[#D4AF37] hover:text-black text-[#D4AF37] text-xs font-black uppercase tracking-wider border border-[#D4AF37]/40 transition-all cursor-pointer"
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
              {/* Card Header Row */}
              <div
                onClick={() => setExpandedClientId(isExpanded ? null : client.id)}
                className="p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer hover:bg-[#15191F] transition-colors"
              >
                <div className="flex items-center gap-4">
                  {/* Serial Number Badge */}
                  <div className="w-10 h-10 rounded-2xl bg-[#0B0D0E] border border-[#2B2519] text-[#D4AF37] flex items-center justify-center font-black text-sm font-mono shrink-0">
                    #{serialNo}
                  </div>

                  {/* Multi-Day Indicator */}
                  <div className="w-12 h-10 rounded-xl bg-[#1C2027] border border-[#2B2519] text-[#F3E5AB] flex items-center justify-center font-black text-xs font-mono shrink-0">
                    {client.daysCount}D
                  </div>

                  <div>
                    <h3 className="text-lg sm:text-xl font-extrabold text-white tracking-tight">
                      {client.clientName}
                    </h3>
                    <span className="text-xs text-[#8A7D5C] font-mono block sm:inline">
                      📍 {client.destination} • {client.daysCount} Days Multi-Day Ceremony
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-5 self-end md:self-auto">
                  <div className="text-right">
                    <span className="text-[10px] text-[#8A7D5C] uppercase font-bold block">Contract Fee</span>
                    <span className="text-lg sm:text-xl font-black font-mono text-[#D4AF37]">{client.totalBudget}</span>
                  </div>

                  <span className={`px-3 py-1 rounded-full text-[10px] font-mono font-black uppercase ${
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
                      deleteClient(client.id);
                    }}
                    className="p-2 text-xs text-rose-400 hover:bg-rose-950/30 rounded-lg border border-rose-900/20 transition-all cursor-pointer"
                    title="Delete Record"
                  >
                    🗑️
                  </button>

                  <span className="text-xs text-[#8A7D5C] font-mono">
                    {isExpanded ? '▲ HIDE' : '▼ ROSTER'}
                  </span>
                </div>
              </div>

              {/* Day-Wise Roster Table (Matching Excel Sheet) */}
              {isExpanded && (
                <div className="border-t border-[#1F242D] bg-[#0E1013] p-6 space-y-4 overflow-x-auto">
                  <div className="flex items-center justify-between pb-2">
                    <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#D4AF37]">
                      SL. NO. {serialNo} — {client.clientName} ({client.daysCount} DAYS CREW DEPLOYMENT)
                    </span>
                    <span className="text-[10px] text-emerald-400 font-mono">
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
                        <th className="p-3">Trad. Photographer</th>
                        <th className="p-3">Trad. Videographer</th>
                        <th className="p-3">Candid Photo</th>
                        <th className="p-3">Cinematographer</th>
                        <th className="p-3">Drone Pilot</th>
                        <th className="p-3">Assistance</th>
                        <th className="p-3">Call Time</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#1C2027]">
                      {client.schedule.map((day) => (
                        <tr key={day.dayNo} className="hover:bg-[#151921] transition-colors">
                          <td className="p-3 font-mono font-black text-white bg-[#121518]">Day {day.dayNo}</td>
                          <td className="p-3 font-mono font-bold text-[#D4AF37]">{day.date}</td>
                          <td className="p-3 font-bold text-white">{day.eventName}</td>
                          <td className="p-3 text-[#A89D84]">{day.location}</td>
                          <td className="p-3 text-[#F5F5F5] font-medium">{day.tradPhoto || '—'}</td>
                          <td className="p-3 text-[#F5F5F5] font-medium">{day.tradVideo || '—'}</td>
                          <td className="p-3 text-[#C5B388]">{day.candidPhoto || '—'}</td>
                          <td className="p-3 text-emerald-400 font-bold">{day.cinema || '—'}</td>
                          <td className="p-3 text-amber-400">{day.drone || '—'}</td>
                          <td className="p-3 text-[#8A7D5C]">{day.assistance || '—'}</td>
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
          <div className="bg-[#121518] border border-[#2B2519] rounded-3xl p-6 sm:p-8 max-w-4xl w-full space-y-6 shadow-2xl my-8">
            
            <div className="flex items-center justify-between border-b border-[#20252F] pb-4">
              <div>
                <span className="text-[10px] font-mono font-bold text-[#D4AF37] uppercase tracking-wider block">
                  WEDDING SHOOT BUILDER
                </span>
                <h3 className="text-xl font-extrabold text-white">
                  Add New Client & Multi-Day Crew Roster
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
              
              {/* Target Month & Year Selector in Modal */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#0B0D0E] p-4 rounded-2xl border border-[#2B2519]">
                <div>
                  <label className="block text-[#8A7D5C] uppercase font-bold mb-1 text-[10px]">Booking Year</label>
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
                  <label className="block text-[#8A7D5C] uppercase font-bold mb-1 text-[10px]">Booking Month</label>
                  <select
                    value={formData.month}
                    onChange={(e) => setFormData({ ...formData, month: e.target.value })}
                    className="w-full bg-[#181B20] border border-[#2B2519] rounded-xl px-3 py-2 text-[#D4AF37] font-mono font-bold"
                  >
                    {monthsList.map((m) => (
                      <option key={m.key} value={m.key}>{m.name} ({m.key})</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[#8A7D5C] uppercase font-bold mb-1 text-[10px]">Contract Fee (₹)</label>
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
                  <label className="block text-[#8A7D5C] uppercase font-bold mb-1 text-[10px]">Shoot Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full bg-[#181B20] border border-[#2B2519] rounded-xl px-3 py-2 text-white"
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
                  <label className="block text-[#8A7D5C] uppercase font-bold mb-1">Couple / Client Name</label>
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
                  <label className="block text-[#8A7D5C] uppercase font-bold mb-1">Primary Destination</label>
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
                  <h4 className="text-sm font-extrabold text-white uppercase tracking-wider font-mono">
                    Schedule By Day ({formData.days.length} Days)
                  </h4>
                  <button
                    type="button"
                    onClick={addDayRow}
                    className="px-4 py-1.5 rounded-xl bg-[#20252E] hover:bg-[#D4AF37] hover:text-black text-[#D4AF37] text-xs font-black uppercase tracking-wider border border-[#D4AF37]/40 transition-all cursor-pointer"
                  >
                    + Add Day {formData.days.length + 1}
                  </button>
                </div>

                <div className="space-y-4 max-h-[360px] overflow-y-auto pr-1">
                  {formData.days.map((day, idx) => (
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
                          <label className="block text-[#8A7D5C] text-[10px] uppercase font-bold mb-1">Date</label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. 22 Apr 2026"
                            value={day.date}
                            onChange={(e) => updateDayField(idx, 'date', e.target.value)}
                            className="w-full bg-[#121518] border border-[#2B2519] rounded-lg px-2.5 py-1.5 text-white font-mono"
                          />
                        </div>

                        <div>
                          <label className="block text-[#8A7D5C] text-[10px] uppercase font-bold mb-1">Event / Ritual</label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Rituals (Bride)"
                            value={day.eventName}
                            onChange={(e) => updateDayField(idx, 'eventName', e.target.value)}
                            className="w-full bg-[#121518] border border-[#2B2519] rounded-lg px-2.5 py-1.5 text-white font-bold"
                          />
                        </div>

                        <div>
                          <label className="block text-[#8A7D5C] text-[10px] uppercase font-bold mb-1">Specific Location</label>
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

                      <div className="pt-1">
                        <span className="text-[10px] text-[#D4AF37] font-mono font-bold uppercase block mb-2">
                          Assigned Specialists for Day {day.dayNo}:
                        </span>

                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
                          <div>
                            <label className="block text-[#8A7D5C] text-[9px] uppercase font-bold mb-1">Trad. Photo</label>
                            <input
                              type="text"
                              placeholder="Rohit"
                              value={day.tradPhoto}
                              onChange={(e) => updateDayField(idx, 'tradPhoto', e.target.value)}
                              className="w-full bg-[#121518] border border-[#2B2519] rounded-lg px-2 py-1.5 text-white text-[11px]"
                            />
                          </div>

                          <div>
                            <label className="block text-[#8A7D5C] text-[9px] uppercase font-bold mb-1">Trad. Video</label>
                            <input
                              type="text"
                              placeholder="Sanoj"
                              value={day.tradVideo}
                              onChange={(e) => updateDayField(idx, 'tradVideo', e.target.value)}
                              className="w-full bg-[#121518] border border-[#2B2519] rounded-lg px-2 py-1.5 text-white text-[11px]"
                            />
                          </div>

                          <div>
                            <label className="block text-[#8A7D5C] text-[9px] uppercase font-bold mb-1">Candid Photo</label>
                            <input
                              type="text"
                              placeholder="Sanjeet"
                              value={day.candidPhoto}
                              onChange={(e) => updateDayField(idx, 'candidPhoto', e.target.value)}
                              className="w-full bg-[#121518] border border-[#2B2519] rounded-lg px-2 py-1.5 text-white text-[11px]"
                            />
                          </div>

                          <div>
                            <label className="block text-[#8A7D5C] text-[9px] uppercase font-bold mb-1">Cinema Lead</label>
                            <input
                              type="text"
                              placeholder="Ritik Saw"
                              value={day.cinema}
                              onChange={(e) => updateDayField(idx, 'cinema', e.target.value)}
                              className="w-full bg-[#121518] border border-[#2B2519] rounded-lg px-2 py-1.5 text-emerald-400 text-[11px]"
                            />
                          </div>

                          <div>
                            <label className="block text-[#8A7D5C] text-[9px] uppercase font-bold mb-1">Drone Pilot</label>
                            <input
                              type="text"
                              placeholder="Manikant"
                              value={day.drone}
                              onChange={(e) => updateDayField(idx, 'drone', e.target.value)}
                              className="w-full bg-[#121518] border border-[#2B2519] rounded-lg px-2 py-1.5 text-amber-400 text-[11px]"
                            />
                          </div>

                          <div>
                            <label className="block text-[#8A7D5C] text-[9px] uppercase font-bold mb-1">Call Time</label>
                            <input
                              type="text"
                              placeholder="10:00 AM"
                              value={day.reportingTime}
                              onChange={(e) => updateDayField(idx, 'reportingTime', e.target.value)}
                              className="w-full bg-[#121518] border border-[#2B2519] rounded-lg px-2 py-1.5 text-[#D4AF37] text-[11px] font-mono"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4 border-t border-[#1C1F24] flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-gray-400 hover:text-white cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B89018] text-black font-black uppercase tracking-wider shadow-md hover:from-[#F3E5AB] hover:to-[#D4AF37] cursor-pointer"
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
