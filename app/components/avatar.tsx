interface AvatarProps {
  name: string;
  className?: string;
}

const Avatar = ({ name, className = "" }: AvatarProps) => {
  const getInitials = (fullName: string): string => {
    const words = fullName.trim().split(/\s+/).filter(word => word.length > 0);
    if (words.length === 0) return '';
    if (words.length === 1) return words[0][0].toUpperCase();
    const firstInitial = words[0][0];
    const lastInitial = words[words.length - 1][0];
    return (firstInitial + lastInitial).toUpperCase();
  };

  const initials = getInitials(name);

  return (
    <div
      className={`
        w-10 h-10 text-base
        bg-avatar/20 text-avatar
        rounded-full
        flex items-center justify-center
        font-bold
        ${className}
      `}
      role="img"
      aria-label={`Avatar for ${name}`}
    >
      {initials}
    </div>
  );
};

export default Avatar;
