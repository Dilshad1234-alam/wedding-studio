import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Film from '@/models/Film';

export async function GET() {
  try {
    await dbConnect();
    const films = await Film.find({}).sort({ createdAt: -1 });
    const formatted = films.map(f => {
      const obj = f.toObject();
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
    const newFilm = await Film.create(body);
    const result = newFilm.toObject();
    result.id = result._id.toString();
    return NextResponse.json({ success: true, film: result }, { status: 201 });
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

    const updatedFilm = await Film.findByIdAndUpdate(id, { $set: body }, { new: true });
    if (!updatedFilm) return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 });
    
    const result = updatedFilm.toObject();
    result.id = result._id.toString();
    return NextResponse.json({ success: true, film: result });
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

    const deletedFilm = await Film.findByIdAndDelete(id);
    if (!deletedFilm) return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
