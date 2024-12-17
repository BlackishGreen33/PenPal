import Image from 'next/image';
import Link from 'next/link';

import { ScoreButton, UserButton } from '@/common/components/elements';

interface StandloneLayoutProps {
  children: React.ReactNode;
}

const StandloneLayout: React.FC<StandloneLayoutProps> = ({ children }) => (
  <main className="min-h-screen bg-neutral-100">
    <div className="mx-auto max-w-screen-2xl p-4">
      <nav className="flex h-[73px] items-center justify-between">
        <Link href="/workspaces">
          <Image src="/logo-mini.svg" alt="Logo" height={56} width={152} />
        </Link>
        <div className="flex items-center gap-5">
          <ScoreButton />
          <UserButton />
        </div>
      </nav>
      <div className="flex flex-col items-center justify-center py-4">
        {children}
      </div>
    </div>
  </main>
);

export default StandloneLayout;
