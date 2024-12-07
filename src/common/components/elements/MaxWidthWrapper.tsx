import { cn } from '@/common/utils';

interface MaxWidthWrapperProps {
  className?: string;
  children: React.ReactNode;
}

const MaxWidthWrapper: React.FC<MaxWidthWrapperProps> = ({
  className,
  children,
}) => (
  <div
    className={cn('mx-auto w-full max-w-screen-xl px-2.5 md:px-20', className)}
  >
    {children}
  </div>
);

export default MaxWidthWrapper;
