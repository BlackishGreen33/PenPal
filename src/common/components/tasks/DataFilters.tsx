import { FolderIcon, ListChecksIcon, UserIcon } from 'lucide-react';

import { useGetMembers } from '@/common/api/members';
import { useGetProjects } from '@/common/api/projects';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from '@/common/components/ui/select';
import { useTaskFilters, useWorkspaceId } from '@/common/hooks';
import { TaskStatus } from '@/common/types/tasks';

import { DatePicker } from '../elements';

interface DataFiltersProps {
  hideProjectFilter?: boolean;
}

const DataFilters: React.FC<DataFiltersProps> = ({ hideProjectFilter }) => {
  const workspaceId = useWorkspaceId();

  const { data: projects, isLoading: isLoadingProjects } = useGetProjects({
    workspaceId,
  });
  const { data: members, isLoading: isLoadingMembers } = useGetMembers({
    workspaceId,
  });

  const isLoading = isLoadingProjects || isLoadingMembers;

  const projectOptions = projects?.documents.map((project) => ({
    value: project.$id,
    label: project.name,
  }));

  const memberOptions = members?.documents.map((member) => ({
    value: member.$id,
    label: member.name,
  }));

  const [{ status, assigneeId, projectId, dueDate }, setFilters] =
    useTaskFilters();

  const onStatusChange = (value: string) => {
    setFilters({ status: value === 'all' ? null : (value as TaskStatus) });
  };

  const onAssigneeChange = (value: string) => {
    setFilters({ assigneeId: value === 'all' ? null : (value as string) });
  };

  const onProjectChange = (value: string) => {
    setFilters({ projectId: value === 'all' ? null : (value as string) });
  };

  if (isLoading) return null;

  return (
    <div className="flex flex-col gap-2 lg:flex-row">
      <Select
        defaultValue={status ?? undefined}
        onValueChange={(value) => onStatusChange(value)}
      >
        <SelectTrigger className="h-8 w-full lg:w-auto">
          <div className="flex items-center pr-2">
            <ListChecksIcon className="mr-2 size-4" />
            <SelectValue placeholder="所有状态" />
          </div>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">所有状态</SelectItem>
          <SelectSeparator />
          <SelectItem value={TaskStatus.BACKLOG}>滞留</SelectItem>
          <SelectItem value={TaskStatus.IN_PROGRESS}>进行中</SelectItem>
          <SelectItem value={TaskStatus.IN_REVIEW}>审核中</SelectItem>
          <SelectItem value={TaskStatus.TODO}>待办</SelectItem>
          <SelectItem value={TaskStatus.DONE}>已完成</SelectItem>
        </SelectContent>
      </Select>
      <Select
        defaultValue={assigneeId ?? undefined}
        onValueChange={(value) => onAssigneeChange(value)}
      >
        <SelectTrigger className="h-8 w-full lg:w-auto">
          <div className="flex items-center pr-2">
            <UserIcon className="mr-2 size-4" />
            <SelectValue placeholder="所有负责人" />
          </div>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">所有负责人</SelectItem>
          <SelectSeparator />
          {memberOptions?.map((member) => (
            <SelectItem key={member.value} value={member.value}>
              {member.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {!hideProjectFilter && (
        <Select
          defaultValue={projectId ?? undefined}
          onValueChange={(value) => onProjectChange(value)}
        >
          <SelectTrigger className="h-8 w-full lg:w-auto">
            <div className="flex items-center pr-2">
              <FolderIcon className="mr-2 size-4" />
              <SelectValue placeholder="所有项目" />
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">所有项目</SelectItem>
            <SelectSeparator />
            {projectOptions?.map((project) => (
              <SelectItem key={project.value} value={project.value}>
                {project.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
      <DatePicker
        placeholder="截止日期"
        className="h-8 w-full lg:w-auto"
        value={dueDate ? new Date(dueDate) : undefined}
        onChange={(date) => {
          setFilters({ dueDate: date ? date.toISOString() : null });
        }}
      />
    </div>
  );
};

export default DataFilters;
