import { API_PATH } from '@/lib/const';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import useSWR from 'swr';

export default function useUser() {
  const { data, error } = useSWR(API_PATH.ME);
  const router = useRouter();
  const pathName = usePathname();

  useEffect(() => {
    if (data)
      if (data.ok === false) {
        if (pathName === '/create-account') {
          return;
        }
        router.push('/log-in');
      } else {
        if (pathName === '/log-in' || pathName === '/create-account') {
          router.replace('/');
        }
      }
  }, [data, error, router]);

  return { user: data?.userInfo, isLoading: !data && !error };
}
