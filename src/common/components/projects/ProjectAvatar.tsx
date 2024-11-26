import Image from 'next/image';

import { Avatar, AvatarFallback } from '@/common/components/ui/avatar';
import { cn } from '@/common/utils';

interface ProjectAvatarProps {
  image?: string;
  name: string;
  className?: string;
  fallbackClassName?: string;
}

const ProjectAvatar: React.FC<ProjectAvatarProps> = ({
  image,
  name,
  className,
  fallbackClassName,
}) => {
  if (image) {
    return (
      <div
        className={cn('relative size-5 overflow-hidden rounded-md', className)}
      >
        <Image src={image} alt={name} fill className="object-cover" />
      </div>
    );
  }

  return (
    <Avatar className={cn('size-5 rounded-md', className)}>
      <AvatarFallback
        className={cn(
          'rounded-md bg-blue-600 text-sm font-semibold uppercase text-white',
          fallbackClassName
        )}
      >
        {name[0]}
      </AvatarFallback>
    </Avatar>
  );
};

export default ProjectAvatar;
