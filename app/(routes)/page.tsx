'use client';

import useSWR from 'swr';
import { Post as PostSchema, User } from '@prisma/client';
import { API_PATH } from '@/lib/const';
import { useUser } from '@/lib/client/hooks';
import {
  WriteForm,
  Layout,
  Post,
  FloatingButton,
  LogoutBtn,
} from '@/components';

interface LikeCommentCount {
  likes: number;
  comments: number;
}
interface PostsWithLikeCount extends PostSchema {
  _count: LikeCommentCount;
  user: User;
}
interface PostsResponse {
  ok: boolean;
  posts: PostsWithLikeCount[];
}

export default function Home() {
  const { user, isLoading } = useUser();
  const {
    data,
    isLoading: isLoadingData,
    mutate,
  } = useSWR<PostsResponse>(API_PATH.POST);

  const refreshData = () => {
    mutate();
  };

  return (
    <Layout title="Home" hasTabBar={true}>
      <main className="flex flex-col space-y-5 divide-y mt-8">
        {!isLoading && user && <LogoutBtn />}
        <h1 className="text-4xl font-mono font-thin pt-5 hover:text-primary hover:font-bold hover:backdrop-blur-3xl  transition:all">
          Maeil-Tweet
        </h1>
        <section>
          <WriteForm locatedAtHomePage={true} refreshData={refreshData} />
        </section>
        {!isLoadingData && (
          <section>
            {data?.posts && data.posts.length > 0 ? (
              data?.posts.map((post) => (
                <Post
                  key={post.id}
                  author={post.user.name}
                  id={post.id}
                  content={post.content}
                  comments={post._count.comments}
                  hearts={post._count.likes}
                />
              ))
            ) : (
              <h1> No Posts! </h1>
            )}
          </section>
        )}
        <FloatingButton href="/tweets/write" type="write" />
      </main>
    </Layout>
  );
}
