import { NextResponse } from 'next/server';
import connectMongo from '@/lib/mongodb';
import SiteImage from '@/models/SiteImage';

export async function GET() {
  try {
    await connectMongo();
    const images = await SiteImage.find({});
    return NextResponse.json({ success: true, images });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await connectMongo();
    const { sectionKey, imageUrl, label, page } = await req.json();

    if (!sectionKey || !imageUrl) {
      return NextResponse.json({ success: false, message: 'sectionKey and imageUrl are required' }, { status: 400 });
    }

    const updatedImage = await SiteImage.findOneAndUpdate(
      { sectionKey },
      { imageUrl, label, page, updatedAt: Date.now() },
      { new: true, upsert: true }
    );

    return NextResponse.json({ success: true, image: updatedImage });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
