import { Avatar, AvatarFallback } from '@/common/components/ui/avatar';
import { cn } from '@/common/utils';

interface MemberAvatarProps {
  name: string;
  className?: string;
  fallbackClassName?: string;
}

const MemberAvatar: React.FC<MemberAvatarProps> = ({
  name,
  className,
  fallbackClassName,
}) => {
  return (
    <Avatar
      className={cn(
        'size-5 rounded-full border border-neutral-300 transition',
        className
      )}
    >
      <AvatarFallback
        className={cn(
          'flex items-center justify-center bg-neutral-200 font-medium text-neutral-500',
          fallbackClassName
        )}
      >
        {name.charAt(0).toUpperCase()}
      </AvatarFallback>
    </Avatar>
  );
};

export default MemberAvatar;
