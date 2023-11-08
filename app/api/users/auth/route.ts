// import twilio from 'twilio';
import { NextResponse } from 'next/server';
import prismaClient from '@/lib/server/prismaClient';
import sendEmail from '@/lib/server/nodemailerClient';
import { findUserByEmail } from '@/lib/server/prismaHandler';
import {
  readCookieFromStorageServerAction,
  submitCookieToStorageServerAction,
} from '@/lib/server/serverActions';
import { AUTH } from '@/lib/const';

// const twilioClient = twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);
export const POST = async (req: Request) => {
  const res = await req.json();
  const { email } = res;

  if (!email) return NextResponse.json({ status: 400 });

  const userExists = await findUserByEmail(email);

  if (!userExists) {
    console.log('user does not exist');
    return NextResponse.json({
      status: 400,
      ok: false,
      error: 'An account with that email does not exist',
    });
  }

  const tokenPayload = Math.floor(100000 + Math.random() * 900000) + '';

  const token = await prismaClient.token.create({
    data: {
      payload: tokenPayload,
      user: {
        connect: {
          email,
        },
      },
    },
  });

  console.log('sending token', { token });
  // sendEmail(email, tokenPayload);

  const authInfoCookieAttempt = await submitCookieToStorageServerAction({
    cookie: userExists.id,
    type: AUTH,
  });

  const bringCookieBack = await readCookieFromStorageServerAction('auth');

  return NextResponse.json({ ok: true }, { status: 200 });
};
