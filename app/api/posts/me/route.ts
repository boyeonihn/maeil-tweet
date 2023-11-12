import { NextRequest, NextResponse } from 'next/server';
import prismaClient from '@/lib/server/prismaClient';
import { readCookieFromStorageServerAction } from '@/lib/server/serverActions';
import { SESSION } from '@/lib/const';

export const GET = async (req: NextRequest) => {
  const {
    user: { id },
  } = await readCookieFromStorageServerAction(SESSION);

  const posts = await prismaClient.post.findMany({
    where: {
      userId: +id,
    },
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      _count: {
        select: {
          likes: true,
          comments: true,
        },
      },
      user: {
        select: {
          id: true,
          name: true,
          avatar: true,
        },
      },
    },
  });
  return NextResponse.json({ ok: true, posts }, { status: 200 });
};
