import { SignedIn, UserButton } from '@clerk/nextjs';

import ElementHeader from '@/common/components/docs/Header';
import Notifications from '@/common/components/docs/Notifications';

const Header: React.FC = () => (
  <ElementHeader className="sticky left-0 top-0">
    <div className="flex items-center gap-2 lg:gap-4">
      <Notifications />
      <SignedIn>
        <UserButton />
      </SignedIn>
    </div>
  </ElementHeader>
);

export default Header;
