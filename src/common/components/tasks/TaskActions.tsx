import { ExternalLinkIcon, PencilIcon, TrashIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/common/components/ui/dropdown-menu';
import { useConfirm, useWorkspaceId } from '@/common/hooks';

interface TaskActionsProps {
  id: string;
  projectId: string;
  children: React.ReactNode;
}

const TaskActions: React.FC<TaskActionsProps> = ({
  id,
  projectId,
  children,
}) => {
  const workspaceId = useWorkspaceId();
  const router = useRouter();

  // const { open } = useEditTaskModal();

  const [ConfirmDialog, confirm] = useConfirm(
    'Delete task',
    'This action cannot be undone.',
    'destructive'
  );
  // const { mutate, isPending } = useDeleteTask();

  const onDelete = async () => {
    const ok = await confirm();
    if (!ok) return;

    // mutate({ param: { taskId: id } });
  };

  const onOpenTask = () => {
    router.push(`/workspaces/${workspaceId}/tasks/${id}`);
  };

  const onOpenProject = () => {
    router.push(`/workspaces/${workspaceId}/projects/${projectId}`);
  };

  return (
    <div className="flex justify-end">
      <ConfirmDialog />
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem
            onClick={onOpenTask}
            className="p-[10px] font-medium"
          >
            <ExternalLinkIcon className="mr-2 size-4 stroke-2" />
            任务详情
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={onOpenProject}
            className="p-[10px] font-medium"
          >
            <ExternalLinkIcon className="mr-2 size-4 stroke-2" />
            开启项目
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => open(id)}
            className="p-[10px] font-medium"
          >
            <PencilIcon className="mr-2 size-4 stroke-2" />
            编辑任务
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={onDelete}
            // disabled={isPending}
            className="p-[10px] font-medium text-amber-700 focus:text-amber-700"
          >
            <TrashIcon className="mr-2 size-4 stroke-2" />
            删除任务
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default TaskActions;
