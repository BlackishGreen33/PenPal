/* eslint-disable @typescript-eslint/no-explicit-any */
import { currentUser } from '@clerk/nextjs/server';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';

import AddDocumentBtn from '@/common/components/docs/AddDocumentBtn';
import DeleteModal from '@/common/components/docs/DeleteModal';
import { getDocuments } from '@/common/libs/actions/room.actions';
import { dateConverter } from '@/common/utils';

const DocumentList: React.FC = async () => {
  const clerkUser = await currentUser();
  if (!clerkUser) redirect('/docs-sign-in');

  const roomDocuments = await getDocuments(
    clerkUser.emailAddresses[0].emailAddress
  );

  return (
    <div className="mb-10 flex w-full flex-col items-center gap-10 px-5">
      <div className="flex w-full max-w-[730px] items-end justify-between">
        <h3 className="text-[28px] font-semibold">All documents</h3>
        <AddDocumentBtn
          userId={clerkUser.id}
          email={clerkUser.emailAddresses[0].emailAddress}
        />
      </div>
      <ul className="flex w-full max-w-[730px] flex-col gap-5">
        {roomDocuments.data.map(({ id, metadata, createdAt }: any) => (
          <li
            key={id}
            className="flex items-center justify-between gap-4 rounded-lg bg-doc bg-cover p-5 shadow-xl"
          >
            <Link
              href={`/documents/${id}`}
              className="flex flex-1 items-center gap-4"
            >
              <div className="hidden rounded-md bg-dark-500 p-2 sm:block">
                <Image
                  src="/assets/icons/doc.svg"
                  alt="file"
                  width={40}
                  height={40}
                />
              </div>
              <div className="space-y-1">
                <p className="line-clamp-1 text-lg">{metadata.title}</p>
                <p className="text-sm font-light text-blue-100">
                  Created about {dateConverter(createdAt)}
                </p>
              </div>
            </Link>
            <DeleteModal roomId={id} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DocumentList;
