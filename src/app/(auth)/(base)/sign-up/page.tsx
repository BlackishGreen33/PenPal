import { NextPage } from 'next';

// import { redirect } from 'next/navigation';
import SignUpCard from '@/common/components/auth/SignUpCard';
// import { getCurrent } from '@/common/features/auth/queries';

const Page: NextPage = async () => {
  // const user = await getCurrent();

  // if (user) redirect('/');

  return <SignUpCard />;
};

export default Page;
