import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Inquiry from '@/models/Inquiry';

export async function GET(req) {
  try {
    await connectToDatabase();
    const inquiries = await Inquiry.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, inquiries }, { status: 200 });
  } catch (error) {
    console.error('Fetch Inquiries Error:', error);
    return NextResponse.json({ success: false, message: 'Server Error' }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const data = await req.json();
    await connectToDatabase();
    const newInquiry = await Inquiry.create(data);
    return NextResponse.json({ success: true, inquiry: newInquiry }, { status: 201 });
  } catch (error) {
    console.error('Create Inquiry Error:', error);
    return NextResponse.json({ success: false, message: 'Server Error' }, { status: 500 });
  }
}

export async function PATCH(req) {
  try {
    const { id, status } = await req.json();
    await connectToDatabase();
    const updatedInquiry = await Inquiry.findByIdAndUpdate(id, { status }, { new: true });
    return NextResponse.json({ success: true, inquiry: updatedInquiry }, { status: 200 });
  } catch (error) {
    console.error('Update Inquiry Error:', error);
    return NextResponse.json({ success: false, message: 'Server Error' }, { status: 500 });
  }
}
