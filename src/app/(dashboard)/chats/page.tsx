import { redirect } from 'next/navigation';

// import Dashboard from '@/components/Dashboard';
import { getCurrent } from '@/common/libs/actions/auth.actions';
// import { getUserSubscriptionPlan } from '@/common/libs/stripe';

const Page = async () => {
  const user = await getCurrent();
  if (!user) redirect('/sign-in');

  // const subscriptionPlan = await getUserSubscriptionPlan();

  // return <Dashboard subscriptionPlan={subscriptionPlan} />;
  return <>123</>;
};

export default Page;
