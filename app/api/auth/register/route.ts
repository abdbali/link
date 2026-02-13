import { NextResponse } from 'next/server';
import { z } from 'zod';
import { db } from '@/lib/db';

const registerSchema = z.object({
  email: z.string().email(),
  name: z.string().min(2),
  password: z.string().min(8)
});

export async function POST(req: Request) {
  const json = await req.json();
  const body = registerSchema.parse(json);

  const user = await db.user.create({
    data: {
      email: body.email,
      name: body.name,
      passwordHash: body.password,
      role: 'USER'
    }
  });

  return NextResponse.json({ id: user.id, email: user.email });
}
