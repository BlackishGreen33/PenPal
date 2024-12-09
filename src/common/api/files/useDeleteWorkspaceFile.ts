import { useMutation, useQueryClient } from '@tanstack/react-query';
import { InferRequestType, InferResponseType } from 'hono';
import { Dispatch, SetStateAction } from 'react';
import { toast } from 'sonner';

import client from '@/common/libs/rpc';

type ResponseType = InferResponseType<
  (typeof client.api.files)[':fileId']['$delete'],
  200
>;
type RequestType = InferRequestType<
  (typeof client.api.files)[':fileId']['$delete']
>;

const useDeleteWorkspaceFile = ({
  setCurrentlyDeletingFile,
}: {
  setCurrentlyDeletingFile: Dispatch<SetStateAction<string | null>>;
}) => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ param }) => {
      const response = await client.api.files[':fileId']['$delete']({
        param,
      });

      if (!response.ok) {
        throw new Error('Failed to delete file');
      }

      return await response.json();
    },
    onSuccess: ({ data }) => {
      toast.success('文档已删除');

      queryClient.invalidateQueries({ queryKey: ['files'] });
      queryClient.invalidateQueries({ queryKey: ['file', data.$id] });
    },
    onMutate({ param }) {
      setCurrentlyDeletingFile(param.fileId);
    },
    onError: () => {
      toast.error('文档删除失败');
    },
  });

  return mutation;
};

export default useDeleteWorkspaceFile;
