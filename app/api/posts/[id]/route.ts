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
          avatar: true,
        },
      },
      comments: true,
    },
  });

  console.log(post, 'post brought from db');
  const keywords = post?.content.split(' ').map((keyword) => ({
    content: {
      contains: keyword,
    },
  }));

  // const comments = await prismaClient.comment.findMany({
  //   where: {
  //     id: { in: post?.comments },
  //   },
  // });
  const relatedPosts = await prismaClient.post.findMany({
    where: {
      OR: keywords,
      AND: {
        id: {
          not: +id,
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
    { ok: true, post, relatedPosts, isLiked: !!isLiked },
    { status: 200 }
  );
};
