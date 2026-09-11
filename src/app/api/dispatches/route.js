import { NextResponse } from 'next/server';
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

async function ensureDb() {
  if (mongoose.connection.readyState >= 1) return;
  if (!MONGODB_URI) throw new Error("MONGODB_URI is not defined in environment");
  await mongoose.connect(MONGODB_URI);
}

const DispatchSchema = new mongoose.Schema({
  clientEvent: { type: String, required: true },
  clientName: { type: String, default: '' },
  memberName: { type: String, default: 'Unassigned' },
  destination: { type: String, default: 'Patna' },
  dates: { type: String, default: '' },
  startDate: { type: String, default: '' },
  endDate: { type: String, default: '' },
  status: { type: String, default: 'scheduled' },
  totalBudget: { type: String, default: '₹0' }, // Added for real budget support
  year: { type: Number, default: 2026 },
  month: { type: String, default: 'SEP' },
}, { timestamps: true });

const Dispatch = mongoose.models.Dispatch || mongoose.model('Dispatch', DispatchSchema);

export async function GET() {
  try {
    await ensureDb();
    const dispatches = await Dispatch.find({}).sort({ createdAt: -1 });
    // Directly returning the array so Overview & Dispatch pages can read it smoothly
    return NextResponse.json(dispatches, { status: 200 });
  } catch (error) {
    return NextResponse.json([], { status: 500 });
  }
}

export async function POST(req) {
  try {
    await ensureDb();
    const body = await req.json();

    const created = await Dispatch.create({
      clientEvent: body.clientEvent || body.clientName || 'Wedding Event',
      clientName: body.clientName || body.clientEvent || 'Client',
      memberName: body.memberName || 'Unassigned',
      destination: body.destination || 'Patna',
      dates: body.dates || `${body.startDate || ''} to ${body.endDate || ''}`.trim(),
      startDate: body.startDate || '',
      endDate: body.endDate || '',
      status: body.status || 'scheduled',
      totalBudget: body.totalBudget || body.budget || '₹0',
      year: body.year || 2026,
      month: body.month || 'SEP'
    });

    return NextResponse.json({ success: true, data: created });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PATCH(req) {
  try {
    await ensureDb();
    const { id, status } = await req.json();
    const updated = await Dispatch.findByIdAndUpdate(
      id,
      { $set: { status } },
      { returnDocument: 'after' }
    );
    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    await ensureDb();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ success: false, error: 'ID is required' }, { status: 400 });

    await Dispatch.findByIdAndDelete(id);
    return NextResponse.json({ success: true, message: 'Deleted successfully' });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}