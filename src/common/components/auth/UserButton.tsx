'use client';

import { Loader, LogOut } from 'lucide-react';

import { useCurrent, useLogout } from '@/common/api/auth';
import { DottedSeparator } from '@/common/components/elements';
import { Avatar, AvatarFallback } from '@/common/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/common/components/ui/dropdown-menu';

const UserButton: React.FC = () => {
  const { mutate: logout } = useLogout();
  const { data: user, isLoading } = useCurrent();

  if (isLoading) {
    return (
      <div className="flex size-10 items-center justify-center rounded-full border border-neutral-300 bg-neutral-200">
        <Loader className="size-4 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const { name, email } = user;

  const avatarFallback = name
    ? name.charAt(0).toUpperCase()
    : (email.charAt(0).toUpperCase() ?? 'U');

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger className="relative outline-none">
        <Avatar className="size-10 border border-neutral-300 transition hover:opacity-75">
          <AvatarFallback className="flex items-center justify-center bg-neutral-200 font-medium text-neutral-500">
            {avatarFallback}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        side="bottom"
        className="w-60"
        sideOffset={10}
      >
        <div className="flex flex-col items-center justify-center gap-2 px-2.5 py-4">
          <Avatar className="size-[52px] border border-neutral-300">
            <AvatarFallback className="flex items-center justify-center bg-neutral-200 text-xl font-medium text-neutral-500">
              {avatarFallback}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col items-center justify-center">
            <p className="text-sm font-medium text-neutral-900">
              {name || 'User'}
            </p>
            <p className="text-xs text-neutral-500">{email}</p>
          </div>
        </div>
        <DottedSeparator className="mb-1" />
        <DropdownMenuItem
          onClick={() => logout()}
          className="flex h-10 cursor-pointer items-center justify-center font-medium text-amber-700"
        >
          <LogOut className="mr-2 size-4" />
          登出
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserButton;
