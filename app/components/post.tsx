import Link from 'next/link';
import { Avatar } from './avatar';
import { ReactionBtn } from './buttons/reactionButton';
import { getInitial } from '@/lib/client/utils';

interface PostProps {
  content: string;
  id: number;
  comments: number;
  hearts: number;
  author: string;
}

export default function Post({
  content,
  comments,
  hearts,
  id,
  author,
}: PostProps) {
  return (
    <Link
      href={`/tweets/${id}`}
      className="flex pt-5 cursor-pointer justify-between"
    >
      <section className="flex space-x-4 text-xl">
        <Avatar color="primary" initial={getInitial(author)} />
        <div className="flex flex-col">
          <div className="pt-2 flex flex-col">
            <span className="font-medium mt-1">{author}</span>
            <h3 className="font-medium">{content}</h3>
          </div>
          <div className="flex space-x-4">
            <ReactionBtn btnType="like" hearts={hearts} />
            <ReactionBtn btnType="comment" comments={comments} />
          </div>
        </div>
      </section>
    </Link>
  );
}
