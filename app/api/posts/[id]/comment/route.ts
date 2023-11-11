import { NextRequest, NextResponse } from 'next/server';
import prismaClient from '@/lib/server/prismaClient';
import { readCookieFromStorageServerAction } from '@/lib/server/serverActions';
import { SESSION } from '@/lib/const';

export const POST = async (
  req: NextRequest,
  { params: { id } }: { params: { id: string } }
) => {
  const { content } = await req.json();
  const {
    user: { id: userId },
  } = await readCookieFromStorageServerAction(SESSION);

  const comment = await prismaClient.comment.create({
    data: {
      content,
      user: {
        connect: {
          id: userId,
        },
      },
      post: {
        connect: {
          id: +id,
        },
      },
    },
  });

  return NextResponse.json({ ok: true, comment }, { status: 200 });
};
