import { cls } from '@/lib/client/utils';

interface ButtonProps {
  large?: boolean;
  text: string;
  type?: 'primary' | 'secondary' | 'accent';
  [key: string]: any;
}

export default function Button({
  large = false,
  type = 'primary',
  onClick,
  text,
  ...rest
}: ButtonProps) {
  return (
    <button
      className={cls(
        'btn w-full shadow-md',
        type === 'secondary'
          ? 'btn-secondary'
          : type === 'accent'
          ? 'btn-accent'
          : 'btn-primary',
        large ? 'py-3 text-base' : 'py-2 text-sm'
      )}
      {...rest}
    >
      {text}
    </button>
  );
}
