
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic'; // Ensures this route is always run dynamically

export async function GET() {
  const apiKey = process.env.GOOGLE_API_KEY;
  
  const isKeySet = !!apiKey;
  const keyPreview = apiKey ? `${apiKey.substring(0, 4)}...` : 'Not set';

  return NextResponse.json({
    message: 'Debugging GOOGLE_API_KEY environment variable.',
    isKeySet,
    keyPreview,
  });
}
