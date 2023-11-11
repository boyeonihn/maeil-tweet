import { Post as PostComp, Avatar } from '@/components';
import { CommentWithUser, RelatedPost } from '@/lib/types';

interface TextContainerProp {
  title: string;
  commentData?: CommentWithUser[];
  postData?: RelatedPost[];
  type?: 'comment' | 'post';
}

export const TextContainer = ({
  title,
  commentData,
  postData,
  type,
}: TextContainerProp) => {
  if (type === 'comment') {
    return (
      <section>
        <h2 className="text-2xl font-bold">{title}</h2>
        {commentData && commentData.length > 0 ? (
          commentData.map((comment) => (
            <div
              key={comment.id}
              className="my-10 pl-8 py-4 space-x-2 flex items-center text-xl"
            >
              <Avatar initial="" />
              <div className="pt-2 flex flex-col">
                <span className="font-medium mt-1">{comment.user.name}</span>
                <h3 className="font-medium">{comment.content}</h3>
              </div>
            </div>
          ))
        ) : (
          <div className="h-36 text-lg p-2">No comments yet!</div>
        )}
      </section>
    );
  } else {
    return (
      <section>
        <h2 className="text-2xl font-bold">{title}</h2>
        <div className="mt-6">
          {postData &&
            postData
              .slice(0, 3)
              .map((post) => (
                <PostComp
                  key={post.id}
                  author={post.user.name}
                  id={post.id}
                  content={post.content}
                  comments={post._count.comments}
                  hearts={post._count.likes}
                />
              ))}
        </div>
      </section>
    );
  }
};
