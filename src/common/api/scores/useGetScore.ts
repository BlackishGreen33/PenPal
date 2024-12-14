import { useQuery } from '@tanstack/react-query';

import client from '@/common/libs/rpc';

const useGetScore = () => {
  const query = useQuery({
    queryKey: ['score'],
    queryFn: async () => {
      const response = await client.api.scores.$get();

      if (!response.ok) {
        return null;
      }

      const { data } = await response.json();

      return data;
    },
  });

  return query;
};

export default useGetScore;
