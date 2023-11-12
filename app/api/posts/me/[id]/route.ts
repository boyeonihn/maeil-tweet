import { NextRequest, NextResponse } from 'next/server';
import prismaClient from '@/lib/server/prismaClient';

export const GET = async (
  req: NextRequest,
  { params: { id } }: { params: { id: string } }
) => {
  console.log('id is', id);

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
