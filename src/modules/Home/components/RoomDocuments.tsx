import { currentUser } from '@clerk/nextjs/server';
import Image from 'next/image';
import { redirect } from 'next/navigation';

import AddDocumentBtn from '@/common/components/elements/AddDocumentBtn';
import { getDocuments } from '@/common/libs/actions/room.actions';

import DocumentList from './DocumentList';

const RoomDocuments: React.FC = async () => {
  const clerkUser = await currentUser();
  if (!clerkUser) redirect('/sign-in');

  const roomDocuments = await getDocuments(
    clerkUser.emailAddresses[0].emailAddress
  );

  return (
    <>
      {roomDocuments.data.length > 0 ? (
        <DocumentList />
      ) : (
        <div className="flex w-full max-w-[730px] flex-col items-center justify-center gap-5 rounded-lg bg-dark-200 px-10 py-8">
          <Image
            src="/assets/icons/doc.svg"
            alt="Document"
            width={40}
            height={40}
            className="mx-auto"
          />
          <AddDocumentBtn
            userId={clerkUser.id}
            email={clerkUser.emailAddresses[0].emailAddress}
          />
        </div>
      )}
    </>
  );
};

export default RoomDocuments;
