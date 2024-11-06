import { NextPage } from 'next';

// import { redirect } from 'next/navigation';
import SignInCard from '@/common/components/auth/SignInCard';
// import { getCurrent } from '@/common/features/auth/queries';

const Page: NextPage = async () => {
  // const user = await getCurrent();

  // // eslint-disable-next-line no-console
  // console.log({ user });

  // if (user) redirect('/');

  return <SignInCard />;
};

export default Page;
