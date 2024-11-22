import { NextPage } from 'next';
import { redirect } from 'next/navigation';

import { getCurrent } from '@/common/libs/actions/auth.actions';
import { getWorkspaces } from '@/common/libs/actions/workspaces.action';

const Page: NextPage = async () => {
  const user = await getCurrent();
  if (!user) redirect('/sign-in');

  const workspaces = await getWorkspaces();
  if (workspaces.total === 0) {
    redirect('/workspaces/create');
  } else {
    redirect(`/workspaces/${workspaces.documents[0].id}`);
  }
};

export default Page;
