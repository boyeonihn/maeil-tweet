import { NextRequest, NextResponse } from 'next/server';
import { readCookieFromStorageServerAction } from '@/lib/server/serverActions';
import { SESSION } from '@/lib/const';
import { createComment } from '@/lib/server/prismaHandler';

export const POST = async (
  req: NextRequest,
  { params: { id } }: { params: { id: string } }
) => {
  const { content } = await req.json();
  const {
    user: { id: userId },
  } = await readCookieFromStorageServerAction(SESSION);

  const comment = await createComment({ content, userId, postId: id });

  return NextResponse.json({ ok: true, comment }, { status: 200 });
};
