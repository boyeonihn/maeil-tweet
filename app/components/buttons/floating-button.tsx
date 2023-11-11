import Link from 'next/link';

interface FloatingButton {
  type: 'write';
  href: string;
}

export default function FloatingButton({ href, type }: FloatingButton) {
  return (
    <Link
      href={href}
      className="fixed cursor-pointer border-transparent bottom-24 right-24"
    >
      <button className="btn btn-lg btn-primary btn-circle border-4">
        {type === 'write' ? (
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
        ) : null}
      </button>
    </Link>
  );
}
