import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_for_development';

export async function GET(req) {
  try {
    const tokenCookie = req.cookies.get('token');

    if (!tokenCookie || !tokenCookie.value) {
      return NextResponse.json({ success: false, message: 'Not authenticated' }, { status: 401 });
    }

    try {
      const decoded = jwt.verify(tokenCookie.value, JWT_SECRET);
      
      return NextResponse.json({
        success: true,
        user: {
          userId: decoded.userId,
          email: decoded.email,
          role: decoded.role,
        }
      }, { status: 200 });
      
    } catch (err) {
      return NextResponse.json({ success: false, message: 'Invalid token' }, { status: 401 });
    }

  } catch (error) {
    console.error('Auth Me Error:', error);
    return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
  }
}
