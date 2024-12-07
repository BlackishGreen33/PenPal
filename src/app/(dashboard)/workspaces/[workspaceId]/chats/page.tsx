import { redirect } from 'next/navigation';

import Dashboard from '@/common/components/chat/Dashboard';
import { getCurrent } from '@/common/libs/actions/auth.actions';
// import { getUserSubscriptionPlan } from '@/common/libs/stripe';

const Page = async () => {
  const user = await getCurrent();
  if (!user) redirect('/sign-in');

  // const subscriptionPlan = await getUserSubscriptionPlan();

  // return <Dashboard subscriptionPlan={subscriptionPlan} />;
  return <Dashboard />;
};

export default Page;
