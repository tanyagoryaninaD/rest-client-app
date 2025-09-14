import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import type { SetToken } from '@/types/firebase';

export async function POST(req: NextRequest) {
  try {
    const { token, expiresIn } = (await req.json()) as SetToken;

    if (!token) {
      return NextResponse.json(
        { message: 'Token is required' },
        { status: 400 }
      );
    }

    return NextResponse.json({ token, expiresIn });
  } catch {
    return NextResponse.json({ message: 'Invalid request' }, { status: 400 });
  }
}
