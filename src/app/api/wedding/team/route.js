import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import WeddingTeamMember, { INITIAL_WEDDING_CREW } from '@/models/WeddingTeamMember';

export async function GET() {
  try {
    await dbConnect();
    
    // Auto-seeding verification
    const count = await WeddingTeamMember.countDocuments();
    if (count === 0) {
      await WeddingTeamMember.insertMany(INITIAL_WEDDING_CREW);
    }

    const members = await WeddingTeamMember.find({}).sort({ orderIndex: 1, createdAt: -1 });
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

    const count = await WeddingTeamMember.countDocuments();

    const newMember = await WeddingTeamMember.create({
      orderIndex: count + 1,
      name: body.name?.trim(),
      craftRole: body.craftRole?.trim(),
      city: body.city?.trim() || 'Patna',
      agreedRate: body.agreedRate?.trim() || '₹4,000 / Day',
      phone: body.phone?.trim(),
      whatsapp: body.phone?.trim(),
      availabilityStatus: 'AVAILABLE',
    });

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

    const updatedMember = await WeddingTeamMember.findByIdAndUpdate(
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
    
    const deletedMember = await WeddingTeamMember.findByIdAndDelete(id);
    
    if (!deletedMember) {
      return NextResponse.json({ success: false, error: 'Member not found' }, { status: 404 });
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
