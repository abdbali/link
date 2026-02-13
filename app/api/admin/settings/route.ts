import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    allowRegistrations: true,
    maintenanceMode: false
  });
}
