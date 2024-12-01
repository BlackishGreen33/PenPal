import { NextPage } from 'next';
import { redirect } from 'next/navigation';

import TaskViewSwitcher from '@/common/components/tasks/TaskViewSwitcher';
import { getCurrent } from '@/common/libs/actions/auth.actions';

const Page: NextPage = async () => {
  const user = await getCurrent();
  if (!user) redirect('/sign-in');

  return (
    <div className="flex h-full flex-col">
      <TaskViewSwitcher />
    </div>
  );
};

export default Page;
