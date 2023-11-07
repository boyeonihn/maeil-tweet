'use client';
import { Layout, Button, TextArea } from '@/components';
import { useMutation } from '@/lib/client/hooks';
import { API_PATH } from '@/lib/const';
import { Post } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

interface PublishPostForm {
  content: string;
}
interface UploadProductMutation {
  ok: boolean;
  post: Post;
}
const Write = () => {
  const { register, handleSubmit } = useForm<PublishPostForm>();
  const router = useRouter();
  const [publishPost, { loading, data }] = useMutation<UploadProductMutation>(
    API_PATH.POST
  );
  const onValid = (data: PublishPostForm) => {
    if (loading) return;
    console.log('trying to publish');
    publishPost(data);
  };

  useEffect(() => {
    if (data?.ok) {
      console.log('post', data.post);
      router.push(`/tweets/${data.post.id}`);
    }
  }, [data, router]);
  return (
    <Layout canGoBack hasTabBar title="Create Post">
      <form className="p-4 space-y-4" onSubmit={handleSubmit(onValid)}>
        {/* <div>
          <label className="w-full cursor-pointer text-gray-600 hover:border-orange-500 hover:text-orange-500 flex items-center justify-center border-2 border-dashed border-gray-300 h-48 rounded-md">
            <svg
              className="h-12 w-12"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
              aria-hidden="true"
            >
              <path
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <input className="hidden" type="file" />
          </label>
        </div> */}
        <TextArea
          label="What's going on?"
          required
          register={register('content')}
        />
        <Button text={loading ? 'Loading...' : 'Publish Post'} />
      </form>
    </Layout>
  );
};

export default Write;
