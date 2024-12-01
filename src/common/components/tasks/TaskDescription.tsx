import { PencilIcon, XIcon } from 'lucide-react';
import { useState } from 'react';

import { useUpdateTask } from '@/common/api/tasks';
import { Task } from '@/common/types/tasks';

import { DottedSeparator } from '../elements';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';

interface TaskDescriptionProps {
  task: Task;
}

const TaskDescription: React.FC<TaskDescriptionProps> = ({ task }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(task.description);

  const { mutate, isPending } = useUpdateTask();

  const handleSave = () => {
    mutate(
      {
        json: { description: value },
        param: { taskId: task.$id },
      },
      {
        onSuccess: () => {
          setIsEditing(false);
        },
      }
    );
  };

  return (
    <div className="rounded-lg border p-4">
      <div className="flex items-center justify-between">
        <p className="text-lg font-semibold">描述</p>
        <Button
          onClick={() => setIsEditing((prev) => !prev)}
          size="sm"
          variant="secondary"
        >
          {isEditing ? (
            <XIcon className="mr-2 size-4" />
          ) : (
            <PencilIcon className="mr-2 size-4" />
          )}
          {isEditing ? 'Cancel' : 'Edit'}
        </Button>
      </div>
      <DottedSeparator className="my-4" />
      {isEditing ? (
        <div className="flex flex-col gap-y-4">
          <Textarea
            placeholder="添加描述..."
            value={value}
            rows={4}
            onChange={(e) => setValue(e.target.value)}
            disabled={isPending}
          />
          <Button
            size="sm"
            className="ml-auto w-fit"
            onClick={handleSave}
            disabled={isPending}
          >
            {isPending ? '保存中...' : '保存变更'}
          </Button>
        </div>
      ) : (
        <div>
          {task.description || (
            <span className="text-muted-foreground">尚未设置描述</span>
          )}
        </div>
      )}
    </div>
  );
};

export default TaskDescription;
