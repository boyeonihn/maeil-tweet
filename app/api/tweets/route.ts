import { NextRequest, NextResponse } from 'next/server';
import prismaClient from '@/lib/server/prismaClient';
import { getServerActionSession } from '@/lib/server/session';
export const GET = async () => {
  const posts = await prismaClient.post.findMany({
    include: {
      _count: {
        select: {
          likes: true,
        },
      },
    },
  });
  return NextResponse.json({ ok: true, posts }, { status: 200 });
};
