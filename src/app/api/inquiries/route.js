import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Inquiry from '@/models/Inquiry';

export async function GET() {
  try {
    await dbConnect();
    const inquiries = await Inquiry.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, inquiries });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await dbConnect();
    const body = await req.json();
    
    const newInquiry = await Inquiry.create({
      name: body.name || 'Unknown',
      mobile: body.mobile || '',
      email: body.email || '',
      selectedPackage: body.selectedPackage || '',
      eventDate: body.eventDate || null,
      location: body.location || '',
      message: body.message || '',
      status: 'NEW'
    });
    
    return NextResponse.json({ success: true, inquiry: newInquiry }, { status: 201 });
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
      return NextResponse.json({ success: false, error: 'Inquiry ID is required' }, { status: 400 });
    }

    const updatedInquiry = await Inquiry.findByIdAndUpdate(
      id,
      { $set: body },
      { new: true, runValidators: true }
    );
    
    if (!updatedInquiry) {
      return NextResponse.json({ success: false, error: 'Inquiry not found' }, { status: 404 });
    }
    
    return NextResponse.json({ success: true, inquiry: updatedInquiry });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PATCH(req) {
  try {
    await dbConnect();
    const body = await req.json();
    
    const id = body.id || body._id;
    if (!id) {
      return NextResponse.json({ success: false, error: 'Inquiry ID is required' }, { status: 400 });
    }

    const updatedInquiry = await Inquiry.findByIdAndUpdate(
      id,
      { $set: body },
      { new: true, runValidators: true }
    );
    
    if (!updatedInquiry) {
      return NextResponse.json({ success: false, error: 'Inquiry not found' }, { status: 404 });
    }
    
    return NextResponse.json({ success: true, inquiry: updatedInquiry });
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
      return NextResponse.json({ success: false, error: 'Inquiry ID is required' }, { status: 400 });
    }
    
    const deletedInquiry = await Inquiry.findByIdAndDelete(id);
    
    if (!deletedInquiry) {
      return NextResponse.json({ success: false, error: 'Inquiry not found' }, { status: 404 });
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
