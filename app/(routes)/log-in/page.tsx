'use client';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Divider, Input } from '@/components';
import { useMutation } from '@/lib/client/hooks';
import { useRouter } from 'next/navigation';
import { API_PATH } from '@/lib/const';
import Link from 'next/link';

interface LoginForm {
  email: string;
}

interface TokenForm {
  token: string;
}

interface MutationResult {
  ok: boolean;
}

export default function Login() {
  const [login, { loading, data, error }] = useMutation<MutationResult>(
    API_PATH.AUTH
  );
  const [
    confirmToken,
    { loading: tokenLoading, data: tokenData, error: tokenError },
  ] = useMutation<MutationResult>(API_PATH.CONFIRM);
  const { register, handleSubmit, watch, reset } = useForm<LoginForm>();
  const { register: tokenRegister, handleSubmit: tokenHandleSubmit } =
    useForm<TokenForm>();
  const router = useRouter();

  const onValid = (validForm: LoginForm) => {
    login(validForm);
  };

  const onTokenValid = (validForm: TokenForm) => {
    if (tokenLoading) return;
    confirmToken(validForm);
  };

  useEffect(() => {
    if (tokenData?.ok) {
      router.push('/');
    }
  }, [tokenData, router]);

  return (
    <main className="mt-16 px-4">
      <h3 className="text-3xl font-bold text-center">Login to Maeil Tweet</h3>
      <div className="mt-8">
        {data?.ok ? (
          <form
            onSubmit={tokenHandleSubmit(onTokenValid)}
            className="flex flex-col mt-8 space-y-4"
          >
            <Input
              register={tokenRegister('token', { required: true })}
              name="token"
              label="Confirmation Token"
              type="number"
              required
            />
            <Button text={tokenLoading ? 'Loading' : 'Confirm Token'} />
          </form>
        ) : (
          <>
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
              <Button text={'Get login token'} />
            </form>
            <Divider text={"Don't have an account?"} />
            <Link href="/create-account">
              <Button type="button" colorType="accent" text={`Join Now!`} />
            </Link>
          </>
        )}
      </div>
    </main>
  );
}
