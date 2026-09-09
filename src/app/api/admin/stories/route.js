import { NextResponse } from 'next/server';
import connectMongo from '@/lib/mongodb';
import mongoose from 'mongoose';

// Story model was removed from /models. Define an inline schema here
// so this route continues to work without an external model file.
const StorySchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    coupleName: { type: String, required: true, trim: true },
    venue: { type: String, default: '', trim: true },
    coverPhoto: { type: String, default: '' },
    narrative: { type: String, default: '' },
    isPublished: { type: Boolean, default: true },
  },
  { timestamps: true, collection: 'stories' }
);

// Use cached model if already compiled (hot-reload safe)
const Story = mongoose.models.Story || mongoose.model('Story', StorySchema);

export async function GET() {
  try {
    await connectMongo();
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
    await connectMongo();
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
    await connectMongo();
    const updatedStory = await Story.findByIdAndUpdate(
      id,
      { isPublished },
      { new: true }
    );
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
    await connectMongo();
    await Story.findByIdAndDelete(id);
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Delete Story Error:', error);
    return NextResponse.json({ success: false, message: 'Server Error' }, { status: 500 });
  }
}
