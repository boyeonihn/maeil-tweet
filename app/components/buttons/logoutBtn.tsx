'use client';

import { useRouter } from 'next/navigation';
import { Button } from '..';
import { useSWRConfig } from 'swr';
import { useMutation } from '@/lib/client/hooks';
import { API_PATH } from '@/lib/const';
import { useEffect } from 'react';

export default function LogoutBtn() {
  const router = useRouter();
  const { mutate } = useSWRConfig();
  const [logout, { data: logoutData }] = useMutation(API_PATH.LOGOUT);
  const onLogout = () => {
    logout();
  };

  useEffect(() => {
    if (logoutData?.ok) {
      mutate(API_PATH.ME, null, false);
      router.replace('/log-in');
    }
  }, [logoutData, router]);

  return (
    <Button
      onClick={onLogout}
      text="Logout"
      type="button"
      colorType="accent"
      large
    />
  );
}
