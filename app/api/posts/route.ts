import { NextRequest, NextResponse } from 'next/server';
import prismaClient from '@/lib/server/prismaClient';
import { getServerActionSession } from '@/lib/server/session';

export const POST = async (req: NextRequest) => {
  const { content } = await req.json();
  const { user } = await getServerActionSession();

  const product = await prismaClient.post.create({
    data: {
      content,
      imageUrl: 'xx',
      user: {
        connect: {
          id: user?.id,
        },
      },
    },
  });

  return NextResponse.json({ ok: true, product }, { status: 200 });
};

export const GET = async () => {
  const posts = await prismaClient.post.findMany({
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
