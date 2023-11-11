'use client';

import { Layout, Button } from '@/components';
import { API_PATH } from '@/lib/const';
import { Comment, Post, User } from '@prisma/client';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
  Layout,
  TextContainer,
  Avatar,
  Button,
  CommentForm,
} from '@/components';
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
                  </button>
                </div>
              </div>
            </section>
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
          </div>
        </section>
      </main>
    </Layout>
  );
};

export default PostDetail;
