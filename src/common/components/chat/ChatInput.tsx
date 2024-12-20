// import { Send } from 'lucide-react';
// import { useRef } from 'react';

// import useChatStoreWithMutation from '@/common/hooks/useStore';

// import { Button } from '../ui/button';
// import { Textarea } from '../ui/textarea';

// interface ChatInputProps {
//   fileId: string;
//   isDisabled?: boolean;
// }

// const ChatInput: React.FC<ChatInputProps> = ({ fileId, isDisabled }) => {
//   const { addMessage, handleInputChange, isLoading, message } =
//     useChatStoreWithMutation(fileId);

//   const textareaRef = useRef<HTMLTextAreaElement>(null);

//   return (
//     <div className="absolute bottom-0 left-0 w-full">
//       <div className="mx-2 flex flex-row gap-3 md:mx-4 md:last:mb-6 lg:mx-auto lg:max-w-2xl xl:max-w-3xl">
//         <div className="relative flex h-full flex-1 items-stretch md:flex-col">
//           <div className="relative flex w-full flex-grow flex-col p-4">
//             <div className="relative">
//               <Textarea
//                 rows={1}
//                 ref={textareaRef}
//                 maxRows={4}
//                 autoFocus
//                 onChange={handleInputChange}
//                 value={message}
//                 onKeyDown={(e) => {
//                   if (e.key === 'Enter' && !e.shiftKey) {
//                     e.preventDefault();
//                     addMessage();
//                     textareaRef.current?.focus();
//                   }
//                 }}
//                 placeholder="输入您的问题..."
//                 className="scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch resize-none py-3 pr-12 text-base"
//               />
//               <Button
//                 disabled={isLoading || isDisabled}
//                 className="absolute bottom-1 right-[8px]"
//                 aria-label="send message"
//                 onClick={() => {
//                   addMessage();
//                   textareaRef.current?.focus();
//                 }}
//               >
//                 <Send className="h-4 w-4" />
//               </Button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ChatInput;
'use client';

import { Button, Textarea } from '@nextui-org/react';
import { type useChat } from 'ai/react';
import { Send } from 'lucide-react';

type HandleInputChange = ReturnType<typeof useChat>['handleInputChange'];
type HandleSubmit = ReturnType<typeof useChat>['handleSubmit'];
type SetInput = ReturnType<typeof useChat>['setInput'];

interface ChatInputProps {
  input: string;
  handleInputChange: HandleInputChange;
  handleSubmit: HandleSubmit;
  setInput: SetInput;
}

const ChatInput: React.FC<ChatInputProps> = ({
  handleInputChange,
  handleSubmit,
  input,
  setInput,
}) => (
  <div className="absolute bottom-0 left-0 z-10 w-full bg-zinc-100">
    <div className="mx-2 flex flex-row gap-3 md:mx-4 md:last:mb-6 lg:mx-auto lg:max-w-2xl xl:max-w-3xl">
      <div className="relative flex h-full flex-1 items-stretch md:flex-col">
        <div className="relative flex w-full flex-grow flex-col p-4">
          <form onSubmit={handleSubmit} className="relative">
            <Textarea
              minRows={4}
              autoFocus
              onChange={handleInputChange}
              value={input}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit();
                  setInput('');
                }
              }}
              placeholder="输入您的问题..."
              className="resize-none rounded-xl bg-zinc-200 text-base text-black hover:bg-zinc-300"
            />
            <Button
              size="sm"
              type="submit"
              className="absolute bottom-1 right-2 z-10 rounded-lg border border-border bg-zinc-400 text-white"
            >
              <Send className="size-4" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  </div>
);

export default ChatInput;
