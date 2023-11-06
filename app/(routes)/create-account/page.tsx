'use client';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Input, Layout } from '@/components';
import { useMutation } from '@/lib/client/hooks';
import { useRouter } from 'next/navigation';
import { API_PATH } from '@/lib/const';
import { User } from '@prisma/client';

interface JoinForm {
  email: string;
  username: string;
  name: string;
  avatar?: string;
}

interface MutationResult {
  ok: boolean;
  user: User;
  error: string;
}

export default function CreateAccount() {
  const [create, { loading, data, error }] = useMutation<MutationResult>(
    API_PATH.CREATE
  );
  const { register, handleSubmit, reset } = useForm<JoinForm>();
  const router = useRouter();

  const onValid = (validForm: JoinForm) => {
    create(validForm);
  };

  useEffect(() => {
    if (data?.ok) {
      alert('Account successfully created!');
      router.push('/log-in');
    } else if (data?.ok === false) {
      alert(data?.error);
      reset();
    }
  }, [data, router]);

  return (
    <Layout canGoBack>
      <main className="mt-16 px-4">
        <h3 className="text-3xl font-bold text-center">Join Maeil-Tweet</h3>
        <form
          onSubmit={handleSubmit(onValid)}
          className="flex flex-col mt-8 space-y-4"
        >
          <Input
            register={register('email', { required: true })}
            name="email"
            label="Email"
            type="email"
            kind="text"
            required
          />
          <Input
            register={register('name', { required: true })}
            name="name"
            label="Name"
            type="text"
            kind="text"
            required
          />
          <Button type="submit" text={'Create Account'} />
          <Button type="reset" text={'Reset Form'} colorType="secondary" />
        </form>
      </main>
    </Layout>
  );
}