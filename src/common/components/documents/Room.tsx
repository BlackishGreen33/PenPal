'use client';

import {
  ClientSideSuspense,
  LiveblocksProvider,
  RoomProvider,
} from '@liveblocks/react/suspense';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import { LEFT_MARGIN_DEFAULT, RIGHT_MARGIN_DEFAULT } from '@/common/constants';
import { getUsers } from '@/common/libs/actions/document.action';

import { PageLoader } from '../elements';

interface RoomProps {
  children: React.ReactNode;
}

type User = {
  id: string;
  name: string;
  avatar: string;
  color: string;
  email: string;
};

const Room: React.FC<RoomProps> = ({ children }) => {
  const params = useParams();

  const [users, setUsers] = useState<User[]>([]);

  const fetchUsers = async () => {
    try {
      const list = await getUsers();
      setUsers(list);
    } catch {
      toast.error('获取用户列表失败');
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <LiveblocksProvider
      publicApiKey="pk_dev_RA16parXpI5mT8XYMHsgOl7nZdCbZcw3uoK3bkBA2Sb3E06kfNsunRbVLXF7numx"
      // throttle={16}
      // authEndpoint={async () => {
      //   const room = params.documentId as string;

      //   const body = await getLiveBlocks(room);

      //   return { token: body };
      // }}
      // resolveUsers={({ userIds }) => {
      //   return userIds.map(
      //     (userId) => users.find((user) => user.id === userId) ?? undefined
      //   );
      // }}
      // resolveMentionSuggestions={({ text }) => {
      //   let filteredUsers = users;

      //   if (text) {
      //     filteredUsers = users.filter((user) =>
      //       user.name.toLowerCase().includes(text.toLowerCase())
      //     );
      //   }

      //   return filteredUsers?.map((user) => user.id);
      // }}
      // resolveRoomsInfo={async ({ roomIds }) => {
      //   const documents = await getDocuments(roomIds as string[]);
      //   return documents.map((document) => ({
      //     id: document.$id,
      //     name: document.name,
      //   }));
      // }}
    >
      <RoomProvider
        id={params.documentId as string}
        initialStorage={{
          leftMargin: LEFT_MARGIN_DEFAULT,
          rightMargin: RIGHT_MARGIN_DEFAULT,
        }}
      >
        <ClientSideSuspense fallback={<PageLoader />}>
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
};

export default Room;
