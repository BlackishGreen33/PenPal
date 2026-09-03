import { Models } from 'node-appwrite';
import type { JSX } from 'react';

export type Message = Models.Document & {
  text: string;
  isUserMessage: boolean;
  userId: string;
  fileId: string;
};

type OmitText = Omit<Message, 'text'>;

type ExtendedText = {
  text: string | JSX.Element;
};

export type ExtendedMessage = OmitText & ExtendedText;
