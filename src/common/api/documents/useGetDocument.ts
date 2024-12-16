import { useQuery } from '@tanstack/react-query';

import client from '@/common/libs/rpc';

interface UseGetDocumentProps {
  documentId: string;
}

const useGetDocument = ({ documentId }: UseGetDocumentProps) => {
  const query = useQuery({
    queryKey: ['document', documentId],
    queryFn: async () => {
      const response = await client.api.documents[':documentId'].$get({
        param: { documentId },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch document');
      }

      const { data } = await response.json();

      return data;
    },
  });

  return query;
};

export default useGetDocument;
