import { NextPage } from 'next';

import Header from '@/common/components/elements/Header';

const page: NextPage = () => {
  return (
    <div>
      <Header className="sticky left-0 top-0 w-full">
        <p>123</p>
      </Header>
    </div>
  );
};

export default page;
