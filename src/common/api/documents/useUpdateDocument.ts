import { useMutation, useQueryClient } from '@tanstack/react-query';
import { InferRequestType, InferResponseType } from 'hono';
import { toast } from 'sonner';

import client from '@/common/libs/rpc';

type ResponseType = InferResponseType<
  (typeof client.api.documents)[':documentId']['$patch'],
  200
>;
type RequestType = InferRequestType<
  (typeof client.api.documents)[':documentId']['$patch']
>;

const useUpdateDocument = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ form, param }) => {
      const response = await client.api.documents[':documentId']['$patch']({
        form,
        param,
      });

      if (!response.ok) {
        throw new Error('Failed to update document');
      }

      return await response.json();
    },
    onSuccess: ({ data }) => {
      toast.success('文档已更新');

      queryClient.invalidateQueries({ queryKey: ['documents'] });
      queryClient.invalidateQueries({ queryKey: ['document', data.$id] });
    },
    onError: () => {
      toast.error('文档更新失败');
    },
  });

  return mutation;
};

export default useUpdateDocument;
