/* eslint-disable simple-import-sort/imports */
'use client';

import { ClientSideSuspense } from '@liveblocks/react';
import { InboxNotification, InboxNotificationList } from '@liveblocks/react-ui';
import { useInboxNotifications } from '@liveblocks/react/suspense';
import { BellIcon } from 'lucide-react';

import { Button } from '@/common/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/common/components/ui/dropdown-menu';
import { Separator } from '@/common/components/ui/separator';

const InboxMenu: React.FC = () => {
  const { inboxNotifications } = useInboxNotifications();

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative" size="icon">
            <BellIcon className="size-5" />
            {inboxNotifications.length > 0 && (
              <span className="absolute -right-1 -top-1 flex size-4 items-center justify-center rounded-full bg-sky-500 text-xs text-white">
                {inboxNotifications.length}
              </span>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-auto">
          {inboxNotifications.length > 0 ? (
            <InboxNotificationList>
              {inboxNotifications.map((inboxNotification) => (
                <InboxNotification
                  key={inboxNotification.id}
                  inboxNotification={inboxNotification}
                />
              ))}
            </InboxNotificationList>
          ) : (
            <div className="w-[400px] p-2 text-center text-sm text-muted-foreground">
              无消息
            </div>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
      <Separator orientation="vertical" className="h-6" />
    </>
  );
};

const Inbox: React.FC = () => (
  <ClientSideSuspense
    fallback={
      <>
        <Button variant="ghost" disabled className="relative" size="icon">
          <BellIcon className="size-5" />
        </Button>
        <Separator orientation="vertical" className="h-6" />
      </>
    }
  >
    <InboxMenu />
  </ClientSideSuspense>
);

export default Inbox;
