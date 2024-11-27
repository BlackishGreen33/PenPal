import { redirect } from 'next/navigation';

import { getCurrent } from '@/common/libs/actions/auth.actions';

import ProjectIdSettingsClient from './client';

const Page = async () => {
  const user = await getCurrent();
  if (!user) redirect('/sign-in');

  return <ProjectIdSettingsClient />;
};

export default Page;
