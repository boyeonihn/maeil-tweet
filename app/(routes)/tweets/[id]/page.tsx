'use client';

import { Layout, Button } from '@/components';
import { API_PATH } from '@/lib/const';
import { Comment, Post, User } from '@prisma/client';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import useSWR from 'swr';
import { useMutation, useUser } from '@/lib/client/hooks';
import { cls } from '@/lib/client/utils';

interface PostWithUser extends Post {
  user: User;
  comments: Comment[];
}
interface PosttDetailResponse {
  ok: boolean;
  post: PostWithUser;
  relatedPosts: Post[];
  isLiked: boolean;
  comments: Comment[];
}

const PostDetail = () => {
  const { user, isLoading } = useUser();
  const { id } = useParams();
  const [toggleLike, { loading }] = useMutation(API_PATH.LIKE(id[0]));
  const { data, mutate: boundMutate } = useSWR<PosttDetailResponse>(
    id ? `${API_PATH.POST}/${id}` : null
  );

  const onLikeClick = () => {
    if (!loading) {
      toggleLike({});
    }
    toggleLike();

    if (!data) {
      return;
    }
    boundMutate({ ...data, isLiked: !data.isLiked }, false);
    // the first parameter replaces the data variable
    // second argument true - triggers revaldiation
  };
  return (
    <Layout canGoBack hasTabBar>
      <main className="px-4 py-4">
        <section className="mb-8">
          <div className="h-96 bg-slate-300" />
          <div className="flex cursor-pointer py-3 border-t border-b items-center space-x-3">
            <div className="w-12 h-12 rounded-full bg-slate-300" />
            <div>
              <p className="text-sm font-medium text-gray-700">
                {data?.post?.user?.name}
              </p>
              <Link
                className="text-sm font-medium text-gray-600"
                href={`/users/profile/${data?.post?.userId}`}
              >
                View profile &rarr;
              </Link>
            </div>
          </div>
          <div className="mt-5">
            <h1 className="text-3xl font-bold text-gray-900">
              {data?.post?.content}
            </h1>
            <span className="block text-3xl mt-3 text-gray-900"></span>
            <p className="text-base my-6 text-gray-700"></p>
            <div className="flex items-center justify-between space-x-2">
              <Button large text="Talk to seller" />
              <button
                onClick={onLikeClick}
                className={cls(
                  `p-3 flex items-center justify-center rounded-md hover:bg-gray-100`,
                  data?.isLiked
                    ? `text-red-500 hover:text-red-500`
                    : `text-gray-400 hover:text-gray-500`
                )}
              >
                <svg
                  className={cls(
                    `h-6 w-6`,
                    data?.isLiked ? 'fill-red-600' : 'fill-none'
                  )}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </section>
        <section>
          <h1>COMMENTS</h1>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-gray-900">Similar posts</h2>
          <div className="mt-6 grid grid-cols-2 gap-4">
            {/* {data?.relatedPosts.map((item) => (
              <Link href={`/products/${item.id}`} key={item.id}>
                <div>
                  <div className="h-56 mb-4 w-full bg-slate-300" />
                  <h3 className="text-gray-700 -mb-1">{item.name}</h3>
                  <span className="text-xs font-medium text-gray-900">
                  </span>
                </div>
              </Link>
            ))} */}
          </div>
        </section>
      </main>
    </Layout>
  );
};

export default PostDetail;
