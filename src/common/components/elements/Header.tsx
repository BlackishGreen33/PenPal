import Image from 'next/image';
import Link from 'next/link';

import { cn } from '@/common/utils';

interface HeaderProps {
  children: React.ReactNode;
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ children, className }) => {
  return (
    <div
      className={cn(
        'flex min-h-[92px] w-full min-w-full flex-nowrap items-center justify-between gap-2 bg-dark-100 px-4',
        className
      )}
    >
      <Link href="/" className="md:flex-1">
        <Image
          src="/assets/icons/logo.svg"
          alt="Logo with name"
          width={120}
          height={32}
          className="hidden md:block"
        />
        <Image
          src="/assets/icons/logo-icon.svg"
          alt="Logo"
          width={32}
          height={32}
          className="mr-2 md:hidden"
        />
      </Link>
      {children}
    </div>
  );
};

export default Header;
