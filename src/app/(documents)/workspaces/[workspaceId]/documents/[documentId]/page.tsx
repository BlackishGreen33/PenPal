import { NextPage } from 'next';
import { redirect } from 'next/navigation';

import { getCurrent } from '@/common/libs/actions/auth.actions';

import DocumentClient from './client';

interface PageProps {
  params: Promise<{ documentId: string }>;
}

const page: NextPage<PageProps> = async ({ params }) => {
  const { documentId } = await params;

  const user = await getCurrent();
  if (!user) redirect('/sign-in');

  return <DocumentClient documentId={documentId} />;
};

export default page;
