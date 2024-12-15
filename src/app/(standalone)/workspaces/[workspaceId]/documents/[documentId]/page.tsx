import { NextPage } from 'next';
import { redirect } from 'next/navigation';

import Editor from '@/common/components/documents/Editor';
import { getCurrent } from '@/common/libs/actions/auth.actions';
// import { preloadQuery } from 'convex/nextjs';

// import { api } from '../../../../convex/_generated/api';
// import { Id } from '../../../../convex/_generated/dataModel';
// import { Document } from './document';

interface PageProps {
  params: Promise<{ documentId: string }>;
}

const page: NextPage<PageProps> = async ({ params }) => {
  const { documentId } = await params;

  const user = await getCurrent();
  if (!user) redirect('/sign-in');

  // const { getToken } = await auth();
  // const token = (await getToken({ template: 'convex' })) ?? undefined;

  // if (!token) {
  //   throw new Error('Unauthorized');
  // }

  // const preloadedDocument = await preloadQuery(
  //   api.documents.getById,
  //   { id: documentId },
  //   { token }
  // );

  // return <Document preloadedDocument={preloadedDocument} />;
  return <Editor />;
};

export default page;
