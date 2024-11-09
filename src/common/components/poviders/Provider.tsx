'use client';

import {
  ClientSideSuspense,
  LiveblocksProvider,
} from '@liveblocks/react/suspense';

import Loader from '@/common/components/docs/Loader';
import {
  getClerkUsers,
  getDocumentUsers,
} from '@/common/libs/actions/user.actions';

import QueryProvider from './QueryProvider';

interface ProviderProps {
  children: React.ReactNode;
}

const Provider: React.FC<ProviderProps> = ({ children }) => {
  return (
    <QueryProvider>
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
            // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
            currentUser: clerkUser?.emailAddresses[0].emailAddress!,
            text,
          });

          return roomUsers;
        }}
      >
        <ClientSideSuspense fallback={<Loader />}>
          {children}
        </ClientSideSuspense>
      </LiveblocksProvider>
    </QueryProvider>
  );
};

export default Provider;
