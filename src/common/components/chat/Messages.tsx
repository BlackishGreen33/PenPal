import { useIntersection } from '@mantine/hooks';
import { Loader2, MessageSquare } from 'lucide-react';
import { useEffect, useRef } from 'react';
import Skeleton from 'react-loading-skeleton';

import { useGetFileMessages } from '@/common/api/messages';
import { INFINITE_QUERY_LIMIT } from '@/common/constants';
import useChatStoreWithMutation from '@/common/hooks/useStore';

import Message from './Message';

interface MessagesProps {
  fileId: string;
}

const Messages: React.FC<MessagesProps> = ({ fileId }) => {
  const { isLoading: isAiThinking } = useChatStoreWithMutation(fileId);

  const { data, isLoading, fetchNextPage } = useGetFileMessages({
    fileId,
    limit: INFINITE_QUERY_LIMIT.toString(),
  });

  const messages = data?.pages.flatMap((page) => page.messages.documents);

  const loadingMessage = {
    $creactAt: new Date().toISOString(),
    $id: 'loading-message',
    isUserMessage: false,
    text: (
      <span className="flex h-full items-center justify-center">
        <Loader2 className="h-4 w-4 animate-spin" />
      </span>
    ),
  };

  const combinedMessages = [
    ...(isAiThinking ? [loadingMessage] : []),
    ...(messages ?? []),
  ];

  const lastMessageRef = useRef<HTMLDivElement>(null);

  const { ref, entry } = useIntersection({
    root: lastMessageRef.current,
    threshold: 1,
  });

  useEffect(() => {
    if (entry?.isIntersecting) {
      fetchNextPage();
    }
  }, [entry, fetchNextPage]);

  return (
    <div className="scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch flex max-h-[calc(100vh-3.5rem-7rem)] flex-1 flex-col-reverse gap-4 overflow-y-auto border-zinc-200 p-3">
      {combinedMessages && combinedMessages.length > 0 ? (
        combinedMessages.map((message, i) => {
          const isNextMessageSamePerson =
            combinedMessages[i - 1]?.isUserMessage ===
            combinedMessages[i]?.isUserMessage;

          if (i === combinedMessages.length - 1) {
            return (
              <Message
                ref={ref}
                message={message}
                isNextMessageSamePerson={isNextMessageSamePerson}
                key={message.$id}
              />
            );
          } else
            return (
              <Message
                message={message}
                isNextMessageSamePerson={isNextMessageSamePerson}
                key={message.$id}
              />
            );
        })
      ) : isLoading ? (
        <div className="flex w-full flex-col gap-2">
          <Skeleton className="h-16" />
          <Skeleton className="h-16" />
          <Skeleton className="h-16" />
          <Skeleton className="h-16" />
        </div>
      ) : (
        <div className="flex flex-1 flex-col items-center justify-center gap-2">
          <MessageSquare className="h-8 w-8 text-blue-500" />
          <h3 className="text-xl font-semibold">全部设置完毕！</h3>
          <p className="text-sm text-zinc-500">
            询问您的第一个问题开始你的聊天吧！
          </p>
        </div>
      )}
    </div>
  );
};

export default Messages;
