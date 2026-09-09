import { NextResponse } from 'next/server';

// SiteImage model has been removed. Image management is now handled
// via external media/CDN solutions. These stubs keep the build clean.

export async function GET() {
  return NextResponse.json({ success: true, images: [] });
}

export async function POST(req) {
  try {
    const { sectionKey, imageUrl } = await req.json();
    if (!sectionKey || !imageUrl) {
      return NextResponse.json(
        { success: false, message: 'sectionKey and imageUrl are required' },
        { status: 400 }
      );
    }
    // No-op: return the submitted data as a passthrough acknowledgement
    return NextResponse.json({ success: true, image: { sectionKey, imageUrl } });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
