'use client';

import { useGetDocument } from '@/common/api/documents';
import { Editor, Navbar, Toolbar } from '@/common/components/documents';
import { PageError, PageLoader } from '@/common/components/elements';

// import { Room } from "./room";

interface DocumentProps {
  documentId: string;
}

const DocumentClient: React.FC<DocumentProps> = ({ documentId }) => {
  const { data, isLoading } = useGetDocument({ documentId });

  if (isLoading) {
    return <PageLoader />;
  }

  if (!data) {
    return <PageError message="未找到项目" />;
  }

  return (
    // <Room>
    <div className="min-h-screen bg-[#F9FBFD]">
      <div className="fixed left-0 right-0 top-0 z-10 flex flex-col gap-y-2 bg-neutral-50 px-4 pt-2 print:hidden">
        <Navbar data={data} />
        <Toolbar />
      </div>
      <div className="pt-[114px] print:pt-0">
        <Editor initialContent={data.initialContent} />
      </div>
    </div>
    // </Room>
  );
};

export default DocumentClient;
