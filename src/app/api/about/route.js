import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'src', 'data', 'about.json');

function readAbout() {
  try {
    if (!fs.existsSync(dataFilePath)) return {};
    return JSON.parse(fs.readFileSync(dataFilePath, 'utf8'));
  } catch (err) {
    console.error('Error reading about.json:', err);
    return {};
  }
}

function writeAbout(data) {
  try {
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (err) {
    console.error('Error writing about.json:', err);
    return false;
  }
}

export async function GET() {
  const about = readAbout();
  return NextResponse.json(about, { headers: { 'Cache-Control': 'no-store, max-age=0' } });
}

export async function PUT(req) {
  try {
    const body = await req.json();
    writeAbout(body);
    return NextResponse.json({ success: true, about: body });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
