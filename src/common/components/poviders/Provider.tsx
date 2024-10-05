'use client';

import {
  ClientSideSuspense,
  LiveblocksProvider,
  RoomProvider,
} from '@liveblocks/react/suspense';
import { FC, memo, ReactNode } from 'react';

import Loader from '../elements/Loader';

interface ProviderProps {
  children: ReactNode;
}

const Provider: FC<ProviderProps> = memo(({ children }) => {
  return (
    <LiveblocksProvider authEndpoint="/api/liveblocks-auth">
      <RoomProvider id="my-room">
        <ClientSideSuspense fallback={<Loader />}>
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
});

export default Provider;
