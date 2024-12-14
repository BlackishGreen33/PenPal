import { useMutation, useQueryClient } from '@tanstack/react-query';
import { InferRequestType, InferResponseType } from 'hono';
import { toast } from 'sonner';

import client from '@/common/libs/rpc';

type ResponseType = InferResponseType<
  (typeof client.api.scores)['$patch'],
  200
>;
type RequestType = InferRequestType<(typeof client.api.scores)['$patch']>;

const useUpdateScore = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ form }) => {
      const response = await client.api.scores['$patch']({
        form,
      });

      if (!response.ok) {
        throw new Error('Failed to update score');
      }

      return await response.json();
    },
    onSuccess: ({ data }) => {
      toast.success('积分已更新');

      queryClient.invalidateQueries({ queryKey: ['scores'] });
      queryClient.invalidateQueries({ queryKey: ['score', data?.$id] });
    },
    onError: () => {
      toast.error('积分更新失败');
    },
  });

  return mutation;
};

export default useUpdateScore;
