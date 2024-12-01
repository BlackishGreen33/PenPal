import { Loader } from 'lucide-react';

import { useGetMembers } from '@/common/api/members';
import { useGetProjects } from '@/common/api/projects';
import { useGetTask } from '@/common/api/tasks';
import { Card, CardContent } from '@/common/components/ui/card';
import { useWorkspaceId } from '@/common/hooks';

import EditTaskForm from './EditTaskForm';

interface EditTaskFormWrapperProps {
  onCancel: () => void;
  id: string;
}

const EditTaskFormWrapper: React.FC<EditTaskFormWrapperProps> = ({
  onCancel,
  id,
}) => {
  const workspaceId = useWorkspaceId();

  const { data: initialValues, isLoading: isLoadingTask } = useGetTask({
    taskId: id,
  });

  const { data: projects, isLoading: isLoadingProjects } = useGetProjects({
    workspaceId,
  });
  const { data: members, isLoading: isLoadingMembers } = useGetMembers({
    workspaceId,
  });

  const projectOptions = projects?.documents.map((project) => ({
    id: project.$id,
    name: project.name,
    imageUrl: project.imageUrl,
  }));

  const memberOptions = members?.documents.map((project) => ({
    id: project.$id,
    name: project.name,
  }));

  const isLoading = isLoadingProjects || isLoadingMembers || isLoadingTask;

  if (isLoading) {
    return (
      <Card className="h-[714px] w-full border-none shadow-none">
        <CardContent className="flex h-full items-center justify-center">
          <Loader className="size-5 animate-spin text-muted-foreground" />
        </CardContent>
      </Card>
    );
  }

  if (!initialValues) {
    return null;
  }

  return (
    <EditTaskForm
      onCancel={onCancel}
      initialValues={initialValues}
      projectOptions={projectOptions ?? []}
      memberOptions={memberOptions ?? []}
    />
  );
};

export default EditTaskFormWrapper;
