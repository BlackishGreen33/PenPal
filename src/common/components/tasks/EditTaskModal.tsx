'use client';

import { ResponsiveModal } from '@/common/components/elements';
import { useEditTaskModal } from '@/common/hooks';

import EditTaskFormWrapper from './EditTaskFormWrapper';

const EditTaskModal: React.FC = () => {
  const { taskId, close } = useEditTaskModal();

  return (
    <ResponsiveModal open={!!taskId} onOpenChange={close}>
      {taskId && <EditTaskFormWrapper id={taskId} onCancel={close} />}
    </ResponsiveModal>
  );
};

export default EditTaskModal;
