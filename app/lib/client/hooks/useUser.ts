import { API_PATH } from '@/lib/const';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import useSWR from 'swr';

export default function useUser() {
  const { data, error } = useSWR(API_PATH.ME);
  const router = useRouter();

  useEffect(() => {
    if (data && !data.ok) {
      router.replace('/log-in');
    }
  }, [data, router]);

  return { user: data?.userInfo, isLoading: !data && !error };
}
