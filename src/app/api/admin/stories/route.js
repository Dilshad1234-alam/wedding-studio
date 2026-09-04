import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Story from '@/models/Story';

export async function GET(req) {
  try {
    await connectToDatabase();
    const stories = await Story.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, stories }, { status: 200 });
  } catch (error) {
    console.error('Fetch Stories Error:', error);
    return NextResponse.json({ success: false, message: 'Server Error' }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const data = await req.json();
    await connectToDatabase();
    const newStory = await Story.create(data);
    return NextResponse.json({ success: true, story: newStory }, { status: 201 });
  } catch (error) {
    console.error('Create Story Error:', error);
    return NextResponse.json({ success: false, message: 'Server Error' }, { status: 500 });
  }
}

export async function PATCH(req) {
  try {
    const { id, isPublished } = await req.json();
    await connectToDatabase();
    const updatedStory = await Story.findByIdAndUpdate(id, { isPublished }, { new: true });
    return NextResponse.json({ success: true, story: updatedStory }, { status: 200 });
  } catch (error) {
    console.error('Update Story Error:', error);
    return NextResponse.json({ success: false, message: 'Server Error' }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get('id');
    await connectToDatabase();
    await Story.findByIdAndDelete(id);
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Delete Story Error:', error);
    return NextResponse.json({ success: false, message: 'Server Error' }, { status: 500 });
  }
}
