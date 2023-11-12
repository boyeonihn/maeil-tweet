'use client';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Divider, Input } from '@/components';
import { useMutation, useUser } from '@/lib/client/hooks';
import { useRouter } from 'next/navigation';
import { API_PATH } from '@/lib/const';
import Link from 'next/link';
import { useSWRConfig } from 'swr';

interface LoginForm {
  email: string;
  password: string;
}

interface TokenForm {
  token: string;
}

interface MutationResult {
  ok: boolean;
  error?: string;
}

export default function Login() {
  const { mutate } = useSWRConfig();
  const { user, isLoading } = useUser();
  const { register, handleSubmit } = useForm<LoginForm>();
  const [login, { data, loading }] = useMutation<MutationResult>(API_PATH.AUTH);
  const router = useRouter();

  const onValid = (validForm: LoginForm) => {
    if (loading) return;
    login(validForm);
  };

  useEffect(() => {
    if (data?.ok) {
      mutate(API_PATH.ME, false);
      router.push('/');
    }
  }, [data, router]);

  return (
    <main className="mt-16 px-4">
      <h3 className="text-3xl font-bold text-center">Login to Maeil Tweet</h3>
      <div className="mt-8">
        <form
          onSubmit={handleSubmit(onValid)}
          className="flex flex-col mt-8 space-y-4"
        >
          <Input
            register={register('email', { required: true })}
            name="email"
            label="Email address"
            type="email"
            required
            labelType="declarative"
          />
          {data?.ok === false && <span>{data?.error}</span>}
          <Input
            register={register('password', { required: true })}
            name="password"
            label="Password"
            type="password"
            kind="text"
            required
          />
          <Button text={loading ? 'Loading' : 'Login!'} />
        </form>
        <Divider text={"Don't have an account?"} />
        <Link href="/create-account">
          <Button type="button" large colorType="accent" text={`Join Now!`} />
        </Link>
      </div>
    </main>
  );
}
