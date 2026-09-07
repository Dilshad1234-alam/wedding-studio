import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'src', 'data', 'services.json');

function readServices() {
  try {
    if (!fs.existsSync(dataFilePath)) {
      return [];
    }
    const fileData = fs.readFileSync(dataFilePath, 'utf8');
    return JSON.parse(fileData);
  } catch (err) {
    console.error('Error reading services.json:', err);
    return [];
  }
}

function writeServices(data) {
  try {
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (err) {
    console.error('Error writing services.json:', err);
    return false;
  }
}

// GET all services
export async function GET() {
  const services = readServices();
  return NextResponse.json(services, {
    headers: {
      'Cache-Control': 'no-store, max-age=0'
    }
  });
}

// POST create new service
export async function POST(req) {
  try {
    const body = await req.json();
    const services = readServices();

    const newService = {
      id: Date.now(),
      title: body.title || "New Package",
      subtitle: body.subtitle || "",
      badge: body.badge || "",
      regularPrice: body.regularPrice || "",
      offerPrice: body.offerPrice || "",
      savings: body.savings || "",
      schedule: body.schedule || [],
      timeline: body.timeline || [],
      deliverables: body.deliverables || [],
      experience: body.experience || [],
      whyChooseTitle: body.whyChooseTitle || "WHY CHOOSE US?",
      whyChooseFeatures: body.whyChooseFeatures || []
    };

    services.unshift(newService);
    writeServices(services);

    return NextResponse.json({ success: true, service: newService }, { status: 201 });
  } catch (error) {
    console.error('API Services POST error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// PUT edit service
export async function PUT(req) {
  try {
    const body = await req.json();
    let services = readServices();
    services = services.map(s => s.id === body.id ? { ...s, ...body } : s);
    writeServices(services);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// DELETE service
export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = parseInt(searchParams.get('id'), 10);
    let services = readServices();
    services = services.filter(s => s.id !== id);
    writeServices(services);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
