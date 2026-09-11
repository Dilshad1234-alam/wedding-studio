import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Story from '@/models/Story';

export async function GET() {
  try {
    await dbConnect();
    const stories = await Story.find({}).sort({ createdAt: -1 });
    // Map _id to id for the frontend
    const formattedStories = stories.map(s => {
      const obj = s.toObject();
      obj.id = obj._id.toString();
      return obj;
    });
    return NextResponse.json(formattedStories, { headers: { 'Cache-Control': 'no-store, max-age=0' } });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await dbConnect();
    const body = await req.json();
    const newStory = await Story.create(body);
    const result = newStory.toObject();
    result.id = result._id.toString();
    return NextResponse.json({ success: true, story: result }, { status: 201 });
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

    const updatedStory = await Story.findByIdAndUpdate(id, { $set: body }, { new: true });
    if (!updatedStory) return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 });
    
    const result = updatedStory.toObject();
    result.id = result._id.toString();
    return NextResponse.json({ success: true, story: result });
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

    const deletedStory = await Story.findByIdAndDelete(id);
    if (!deletedStory) return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
