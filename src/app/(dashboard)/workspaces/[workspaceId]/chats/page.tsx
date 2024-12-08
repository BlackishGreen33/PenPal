import { redirect } from 'next/navigation';

import { getCurrent } from '@/common/libs/actions/auth.actions';

import DashboardClient from './client';
// import { getUserSubscriptionPlan } from '@/common/libs/stripe';

const Page = async () => {
  const user = await getCurrent();
  if (!user) redirect('/sign-in');

  // const subscriptionPlan = await getUserSubscriptionPlan();

  // return <Dashboard subscriptionPlan={subscriptionPlan} />;
  return <DashboardClient />;
};

export default Page;
