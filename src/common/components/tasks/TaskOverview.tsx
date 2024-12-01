import { PencilIcon } from 'lucide-react';

import { DottedSeparator } from '@/common/components/elements';
import MemberAvatar from '@/common/components/members/MemberAvatar';
import { Badge } from '@/common/components/ui/badge';
import { Button } from '@/common/components/ui/button';
import { useEditTaskModal } from '@/common/hooks';
import { Task } from '@/common/types/tasks';
import { snakeCaseToTitleCase } from '@/common/utils';

import OverviewProperty from './OverviewProperty';
import TaskDate from './TaskDate';

interface TaskOverviewProps {
  task: Task;
}

const TaskOverview: React.FC<TaskOverviewProps> = ({ task }) => {
  const { open } = useEditTaskModal();

  return (
    <div className="col-span-1 flex flex-col gap-y-4">
      <div className="rounded-lg bg-muted p-4">
        <div className="flex items-center justify-between">
          <p className="text-lg font-semibold">总览</p>
          <Button onClick={() => open(task.$id)} size="sm" variant="secondary">
            <PencilIcon className="mr-2 size-4" />
            编辑
          </Button>
        </div>
        <DottedSeparator className="my-4" />
        <div className="flex flex-col gap-y-4">
          <OverviewProperty label="Assignee">
            <MemberAvatar name={task.assignee.name} className="size-6" />
            <p className="text-sm font-medium">{task.assignee.name}</p>
          </OverviewProperty>
          <OverviewProperty label="Due Date">
            <TaskDate value={task.dueDate} className="text-sm font-medium" />
          </OverviewProperty>
          <OverviewProperty label="Status">
            <Badge variant={task.status}>
              {snakeCaseToTitleCase(task.status)}
            </Badge>
          </OverviewProperty>
        </div>
      </div>
    </div>
  );
};

export default TaskOverview;
