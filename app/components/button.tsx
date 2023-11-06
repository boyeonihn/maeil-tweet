import { cls } from '@/lib/client/utils';

interface ButtonProps {
  large?: boolean;
  text: string;
  type?: 'submit' | 'reset' | 'button';
  colorType?: 'primary' | 'secondary' | 'accent';
  [key: string]: any;
}

export default function Button({
  large = false,
  colorType = 'primary',
  type = 'submit',
  onClick,
  text,
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cls(
        'btn w-full shadow-md',
        colorType === 'secondary'
          ? 'btn-secondary'
          : colorType === 'accent'
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
