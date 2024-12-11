import { useQuery } from '@tanstack/react-query';

import client from '@/common/libs/rpc';

interface UseGetWorkspaceFilesProps {
  workspaceId: string;
}

const useGetWorkspaceFiles = ({ workspaceId }: UseGetWorkspaceFilesProps) => {
  const query = useQuery({
    queryKey: ['files', workspaceId],
    queryFn: async () => {
      const response = await client.api.files.$get({
        query: { workspaceId },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch files');
      }

      const { data } = await response.json();

      return data;
    },
  });

  return query;
};

export default useGetWorkspaceFiles;
