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

  const post = await prismaClient.post.findUnique({
    where: {
      id: +id,
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          avatar: true,
        },
      },
    },
  });

  const comments = await prismaClient.comment.findMany({
    where: {
      post: {
        id: +id,
      },
    },
    include: {
      user: {
        select: {
          name: true,
          email: true,
          avatar: true,
        },
      },
    },
  });

  const keywords = post?.content.split(' ').map((keyword) => ({
    content: {
      contains: keyword,
    },
  }));

  const relatedPosts = await prismaClient.post.findMany({
    where: {
      OR: keywords,
      AND: {
        id: {
          not: +id,
        },
      },
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
