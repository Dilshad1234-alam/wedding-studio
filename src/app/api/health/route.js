import { NextResponse } from 'next/server';
import connectDB from '@/backend/config/db.js';

export async function GET() {
  try {
    await connectDB();
    return NextResponse.json(
      { success: true, message: "MongoDB is connected and healthy!" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Database connection failed", error: error.message },
      { status: 500 }
    );
  }
}