import { useMutation, useQueryClient } from '@tanstack/react-query';
import { InferRequestType, InferResponseType } from 'hono';
import { toast } from 'sonner';

import client from '@/common/libs/rpc';

type ResponseType = InferResponseType<
  (typeof client.api.members)[':memberId']['$patch'],
  200
>;
type RequestType = InferRequestType<
  (typeof client.api.members)[':memberId']['$patch']
>;

const useUpdateMember = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ param, json }) => {
      const response = await client.api.members[':memberId']['$patch']({
        param,
        json,
      });

      if (!response.ok) {
        throw new Error('Failed to update member');
      }

      return await response.json();
    },
    onSuccess: () => {
      toast.success('成员已更新');
      queryClient.invalidateQueries({ queryKey: ['members'] });
    },
    onError: () => {
      toast.error('更新成员失败');
    },
  });

  return mutation;
};

export default useUpdateMember;
