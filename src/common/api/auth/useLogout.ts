import { useMutation, useQueryClient } from '@tanstack/react-query';
import { InferResponseType } from 'hono';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import client from '@/common/libs/rpc';

type ResponseType = InferResponseType<(typeof client.api.auth.logout)['$post']>;

const useLogout = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error>({
    mutationFn: async () => {
      const response = await client.api.auth.logout['$post']();

      if (!response.ok) {
        throw new Error('Failed to logout');
      }

      return await response.json();
    },
    onSuccess: () => {
      toast.success('登出成功');
      router.refresh();
      queryClient.invalidateQueries({ queryKey: ['current'] });
      queryClient.invalidateQueries({ queryKey: ['workspaces'] });
    },
    onError: () => {
      toast.error('登出失败');
    },
  });

  return mutation;
};

export default useLogout;
