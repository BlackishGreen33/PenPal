import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';

import client from '@/common/libs/rpc';

interface UseGetFileMessagesProps {
  fileId: string;
  limit: string;
}

const useGetFileMessages = ({ fileId, limit }: UseGetFileMessagesProps) => {
  const queryClient = useQueryClient();
  const query = useInfiniteQuery({
    queryKey: ['messages', fileId, limit],
    initialPageParam: '1',
    queryFn: async () => {
      const response = await client.api.messages.$get({
        query: { fileId, limit },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch messages');
      }

      const { data } = await response.json();

      return data;
    },
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    placeholderData: (oldData) => oldData,
  });

  const cancelQuery = () => {
    query.refetch({ cancelRefetch: false });
  };

  const invalidateQuery = () => {
    queryClient.invalidateQueries({ queryKey: ['messages', fileId, limit] });
  };

  return {
    ...query,
    cancel: cancelQuery,
    invalidate: invalidateQuery,
  };
};

export default useGetFileMessages;
