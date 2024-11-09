import { NextPage } from 'next';
import { use } from 'react';

import Document from '@/modules/Document';

interface SearchParamProps {
  params: Promise<{ [key: string]: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

const Page: NextPage<SearchParamProps> = ({ params }) => {
  const { id } = use(params);

  return <Document id={id} />;
};

export default Page;
