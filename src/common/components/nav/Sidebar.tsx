import Image from 'next/image';
import Link from 'next/link';

import {
  DottedSeparator,
  WorkspaceSwitcher,
} from '@/common/components/elements';

import Navigation from './Navigation';
import Projects from './Projects';

const Sidebar: React.FC = () => (
  <aside className="h-full w-full bg-neutral-100 p-4">
    <Link href="/workspaces">
      <Image src="/logo-full.svg" alt="logo" width={164} height={48} />
    </Link>
    <DottedSeparator className="my-4" />
    <WorkspaceSwitcher />
    <DottedSeparator className="my-4" />
    <Navigation />
    <DottedSeparator className="my-4" />
    <Projects />
  </aside>
);

export default Sidebar;
