'use client';

import useSWR from 'swr';
import { Post as PostSchema, User } from '@prisma/client';
import { API_PATH } from '@/lib/const';
import { useUser } from '@/lib/client/hooks';
import { WriteForm, Layout, Post, FloatingButton } from '@/components';

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
    console.log('trying to refresh');
    mutate();
  };

  return (
    <Layout title="Home" hasTabBar={true}>
      <main className="flex flex-col space-y-5 divide-y">
        <section>
          <WriteForm locatedAtHomePage={true} refreshData={refreshData} />
        </section>
        {!isLoadingData && (
          <div>
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
          </div>
        )}
        <FloatingButton href="/tweets/write" type="write" />
      </main>
    </Layout>
  );
}

/*
/:
After logging in, in the Home Page, the user should see all the Tweets on the database, the user should also be able to POST a Tweet.
로그인이 완료되었을 경우, 사용자는 데이터베이스에 존재하는 모든 트윗을 볼 수 있어야 합니다.
또한 트윗을 작성할 수 있어야 합니다.
*/
