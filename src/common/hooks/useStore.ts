import { useMutation } from '@tanstack/react-query';
import { useRef, useState } from 'react';
import { create } from 'zustand';

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

      //   // step 1
      //   await utils.getFileMessages.cancel();

      //   // step 2
      //   const previousMessages = utils.getFileMessages.getInfiniteData();

      //   // step 3
      //   utils.getFileMessages.setInfiniteData(
      //     { fileId, limit: INFINITE_QUERY_LIMIT },
      //     (old) => {
      //       if (!old) {
      //         return {
      //           pages: [],
      //           pageParams: [],
      //         };
      //       }

      //       let newPages = [...old.pages];

      //       let latestPage = newPages[0]!;

      //       latestPage.messages = [
      //         {
      //           id: crypto.randomUUID(),
      //           text: message,
      //           isUserMessage: true,
      //         },
      //         ...latestPage.messages,
      //       ];

      //       newPages[0] = latestPage;

      //       return {
      //         ...old,
      //         pages: newPages,
      //       };
      //     }
      //   );

      setIsLoading(true);

      //   return {
      //     previousMessages:
      //       previousMessages?.pages.flatMap((page) => page.messages) ?? [],
      //   };
    },
    onSuccess: async (stream) => {
      setIsLoading(false);
      if (!stream) {
        return toast({
          title: 'There was a problem sending this message',
          description: 'Please refresh this page and try again',
          variant: 'destructive',
        });
      }
      const reader = stream.getReader();
      const decoder = new TextDecoder();
      // let done = false;
      //   // accumulated response
      //   let accResponse = '';
      //   while (!done) {
      //     const { value, done: doneReading } = await reader.read();
      //     done = doneReading;
      //     const chunkValue = decoder.decode(value);
      //     accResponse += chunkValue;
      //     // append chunk to the actual message
      //     utils.getFileMessages.setInfiniteData(
      //       { fileId, limit: INFINITE_QUERY_LIMIT },
      //       (old) => {
      //         if (!old) return { pages: [], pageParams: [] };
      //         let isAiResponseCreated = old.pages.some((page) =>
      //           page.messages.some((message) => message.$id === 'ai-response')
      //         );
      //         let updatedPages = old.pages.map((page) => {
      //           if (page === old.pages[0]) {
      //             let updatedMessages;
      //             if (!isAiResponseCreated) {
      //               updatedMessages = [
      //                 {
      //                   id: 'ai-response',
      //                   text: accResponse,
      //                   isUserMessage: false,
      //                 },
      //                 ...page.messages,
      //               ];
      //             } else {
      //               updatedMessages = page.messages.map((message) => {
      //                 if (message.$id === 'ai-response') {
      //                   return {
      //                     ...message,
      //                     text: accResponse,
      //                   };
      //                 }
      //                 return message;
      //               });
      //             }
      //             return {
      //               ...page,
      //               messages: updatedMessages,
      //             };
      //           }
      //           return page;
      //         });
      //         return { ...old, pages: updatedPages };
      //       }
      //     );
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
      //   await utils.getFileMessages.invalidate({ fileId });
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
