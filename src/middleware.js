import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_for_development';

export async function middleware(request) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('token')?.value;

  // 1. Agar user sirf /admin ya /admin/ likh kar enter kare, toh login page par bhej dein
  if (pathname === '/admin' || pathname === '/admin/') {
    return NextResponse.redirect(new URL('/admin/auth-login', request.url));
  }

  // 2. Protect /admin routes (except the secret auth gateway)
  if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/auth-login')) {
    if (!token) {
      return NextResponse.redirect(new URL('/admin/auth-login', request.url));
    }

    try {
      const secret = new TextEncoder().encode(JWT_SECRET);
      const { payload } = await jwtVerify(token, secret);
      
      if (payload.role !== 'admin') {
        return NextResponse.redirect(new URL('/admin/auth-login', request.url));
      }
    } catch (error) {
      console.error('Middleware Token Error:', error);
      return NextResponse.redirect(new URL('/admin/auth-login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin', '/admin/:path*'],
};