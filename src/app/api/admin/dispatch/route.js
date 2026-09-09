import { NextResponse } from 'next/server';
import connectMongo from '@/lib/mongodb';
import WeddingClient from '@/models/WeddingClient';

// Dispatch data is sourced from WeddingClient (shoot scheduling lives on the client record)

export async function GET() {
  try {
    await connectMongo();
    // Return wedding clients sorted by shoot date as the dispatch schedule
    const dispatches = await WeddingClient.find({}).sort({ weddingDate: 1 });
    return NextResponse.json({ success: true, dispatches });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await connectMongo();
    const data = await req.json();
    const newClient = await WeddingClient.create(data);
    return NextResponse.json({ success: true, dispatch: newClient }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PATCH(req) {
  try {
    await connectMongo();
    const { id, status } = await req.json();

    if (!id || !status) {
      return NextResponse.json(
        { success: false, message: 'Client ID and status are required' },
        { status: 400 }
      );
    }

    const updated = await WeddingClient.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    return NextResponse.json({ success: true, dispatch: updated });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
