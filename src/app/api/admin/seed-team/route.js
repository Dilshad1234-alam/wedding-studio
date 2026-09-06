import { NextResponse } from 'next/server';
import mongoose from 'mongoose';

// 1. Connect using MONGODB_URI directly if custom lib differs
const MONGODB_URI = process.env.MONGODB_URI;

async function ensureDb() {
  if (mongoose.connection.readyState >= 1) return;
  if (!MONGODB_URI) throw new Error("MONGODB_URI is not defined");
  await mongoose.connect(MONGODB_URI);
}

// 2. Fallback to existing or compile TeamMember model
const TeamMemberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, default: 'Traditional Photographer' },
  phone: { type: String, default: '' },
  city: { type: String, default: 'Patna' },
  instagram: { type: String, default: '' },
  gear: { type: String, default: '' },
}, { timestamps: true });

const TeamMember = mongoose.models.TeamMember || mongoose.model('TeamMember', TeamMemberSchema);

const masterCrewRoster = [
  { name: "Vinod kumar", role: "Traditional Photographer", city: "Jehanabad", phone: "9304743192", instagram: "vinod_visuals", gear: "Sony A7 III, 24-70mm f/2.8, Godox V1 Flash" },
  { name: "Raja da", role: "Candid Photographer", city: "Kolkata", phone: "9051024878", instagram: "rajada_candid", gear: "Sony A7 IV, 35mm & 85mm f/1.4 GM, Godox AD200 Pro" },
  { name: "Debu Mukherjee", role: "Cinematographer", city: "Kolkata", phone: "9093180897", instagram: "debu_cinema", gear: "Sony FX3 Cinema Line, DJI RS3 Pro Gimbal, Wireless Audio" },
  { name: "Vikas Kumar", role: "Drone Pilot", city: "Jehanabad", phone: "7870254008", instagram: "vikas_drone", gear: "DJI Mavic 3 Pro Cine, RC Pro Controller, ND Filter Kit" },
  { name: "Ganesh Kumar", role: "Drone Pilot", city: "Jehanabad", phone: "9341962640", instagram: "ganesh_aerials", gear: "DJI Mavic 3 Pro, 4x Intelligent Flight Batteries" },
  { name: "Bittu Kumar", role: "Traditional Photographer", city: "Patna", phone: "6205865658", instagram: "bittu_patna", gear: "Nikon Z6 II, 24-70mm f/2.8, Godox TT685 Flash" },
  { name: "Sarvan Kumar", role: "Traditional Photographer & Videographer", city: "Patna", phone: "6206152800", instagram: "sarvan_visuals", gear: "Sony FX30 + A7 III Dual Setup, 24-70mm, Heavy Monopod" },
  { name: "Amar Kumar", role: "Traditional Photographer", city: "Patna", phone: "8252546642", instagram: "amar_photography", gear: "Sony A7 III, 24-105mm f/4 G OSS, Speedlight Kit" },
  { name: "Vikas Kumar (Video)", role: "Traditional Videographer", city: "Jehanabad", phone: "8541094731", instagram: "vikas_videography", gear: "Sony FX30, 18-105mm OSS, LED Panel, Video Monopod" },
  { name: "Krish raj Gupta", role: "Traditional Photographer & Videographer", city: "Patna", phone: "9546818478", instagram: "krish_raj_gupta", gear: "Sony A7 IV, 24-70mm GM II, Godox V1, Wireless Mic" },
  { name: "Rajesh Kumar", role: "Cinematographer", city: "Patna", phone: "9386263412", instagram: "rajesh_cinema", gear: "Sony FX3 Cinema Line, 35mm & 50mm Primes, DJI RS3" },
  { name: "Manu Kumar", role: "Traditional Photographer", city: "Jehanabad", phone: "9608549112", instagram: "manu_captures", gear: "Canon EOS R6 Mark II, 24-105mm f/4, Speedlight" },
  { name: "Pankaj Kumar", role: "Traditional Photographer", city: "Patna City", phone: "7258067341", instagram: "pankaj_photos", gear: "Sony A7 III, 24-70mm f/2.8, Godox V860 III Flash" },
  { name: "Rohit Kumar", role: "Traditional Photographer & Videographer", city: "Jehanabad", phone: "8271987782", instagram: "rohit_weddings", gear: "Sony A7 III + FX30, 24-70mm f/2.8, Audio Kit" },
  { name: "Rocky Kumar", role: "Drone Pilot", city: "Nalanda, Patna", phone: "9304569728", instagram: "rocky_drones", gear: "DJI Air 3 / Mavic 3, RC 2 Controller, 3x Batteries" },
  { name: "Indrajeet Kumar", role: "Drone Pilot", city: "Ekangarsarai", phone: "7296035011", instagram: "indrajeet_sky", gear: "DJI Mavic 3 Classic, ND Filters, Fast Car Charger" },
  { name: "Surya Kumar", role: "Traditional Photographer", city: "Bhagalpur", phone: "8789103481", instagram: "surya_photoworks", gear: "Sony A7 III, 24-70mm f/2.8, Godox V1 Round Flash" },
  { name: "Sikandar kumar", role: "Traditional Photographer & Videographer", city: "Kako Jehanabad", phone: "6203445149", instagram: "sikandar_visuals", gear: "Sony FX30 & A7 III Combo, 24-105mm, Monopod" },
  { name: "Abhijeet kumar", role: "Cinematographer", city: "Patna City", phone: "9534095619", instagram: "abhijeet_cine", gear: "Sony FX3, 24-70mm GM II, DJI RS3 Pro, Sennheiser Mic" },
  { name: "Gaurav Kumar", role: "LED Wall Operator", city: "Patna", phone: "9576769523", instagram: "gaurav_led", gear: "Novastar Video Processor, HDMI Matrix, Fiber SDI Runs" },
  { name: "Lucky Kumar", role: "Drone Pilot", city: "Patna", phone: "9122334455", instagram: "lucky_fpv", gear: "DJI Mavic Mini 4 Pro / Mavic 3, Flight Accessories" },
  { name: "Ritik Shaw", role: "Cinematographer", city: "Kolkata", phone: "9875571312", instagram: "ritik_shaw_films", gear: "Sony FX3 Cinema Rig, Anamorphic Lenses, DJI RS3 Pro" },
  { name: "Sanoj Kumar", role: "All Rounder (All Types)", city: "Rajgir & Patna", phone: "9955193095", instagram: "sanoj_allround", gear: "Sony A7 IV + FX30 Hybrid, 24-70mm, Gimbal, AD200 Flash" },
  { name: "Pintu kumar", role: "All Rounder (All Types)", city: "Rajgir & Patna", phone: "8651418067", instagram: "pintu_hybrid", gear: "Sony A7 IV, 24-70mm GM, DJI Gimbal, Dual Audio Kit" },
  { name: "Vikash kumar", role: "All Rounder (All Types)", city: "Rajgir & Patna", phone: "6200236091", instagram: "vikash_pro", gear: "Sony A7 IV, 70-200mm f/2.8 GM, Godox V1 Flash Kit" },
  { name: "Shashi Kr.", role: "Traditional Photographer", city: "Rajgir", phone: "8409869500", instagram: "shashi_portraits", gear: "Sony A7 III, 24-70mm f/2.8, Godox Strobe Light" }
];

export async function GET() {
  try {
    await ensureDb();

    for (const member of masterCrewRoster) {
      await TeamMember.findOneAndUpdate(
        { name: member.name },
        { $set: member },
        { upsert: true, new: true }
      );
    }

    return NextResponse.json({
      success: true,
      count: masterCrewRoster.length,
      message: "Successfully seeded all 26 crew members with specific gear!"
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
