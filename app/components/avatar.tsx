interface AvatarProps {
  initial: string;
  color?: 'primary' | 'secondary' | 'accent' | 'neutral';
}
export const Avatar = ({ initial, color = 'neutral' }: AvatarProps) => {
  return (
    <div className="avatar placeholder">
      <div
        className={`bg-${color} bg-neutral-focus text-neutral-content rounded-full w-16 h-16`}
      >
        <span className="text-xl">{initial}</span>
      </div>
    </div>
  );
};
