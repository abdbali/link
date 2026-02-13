import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  const now = new Date();
  const result = await db.calendarSlot.updateMany({
    where: { endsAt: { lt: now }, status: 'OPEN' },
    data: { status: 'EXPIRED' }
  });

  return NextResponse.json({ updated: result.count, runAt: now.toISOString() });
}
