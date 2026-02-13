import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { db } from '@/lib/db';

export async function GET() {
  const session = await auth();
  if (!session?.user?.email) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const links = await db.shortLink.findMany({ where: { ownerEmail: session.user.email } });
  return NextResponse.json({ links });
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.email) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const owner = await db.user.findUnique({ where: { email: session.user.email } });
  if (!owner) return NextResponse.json({ error: 'User not found' }, { status: 404 });

  const { slug, url } = await req.json();
  const link = await db.shortLink.create({
    data: { ownerId: owner.id, ownerEmail: session.user.email, slug, targetUrl: url }
  });
  return NextResponse.json({ link });
}
