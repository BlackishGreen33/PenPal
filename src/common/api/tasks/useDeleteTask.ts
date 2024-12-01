import { useMutation, useQueryClient } from '@tanstack/react-query';
import { InferRequestType, InferResponseType } from 'hono';
import { toast } from 'sonner';

import client from '@/common/libs/rpc';

type ResponseType = InferResponseType<
  (typeof client.api.tasks)[':taskId']['$delete'],
  200
>;
type RequestType = InferRequestType<
  (typeof client.api.tasks)[':taskId']['$delete']
>;

const useDeleteTask = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ param }) => {
      const response = await client.api.tasks[':taskId']['$delete']({ param });

      if (!response.ok) {
        throw new Error('Failed to delete task');
      }

      return await response.json();
    },
    onSuccess: ({ data }) => {
      toast.success('任务已删除');

      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      queryClient.invalidateQueries({ queryKey: ['task', data.$id] });
    },
    onError: () => {
      toast.error('删除任务失败');
    },
  });

  return mutation;
};

export default useDeleteTask;
