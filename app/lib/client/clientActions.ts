'use client';

import { API_PATH } from '@/lib/const';

export const submitCookieToStorageRouteHandler = async (cookie: string) => {
  console.log('submitting cookie to storage 🍊🍊🍊🍊🍊🍊');
  await fetch('/api/submitIronSessionCookie', {
    method: 'POST',
    body: JSON.stringify({
      cookie,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const readCookieFromStorageRouteHandler = async (): Promise<string> => {
  console.log('reading cookie from storage 🍊🍊🍊🍊🍊🍊');
  const responseWithCookieFromStorage = await fetch(API_PATH.ME, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await responseWithCookieFromStorage.json();
  const cookieValue = data?.cookieInStorage || 'No Cookie In Storage';
  return cookieValue;
};
