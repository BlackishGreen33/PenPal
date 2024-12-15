'use client';

// import { useLiveblocksExtension } from '@liveblocks/react-tiptap';
import { Color } from '@tiptap/extension-color';
import FontFamily from '@tiptap/extension-font-family';
import Highlight from '@tiptap/extension-highlight';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Table from '@tiptap/extension-table';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import TableRow from '@tiptap/extension-table-row';
import TaskItem from '@tiptap/extension-task-item';
import TaskList from '@tiptap/extension-task-list';
import TextAlign from '@tiptap/extension-text-align';
import TextStyle from '@tiptap/extension-text-style';
import Underline from '@tiptap/extension-underline';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import ImageResize from 'tiptap-extension-resize-image';

import { useEditorStore } from '@/common/hooks';
import {
  FontSizeExtension,
  LineHeightExtension,
} from '@/common/libs/extensions';

// import { Ruler } from './ruler';
// import { Threads } from './threads';

interface EditorProps {
  initialContent?: string | undefined;
}

const Editor: React.FC<EditorProps> = ({ initialContent }) => {
  // const leftMargin =
  //   useStorage((root) => root.leftMargin) ?? LEFT_MARGIN_DEFAULT;
  // const rightMargin =
  //   useStorage((root) => root.rightMargin) ?? RIGHT_MARGIN_DEFAULT;

  // const liveblocks = useLiveblocksExtension({
  //   initialContent,
  //   offlineSupport_experimental: true,
  // });
  const { setEditor } = useEditorStore();

  const editor = useEditor({
    autofocus: true,
    immediatelyRender: false,
    onCreate({ editor }) {
      setEditor(editor);
    },
    onDestroy() {
      setEditor(null);
    },
    onUpdate({ editor }) {
      setEditor(editor);
    },
    onSelectionUpdate({ editor }) {
      setEditor(editor);
    },
    onTransaction({ editor }) {
      setEditor(editor);
    },
    onFocus({ editor }) {
      setEditor(editor);
    },
    onBlur({ editor }) {
      setEditor(editor);
    },
    onContentError({ editor }) {
      setEditor(editor);
    },
    editorProps: {
      attributes: {
        // style: `padding-left: ${leftMargin}px; padding-right: ${rightMargin}px;`,
        class:
          'focus:outline-none print:border-0 bg-white border border-[#C7C7C7] flex flex-col min-h-[1054px] w-[816px] pt-10 pr-14 pb-10 cursor-text',
      },
    },
    extensions: [
      // liveblocks,
      StarterKit.configure({
        history: false,
      }),
      LineHeightExtension,
      FontSizeExtension,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Link.configure({
        openOnClick: false,
        autolink: true,
        defaultProtocol: 'https',
      }),
      Color,
      Highlight.configure({
        multicolor: true,
      }),
      FontFamily,
      TextStyle,
      Underline,
      Image,
      ImageResize,
      Table,
      TableCell,
      TableHeader,
      TableRow,
      TaskItem.configure({
        nested: true,
      }),
      TaskList,
    ],
  });

  return (
    <div className="size-full overflow-x-auto px-4 print:overflow-visible print:bg-white print:p-0">
      {/* <Ruler /> */}
      <div className="mx-auto flex w-[816px] min-w-max justify-center py-4 print:w-full print:min-w-0 print:py-0">
        <EditorContent editor={editor} />
        {/*<Threads editor={editor} /> */}
      </div>
    </div>
  );
};

export default Editor;
