import { useMutation, useQueryClient } from '@tanstack/react-query';
import { InferRequestType, InferResponseType } from 'hono';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import client from '@/common/libs/rpc';

type ResponseType = InferResponseType<
  (typeof client.api.auth.register)['$post']
>;
type RequestType = InferRequestType<(typeof client.api.auth.register)['$post']>;

const useRegister = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json }) => {
      const response = await client.api.auth.register['$post']({ json });

      if (!response.ok) {
        throw new Error('Failed to register');
      }

      return await response.json();
    },
    onSuccess: () => {
      toast.success('注册成功');
      router.refresh();
      queryClient.invalidateQueries({ queryKey: ['current'] });
    },
    onError: () => {
      toast.error('注册失败');
    },
  });

  return mutation;
};

export default useRegister;
