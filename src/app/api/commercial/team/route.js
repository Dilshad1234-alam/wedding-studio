import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import CommercialTeamMember from '@/models/CommercialTeamMember';

export async function GET() {
  try {
    await dbConnect();
    const members = await CommercialTeamMember.find({}).sort({ createdAt: -1 });
    return NextResponse.json(members, {
      headers: { 'Cache-Control': 'no-store, max-age=0' },
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await dbConnect();
    const body = await req.json();

    const newMember = await CommercialTeamMember.create(body);

    return NextResponse.json({ success: true, member: newMember }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(req) {
  try {
    await dbConnect();
    const body = await req.json();
    
    const id = body.id || body._id;
    if (!id) {
      return NextResponse.json({ success: false, error: 'Member ID is required' }, { status: 400 });
    }

    const updatedMember = await CommercialTeamMember.findByIdAndUpdate(
      id,
      { $set: body },
      { new: true, runValidators: true }
    );
    
    if (!updatedMember) {
      return NextResponse.json({ success: false, error: 'Member not found' }, { status: 404 });
    }
    
    return NextResponse.json({ success: true, member: updatedMember });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ success: false, error: 'Member ID is required' }, { status: 400 });
    }
    
    const deletedMember = await CommercialTeamMember.findByIdAndDelete(id);
    
    if (!deletedMember) {
      return NextResponse.json({ success: false, error: 'Member not found' }, { status: 404 });
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
