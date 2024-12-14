import { useMutation, useQueryClient } from '@tanstack/react-query';
import { InferRequestType, InferResponseType } from 'hono';
import { toast } from 'sonner';

import client from '@/common/libs/rpc';

type ResponseType = InferResponseType<(typeof client.api.scores)['$post'], 200>;
type RequestType = InferRequestType<(typeof client.api.scores)['$post']>;

const useCreateScore = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async () => {
      const response = await client.api.scores['$post']();

      if (!response.ok) {
        throw new Error('Failed to create score');
      }

      return await response.json();
    },
    onSuccess: () => {
      toast.success('已创建积分');
      queryClient.invalidateQueries({ queryKey: ['scores'] });
    },
    onError: () => {
      toast.error('创建积分失败');
    },
  });

  return mutation;
};

export default useCreateScore;
