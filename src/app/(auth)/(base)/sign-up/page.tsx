import { NextPage } from 'next';
import { redirect } from 'next/navigation';

import SignUpCard from '@/common/components/auth/SignUpCard';
import { getCurrent } from '@/common/libs/actions/auth.actions';

const Page: NextPage = async () => {
  const user = await getCurrent();

  if (user) redirect('/');

  return <SignUpCard />;
};

export default Page;
