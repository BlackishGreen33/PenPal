'use client';

import { useGetWorkspaceInfo } from '@/common/api/workspaces';
import { PageError, PageLoader } from '@/common/components/elements';
import JoinWorkspaceForm from '@/common/components/workspaces/JoinWorkspaceForm';
import { useWorkspaceId } from '@/common/hooks';

const WorkspaceIdJoinClient = () => {
  const workspaceId = useWorkspaceId();
  const { data: initialValues, isLoading } = useGetWorkspaceInfo({
    workspaceId,
  });

  if (isLoading) {
    return <PageLoader />;
  }

  if (!initialValues) {
    return <PageError message="尚未找到项目" />;
  }

  return (
    <div className="w-full lg:max-w-xl">
      <JoinWorkspaceForm initialValues={initialValues} />
    </div>
  );
};

export default WorkspaceIdJoinClient;
