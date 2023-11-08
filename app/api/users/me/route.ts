import { readCookieFromStorageServerAction } from '@/lib/server/serverActions';
import prismaClient from '@/lib/server/prismaClient';
import { NextResponse } from 'next/server';
import { SESSION } from '@/lib/const';

export const GET = async (isPrivate = true) => {
  // bring logged in user's unique cookies
  const cookieFromStorage = await readCookieFromStorageServerAction(SESSION);

  // console.log('api/users/me - checking cookies of logged in user', cookieFromStorage);
  if (isPrivate && !cookieFromStorage.user) {
    return NextResponse.json(
      { ok: false, error: 'Please login!' },
      { status: 401 }
    );
  }

  const userProfile = await prismaClient.user.findUnique({
    where: { id: cookieFromStorage.user?.id },
  });

  const userInfo = JSON.parse(
    JSON.stringify(
      userProfile,
      (key, value) => (typeof value === 'bigint' ? value.toString() : value) // return everything else unchanged
    )
  );
  return NextResponse.json({ ok: true, userInfo }, { status: 200 });
};
