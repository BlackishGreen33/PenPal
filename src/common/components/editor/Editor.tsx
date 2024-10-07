/* eslint-disable simple-import-sort/imports */
'use client';

import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { HeadingNode } from '@lexical/rich-text';
import {
  FloatingComposer,
  FloatingThreads,
  liveblocksConfig,
  LiveblocksPlugin,
  useEditorStatus,
} from '@liveblocks/react-lexical';
import { useThreads } from '@liveblocks/react/suspense';

import Comments from '@/common/components/elements/Comments';
import DeleteModal from '@/common/components/elements/DeleteModal';
import Loader from '@/common/components/elements/Loader';

import FloatingToolbarPlugin from './plugins/FloatingToolbarPlugin';
import Theme from './plugins/Theme';
import ToolbarPlugin from './plugins/ToolbarPlugin';

// Catch any errors that occur during Lexical updates and log them
// or throw them as needed. If you don't throw them, Lexical will
// try to recover gracefully without losing user data.

function Placeholder() {
  return <div className="editor-placeholder">Enter some rich text...</div>;
}

export function Editor({
  roomId,
  currentUserType,
}: {
  roomId: string;
  currentUserType: UserType;
}) {
  const status = useEditorStatus();
  const { threads } = useThreads();

  const initialConfig = liveblocksConfig({
    namespace: 'Editor',
    nodes: [HeadingNode],
    onError: (error: Error) => {
      // eslint-disable-next-line no-console
      console.error(error);
      throw error;
    },
    theme: Theme,
    editable: currentUserType === 'editor',
  });

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <div className="editor-container size-full">
        <div className="custom-scrollbar z-50 flex w-screen min-w-full justify-between overflow-auto border-y border-dark-300 bg-dark-100 pl-3 pr-4 shadow-sm">
          <ToolbarPlugin />
          {currentUserType === 'editor' && <DeleteModal roomId={roomId} />}
        </div>
        <div className="custom-scrollbar flex h-[calc(100vh-140px)] flex-col items-center justify-start gap-5 overflow-auto px-5 pt-5 lg:flex-row lg:items-start lg:justify-center xl:gap-10 xl:pt-10">
          {status === 'not-loaded' || status === 'loading' ? (
            <Loader />
          ) : (
            <div className="editor-inner relative mb-5 h-fit min-h-[1100px] w-full max-w-[800px] shadow-md lg:mb-10">
              <RichTextPlugin
                contentEditable={
                  <ContentEditable className="editor-input h-full" />
                }
                placeholder={<Placeholder />}
                ErrorBoundary={LexicalErrorBoundary}
              />
              {currentUserType === 'editor' && <FloatingToolbarPlugin />}
              <HistoryPlugin />
              <AutoFocusPlugin />
            </div>
          )}
          <LiveblocksPlugin>
            <FloatingComposer className="w-[350px]" />
            <FloatingThreads threads={threads} />
            <Comments />
          </LiveblocksPlugin>
        </div>
      </div>
    </LexicalComposer>
  );
}
