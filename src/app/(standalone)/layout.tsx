import Image from 'next/image';
import Link from 'next/link';

import { UserButton } from '@/common/components/elements';

interface StandloneLayoutProps {
  children: React.ReactNode;
}

const StandloneLayout: React.FC<StandloneLayoutProps> = ({ children }) => (
  <main className="min-h-screen bg-neutral-100">
    <div className="mx-auto max-w-screen-2xl p-4">
      <nav className="flex h-[73px] items-center justify-between">
        <Link href="/">
          <Image src="/logo.svg" alt="Logo" height={56} width={152} />
        </Link>
        <UserButton />
      </nav>
      <div className="flex flex-col items-center justify-center py-4">
        {children}
      </div>
    </div>
  </main>
);

export default StandloneLayout;
