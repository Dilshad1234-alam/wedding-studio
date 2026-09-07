import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'src', 'data', 'settings.json');

const readData = () => {
  if (!fs.existsSync(filePath)) {
    return {
      brandName: "WEDDINGPUR",
      brandTagline: "STUDIO & CINEMA",
      logoType: "TEXT",
      logoImageUrl: "",
      primaryPhone: "+91 8579044481",
      whatsappNumber: "+91 8579044481",
      officialEmail: "contact@weddingpur.com",
      studioAddress: "Boring Road, Near Alankar Jewellers, Patna, Bihar - 800001",
      operationalCities: "Patna • Bodhgaya • Bhagalpur • Jaipur • Kolkata",
      instagramUrl: "https://instagram.com/weddingpur",
      youtubeUrl: "https://youtube.com/@weddingpur",
      copyrightText: "© 2026 Weddingpur Studio & Cinema. All Rights Reserved."
    };
  }
  const data = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(data || '{}');
};

const writeData = (data) => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

export async function GET() {
  try {
    const settings = readData();
    return NextResponse.json({ success: true, settings });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(req) {
  try {
    const body = await req.json();
    const settings = readData();
    
    // Merge new settings
    const updatedSettings = { ...settings, ...body };
    writeData(updatedSettings);
    
    return NextResponse.json({ success: true, settings: updatedSettings });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
