'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FC, memo } from 'react';

import { createDocument } from '@/common/libs/actions/room.actions';

import { Button } from '../ui/button';

interface AddDocumentBtnProps {
  userId: string;
  email: string;
}

const AddDocumentBtn: FC<AddDocumentBtnProps> = memo(({ userId, email }) => {
  const router = useRouter();

  const addDocumentHandler = async () => {
    try {
      const room = await createDocument({ userId, email });

      if (room) router.push(`/documents/${room.id}`);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };

  return (
    <Button
      type="submit"
      onClick={addDocumentHandler}
      className="gradient-blue flex gap-1 shadow-md"
    >
      <Image src="/assets/icons/add.svg" alt="add" width={24} height={24} />
      <p className="hidden sm:block">Start a blank document</p>
    </Button>
  );
});

export default AddDocumentBtn;
