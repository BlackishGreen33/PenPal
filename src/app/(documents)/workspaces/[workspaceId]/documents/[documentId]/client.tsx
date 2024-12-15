'use client';

import Editor from '@/common/components/documents/Editor';
import Toolbar from '@/common/components/documents/Toolbar';

// import { Preloaded, usePreloadedQuery } from "convex/react";

// import { Room } from "./room";
// import { Editor } from "./editor";
// import { Navbar } from "./navbar";
// import { Toolbar } from "./toolbar";
// import { api } from "../../../../convex/_generated/api";

// interface DocumentProps {
//   preloadedDocument: Preloaded<typeof api.documents.getById>;
// };

// const DocumentClient:React.FC<DocumentProps> = ({ preloadedDocument }) => {
const DocumentClient: React.FC = () => {
  // const document = usePreloadedQuery(preloadedDocument);

  return (
    // <Room>
    <div className="min-h-screen bg-[#F9FBFD]">
      <div className="fixed left-0 right-0 top-0 z-10 flex flex-col gap-y-2 bg-neutral-50 px-4 pt-2 print:hidden">
        {/* <Navbar data={document} /> */}
        <Toolbar />
      </div>
      <div className="pt-[114px] print:pt-0">
        {/* <Editor initialContent={document.initialContent} /> */}
        <Editor />
      </div>
    </div>
    // </Room>
  );
};

export default DocumentClient;