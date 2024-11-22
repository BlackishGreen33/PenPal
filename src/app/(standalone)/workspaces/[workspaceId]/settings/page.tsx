import { redirect } from 'next/navigation';

import { getCurrent } from '@/common/libs/actions/auth.actions';

import WorkspaceIdSettingsClient from './client';

const Page = async () => {
  const user = await getCurrent();
  if (!user) redirect('/sign-in');

  return <WorkspaceIdSettingsClient />;
};

export default Page;
