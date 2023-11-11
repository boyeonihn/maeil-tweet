'use client';
import { Avatar, Button, TextArea } from '@/components';
import { useMutation } from '@/lib/client/hooks';
import { API_PATH } from '@/lib/const';
import { Post } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

interface PostCommentForm {
  content: string;
}
interface PostCommentMutation {
  ok: boolean;
  post: Post;
}

interface CommentFormProp {
  id: string;
  refreshData?: () => void;
}
export default function CommentForm({ id, refreshData }: CommentFormProp) {
  const { register, handleSubmit } = useForm<PostCommentForm>();
  const [postComment, { loading, data }] = useMutation<PostCommentMutation>(
    API_PATH.COMMENT(id)
  );

  const onValid = (data: PostCommentForm) => {
    if (loading) return;
    postComment(data);
  };

  const router = useRouter();

  useEffect(() => {
    if (data?.ok) {
      router.push(`/tweets/${id}`);
    }
  }, [data, router]);
  return (
    <div className="my-10 pl-8 py-4 space-x-2 border-secondary border-y-2 flex justify-center items-start">
      <Avatar initial="ME" />
      <form className="flex space-x-5" onSubmit={handleSubmit(onValid)}>
        <TextArea
          label="Post your reply"
          required
          type="reply"
          register={register('content')}
        />
        {/* <Button text="Save" /> */}
        <Button text="Post" />
      </form>
    </div>
  );
}
