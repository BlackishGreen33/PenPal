import { useMutation, useQueryClient } from '@tanstack/react-query';
import { InferRequestType, InferResponseType } from 'hono';
import { toast } from 'sonner';

import client from '@/common/libs/rpc';

type ResponseType = InferResponseType<(typeof client.api.workspaces)['$post']>;
type RequestType = InferRequestType<(typeof client.api.workspaces)['$post']>;

const useCreateWorkspace = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ form }) => {
      const response = await client.api.workspaces['$post']({ form });

      if (!response.ok) {
        throw new Error('Failed to create workspace');
      }

      return await response.json();
    },
    onSuccess: () => {
      toast.success('成功创建工作空间');
      queryClient.invalidateQueries({ queryKey: ['workspaces'] });
    },
    onError: () => {
      toast.error('工作空间创建失败');
    },
  });

  return mutation;
};

export default useCreateWorkspace;
