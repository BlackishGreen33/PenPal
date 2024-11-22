'use client';

import { useGetWorkspace } from '@/common/api/workspaces';
import { PageError, PageLoader } from '@/common/components/elements';
import EditWorkspaceForm from '@/common/components/workspaces/EditWorkspaceForm';
import { useWorkspaceId } from '@/common/hooks';

const WorkspaceIdSettingsClient = () => {
  const workspaceId = useWorkspaceId();
  const { data: initialValues, isLoading } = useGetWorkspace({ workspaceId });

  if (isLoading) {
    return <PageLoader />;
  }

  if (!initialValues) {
    return <PageError message="未找到项目" />;
  }

  return (
    <div className="w-full lg:max-w-xl">
      <EditWorkspaceForm initialValues={initialValues} />
    </div>
  );
};

export default WorkspaceIdSettingsClient;
