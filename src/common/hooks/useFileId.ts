import { useParams } from 'next/navigation';

const useFileId = () => {
  const params = useParams();

  return params.fileId as string;
};

export default useFileId;
