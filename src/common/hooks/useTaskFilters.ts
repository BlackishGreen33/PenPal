import { parseAsString, parseAsStringEnum, useQueryStates } from 'nuqs';

import { TaskStatus } from '../types/tasks';

const useTaskFilters = () =>
  useQueryStates({
    projectId: parseAsString,
    status: parseAsStringEnum(Object.values(TaskStatus)),
    assigneeId: parseAsString,
    search: parseAsString,
    dueDate: parseAsString,
  });

export default useTaskFilters;
