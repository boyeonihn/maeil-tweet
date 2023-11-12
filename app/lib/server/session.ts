import {
  IronSessionOptions,
  getIronSession,
  IronSessionData,
  getServerActionIronSession,
} from 'iron-session';

import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

// session object options
export const sessionOptions: IronSessionOptions = {
  password: process.env.COOKIE_PW!,
  cookieName: 'session-ck',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
  },
};

// if using email-token system:
// auth-user object options (storing which user requested the token)
export const authOptions: IronSessionOptions = {
  password: process.env.COOKIE_PW!,
  cookieName: 'auth-ck',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
  },
};

declare module 'iron-session' {
  interface IronSessionData {
    user?: {
      id: number;
    };
  }
}

// API route handler that uses getIronSession and returns response that needs to be called from client-side
const getSession = async (req: NextRequest, res: NextResponse) => {
  const session = getIronSession<IronSessionData>(req, res, sessionOptions);
  return session;
};

// uses cookies() function from next/headers to set cookies so that Iron session can be used in nextJS server actions and react server components
const getServerActionSession = async () => {
  const session = getServerActionIronSession<IronSessionData>(
    sessionOptions,
    cookies()
  );
  return session;
};

const getServerActionAuthInfo = async () => {
  const auth = getServerActionIronSession<IronSessionData>(
    authOptions,
    cookies()
  );

  return auth;
};

export { getSession, getServerActionSession, getServerActionAuthInfo };
