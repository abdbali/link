import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { env } from '@/lib/env';

export async function POST(req: Request) {
  const { customerId } = await req.json();
  const session = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: `${env.NEXT_PUBLIC_APP_URL}/dashboard`
  });

  return NextResponse.json({ url: session.url });
}
