import { NextPage } from 'next';
import { redirect } from 'next/navigation';

import { getCurrent } from '@/common/libs/actions/auth.actions';
import { SignUpCard } from '@/modules/Auth';

const Page: NextPage = async () => {
  const user = await getCurrent();

  if (user) redirect('/');

  return <SignUpCard />;
};

export default Page;
