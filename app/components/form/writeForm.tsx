'use client';
import { Button, TextArea } from '@/components';
import { useMutation } from '@/lib/client/hooks';
import { API_PATH } from '@/lib/const';
import { Post } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

interface PublishPostForm {
  content: string;
}
interface PublishPostMutation {
  ok: boolean;
  post: Post;
}

interface WriteFormProp {
  locatedAtHomePage: boolean;
  refreshData?: () => void;
}
export default function WriteForm({
  locatedAtHomePage,
  refreshData,
}: WriteFormProp) {
  const { register, handleSubmit } = useForm<PublishPostForm>();
  const [publishPost, { loading, data }] = useMutation<PublishPostMutation>(
    API_PATH.POST
  );
  const onValid = (data: PublishPostForm) => {
    if (loading) return;
    publishPost(data);
  };

  const router = useRouter();

  useEffect(() => {
    if (data?.ok) {
      if (locatedAtHomePage && refreshData) {
        refreshData();
      } else {
        router.push(`/tweets/${data.post.id}`);
      }
    }
  }, [data, router]);
  return (
    <form className="space-y-2" onSubmit={handleSubmit(onValid)}>
      <TextArea
        label="What is happening?!"
        required
        register={register('content')}
      />
      {/* <Button text="Save" /> */}
      <Button large text="Post" />
    </form>
  );
}
