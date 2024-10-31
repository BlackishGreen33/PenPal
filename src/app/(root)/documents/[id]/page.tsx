import { NextPage } from 'next';

import Document from '@/modules/Document';

type Params = Promise<{ [key: string]: string }>;
interface SearchParamProps {
  params: Params;
  searchParams: { [key: string]: string | string[] | undefined };
}

const Page: NextPage<SearchParamProps> = async (props) => {
  const params = await props.params;
  const { id } = params;

  return <Document id={id} />;
};

export default Page;
