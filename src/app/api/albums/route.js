import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Album from '@/models/Album';
import SiteContent from '@/models/SiteContent';

export async function GET() {
  try {
    await dbConnect();
    const albums = await Album.find({}).sort({ createdAt: -1 });
    const formatted = albums.map(a => {
      const obj = a.toObject();
      obj.id = obj._id.toString();
      return obj;
    });
    
    const featureContent = await SiteContent.findOne({ sectionType: 'albumFeature' });
    
    return NextResponse.json({
      editions: formatted,
      featureSection: featureContent ? featureContent.data : {}
    }, { headers: { 'Cache-Control': 'no-store, max-age=0' } });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await dbConnect();
    const body = await req.json();
    const newAlbum = await Album.create(body);
    const result = newAlbum.toObject();
    result.id = result._id.toString();
    return NextResponse.json({ success: true, album: result }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(req) {
  try {
    await dbConnect();
    const body = await req.json();
    
    if (body.type === 'featureSection') {
      await SiteContent.findOneAndUpdate(
        { sectionType: 'albumFeature' },
        { $set: { data: body.payload } },
        { upsert: true, new: true }
      );
      return NextResponse.json({ success: true });
    }
    
    const id = body.id || body._id;
    if (!id) return NextResponse.json({ success: false, error: 'ID is required' }, { status: 400 });

    const updatedAlbum = await Album.findByIdAndUpdate(id, { $set: body }, { new: true });
    if (!updatedAlbum) return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 });
    
    const result = updatedAlbum.toObject();
    result.id = result._id.toString();
    return NextResponse.json({ success: true, album: result });
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

    const deletedAlbum = await Album.findByIdAndDelete(id);
    if (!deletedAlbum) return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
