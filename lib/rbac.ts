import { NextRequest, NextResponse } from 'next/server';
import { decodeJwt } from 'jose';

export function verifyEdgeToken(request: NextRequest) {
  const token = request.cookies.get('authjs.session-token')?.value;
  if (!token) return null;

  try {
    const payload = decodeJwt(token);
    return payload;
  } catch {
    return null;
  }
}

export function requireAdmin(request: NextRequest) {
  const payload = verifyEdgeToken(request);
  if (!payload || payload.role !== 'ADMIN') {
    return NextResponse.redirect(new URL('/api/auth/signin', request.url));
  }
  return NextResponse.next();
}
