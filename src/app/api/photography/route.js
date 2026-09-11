import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Photography from '@/models/Photography';

export async function GET() {
  try {
    await dbConnect();
    const photos = await Photography.find({}).sort({ createdAt: -1 });
    const formatted = photos.map(p => {
      const obj = p.toObject();
      obj.id = obj._id.toString();
      return obj;
    });
    return NextResponse.json(formatted, { headers: { 'Cache-Control': 'no-store, max-age=0' } });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await dbConnect();
    const body = await req.json();
    const newPhoto = await Photography.create(body);
    const result = newPhoto.toObject();
    result.id = result._id.toString();
    return NextResponse.json({ success: true, photo: result }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(req) {
  try {
    await dbConnect();
    const body = await req.json();
    const id = body.id || body._id;
    if (!id) return NextResponse.json({ success: false, error: 'ID is required' }, { status: 400 });

    const updatedPhoto = await Photography.findByIdAndUpdate(id, { $set: body }, { new: true });
    if (!updatedPhoto) return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 });
    
    const result = updatedPhoto.toObject();
    result.id = result._id.toString();
    return NextResponse.json({ success: true, photo: result });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ success: false, error: 'ID is required' }, { status: 400 });

    const deletedPhoto = await Photography.findByIdAndDelete(id);
    if (!deletedPhoto) return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
