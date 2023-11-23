import { NextRequest, NextResponse } from 'next/server';
import { readCookieFromStorageServerAction } from '@/lib/server/serverActions';
import { SESSION } from '@/lib/const';
import { handleLikeApi } from '@/lib/server/prismaHandler';

export const POST = async (
  req: NextRequest,
  { params: { id } }: { params: { id: string } }
) => {
  const {
    user: { id: userId },
  } = await readCookieFromStorageServerAction(SESSION);

  await handleLikeApi({ userId, postId: +id });

  return NextResponse.json({ ok: true }, { status: 200 });
};
