'use client';

import { usePathname } from 'next/navigation';

import { ScoreButton, UserButton } from '@/common/components/elements';

import MobileSidebar from './MobileSidebar';

const pathnameMap = {
  tasks: {
    title: '我的任务',
    description: '在此处查看您的任务',
  },
  chats: {
    title: 'AI 对话',
    description: '在此处查看您的文档对话',
  },
  projects: {
    title: '我的项目',
    description: '在此处查看您的项目',
  },
};

const defaultMap = {
  title: '主页',
  description: '在此处监控您的所有项目和任务',
};

const Navbar: React.FC = () => {
  const pathname = usePathname();
  const pathnameParts = pathname.split('/');
  const pathnameKey = pathnameParts[3] as keyof typeof pathnameMap;

  const { title, description } = pathnameMap[pathnameKey] || defaultMap;

  return (
    <nav className="flex items-center justify-between px-6 pt-4">
      <div className="hidden flex-col lg:flex">
        <h1 className="text-2xl font-semibold">{title}</h1>
        <p className="text-muted-foreground">{description}</p>
      </div>
      <MobileSidebar />
      <div className="flex items-center gap-5">
        <ScoreButton />
        <UserButton />
      </div>
    </nav>
  );
};

export default Navbar;
