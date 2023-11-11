import { NextRequest, NextResponse } from 'next/server';
import {
  getServerActionAuthInfo,
  getServerActionSession,
} from '@/lib/server/session';

export const POST = async (req: NextRequest) => {
  const session = await getServerActionSession();
  const auth = await getServerActionAuthInfo();

  console.log('logout attempts');
  if (!session) return;
  await session.destroy();
  await auth.destroy();

  return NextResponse.json({ ok: true }, { status: 200 });
};
