import type { NextRequest } from 'next/server';
import { requireAdmin } from '@/lib/rbac';

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/admin')) {
    return requireAdmin(request);
  }
}

export const config = {
  matcher: ['/admin/:path*']
};
