import { SignedIn, UserButton } from '@clerk/nextjs';
import { NextPage } from 'next';

import Header from '@/common/components/elements/Header';

const HomePage: NextPage = () => {
  return (
    <div>
      <Header className="sticky left-0 top-0">
        <div className="flex items-center gap-2 lg:gap-4">
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </Header>
    </div>
  );
};

export default HomePage;
