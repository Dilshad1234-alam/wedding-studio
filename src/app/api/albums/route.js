import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'src', 'data', 'albums.json');

function readAlbums() {
  try {
    if (!fs.existsSync(dataFilePath)) return { featureSection: {}, editions: [] };
    const raw = fs.readFileSync(dataFilePath, 'utf8');
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) return { featureSection: {}, editions: parsed };
    return parsed;
  } catch (err) {
    console.error('Error reading albums.json:', err);
    return { featureSection: {}, editions: [] };
  }
}

function writeAlbums(data) {
  try {
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (err) {
    console.error('Error writing albums.json:', err);
    return false;
  }
}

export async function GET() {
  const albums = readAlbums();
  return NextResponse.json(albums, { headers: { 'Cache-Control': 'no-store, max-age=0' } });
}

export async function POST(req) {
  try {
    const body = await req.json();
    const data = readAlbums();
    const newEdition = { 
      id: Date.now(), 
      title: body.title || "New Edition", 
      subtitle: body.subtitle || "",
      coverImage: body.coverImage || "",
      material: body.material || "",
      specs: body.specs || ""
    };
    if (!data.editions) data.editions = [];
    data.editions.unshift(newEdition);
    writeAlbums(data);
    return NextResponse.json({ success: true, album: newEdition }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(req) {
  try {
    const body = await req.json();
    let data = readAlbums();
    
    if (body.type === 'featureSection') {
      data.featureSection = { ...data.featureSection, ...body.payload };
    } else {
      if (!data.editions) data.editions = [];
      data.editions = data.editions.map(a => a.id === body.id ? { ...a, ...body } : a);
    }
    
    writeAlbums(data);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = parseInt(searchParams.get('id'), 10);
    let data = readAlbums();
    if (!data.editions) data.editions = [];
    data.editions = data.editions.filter(a => a.id !== id);
    writeAlbums(data);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
