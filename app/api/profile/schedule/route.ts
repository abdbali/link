import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { db } from '@/lib/db';

export async function GET() {
  const session = await auth();
  if (!session?.user?.email) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const slots = await db.calendarSlot.findMany({ where: { ownerEmail: session.user.email } });
  return NextResponse.json({ slots });
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.email) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const owner = await db.user.findUnique({ where: { email: session.user.email } });
  if (!owner) return NextResponse.json({ error: 'User not found' }, { status: 404 });

  const { startsAt, endsAt } = await req.json();
  const slot = await db.calendarSlot.create({
    data: {
      ownerId: owner.id,
      ownerEmail: session.user.email,
      startsAt: new Date(startsAt),
      endsAt: new Date(endsAt)
    }
  });
  return NextResponse.json({ slot });
}
