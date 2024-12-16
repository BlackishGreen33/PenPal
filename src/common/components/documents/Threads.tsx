/* eslint-disable simple-import-sort/imports */
import {
  AnchoredThreads,
  FloatingComposer,
  FloatingThreads,
} from '@liveblocks/react-tiptap';
import { ClientSideSuspense, useThreads } from '@liveblocks/react/suspense';
import { Editor } from '@tiptap/react';

const Threads: React.FC<{ editor: Editor | null }> = ({ editor }) => (
  <ClientSideSuspense fallback={null}>
    <ThreadsList editor={editor} />
  </ClientSideSuspense>
);

export default Threads;

const ThreadsList: React.FC<{ editor: Editor | null }> = ({ editor }) => {
  const { threads } = useThreads({ query: { resolved: false } });

  return (
    <>
      <div className="anchored-threads">
        <AnchoredThreads editor={editor} threads={threads} />
      </div>
      <FloatingThreads
        editor={editor}
        threads={threads}
        className="floating-threads"
      />
      <FloatingComposer editor={editor} className="floating-composer" />
    </>
  );
};
