import { NextRequest, NextResponse } from 'next/server';
import prismaClient from '@/lib/server/prismaClient';
import { readCookieFromStorageServerAction } from '@/lib/server/serverActions';

export const POST = async (
  req: NextRequest,
  { params: { id } }: { params: { id: string } }
) => {
  const {
    user: { id: userId },
  } = await readCookieFromStorageServerAction('session');

  // findUnique only looks through records that are 'UNIQUE'
  const likeRecordExists = await prismaClient.like.findFirst({
    where: {
      userId,
      postId: +id,
    },
  });

  console.log('like record exists?', likeRecordExists);
  if (likeRecordExists) {
    await prismaClient.like.delete({
      where: {
        id: likeRecordExists.id,
      },
    });
  } else {
    await prismaClient.like.create({
      data: {
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
  }

  return NextResponse.json({ ok: true }, { status: 200 });
};
