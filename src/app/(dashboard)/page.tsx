import { NextPage } from 'next';
import { redirect } from 'next/navigation';

import CreateWorkspaceForm from '@/common/components/workspaces/CreateWorkspacesForm';
import { getCurrent } from '@/common/libs/actions/auth.actions';

const Page: NextPage = async () => {
  const user = await getCurrent();
  if (!user) redirect('/sign-in');

  return <CreateWorkspaceForm />;
};

export default Page;
