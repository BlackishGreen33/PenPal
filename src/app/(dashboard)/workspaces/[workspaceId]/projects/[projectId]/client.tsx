'use client';

import { PencilIcon } from 'lucide-react';
import Link from 'next/link';

import { useGetProject, useGetProjectAnalytics } from '@/common/api/projects';
import { Analytics, PageError, PageLoader } from '@/common/components/elements';
import ProjectAvatar from '@/common/components/projects/ProjectAvatar';
import { Button } from '@/common/components/ui/button';
import { useProjectId } from '@/common/hooks';

const ProjectIdClient: React.FC = () => {
  const projectId = useProjectId();
  const { data: project, isLoading: isLoadingProject } = useGetProject({
    projectId,
  });
  const { data: analytics, isLoading: isLoadingAnalytics } =
    useGetProjectAnalytics({ projectId });

  const isLoading = isLoadingProject || isLoadingAnalytics;

  if (isLoading) {
    return <PageLoader />;
  }

  if (!project) {
    return <PageError message="未找到项目" />;
  }

  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-x-2">
          <ProjectAvatar
            name={project.name}
            image={project.imageUrl}
            className="size-8"
          />
          <p className="text-lg font-semibold">{project.name}</p>
        </div>
        <div>
          <Button variant="secondary" size="sm" asChild>
            <Link
              href={`/workspaces/${project.workspaceId}/projects/${project.$id}/settings`}
            >
              <PencilIcon className="mr-2 size-4" />
              编辑项目
            </Link>
          </Button>
        </div>
      </div>
      {analytics ? <Analytics data={analytics} /> : null}
      {/* <TaskViewSwitcher hideProjectFilter /> */}
    </div>
  );
};

export default ProjectIdClient;
