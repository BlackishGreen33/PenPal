import { useParams } from 'next/navigation';

const useInviteCode = () => {
  const params = useParams();

  return params.inviteCode as string;
};

export default useInviteCode;
