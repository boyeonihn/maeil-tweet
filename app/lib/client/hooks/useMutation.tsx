import { useState } from 'react';

interface UseMutationState<T> {
  loading: boolean;
  data?: T;
  error?: undefined | any;
}

type UseMutationResult<T> = [(data?: any) => void, UseMutationState<T>];

export default function useMutation<T = any>(
  url: string
): UseMutationResult<T> {
  const [state, setState] = useState<UseMutationState<T>>({
    loading: false,
    data: undefined,
    error: undefined,
  });

  async function mutationFn(data: any) {
    setState((prev) => ({ ...prev, loading: true }));

    try {
      const res = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
      });

      const json = await res.json();
      setState((prev) => ({ ...prev, data: json }));
    } catch (error: any) {
      setState((prev) => ({ ...prev, error }));
    } finally {
      setState((prev) => ({ ...prev, loading: false }));
    }
  }

  return [mutationFn, state];
}
