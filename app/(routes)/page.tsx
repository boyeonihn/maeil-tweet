'use client';

import useSWR from 'swr';
import { API_PATH } from '@/lib/const';
import { useUser } from '@/lib/client/hooks';
import {
  WriteForm,
  Layout,
  Post,
  FloatingButton,
  LogoutBtn,
} from '@/components';
import { PostsResponse } from '@/lib/types';
import { SwitchTheme } from '@/components/layout/switchTheme';

export default function Home() {
  const { user, isLoading } = useUser();
  console.log('user', user);
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
      {user && (
        <>
          <main className="flex flex-col space-y-5 divide-y mt-8">
            <SwitchTheme />
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
        </>
      )}
    </Layout>
  );
}
