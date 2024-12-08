import { useQuery } from '@tanstack/react-query';

import client from '@/common/libs/rpc';

interface UseGetWorkspaceFileWithKeyProps {
  key: string;
}

const useGetWorkspaceFileWithKey = ({
  key,
}: UseGetWorkspaceFileWithKeyProps) => {
  const query = useQuery({
    queryKey: ['file', key],
    queryFn: async () => {
      const response = await client.api.files[':key'].$get({
        param: { key },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch file');
      }

      const { data } = await response.json();

      return data;
    },
  });

  return query;
};

export default useGetWorkspaceFileWithKey;
