import { useParams } from 'next/navigation';

const useWorkspaceId = () => {
  const params = useParams();

  return params.workspaceId as string;
};

export default useWorkspaceId;
