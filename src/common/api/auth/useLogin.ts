import { useMutation, useQueryClient } from '@tanstack/react-query';
import { InferRequestType, InferResponseType } from 'hono';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import client from '@/common/libs/rpc';

type ResponseType = InferResponseType<(typeof client.api.auth.login)['$post']>;
type RequestType = InferRequestType<(typeof client.api.auth.login)['$post']>;

const useLogin = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json }) => {
      const response = await client.api.auth.login['$post']({ json });

      if (!response.ok) {
        throw new Error('Failed to login');
      }

      return await response.json();
    },
    onSuccess: () => {
      toast.success('登录成功');
      router.refresh();
      queryClient.invalidateQueries({ queryKey: ['current'] });
    },
    onError: () => {
      toast.error('登录失败');
    },
  });

  return mutation;
};

export default useLogin;
