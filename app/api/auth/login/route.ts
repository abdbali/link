import { NextResponse } from 'next/server';
import { signIn } from '@/lib/auth';

export async function POST(req: Request) {
  const body = await req.json();
  await signIn('credentials', {
    email: body.email,
    password: body.password,
    redirect: false
  });

  return NextResponse.json({ success: true });
}
