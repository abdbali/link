import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { db } from '@/lib/db';

export async function GET() {
  const session = await auth();
  if (!session?.user?.email) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const profile = await db.userProfile.findUnique({
    where: { userEmail: session.user.email }
  });

  return NextResponse.json({ profile });
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.email) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const owner = await db.user.findUnique({ where: { email: session.user.email } });
  if (!owner) return NextResponse.json({ error: 'User not found' }, { status: 404 });

  const body = await req.json();
  const profile = await db.userProfile.upsert({
    where: { userEmail: session.user.email },
    update: body,
    create: {
      userId: owner.id,
      userEmail: session.user.email,
      ...body
    }
  });

  return NextResponse.json({ profile });
}
