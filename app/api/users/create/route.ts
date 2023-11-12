import { NextResponse } from 'next/server';
import prismaClient from '@/lib/server/prismaClient';
import { cookies } from 'next/headers';
import { findUserByEmail } from '@/lib/server/prismaHandler';
import bcrypt from 'bcrypt';

export const POST = async (req: Request) => {
  const res = await req.json();
  const { email, name, password, confirmPw } = res;

  const isEmailTaken = await findUserByEmail(email);

  if (isEmailTaken) {
    return NextResponse.json({
      ok: false,
      error: 'Email is taken, please try another email.',
    });
  }

  if (confirmPw !== password) {
    return NextResponse.json({
      ok: false,
      error: 'Passwords do not match.',
    });
  }
  const saltRounds = 10;
  const hashedPw = await bcrypt.hash(password, saltRounds);
  const user = await prismaClient.user.create({
    data: {
      email,
      name,
      password: hashedPw,
    },
  });

  return NextResponse.json({ ok: true, user }, { status: 200 });
};
