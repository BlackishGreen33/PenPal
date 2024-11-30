import { Loader } from 'lucide-react';

import { useGetMembers } from '@/common/api/members';
import { useGetProjects } from '@/common/api/projects';
import { Card, CardContent } from '@/common/components/ui/card';
import { useWorkspaceId } from '@/common/hooks';

import CreateTaskForm from './CreateTaskForm';

interface CreateTaskFormWrapperProps {
  onCancel: () => void;
}

const CreateTaskFormWrapper: React.FC<CreateTaskFormWrapperProps> = ({
  onCancel,
}) => {
  const workspaceId = useWorkspaceId();

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

  const isLoading = isLoadingProjects || isLoadingMembers;

  if (isLoading) {
    return (
      <Card className="h-[714px] w-full border-none shadow-none">
        <CardContent className="flex h-full items-center justify-center">
          <Loader className="size-5 animate-spin text-muted-foreground" />
        </CardContent>
      </Card>
    );
  }

  return (
    <CreateTaskForm
      onCancel={onCancel}
      projectOptions={projectOptions ?? []}
      memberOptions={memberOptions ?? []}
    />
  );
};

export default CreateTaskFormWrapper;
