'use client';
import { Layout, WriteForm } from '@/components';
import { useUser } from '@/lib/client/hooks';
import { useRouter } from 'next/navigation';

const Write = () => {
  const router = useRouter();
  const { user, isLoading } = useUser();
  return (
    <Layout canGoBack hasTabBar title="Create Post">
      <WriteForm locatedAtHomePage={false} />
    </Layout>
  );
};

export default Write;
