import { NextResponse } from 'next/server';
import connectMongo from '@/lib/mongodb';
import CrewDispatch from '@/models/CrewDispatch';

export async function GET() {
  try {
    await connectMongo();
    const dispatches = await CrewDispatch.find({}).sort({ startDate: 1 });
    return NextResponse.json({ success: true, dispatches });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await connectMongo();
    const data = await req.json();

    const newDispatch = await CrewDispatch.create(data);
    return NextResponse.json({ success: true, dispatch: newDispatch }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PATCH(req) {
  try {
    await connectMongo();
    const { id, status } = await req.json();

    if (!id || !status) {
      return NextResponse.json({ success: false, message: 'Dispatch ID and status are required' }, { status: 400 });
    }

    const updatedDispatch = await CrewDispatch.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    return NextResponse.json({ success: true, dispatch: updatedDispatch });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
