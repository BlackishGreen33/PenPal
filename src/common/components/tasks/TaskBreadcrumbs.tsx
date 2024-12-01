import { ChevronRightIcon, TrashIcon } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { useDeleteTask } from '@/common/api/tasks';
import { useConfirm, useWorkspaceId } from '@/common/hooks';
import { Project } from '@/common/types/projects';
import { Task } from '@/common/types/tasks';

import ProjectAvatar from '../projects/ProjectAvatar';
import { Button } from '../ui/button';

interface TaskBreadcrumbsProps {
  project: Project;
  task: Task;
}

const TaskBreadcrumbs: React.FC<TaskBreadcrumbsProps> = ({ project, task }) => {
  const router = useRouter();
  const workspaceId = useWorkspaceId();

  const { mutate, isPending } = useDeleteTask();
  const [ConfirmDialog, confirm] = useConfirm(
    'Delete task',
    'This action cannot be undone.',
    'destructive'
  );

  const handleDeleteTask = async () => {
    const ok = await confirm();
    if (!ok) return;

    mutate(
      { param: { taskId: task.$id } },
      {
        onSuccess: () => {
          router.push(`/workspaces/${workspaceId}/tasks`);
        },
      }
    );
  };

  return (
    <div className="flex items-center gap-x-2">
      <ConfirmDialog />
      <ProjectAvatar
        name={project.name}
        image={project.imageUrl}
        className="size-6 lg:size-8"
      />
      <Link href={`/workspaces/${workspaceId}/projects/${project.$id}`}>
        <p className="text-sm font-semibold text-muted-foreground transition hover:opacity-75 lg:text-lg">
          {project.name}
        </p>
      </Link>
      <ChevronRightIcon className="size-4 text-muted-foreground lg:size-5" />
      <p className="text-sm font-semibold lg:text-lg">{task.name}</p>
      <Button
        onClick={handleDeleteTask}
        disabled={isPending}
        className="ml-auto"
        variant="destructive"
        size="sm"
      >
        <TrashIcon className="size-4 lg:mr-2" />
        <span className="hidden lg:block">删除任务</span>
      </Button>
    </div>
  );
};

export default TaskBreadcrumbs;
