// // import { format } from 'date-fns';
// // import { forwardRef } from 'react';
// // import ReactMarkdown from 'react-markdown';

// // import { ExtendedMessage } from '@/common/types/messages';
// // import { cn } from '@/common/utils';

// // import { Icons } from '../elements';

// // interface MessageProps {
// //   message: ExtendedMessage;
// //   isNextMessageSamePerson: boolean;
// // }

// // const Message = forwardRef<HTMLDivElement, MessageProps>(
// //   ({ message, isNextMessageSamePerson }, ref) => (
// //     <div
// //       ref={ref}
// //       className={cn('flex items-end', {
// //         'justify-end': message.isUserMessage,
// //       })}
// //     >
// //       <div
// //         className={cn(
// //           'relative flex aspect-square h-6 w-6 items-center justify-center',
// //           {
// //             'order-2 rounded-sm bg-blue-600': message.isUserMessage,
// //             'order-1 rounded-sm bg-zinc-800': !message.isUserMessage,
// //             invisible: isNextMessageSamePerson,
// //           }
// //         )}
// //       >
// //         {message.isUserMessage ? (
// //           <Icons.user className="h-3/4 w-3/4 fill-zinc-200 text-zinc-200" />
// //         ) : (
// //           <Icons.logo className="h-3/4 w-3/4 fill-zinc-300" />
// //         )}
// //       </div>
// //       <div
// //         className={cn('mx-2 flex max-w-md flex-col space-y-2 text-base', {
// //           'order-1 items-end': message.isUserMessage,
// //           'order-2 items-start': !message.isUserMessage,
// //         })}
// //       >
// //         <div
// //           className={cn('inline-block rounded-lg px-4 py-2', {
// //             'bg-blue-600 text-white': message.isUserMessage,
// //             'bg-gray-200 text-gray-900': !message.isUserMessage,
// //             'rounded-br-none':
// //               !isNextMessageSamePerson && message.isUserMessage,
// //             'rounded-bl-none':
// //               !isNextMessageSamePerson && !message.isUserMessage,
// //           })}
// //         >
// //           {typeof message.text === 'string' ? (
// //             <ReactMarkdown
// //               className={cn('prose', {
// //                 'text-zinc-50': message.isUserMessage,
// //               })}
// //             >
// //               {message.text}
// //             </ReactMarkdown>
// //           ) : (
// //             message.text
// //           )}
// //           {message.$id !== 'loading-message' ? (
// //             <div
// //               className={cn('mt-2 w-full select-none text-right text-xs', {
// //                 'text-zinc-500': !message.isUserMessage,
// //                 'text-blue-300': message.isUserMessage,
// //               })}
// //             >
// //               {format(new Date(message.createdAt), 'HH:mm')}
// //             </div>
// //           ) : null}
// //         </div>
// //       </div>
// //     </div>
// //   )
// // );

// // Message.displayName = 'Message';

// // export default Message;
// import { type Message as TMessage } from 'ai/react';
// import { MessageSquare } from 'lucide-react';

// import Message from './Message';

// interface MessagesProps {
//   messages: TMessage[];
// }

// const Messages: React.FC<MessagesProps> = ({ messages }) => (
//   <div className="flex max-h-[calc(100vh-3.5rem-7rem)] flex-1 flex-col overflow-y-auto">
//     {messages.length ? (
//       messages.map((message, i) => (
//         <Message
//           key={i}
//           content={message.content}
//           isUserMessage={message.role === 'user'}
//         />
//       ))
//     ) : (
//       <div className="flex flex-1 flex-col items-center justify-center gap-2">
//         <MessageSquare className="size-8 text-blue-500" />
//         <h3 className="text-xl font-semibold text-white">
//           You&apos;re all set!
//         </h3>
//         <p className="text-sm text-zinc-500">
//           Ask your first question to get started.
//         </p>
//       </div>
//     )}
//   </div>
// );

// export default Messages;
import { Bot, Loader } from 'lucide-react';

import { useCurrent } from '@/common/api/auth';
import { Avatar, AvatarFallback } from '@/common/components/ui/avatar';
import { cn } from '@/common/utils';

interface MessageProps {
  content: string;
  isUserMessage: boolean;
}

const Message: React.FC<MessageProps> = ({ content, isUserMessage }) => {
  const { data: user, isLoading } = useCurrent();

  if (isLoading) {
    return (
      <div className="flex size-10 items-center justify-center rounded-full border border-neutral-300 bg-neutral-200">
        <Loader className="size-4 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const { name, email } = user;

  const avatarFallback = name
    ? name.charAt(0).toUpperCase()
    : (email.charAt(0).toUpperCase() ?? 'U');

  return (
    <div
      className={cn({
        'bg-zinc-200': isUserMessage,
        'bg-zinc-100/85': !isUserMessage,
      })}
    >
      <div className="p-6">
        <div className="mx-auto flex max-w-3xl items-start gap-2.5">
          {isUserMessage ? (
            <Avatar className="size-10 border border-zinc-300 transition hover:opacity-75">
              <AvatarFallback className="flex items-center justify-center bg-neutral-50 font-medium text-neutral-500">
                {avatarFallback}
              </AvatarFallback>
            </Avatar>
          ) : (
            <div
              className={cn(
                'flex aspect-square size-10 shrink-0 items-center justify-center rounded-full border border-zinc-300 bg-zinc-100',
                {
                  'border-blue-700 bg-blue-300 text-zinc-200': isUserMessage,
                }
              )}
            >
              <Bot className="size-5 text-black" />{' '}
            </div>
          )}

          <div className="ml-6 flex w-full flex-col">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-semibold text-black dark:text-white">
                {isUserMessage ? '你' : '机器人'}
              </span>
            </div>
            <p className="py-2.5 text-sm font-normal text-black dark:text-white">
              {content}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Message;
