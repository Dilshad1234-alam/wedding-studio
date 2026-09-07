import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'src', 'data', 'stories.json');

function readStories() {
  try {
    if (!fs.existsSync(dataFilePath)) {
      return [];
    }
    const fileData = fs.readFileSync(dataFilePath, 'utf8');
    return JSON.parse(fileData);
  } catch (err) {
    console.error('Error reading stories.json:', err);
    return [];
  }
}

function writeStories(data) {
  try {
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (err) {
    console.error('Error writing stories.json:', err);
    return false;
  }
}

// GET all stories
export async function GET() {
  const stories = readStories();
  return NextResponse.json(stories, {
    headers: {
      'Cache-Control': 'no-store, max-age=0'
    }
  });
}

// POST create new story
export async function POST(req) {
  try {
    const body = await req.json();
    const stories = readStories();

    const newStory = {
      id: Date.now(),
      couple: body.couple || "New Couple",
      tagline: body.tagline || "SACRED VOWS • PATNA",
      desc: body.desc || "",
      mainImage: body.mainImage || "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80",
      thumbnails: Array.isArray(body.thumbnails) && body.thumbnails.length > 0 ? body.thumbnails : [
        "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=300&q=80",
        "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=300&q=80",
        "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=300&q=80",
        "https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=300&q=80"
      ]
    };

    // Insert at the beginning so the newest story appears first
    stories.unshift(newStory);
    writeStories(stories);

    return NextResponse.json({ success: true, story: newStory }, { status: 201 });
  } catch (error) {
    console.error('API Stories POST error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// PUT edit story
export async function PUT(req) {
  try {
    const body = await req.json();
    let stories = readStories();
    stories = stories.map(s => s.id === body.id ? { ...s, ...body } : s);
    writeStories(stories);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// DELETE story
export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = parseInt(searchParams.get('id'), 10);
    let stories = readStories();
    stories = stories.filter(s => s.id !== id);
    writeStories(stories);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
