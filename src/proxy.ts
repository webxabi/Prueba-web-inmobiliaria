import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { decrypt } from '@/lib/auth'

export default async function proxy(request: NextRequest) {
  const session = request.cookies.get('admin_session')?.value;

  // Protected routes condition
  if (request.nextUrl.pathname.startsWith('/admin') && request.nextUrl.pathname !== '/admin/login') {
    if (!session) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
    try {
      await decrypt(session);
    } catch {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  // If going to login page but already authed, redirect to admin
  if (request.nextUrl.pathname === '/admin/login' && session) {
    try {
      await decrypt(session);
      return NextResponse.redirect(new URL('/admin', request.url));
    } catch {
      // invalid token is fine here, just let them see the login page
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
}
