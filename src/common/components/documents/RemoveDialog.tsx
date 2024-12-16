'use client';

import { useDeleteDocument } from '@/common/api/documents';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/common/components/ui/alert-dialog';
import { useWorkspaceId } from '@/common/hooks';

interface RemoveDialogProps {
  documentId: string;
  children: React.ReactNode;
}

const RemoveDialog: React.FC<RemoveDialogProps> = ({
  documentId,
  children,
}) => {
  const workspaceId = useWorkspaceId();
  const { mutate, isPending } = useDeleteDocument();

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent onClick={(e) => e.stopPropagation()}>
        <AlertDialogHeader>
          <AlertDialogTitle>您确定吗？</AlertDialogTitle>
          <AlertDialogDescription>
            此操作无法撤销。这将永久删除您的文档。
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={(e) => e.stopPropagation()}>
            取消
          </AlertDialogCancel>
          <AlertDialogAction
            disabled={isPending}
            onClick={(e) => {
              e.stopPropagation();
              mutate(
                {
                  param: { documentId },
                },
                {
                  onSuccess: () => {
                    window.location.href = `/workspaces/${workspaceId}`;
                  },
                }
              );
            }}
          >
            删除
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default RemoveDialog;
