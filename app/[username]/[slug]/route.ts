import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export const runtime = 'edge';

export async function GET(_: Request, { params }: { params: { username: string; slug: string } }) {
  const link = await db.shortLink.findFirst({
    where: { owner: { username: params.username }, slug: params.slug }
  });

  if (!link) {
    return NextResponse.json({ error: 'Link not found' }, { status: 404 });
  }

  return NextResponse.redirect(link.targetUrl, { status: 307 });
}
