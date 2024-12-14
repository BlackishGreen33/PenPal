'use client';

import { MessageSquareMore, SettingsIcon, UsersIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  GoCheckCircle,
  GoCheckCircleFill,
  GoDependabot,
  GoHome,
  GoHomeFill,
} from 'react-icons/go';

import { useWorkspaceId } from '@/common/hooks';
import { cn } from '@/common/utils';

const routes = [
  {
    label: '主页',
    href: '',
    icon: GoHome,
    activeIcon: GoHomeFill,
  },
  {
    label: '我的任务',
    href: '/tasks',
    icon: GoCheckCircle,
    activeIcon: GoCheckCircleFill,
  },
  {
    label: 'AI 对话',
    href: '/chats',
    icon: GoDependabot,
    activeIcon: GoDependabot,
  },
  {
    label: '设定',
    href: '/settings',
    icon: SettingsIcon,
    activeIcon: SettingsIcon,
  },
  {
    label: '成员',
    href: '/members',
    icon: UsersIcon,
    activeIcon: UsersIcon,
  },
  {
    label: '反馈',
    href: '/feedback',
    icon: MessageSquareMore,
    activeIcon: MessageSquareMore,
  },
];

const Navigation: React.FC = () => {
  const workspaceId = useWorkspaceId();
  const pathname = usePathname();

  return (
    <ul className="flex flex-col">
      {routes.map((item) => {
        const fullHref = `/workspaces/${workspaceId}${item.href}`;
        const isActive = pathname === fullHref;
        const Icon = isActive ? item.activeIcon : item.icon;

        return (
          <Link key={item.href} href={fullHref}>
            <div
              className={cn(
                'flex items-center gap-2.5 rounded-md p-2.5 font-medium text-neutral-500 transition hover:text-primary',
                isActive && 'bg-white text-primary shadow-sm hover:opacity-100'
              )}
            >
              <Icon className="size-5 text-neutral-500" />
              {item.label}
            </div>
          </Link>
        );
      })}
    </ul>
  );
};

export default Navigation;
