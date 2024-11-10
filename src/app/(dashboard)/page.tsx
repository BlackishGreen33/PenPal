import { NextPage } from 'next';
import { redirect } from 'next/navigation';

import { getCurrent } from '@/common/libs/actions/auth.actions';

const Page: NextPage = async () => {
  const user = await getCurrent();
  if (!user) redirect('/sign-in');

  return <div> This is a home page</div>;
};

export default Page;
