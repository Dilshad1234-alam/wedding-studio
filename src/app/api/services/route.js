import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Service from '@/models/Service';

export async function GET() {
  try {
    await dbConnect();
    const services = await Service.find({}).sort({ createdAt: -1 });
    const formatted = services.map(s => {
      const obj = s.toObject();
      obj.id = obj._id.toString();
      return obj;
    });
    return NextResponse.json(formatted, { headers: { 'Cache-Control': 'no-store, max-age=0' } });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await dbConnect();
    const body = await req.json();
    const newService = await Service.create(body);
    const result = newService.toObject();
    result.id = result._id.toString();
    return NextResponse.json({ success: true, service: result }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(req) {
  try {
    await dbConnect();
    const body = await req.json();
    const id = body.id || body._id;
    if (!id) return NextResponse.json({ success: false, error: 'ID is required' }, { status: 400 });

    const updatedService = await Service.findByIdAndUpdate(id, { $set: body }, { new: true });
    if (!updatedService) return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 });
    
    const result = updatedService.toObject();
    result.id = result._id.toString();
    return NextResponse.json({ success: true, service: result });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ success: false, error: 'ID is required' }, { status: 400 });

    const deletedService = await Service.findByIdAndDelete(id);
    if (!deletedService) return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
