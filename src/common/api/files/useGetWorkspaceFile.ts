import { useQuery } from '@tanstack/react-query';

import client from '@/common/libs/rpc';

interface UseGetWorkspaceFileProps {
  fileId: string;
}

const useGetWorkspaceFile = ({ fileId }: UseGetWorkspaceFileProps) => {
  const query = useQuery({
    queryKey: ['file', fileId],
    queryFn: async () => {
      const response = await client.api.files[':fileId'].$get({
        param: { fileId },
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

export default useGetWorkspaceFile;
