import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'src', 'data', 'inquiries.json');

// Helper to read data
const readData = () => {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify([]));
  }
  const data = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(data || '[]');
};

// Helper to write data
const writeData = (data) => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

export async function GET() {
  try {
    const inquiries = readData();
    // Sort so newest is first
    inquiries.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    return NextResponse.json({ success: true, inquiries });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const inquiries = readData();
    const newInquiry = {
      id: Date.now(),
      name: body.name || 'Unknown',
      mobile: body.mobile || '',
      email: body.email || '',
      selectedPackage: body.selectedPackage || '',
      eventDate: body.eventDate || '',
      location: body.location || '',
      message: body.message || '',
      status: 'NEW',
      createdAt: new Date().toISOString().split('T')[0]
    };
    inquiries.push(newInquiry);
    writeData(inquiries);
    return NextResponse.json({ success: true, inquiry: newInquiry });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(req) {
  try {
    const body = await req.json();
    const inquiries = readData();
    const index = inquiries.findIndex((i) => i.id === body.id || i._id === body.id);
    
    if (index === -1) {
      return NextResponse.json({ success: false, error: 'Inquiry not found' }, { status: 404 });
    }
    
    inquiries[index] = { ...inquiries[index], ...body };
    writeData(inquiries);
    
    return NextResponse.json({ success: true, inquiry: inquiries[index] });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PATCH(req) {
  try {
    const body = await req.json();
    const inquiries = readData();
    const index = inquiries.findIndex((i) => i.id === body.id || i._id === body.id);
    
    if (index === -1) {
      return NextResponse.json({ success: false, error: 'Inquiry not found' }, { status: 404 });
    }
    
    inquiries[index] = { ...inquiries[index], ...body };
    writeData(inquiries);
    
    return NextResponse.json({ success: true, inquiry: inquiries[index] });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    const inquiries = readData();
    const filtered = inquiries.filter((i) => i.id !== parseInt(id) && i._id !== id);
    writeData(filtered);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
