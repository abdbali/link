import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { sendBookingConfirmation } from '@/lib/email';

export async function POST(req: Request) {
  const { slotId, studentEmail } = await req.json();

  const booking = await db.booking.create({
    data: {
      slotId,
      studentEmail,
      status: 'CONFIRMED'
    },
    include: { slot: true }
  });

  await sendBookingConfirmation(studentEmail, booking.slot.startsAt.toISOString());

  return NextResponse.json({ booking });
}
