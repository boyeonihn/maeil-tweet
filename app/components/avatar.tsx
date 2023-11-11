interface AvatarProps {
  initial: string;
}
export const Avatar = ({ initial }: AvatarProps) => {
  return (
    <div className="avatar placeholder">
      <div className="bg-neutral-focus text-neutral-content rounded-full w-16 h-16">
        <span className="text-xl">{initial}</span>
      </div>
    </div>
  );
};
