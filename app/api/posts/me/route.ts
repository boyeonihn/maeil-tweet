import { NextRequest, NextResponse } from 'next/server';
import { readCookieFromStorageServerAction } from '@/lib/server/serverActions';
import { SESSION } from '@/lib/const';
import { getPosts } from '@/lib/server/prismaHandler';

export const GET = async (req: NextRequest) => {
  const {
    user: { id },
  } = await readCookieFromStorageServerAction(SESSION);

  const posts = await getPosts('user', id);

  return NextResponse.json({ ok: true, posts }, { status: 200 });
};
