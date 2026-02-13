import { NextResponse } from 'next/server';

const plans = [
  { id: 'free', name: 'Free', monthlyPrice: 0 },
  { id: 'premium', name: 'Premium', monthlyPrice: 19 }
];

export async function GET() {
  return NextResponse.json({ plans });
}
