'use client';

import { Loader, PlusIcon } from 'lucide-react';
import { useQueryState } from 'nuqs';
import { useCallback } from 'react';

import { useBulkUpdateTasks, useGetTasks } from '@/common/api/tasks';
import { DottedSeparator } from '@/common/components/elements';
import { Button } from '@/common/components/ui/button';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/common/components/ui/tabs';
import {
  useCreateTaskModal,
  useProjectId,
  useTaskFilters,
  useWorkspaceId,
} from '@/common/hooks';
import { TaskStatus } from '@/common/types/tasks';

import Columns from './Columns';
import DataFilters from './DataFilters';
import DataKanban from './DataKanban';
import DataTable from './DataTable';

// import { DataCalendar } from './data-calendar';

interface TaskViewSwitcherProps {
  hideProjectFilter?: boolean;
}

const TaskViewSwitcher: React.FC<TaskViewSwitcherProps> = ({
  hideProjectFilter,
}) => {
  const [{ status, assigneeId, projectId, dueDate }] = useTaskFilters();
  const [view, setView] = useQueryState('task-view', {
    defaultValue: 'table',
  });

  const workspaceId = useWorkspaceId();
  const paramProjectId = useProjectId();
  const { open } = useCreateTaskModal();

  const { mutate: bulkUpdate } = useBulkUpdateTasks();

  const { data: tasks, isLoading: isLoadingTasks } = useGetTasks({
    workspaceId,
    projectId: paramProjectId || projectId,
    assigneeId,
    status,
    dueDate,
  });

  const onKanbanChange = useCallback(
    (tasks: { $id: string; status: TaskStatus; position: number }[]) => {
      bulkUpdate({
        json: { tasks },
      });
    },
    [bulkUpdate]
  );

  return (
    <Tabs
      defaultValue={view}
      onValueChange={setView}
      className="w-full flex-1 rounded-lg border"
    >
      <div className="flex h-full flex-col overflow-auto p-4">
        <div className="flex flex-col items-center justify-between gap-y-2 lg:flex-row">
          <TabsList className="w-full lg:w-auto">
            <TabsTrigger className="h-8 w-full lg:w-auto" value="table">
              表格
            </TabsTrigger>
            <TabsTrigger className="h-8 w-full lg:w-auto" value="kanban">
              看板
            </TabsTrigger>
            <TabsTrigger className="h-8 w-full lg:w-auto" value="calendar">
              日历
            </TabsTrigger>
          </TabsList>
          <Button onClick={open} size="sm" className="w-full lg:w-auto">
            <PlusIcon className="mr-2 size-4" />
            新增
          </Button>
        </div>
        <DottedSeparator className="my-4" />
        <DataFilters hideProjectFilter={hideProjectFilter} />
        <DottedSeparator className="my-4" />
        {isLoadingTasks ? (
          <div className="flex h-[200px] w-full flex-col items-center justify-center rounded-lg border">
            <Loader className="size-5 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <>
            <TabsContent value="table" className="mt-0">
              <DataTable columns={Columns} data={tasks?.documents ?? []} />
            </TabsContent>
            <TabsContent value="kanban" className="mt-0">
              <DataKanban
                onChange={onKanbanChange}
                data={tasks?.documents ?? []}
              />
            </TabsContent>
            <TabsContent value="calendar" className="mt-0 h-full pb-4">
              {/* <DataCalendar data={tasks?.documents ?? []} /> */}
            </TabsContent>
          </>
        )}
      </div>
    </Tabs>
  );
};

export default TaskViewSwitcher;
