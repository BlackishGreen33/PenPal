import { useMutation, useQueryClient } from '@tanstack/react-query';
import { InferRequestType, InferResponseType } from 'hono';
import { toast } from 'sonner';

import client from '@/common/libs/rpc';

type ResponseType = InferResponseType<
  (typeof client.api.documents)[':documentId']['$delete'],
  200
>;
type RequestType = InferRequestType<
  (typeof client.api.documents)[':documentId']['$delete']
>;

const useDeleteDocument = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ param }) => {
      const response = await client.api.documents[':documentId']['$delete']({
        param,
      });

      if (!response.ok) {
        throw new Error('Failed to delete document');
      }

      return await response.json();
    },
    onSuccess: ({ data }) => {
      toast.success('文档已删除');

      queryClient.invalidateQueries({ queryKey: ['documents'] });
      queryClient.invalidateQueries({ queryKey: ['document', data.$id] });
    },
    onError: () => {
      toast.error('文档删除失败');
    },
  });

  return mutation;
};

export default useDeleteDocument;
