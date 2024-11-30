'use client';

import { ResponsiveModal } from '@/common/components/elements';
import { useCreateTaskModal } from '@/common/hooks';

import CreateTaskFormWrapper from './CreateTaskFormWrapper';

const CreateTaskModal: React.FC = () => {
  const { isOpen, setIsOpen, close } = useCreateTaskModal();

  return (
    <ResponsiveModal open={isOpen} onOpenChange={setIsOpen}>
      <CreateTaskFormWrapper onCancel={close} />
    </ResponsiveModal>
  );
};

export default CreateTaskModal;
