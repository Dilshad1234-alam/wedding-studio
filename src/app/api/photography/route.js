import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'src', 'data', 'photography.json');

// GET all photos
export async function GET() {
  try {
    const fileContents = fs.readFileSync(dataFilePath, 'utf8');
    const photos = JSON.parse(fileContents);
    return NextResponse.json(photos);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to read photography data' }, { status: 500 });
  }
}

// POST a new photo
export async function POST(request) {
  try {
    const newPhoto = await request.json();
    const fileContents = fs.readFileSync(dataFilePath, 'utf8');
    const photos = JSON.parse(fileContents);
    
    // Generate new ID
    const newId = photos.length > 0 ? Math.max(...photos.map(p => p.id)) + 1 : 1;
    newPhoto.id = newId;
    
    photos.push(newPhoto);
    fs.writeFileSync(dataFilePath, JSON.stringify(photos, null, 2));
    
    return NextResponse.json(newPhoto, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to add photo' }, { status: 500 });
  }
}

// PUT to update an existing photo
export async function PUT(request) {
  try {
    const updatedPhoto = await request.json();
    const fileContents = fs.readFileSync(dataFilePath, 'utf8');
    let photos = JSON.parse(fileContents);
    
    const index = photos.findIndex(p => p.id === updatedPhoto.id);
    if (index === -1) {
      return NextResponse.json({ error: 'Photo not found' }, { status: 404 });
    }
    
    photos[index] = updatedPhoto;
    fs.writeFileSync(dataFilePath, JSON.stringify(photos, null, 2));
    
    return NextResponse.json(updatedPhoto);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update photo' }, { status: 500 });
  }
}

// DELETE a photo
export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const idStr = searchParams.get('id');
    
    if (!idStr) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }
    
    const id = parseInt(idStr, 10);
    const fileContents = fs.readFileSync(dataFilePath, 'utf8');
    let photos = JSON.parse(fileContents);
    
    const initialLength = photos.length;
    photos = photos.filter(p => p.id !== id);
    
    if (photos.length === initialLength) {
      return NextResponse.json({ error: 'Photo not found' }, { status: 404 });
    }
    
    fs.writeFileSync(dataFilePath, JSON.stringify(photos, null, 2));
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete photo' }, { status: 500 });
  }
}
