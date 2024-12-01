import { useParams } from 'next/navigation';

const useTaskId = () => {
  const params = useParams();

  return params.taskId as string;
};

export default useTaskId;
