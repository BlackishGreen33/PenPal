import { useQuery } from '@tanstack/react-query';

import client from '@/common/libs/rpc';

interface UseGetProjectProps {
  projectId: string;
}

const useGetProject = ({ projectId }: UseGetProjectProps) => {
  const query = useQuery({
    queryKey: ['project', projectId],
    queryFn: async () => {
      const response = await client.api.projects[':projectId'].$get({
        param: { projectId },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch project');
      }

      const { data } = await response.json();

      return data;
    },
  });

  return query;
};

export default useGetProject;
