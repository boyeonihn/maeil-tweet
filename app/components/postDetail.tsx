import {
  cls,
  extractDateTime,
  getInitial,
  grabUserName,
} from '@/lib/client/utils';
import Link from 'next/link';
import { Avatar, Button } from '.';
import { PostWithUser } from '@/lib/types';

interface PostDetailProps {
  onLikeClick: () => void;
  detailData: PostWithUser;
  isLiked: boolean;
}
export const PostDetail = ({
  onLikeClick,
  detailData,
  isLiked,
}: PostDetailProps) => {
  return (
    <section className="mb-8">
      <div className="flex cursor-pointer py-3 border-t border-b items-center space-x-3">
        <Avatar initial={getInitial(detailData.user.name)} />
        <div className="font-medium text-xl">
          <p>{detailData.user?.name}</p>
          <Link
            href={`/users/profile/${detailData.userId}`}
            className="text-primary font-medium text-lg"
          >
            {`@${grabUserName(detailData.user.email)}`}
          </Link>
        </div>
      </div>
      <div className="mt-5">
        <p className="text-3xl font-semibold">{detailData.content}</p>
        <span className="block text-sm mt-3 text-gray-700">
          {extractDateTime(detailData.createdAt!)}
        </span>
        <p className="text-base my-6 text-gray-700"></p>
        <div className="flex items-center justify-between space-x-2">
          <Button large text="Message Author" />
          <button
            onClick={onLikeClick}
            className={cls(
              `p-3 flex items-center justify-center rounded-md hover:bg-gray-100`,
              isLiked
                ? `text-red-500 hover:text-red-500`
                : `text-gray-400 hover:text-gray-500`
            )}
          >
            <svg
              className={cls(`h-6 w-6`, isLiked ? 'fill-red-600' : 'fill-none')}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};
