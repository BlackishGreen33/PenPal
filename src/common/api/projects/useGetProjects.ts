import { useQuery } from '@tanstack/react-query';

import client from '@/common/libs/rpc';

interface UseGetProjectsProps {
  workspaceId: string;
}

const useGetProjects = ({ workspaceId }: UseGetProjectsProps) => {
  const query = useQuery({
    queryKey: ['projects', workspaceId],
    queryFn: async () => {
      const response = await client.api.projects.$get({
        query: { workspaceId },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch projects');
      }

      const { data } = await response.json();

      console.log({ data });

      return data;
    },
  });

  return query;
};

export default useGetProjects;
