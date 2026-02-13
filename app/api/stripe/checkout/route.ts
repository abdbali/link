import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { env } from '@/lib/env';

export async function POST(req: Request) {
  const { customerEmail } = await req.json();

  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    customer_email: customerEmail,
    line_items: [{ price: process.env.STRIPE_PREMIUM_PRICE_ID, quantity: 1 }],
    success_url: `${env.NEXT_PUBLIC_APP_URL}/dashboard?payment=success`,
    cancel_url: `${env.NEXT_PUBLIC_APP_URL}/dashboard?payment=cancel`
  });

  return NextResponse.json({ url: session.url });
}
