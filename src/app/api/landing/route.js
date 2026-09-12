import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import dbConnect from '@/lib/dbConnect';
import SiteContent from '@/models/SiteContent';

export async function GET() {
  try {
    await dbConnect();
    const content = await SiteContent.findOne({ sectionType: 'landing' });
    return NextResponse.json(content ? content.data : {}, { headers: { 'Cache-Control': 'no-store, max-age=0' } });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(req) {
  try {
    await dbConnect();
    const body = await req.json();
    
    await SiteContent.findOneAndUpdate(
      { sectionType: 'landing' },
      { $set: { data: body } },
      { upsert: true, new: true }
    );
    
    revalidatePath('/');
    
    return NextResponse.json({ success: true, landing: body });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
