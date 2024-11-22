'use client';

import { ResponsiveModal } from '@/common/components/elements';
import { useCreateWorkspaceModal } from '@/common/hooks';

import CreateWorkspaceForm from './CreateWorkspacesForm';

export const CreateWorkspaceModal = () => {
  const { isOpen, setIsOpen, close } = useCreateWorkspaceModal();

  return (
    <ResponsiveModal open={isOpen} onOpenChange={setIsOpen}>
      <CreateWorkspaceForm onCancel={close} />
    </ResponsiveModal>
  );
};
