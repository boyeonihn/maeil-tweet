'use client';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Divider, Input } from '@/components';
import { useMutation, useUser } from '@/lib/client/hooks';
import { useRouter } from 'next/navigation';
import { API_PATH } from '@/lib/const';
import { User } from '@prisma/client';
import Link from 'next/link';

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
  const { user, isLoading } = useUser();
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
        <Button text={'Create Account'} />
        <Button type="reset" text={'Reset Form'} />
      </form>
      <Divider text={'Have an account?'} />
      <Link href="/log-in">
        <Button type="button" large colorType="secondary" text={'Login'} />
      </Link>
    </main>
  );
}
