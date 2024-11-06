'use client';

import Image from 'next/image';
import { useState } from 'react';

import { Button } from '@/common/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/common/components/ui/dialog';
import { deleteDocument } from '@/common/libs/actions/room.actions';

interface DeleteModalProps {
  roomId: string;
}

const DeleteModal: React.FC<DeleteModalProps> = ({ roomId }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const deleteDocumentHandler = async () => {
    setLoading(true);

    try {
      await deleteDocument(roomId);
      setOpen(false);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('Error notif:', error);
    }

    setLoading(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="editor"
          className="min-w-9 rounded-xl bg-transparent p-2 transition-all"
        >
          <Image
            src="/assets/icons/delete.svg"
            alt="delete"
            width={20}
            height={20}
            className="mt-1"
          />
        </Button>
      </DialogTrigger>
      <DialogContent className="shad-dialog">
        <DialogHeader>
          <Image
            src="/assets/icons/delete-modal.svg"
            alt="delete"
            width={48}
            height={48}
            className="mb-4"
          />
          <DialogTitle>Delete document</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this document? This action cannot be
            undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-5">
          <DialogClose asChild className="w-full bg-dark-400 text-white">
            Cancel
          </DialogClose>
          <Button
            variant="editorDestructive"
            onClick={deleteDocumentHandler}
            className="gradient-red w-full"
          >
            {loading ? 'Deleting...' : 'Delete'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteModal;
