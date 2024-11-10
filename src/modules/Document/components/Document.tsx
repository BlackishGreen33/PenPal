import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

import CollaborativeRoom from '@/common/components/docs/CollaborativeRoom';
import { getDocument } from '@/common/libs/actions/room.actions';
import { getClerkUsers } from '@/common/libs/actions/user.actions';

interface DocumentProps {
  id: string;
}

const Document: React.FC<DocumentProps> = async ({ id }) => {
  const clerkUser = await currentUser();
  if (!clerkUser) redirect('/docs-sign-in');

  const room = await getDocument({
    roomId: id,
    userId: clerkUser.emailAddresses[0].emailAddress,
  });

  if (!room) redirect('/livedocs');

  const userIds = Object.keys(room.usersAccesses);
  const users = await getClerkUsers({ userIds });

  const usersData = users?.map((user: User) => ({
    ...user,
    userType: room.usersAccesses[user.email]?.includes('room:write')
      ? 'editor'
      : 'viewer',
  }));

  const currentUserType = room.usersAccesses[
    clerkUser.emailAddresses[0].emailAddress
  ]?.includes('room:write')
    ? 'editor'
    : 'viewer';

  return (
    <main id="livedocs" className="flex w-full flex-col items-center">
      <CollaborativeRoom
        roomId={id}
        roomMetadata={room.metadata}
        users={usersData}
        currentUserType={currentUserType}
      />
    </main>
  );
};

export default Document;
