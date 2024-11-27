import { useParams } from 'next/navigation';

const useProjectId = () => {
  const params = useParams();

  return params.projectId as string;
};

export default useProjectId;
