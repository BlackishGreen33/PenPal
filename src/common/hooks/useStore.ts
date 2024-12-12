import { useMutation } from '@tanstack/react-query';
import { useRef, useState } from 'react';
import { create } from 'zustand';

import { useGetFileMessages } from '@/common/api/messages';
import { INFINITE_QUERY_LIMIT } from '@/common/constants';

import { useToast } from './useToast';

interface State {
  message: string;
  isLoading: boolean;
  addMessage: () => void;
  handleInputChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const useStore = create<State>((set) => ({
  message: '',
  isLoading: false,
  addMessage: () => {},
  handleInputChange: (event) => {
    set({ message: event.target.value });
  },
}));

const useChatStoreWithMutation = (fileId: string) => {
  const [message, setMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { toast } = useToast();
  const backupMessage = useRef('');

  const { data, cancel, invalidate } = useGetFileMessages({
    fileId,
    limit: INFINITE_QUERY_LIMIT.toString(),
  });

  const { mutate: sendMessage } = useMutation({
    mutationFn: async ({ message }: { message: string }) => {
      const response = await fetch('/api/message', {
        method: 'POST',
        body: JSON.stringify({
          fileId,
          message,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      return response.body;
    },
    onMutate: async ({ message }) => {
      backupMessage.current = message;
      setMessage('');

      cancel();

      const previousMessages = data?.pages.flatMap(
        (page) => page.messages.documents
      );

      setIsLoading(true);

      return {
        previousMessages: previousMessages,
      };
    },
    onSuccess: async (stream) => {
      setIsLoading(false);
      if (!stream) {
        return toast({
          title: '消息发送时发生错误',
          description: '请重新加载页面后再试',
          variant: 'destructive',
        });
      }
      const previousMessages = data?.pages.flatMap(
        (page) => page.messages.documents
      );
      return previousMessages;
      // const reader = stream.getReader();
      // const decoder = new TextDecoder();
      // let done = false;
      // // accumulated response
      // let accResponse = '';
      // while (!done) {
      //   const { value, done: doneReading } = await reader.read();
      //   done = doneReading;
      //   const chunkValue = decoder.decode(value);
      //   accResponse += chunkValue;
      //   // append chunk to the actual message
      //   utils.getFileMessages.setInfiniteData(
      //     { fileId, limit: INFINITE_QUERY_LIMIT },
      //     (old) => {
      //       if (!old) return { pages: [], pageParams: [] };
      //       let isAiResponseCreated = old.pages.some((page) =>
      //         page.messages.some((message) => message.$id === 'ai-response')
      //       );
      //       let updatedPages = old.pages.map((page) => {
      //         if (page === old.pages[0]) {
      //           let updatedMessages;
      //           if (!isAiResponseCreated) {
      //             updatedMessages = [
      //               {
      //                 id: 'ai-response',
      //                 text: accResponse,
      //                 isUserMessage: false,
      //               },
      //               ...page.messages,
      //             ];
      //           } else {
      //             updatedMessages = page.messages.map((message) => {
      //               if (message.$id === 'ai-response') {
      //                 return {
      //                   ...message,
      //                   text: accResponse,
      //                 };
      //               }
      //               return message;
      //             });
      //           }
      //           return {
      //             ...page,
      //             messages: updatedMessages,
      //           };
      //         }
      //         return page;
      //       });
      //       return { ...old, pages: updatedPages };
      //     }
      //   );
      // }
    },
    onError: (_, __, context) => {
      setMessage(backupMessage.current);
      //   utils.getFileMessages.setData(
      //     { fileId },
      //     { messages: context?.previousMessages ?? [] }
      //   );
    },
    onSettled: async () => {
      setIsLoading(false);
      invalidate();
    },
  });

  const handleAddMessage = () => {
    sendMessage({ message: useStore.getState().message });
  };

  const handleMessageChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    useStore.setState({ message: event.target.value });
  };

  return {
    addMessage: handleAddMessage,
    message: useStore.getState().message,
    handleInputChange: handleMessageChange,
    isLoading: useStore.getState().isLoading,
  };
};

export default useChatStoreWithMutation;
