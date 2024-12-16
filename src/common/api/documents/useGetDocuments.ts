import { useQuery } from '@tanstack/react-query';

import client from '@/common/libs/rpc';

interface UseGetDocumentsProps {
  workspaceId: string;
  limit: string;
  cursor: string;
}

const useGetDocuments = ({
  workspaceId,
  limit,
  cursor,
}: UseGetDocumentsProps) => {
  const query = useQuery({
    queryKey: ['documents', workspaceId, limit, cursor],
    queryFn: async () => {
      const response = await client.api.documents.$get({
        query: { workspaceId, limit, cursor },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch documents');
      }

      const { data } = await response.json();

      return data;
    },
  });

  return query;
};

export default useGetDocuments;
