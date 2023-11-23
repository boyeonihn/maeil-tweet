import { NextRequest, NextResponse } from 'next/server';
import { readCookieFromStorageServerAction } from '@/lib/server/serverActions';
import { SESSION } from '@/lib/const';
import {
  findComments,
  findLikeRecord,
  findOnePost,
  getPosts,
} from '@/lib/server/prismaHandler';
import { getKeywords } from '@/lib/client/utils';

export const GET = async (
  req: NextRequest,
  { params: { id } }: { params: { id: string } }
) => {
  const {
    user: { id: userId },
  } = await readCookieFromStorageServerAction(SESSION);

  const post = await findOnePost(id);
  const comments = await findComments(id);
  const keywords = getKeywords(post?.content!);
  const relatedPosts = await getPosts('keywords', id, keywords);

  const likeRecord = await findLikeRecord({ postId: post?.id!, userId });

  return NextResponse.json(
    { ok: true, post, comments, relatedPosts, isLiked: !!likeRecord },
    { status: 200 }
  );
};
