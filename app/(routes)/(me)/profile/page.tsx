'use client';

import useSWR from 'swr';
import { Avatar, Layout, TextContainer } from '@/components';
import { useUser } from '@/lib/client/hooks';
import { getInitial, grabUserName } from '@/lib/client/utils';
import { API_PATH } from '@/lib/const';
import { PostsResponse } from '@/lib/types';
import { SwitchTheme } from '@/components/layout/switchTheme';

export default function Profile() {
  const { user, isLoading } = useUser();
  const { data, isLoading: isLoadingData } = useSWR<PostsResponse>(
    API_PATH.MYPOST(user.id)
  );

  return (
    <Layout title="My Profile" canGoBack hasTabBar>
      <main className="py-10 flex flex-col justify-center space-y-6">
        {user && (
          <>
            <SwitchTheme />
            <div className="flex flex-col justify-center items-center space-y-3">
              <Avatar large initial={getInitial(user.name)} />
              <h1 className="text-4xl">{user.name}</h1>
              <h2 className="text-2xl">@{grabUserName(user.email)}</h2>
            </div>
            {user && data && (
              <TextContainer title="My Posts" postData={data.posts} />
            )}
          </>
        )}
      </main>
    </Layout>
  );
}
