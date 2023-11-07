import { NextResponse } from 'next/server';
import prismaClient from '@/lib/server/prismaClient';
import { cookies } from 'next/headers';
import { findUserByEmail } from '@/lib/server/prismaHandler';

export const POST = async (req: Request) => {
  const res = await req.json();
  const { email, name } = res;

  const isEmailTaken = await findUserByEmail(email);
  console.log('isEmailtaken', isEmailTaken);
  if (isEmailTaken) {
    return NextResponse.json({
      ok: false,
      error: 'Email is taken, please try another email.',
    });
  }

  const user = await prismaClient.user.create({
    data: {
      email,
      name,
    },
  });
  return NextResponse.json({ ok: true, user }, { status: 200 });
};
