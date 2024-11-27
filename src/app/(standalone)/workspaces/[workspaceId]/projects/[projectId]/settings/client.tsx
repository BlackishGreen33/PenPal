'use client';

import { useGetProject } from '@/common/api/projects';
import { PageError, PageLoader } from '@/common/components/elements';
import EditProjectForm from '@/common/components/projects/EditProjectForm';
import { useProjectId } from '@/common/hooks';

const ProjectIdSettingsClient: React.FC = () => {
  const projectId = useProjectId();
  const { data: initialValues, isLoading } = useGetProject({ projectId });

  if (isLoading) {
    return <PageLoader />;
  }

  if (!initialValues) {
    return <PageError message="未找到项目" />;
  }

  return (
    <div className="w-full lg:max-w-xl">
      <EditProjectForm initialValues={initialValues} />
    </div>
  );
};

export default ProjectIdSettingsClient;
