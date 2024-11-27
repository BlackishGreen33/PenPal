'use client';

import { ResponsiveModal } from '@/common/components/elements';
import { useCreateProjectModal } from '@/common/hooks';

import CreateProjectForm from './CreateProjectForm';

const CreateProjectModal: React.FC = () => {
  const { isOpen, setIsOpen, close } = useCreateProjectModal();

  return (
    <ResponsiveModal open={isOpen} onOpenChange={setIsOpen}>
      <CreateProjectForm onCancel={close} />
    </ResponsiveModal>
  );
};

export default CreateProjectModal;
