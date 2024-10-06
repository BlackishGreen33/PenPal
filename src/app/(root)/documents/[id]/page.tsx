import { NextPage } from 'next';

import Document from '@/modules/Document';

interface SearchParamProps {
  params: { [key: string]: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

const Page: NextPage<SearchParamProps> = ({ params: { id } }) => (
  <Document id={id} />
);

export default Page;
