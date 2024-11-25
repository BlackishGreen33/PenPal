import { useMutation, useQueryClient } from '@tanstack/react-query';
import { InferRequestType, InferResponseType } from 'hono';
import { toast } from 'sonner';

import client from '@/common/libs/rpc';

type ResponseType = InferResponseType<
  (typeof client.api.members)[':memberId']['$delete'],
  200
>;
type RequestType = InferRequestType<
  (typeof client.api.members)[':memberId']['$delete']
>;

const useDeleteMember = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ param }) => {
      const response = await client.api.members[':memberId']['$delete']({
        param,
      });

      if (!response.ok) {
        throw new Error('Failed to delete member');
      }

      return await response.json();
    },
    onSuccess: () => {
      toast.success('已成功删除成员');
      queryClient.invalidateQueries({ queryKey: ['members'] });
    },
    onError: () => {
      toast.error('删除成员失败');
    },
  });

  return mutation;
};

export default useDeleteMember;
