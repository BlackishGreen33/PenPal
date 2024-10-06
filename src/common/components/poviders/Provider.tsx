'use client';

import {
  ClientSideSuspense,
  LiveblocksProvider,
} from '@liveblocks/react/suspense';
import { memo } from 'react';

import Loader from '@/common/components/elements/Loader';
import {
  getClerkUsers,
  getDocumentUsers,
} from '@/common/libs/actions/user.actions';

interface ProviderProps {
  children: React.ReactNode;
}

const Provider: React.FC<ProviderProps> = memo(({ children }) => {
  return (
    <LiveblocksProvider
      authEndpoint="/api/liveblocks-auth"
      resolveUsers={async ({ userIds }) => {
        const users = await getClerkUsers({ userIds });

        return users;
      }}
      resolveMentionSuggestions={async ({ text, roomId }) => {
        const roomUsers = await getDocumentUsers({
          roomId,
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          currentUser: clerkUser?.emailAddresses[0].emailAddress,
          text,
        });

        return roomUsers;
      }}
    >
      <ClientSideSuspense fallback={<Loader />}>{children}</ClientSideSuspense>
    </LiveblocksProvider>
  );
});

export default Provider;
