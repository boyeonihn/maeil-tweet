'use client';
import { cls } from '@/lib/client/utils';
import { useRouter } from 'next/navigation';

interface HeaderProps {
  title?: string;
  canGoBack?: boolean;
}

export const Header = ({ title, canGoBack }: HeaderProps) => {
  const router = useRouter();
  const onClick = () => {
    router.back();
  };

  return (
    <header
      className={cls(
        !canGoBack ? 'justify-center' : '',
        'w-full max-w-xl text-lg px-10 font-medium py-3 fixed bg-accent bg-opacity-80 border-b top-0  flex items-center'
      )}
    >
      {canGoBack ? (
        <button onClick={onClick}>
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 19l-7-7 7-7"
            ></path>
          </svg>
        </button>
      ) : null}
      {title ? <span>{title}</span> : null}
    </header>
  );
};
