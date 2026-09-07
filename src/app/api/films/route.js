import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'src', 'data', 'films.json');

function readFilms() {
  try {
    if (!fs.existsSync(dataFilePath)) {
      return [];
    }
    const fileData = fs.readFileSync(dataFilePath, 'utf8');
    return JSON.parse(fileData);
  } catch (err) {
    console.error('Error reading films.json:', err);
    return [];
  }
}

function writeFilms(data) {
  try {
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (err) {
    console.error('Error writing films.json:', err);
    return false;
  }
}

// GET all films
export async function GET() {
  const films = readFilms();
  return NextResponse.json(films, {
    headers: {
      'Cache-Control': 'no-store, max-age=0'
    }
  });
}

// POST create new film
export async function POST(req) {
  try {
    const body = await req.json();
    const films = readFilms();

    const newFilm = {
      id: Date.now(),
      title: body.title || "New Film",
      couple: body.couple || "Unknown Couple",
      venue: body.venue || "Unknown Venue",
      runtime: body.runtime || "00:00",
      videoUrl: body.videoUrl || "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      posterUrl: body.posterUrl || "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80",
      description: body.description || ""
    };

    // Insert at the beginning so the newest film appears first
    films.unshift(newFilm);
    writeFilms(films);

    return NextResponse.json({ success: true, film: newFilm }, { status: 201 });
  } catch (error) {
    console.error('API Films POST error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// PUT edit film
export async function PUT(req) {
  try {
    const body = await req.json();
    let films = readFilms();
    films = films.map(f => f.id === body.id ? { ...f, ...body } : f);
    writeFilms(films);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// DELETE film
export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = parseInt(searchParams.get('id'), 10);
    let films = readFilms();
    films = films.filter(f => f.id !== id);
    writeFilms(films);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
