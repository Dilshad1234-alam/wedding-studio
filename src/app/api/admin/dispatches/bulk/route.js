import { NextResponse } from 'next/server';
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

async function ensureDb() {
  if (mongoose.connection.readyState >= 1) return;
  if (!MONGODB_URI) throw new Error("MONGODB_URI is not defined");
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
}, { timestamps: true });

const Dispatch = mongoose.models.Dispatch || mongoose.model('Dispatch', DispatchSchema);

export async function POST(req) {
  try {
    await ensureDb();
    const { dispatches } = await req.json();

    if (!Array.isArray(dispatches) || dispatches.length === 0) {
      return NextResponse.json({ success: false, error: "No dispatches provided" }, { status: 400 });
    }

    const operations = dispatches.map((d) => ({
      updateOne: {
        filter: { clientEvent: d.clientEvent.trim() },
        update: {
          $set: {
            clientEvent: d.clientEvent.trim(),
            clientName: d.clientName || d.clientEvent.split('-')[0].trim(),
            memberName: d.memberName || 'Unassigned',
            destination: d.destination || 'Patna',
            dates: d.dates || '',
            status: d.status || 'scheduled',
          }
        },
        upsert: true
      }
    }));

    const result = await Dispatch.bulkWrite(operations);

    return NextResponse.json({
      success: true,
      count: dispatches.length,
      result,
      message: `Successfully imported ${dispatches.length} client dispatches!`
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
