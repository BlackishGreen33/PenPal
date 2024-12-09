import { useQuery } from '@tanstack/react-query';

import client from '@/common/libs/rpc';

interface UseGetUploadStatusProps {
  fileId: string;
}

const useGetUploadStatus = ({ fileId }: UseGetUploadStatusProps) => {
  const query = useQuery({
    queryKey: ['uploadStatus', fileId],
    queryFn: async () => {
      const response = await client.api.files.uploadStatus[':fileId'].$get({
        param: { fileId },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch file');
      }

      const { data } = await response.json();

      return data;
    },
    refetchInterval: (data) =>
      data.state.status === 'success' || data.state.status === 'error'
        ? false
        : 500,
  });

  return query;
};

export default useGetUploadStatus;
