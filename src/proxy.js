import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_for_development';

export async function proxy(request) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('token')?.value;

  // 1. The /admin route is now the login page, no need to redirect it.
  
  // 2. Protect /admin routes (except the secret auth gateway which is /admin)
  if (pathname.startsWith('/admin') && pathname !== '/admin') {
    if (!token) {
      return NextResponse.redirect(new URL('/admin', request.url));
    }

    try {
      const secret = new TextEncoder().encode(JWT_SECRET);
      const { payload } = await jwtVerify(token, secret);
      
      if (payload.role !== 'admin') {
        return NextResponse.redirect(new URL('/admin', request.url));
      }
    } catch (error) {
      console.error('Middleware Token Error:', error);
      return NextResponse.redirect(new URL('/admin', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin', '/admin/:path*'],
};