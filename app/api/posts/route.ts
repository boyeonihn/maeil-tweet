import { NextRequest, NextResponse } from 'next/server';
import { getServerActionSession } from '@/lib/server/session';
import { createPost, getPosts } from '@/lib/server/prismaHandler';

export const POST = async (req: NextRequest) => {
  const { content } = await req.json();
  const { user } = await getServerActionSession();

  const post = await createPost(user, content);

  return NextResponse.json({ ok: true, post }, { status: 200 });
};

export const GET = async () => {
  const posts = await getPosts();
  return NextResponse.json({ ok: true, posts }, { status: 200 });
};
