import { cls } from '@/lib/client/utils';

interface AvatarProps {
  large?: boolean;
  initial: string;
  color?: 'primary' | 'secondary' | 'accent' | 'neutral';
}
export const Avatar = ({
  large = false,
  initial,
  color = 'neutral',
}: AvatarProps) => {
  return (
    <div className="avatar placeholder">
      <div
        className={cls(
          `bg-${color} bg-neutral-focus text-neutral-content rounded-full`,
          large ? 'w-24 h-24' : 'w-16 h-16'
        )}
      >
        <span className={large ? 'text-3xl' : 'text-xl'}>{initial}</span>
      </div>
    </div>
  );
};
