'use client';

import { useState } from 'react';

import { useUpdateDocument } from '@/common/api/documents';
import { Button } from '@/common/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/common/components/ui/dialog';
import { Input } from '@/common/components/ui/input';
import { useWorkspaceId } from '@/common/hooks';

interface RenameDialogProps {
  documentId: string;
  initialTitle: string;
  children: React.ReactNode;
}

const RenameDialog: React.FC<RenameDialogProps> = ({
  documentId,
  initialTitle,
  children,
}) => {
  const { mutate, isPending } = useUpdateDocument();
  const workspaceId = useWorkspaceId();
  const [title, setTitle] = useState(initialTitle);
  const [open, setOpen] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    mutate(
      {
        param: { documentId },
        form: {
          title,
          workspaceId,
        },
      },
      {
        onSuccess: () => {
          setOpen(false);
        },
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent onClick={(e) => e.stopPropagation()}>
        <form onSubmit={onSubmit}>
          <DialogHeader>
            <DialogTitle>重新命名文档</DialogTitle>
            <DialogDescription>输入新的文档名称</DialogDescription>
          </DialogHeader>
          <div className="my-4">
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="文档名称"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="ghost"
              disabled={isPending}
              onClick={(e) => {
                e.stopPropagation();
                setOpen(false);
              }}
            >
              取消
            </Button>
            <Button
              type="submit"
              disabled={isPending}
              onClick={(e) => e.stopPropagation()}
            >
              保存
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default RenameDialog;
