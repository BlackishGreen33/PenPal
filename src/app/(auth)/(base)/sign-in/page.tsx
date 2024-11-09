import { NextPage } from 'next';
import { redirect } from 'next/navigation';

import SignInCard from '@/common/components/auth/SignInCard';
import { getCurrent } from '@/common/libs/actions/auth.actions';

const Page: NextPage = async () => {
  const user = await getCurrent();

  if (user) redirect('/');

  return <SignInCard />;
};

export default Page;
