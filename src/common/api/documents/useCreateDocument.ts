import { useMutation, useQueryClient } from '@tanstack/react-query';
import { InferRequestType, InferResponseType } from 'hono';
import { toast } from 'sonner';

import client from '@/common/libs/rpc';

type ResponseType = InferResponseType<
  (typeof client.api.documents)['$post'],
  200
>;
type RequestType = InferRequestType<(typeof client.api.documents)['$post']>;

const useCreateDocument = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ form }) => {
      const response = await client.api.documents['$post']({ form });

      if (!response.ok) {
        throw new Error('Failed to create document');
      }

      return await response.json();
    },
    onSuccess: () => {
      toast.success('已创建文档');
      queryClient.invalidateQueries({ queryKey: ['documents'] });
    },
    onError: () => {
      toast.error('创建文档失败');
    },
  });

  return mutation;
};

export default useCreateDocument;
