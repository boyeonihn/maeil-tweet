import { NextRequest, NextResponse } from 'next/server';
import { getServerActionSession } from '@/lib/server/session';

export const POST = async (req: NextRequest) => {
  const session = await getServerActionSession();

  console.log('logout attempts');
  if (!session) return;
  await session.destroy();

  return NextResponse.json({ ok: true }, { status: 200 });
};
