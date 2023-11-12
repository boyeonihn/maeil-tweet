import { NextResponse } from 'next/server';
import { findUserByEmail } from '@/lib/server/prismaHandler';
import { submitCookieToStorageServerAction } from '@/lib/server/serverActions';
import { SESSION } from '@/lib/const';
import bcrypt from 'bcrypt';

export const POST = async (req: Request) => {
  const res = await req.json();
  const { email, password } = res;

  if (!email) return NextResponse.json({ status: 400 });

  const userExists = await findUserByEmail(email);

  if (!userExists) {
    return NextResponse.json({
      status: 400,
      ok: false,
      error: 'An account with that email does not exist',
    });
  }

  const comparePassword = await bcrypt.compare(password, userExists.password);

  if (!comparePassword) {
    return NextResponse.json({
      status: 401,
      ok: false,
      error: 'Incorrect password.',
    });
  }
  const sessionStored = await submitCookieToStorageServerAction({
    cookie: userExists.id,
    type: SESSION,
  });

  return NextResponse.json({ ok: true }, { status: 200 });
};
