'use client';

import { MenuIcon } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

import { Button } from '@/common/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/common/components/ui/sheet';

import Sidebar from './Sidebar';

const MobileSidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <Sheet modal={false} open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="secondary" className="lg:hidden">
          <MenuIcon className="size-4 text-neutral-500" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0">
        <Sidebar />
      </SheetContent>
    </Sheet>
  );
};

export default MobileSidebar;
