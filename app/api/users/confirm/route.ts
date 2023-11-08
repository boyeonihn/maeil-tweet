import { NextRequest, NextResponse } from 'next/server';
import { submitCookieToStorageServerAction } from '@/lib/server/serverActions';
import prismaClient from '@/lib/server/prismaClient';
import { confirmTokenUserMatch } from '@/lib/server/serverActions';
import { SESSION } from '@/lib/const';

export const POST = async (req: NextRequest) => {
  const { token } = await req.json();

  // find token in db
  const foundToken = await prismaClient.token.findUnique({
    where: {
      payload: token,
    },
  });

  if (!foundToken) return NextResponse.json({ status: 404 });

  const { userId } = foundToken;
  const userMatchesToken = await confirmTokenUserMatch(userId);

  if (!userMatchesToken) {
    return NextResponse.json(
      { ok: false, error: `Token didn't match the user attempting to login` },
      { status: 401 }
    );
  }

  await submitCookieToStorageServerAction({
    cookie: foundToken.userId,
    type: SESSION,
  });

  // 토큰의 userId와 같은 userId를 가진 token 전부 삭제
  await prismaClient.token.deleteMany({
    where: {
      userId: foundToken.userId,
    },
  });

  console.log('token matched, submitted cookie to storage');
  return NextResponse.json({ ok: true }, { status: 200 });
};
