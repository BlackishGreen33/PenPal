'use client';

import { useGetTask } from '@/common/api/tasks';
import {
  DottedSeparator,
  PageError,
  PageLoader,
} from '@/common/components/elements';
import TaskBreadcrumbs from '@/common/components/tasks/TaskBreadcrumbs';
import TaskDescription from '@/common/components/tasks/TaskDescription';
import TaskOverview from '@/common/components/tasks/TaskOverview';
import { useTaskId } from '@/common/hooks';

const TaskIdClient: React.FC = () => {
  const taskId = useTaskId();
  const { data, isLoading } = useGetTask({ taskId });

  if (isLoading) {
    return <PageLoader />;
  }

  if (!data) {
    return <PageError message="未找到任务" />;
  }

  return (
    <div className="flex flex-col">
      <TaskBreadcrumbs project={data.project} task={data} />
      <DottedSeparator className="my-6" />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <TaskOverview task={data} />
        <TaskDescription task={data} />
      </div>
    </div>
  );
};

export default TaskIdClient;
