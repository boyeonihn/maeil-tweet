import {
  getServerActionSession,
  getServerActionAuthInfo,
} from '@/lib/server/session';
import { AUTH } from '@/lib/const';

interface CookieSubmitInfo {
  cookie: number;
  type: 'auth' | 'session';
}

export const submitCookieToStorageServerAction = async ({
  cookie,
  type,
}: CookieSubmitInfo) => {
  if (type === AUTH) {
    const auth = await getServerActionAuthInfo();
    auth.user = { id: cookie };
    await auth.save();
    console.log('auth is saved');
  } else {
    const session = await getServerActionSession();
    session.user = { id: cookie };
    await session.save();
    console.log('session is saved');
  }
};

export const readCookieFromStorageServerAction = async (
  type: 'auth' | 'session'
): Promise<any> => {
  console.log('READ COOKIES FROM STORAGE SERVER');
  if (type === 'auth') {
    const auth = await getServerActionAuthInfo();
    return auth || 'No Auth Cookie Stored!';
  } else {
    const session = await getServerActionSession();
    return session || 'No Session Cookie Stored!';
  }
};

export const confirmTokenUserMatch = async (userId: number) => {
  const authUserCookie = await readCookieFromStorageServerAction(AUTH);

  if (!authUserCookie) return false;

  const {
    user: { id: authUserId },
  } = authUserCookie;

  return userId === authUserId;
};
