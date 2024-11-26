'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { RiAddCircleFill } from 'react-icons/ri';

import { useGetProjects } from '@/common/api/projects';
import { useCreateProjectModal, useWorkspaceId } from '@/common/hooks';
import { cn } from '@/common/utils';

import ProjectAvatar from '../projects/ProjectAvatar';

const Projects: React.FC = () => {
  const pathname = usePathname();
  const { open } = useCreateProjectModal();
  const workspaceId = useWorkspaceId();
  const { data } = useGetProjects({
    workspaceId,
  });

  return (
    <div className="flex flex-col gap-y-2">
      <div className="flex items-center justify-between">
        <p className="text-xs uppercase text-neutral-500">項目</p>
        <RiAddCircleFill
          onClick={open}
          className="size-5 cursor-pointer text-neutral-500 transition hover:opacity-75"
        />
      </div>
      {data?.documents.map((project) => {
        const href = `/workspaces/${workspaceId}/projects/${project.$id}`;
        const isActive = pathname === href;

        return (
          <Link href={href} key={project.$id}>
            <div
              className={cn(
                'flex cursor-pointer items-center gap-2.5 rounded-md p-2.5 text-neutral-500 transition hover:opacity-75',
                isActive && 'bg-white text-primary shadow-sm hover:opacity-100'
              )}
            >
              <ProjectAvatar image={project.imageUrl} name={project.name} />
              <span className="truncate">{project.name}</span>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default Projects;
