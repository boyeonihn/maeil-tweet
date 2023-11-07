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
  const { data, isLoading: isLoadingData } = useSWR<PostsResponse>(
    API_PATH.POST
  );

  return (
    <Layout title="Home" hasTabBar={true}>
      <main className="flex flex-col space-y-5 divide-y">
        <section>
          <WriteForm />
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
        <FloatingButton href="/posts/write">
          <svg
            className="h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
        </FloatingButton>
      </main>
    </Layout>
  );
}

/*
/ : 로그인 여부를 확인하여 로그인이 되어있다면 홈페이지를 그렇지 않다면 계정 생성 / 로그인 페이지로 이동하세요.
/create-account : 계정을 생성하는 페이지입니다.
/log-in : 로그인을 진행하는 페이지입니다.
/tweet/[id] : 트윗의 상세 정보를 보는 페이지 입니다.
/:
After logging in, in the Home Page, the user should see all the Tweets on the database, the user should also be able to POST a Tweet.
로그인이 완료되었을 경우, 사용자는 데이터베이스에 존재하는 모든 트윗을 볼 수 있어야 합니다.
또한 트윗을 작성할 수 있어야 합니다.
*/
