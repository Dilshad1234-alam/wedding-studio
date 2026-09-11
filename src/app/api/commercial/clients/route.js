import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import CommercialClient from '@/models/CommercialClient';

export async function GET() {
  try {
    await dbConnect();
    const clients = await CommercialClient.find({}).sort({ createdAt: -1 });
    return NextResponse.json(clients, {
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

    const newClient = await CommercialClient.create(body);

    return NextResponse.json({ success: true, client: newClient }, { status: 201 });
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
      return NextResponse.json({ success: false, error: 'Client ID is required' }, { status: 400 });
    }

    const updatedClient = await CommercialClient.findByIdAndUpdate(
      id,
      { $set: body },
      { new: true, runValidators: true }
    );
    
    if (!updatedClient) {
      return NextResponse.json({ success: false, error: 'Client not found' }, { status: 404 });
    }
    
    return NextResponse.json({ success: true, client: updatedClient });
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
      return NextResponse.json({ success: false, error: 'Client ID is required' }, { status: 400 });
    }
    
    const deletedClient = await CommercialClient.findByIdAndDelete(id);
    
    if (!deletedClient) {
      return NextResponse.json({ success: false, error: 'Client not found' }, { status: 404 });
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
