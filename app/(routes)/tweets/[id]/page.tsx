'use client';

import { useParams } from 'next/navigation';
import useSWR from 'swr';
import { Layout, TextContainer, CommentForm, PostDetail } from '@/components';
import { API_PATH } from '@/lib/const';
import { useMutation, useUser } from '@/lib/client/hooks';
import { CommentWithUser, PostWithUser, RelatedPost } from '@/lib/types';

interface PostDetailResponse {
  ok: boolean;
  post: PostWithUser;
  comments: CommentWithUser[];
  relatedPosts: RelatedPost[];
  isLiked: boolean;
}

const PostPage = () => {
  const { user, isLoading } = useUser();
  const { id } = useParams();
  const [toggleLike, { loading }] = useMutation(API_PATH.LIKE(id.toString()));
  const { data, mutate: boundMutate } = useSWR<PostDetailResponse>(
    id ? `${API_PATH.POST}/${id.toString()}` : null
  );

  const onLikeClick = () => {
    if (!loading) {
      toggleLike({});
    }

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
        {data?.post ? (
          <>
            <PostDetail
              onLikeClick={onLikeClick}
              isLiked={data?.isLiked}
              detailData={data?.post}
            />
            <CommentForm id={id.toString()} refreshData={boundMutate} />
            <TextContainer
              title="Comments"
              type="comment"
              commentData={data?.comments}
            />
            <TextContainer
              title="Similar Posts"
              postData={data?.relatedPosts}
            />
          </>
        ) : (
          <div className="flex justify-center items-center">
            <span className="loading loading-lg loading-spinner text-primary"></span>
          </div>
        )}
      </main>
    </Layout>
  );
};

export default PostPage;
