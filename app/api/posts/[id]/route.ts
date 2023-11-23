import { NextRequest, NextResponse } from 'next/server';
import prismaClient from '@/lib/server/prismaClient';
import { readCookieFromStorageServerAction } from '@/lib/server/serverActions';
import { SESSION } from '@/lib/const';

export const GET = async (
  req: NextRequest,
  { params: { id } }: { params: { id: string } }
) => {
  const {
    user: { id: userId },
  } = await readCookieFromStorageServerAction(SESSION);

  const keywords = getKeywords(post?.content!);

  const isLiked = await prismaClient.like.findFirst({
    where: {
      postId: post?.id,
      userId,
    },
  });

  return NextResponse.json(
    { ok: true, post, comments, relatedPosts, isLiked: !!isLiked },
    { status: 200 }
  );
};
