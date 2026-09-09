import { NextResponse } from 'next/server';
import connectMongo from '@/lib/mongodb';
import WeddingTeamMember from '@/models/WeddingTeamMember';

// TeamMember model was removed. This route now uses WeddingTeamMember
// which holds the full crew roster for wedding shoots.

export async function GET() {
  try {
    await connectMongo();
    const team = await WeddingTeamMember.find({}).sort({ orderIndex: 1 });
    return NextResponse.json({ success: true, team });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await connectMongo();
    const data = await req.json();
    const newMember = await WeddingTeamMember.create(data);
    return NextResponse.json({ success: true, member: newMember }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    await connectMongo();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { success: false, message: 'Team Member ID is required' },
        { status: 400 }
      );
    }

    await WeddingTeamMember.findByIdAndDelete(id);
    return NextResponse.json({ success: true, message: 'Team Member deleted successfully' });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PATCH(req) {
  try {
    const { id, availabilityStatus } = await req.json();
    await connectMongo();
    const updatedMember = await WeddingTeamMember.findByIdAndUpdate(
      id,
      { availabilityStatus },
      { new: true }
    );
    return NextResponse.json({ success: true, member: updatedMember }, { status: 200 });
  } catch (error) {
    console.error('Update Member Status Error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
