import { useQuery } from '@tanstack/react-query';

import client from '@/common/libs/rpc';

interface UseGetWorkspaceProps {
  workspaceId: string;
}

const useGetWorkspace = ({ workspaceId }: UseGetWorkspaceProps) => {
  const query = useQuery({
    queryKey: ['workspace', workspaceId],
    queryFn: async () => {
      const response = await client.api.workspaces[':workspaceId'].$get({
        param: { workspaceId },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch workspace');
      }

      const { data } = await response.json();

      return data;
    },
  });

  return query;
};

export default useGetWorkspace;
