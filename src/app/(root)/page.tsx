import { NextPage } from 'next';

import { Editor } from '@/common/components/editor/Editor';

const HomePage: NextPage = () => {
  return (
    <div>
      <Editor roomId="" currentUserType="creator" />
    </div>
  );
};

export default HomePage;
