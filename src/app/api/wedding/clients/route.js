import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import WeddingClient, { INITIAL_WEDDING_CLIENTS } from '@/models/WeddingClient';

export async function GET() {
  try {
    await dbConnect();
    
    // Auto-seeding verification for clients
    const count = await WeddingClient.countDocuments();
    if (count === 0) {
      await WeddingClient.insertMany(INITIAL_WEDDING_CLIENTS);
    }

    const clients = await WeddingClient.find({}).sort({ bookingYear: 1, serialNo: 1 });
    
    return NextResponse.json(clients, {
      headers: { 'Cache-Control': 'no-store, max-age=0' },
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

export async function POST(req) {
  try {
    await dbConnect();
    const body = await req.json();

    const count = await WeddingClient.countDocuments();

    const newClient = await WeddingClient.create({
      serialNo: count + 1,
      bookingYear: body.bookingYear || 2026,
      bookingMonth: body.bookingMonth?.trim(),
      clientName: body.clientName?.trim(),
      clientPhone: body.clientPhone?.trim(),
      primaryDestination: body.primaryDestination?.trim(),
      contractFee: body.contractFee || '₹0',
      shootStatus: body.shootStatus || 'SCHEDULED',
      schedule: body.schedule || []
    });

    return NextResponse.json({ success: true, client: newClient }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

export async function PUT(req) {
  try {
    await dbConnect();
    const body = await req.json();
    
    const id = body.id || body._id;
    if (!id) {
      return NextResponse.json({ success: false, error: 'Client ID is required' }, { status: 400 });
    }

    const updatedClient = await WeddingClient.findByIdAndUpdate(
      id,
      { $set: body },
      { new: true, runValidators: true }
    );
    
    if (!updatedClient) {
      return NextResponse.json({ success: false, error: 'Client not found' }, { status: 404 });
    }
    
    return NextResponse.json({ success: true, client: updatedClient });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

export async function DELETE(req) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ success: false, error: 'Client ID is required' }, { status: 400 });
    }
    
    const deletedClient = await WeddingClient.findByIdAndDelete(id);
    
    if (!deletedClient) {
      return NextResponse.json({ success: false, error: 'Client not found' }, { status: 404 });
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
