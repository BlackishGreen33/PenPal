import { openai } from '@ai-sdk/openai';
import { zValidator } from '@hono/zod-validator';
import { OpenAIEmbeddings } from '@langchain/openai';
import { PineconeStore } from '@langchain/pinecone';
import { streamText } from 'ai';
import { Hono } from 'hono';
import { ID, Query } from 'node-appwrite';

import { DATABASE_ID, FILES_ID, MESSAGES_ID } from '@/common/configs';
import getPineconeClient from '@/common/libs/pinecone';
import sessionMiddleware from '@/common/libs/session-middleware';
import { SendMessageSchema } from '@/common/schemas/message';
import { type File } from '@/common/types/files';
import { Message } from '@/common/types/messages';

const Messages = new Hono().post(
  '/',
  sessionMiddleware,
  zValidator('form', SendMessageSchema),
  async (c) => {
    const databases = c.get('databases');
    const user = c.get('user');

    const { fileId, message } = c.req.valid('form');

    const file = await databases.getDocument<File>(
      DATABASE_ID,
      FILES_ID,
      fileId
    );

    if (!file) {
      return c.json({ error: 'Not found' }, 404);
    }

    await databases.createDocument(DATABASE_ID, MESSAGES_ID, ID.unique(), {
      text: message,
      isUserMessage: true,
      userId: user.$id,
      fileId,
    });

    const embeddings = new OpenAIEmbeddings({
      configuration: {
        baseURL: process.env.OPENAI_API_URL,
      },
      openAIApiKey: process.env.OPENAI_API_KEY,
    });

    const pinecone = await getPineconeClient();
    const pineconeIndex = pinecone.Index('penpal');

    const vectorStore = await PineconeStore.fromExistingIndex(embeddings, {
      pineconeIndex,
      namespace: file.id,
    });

    const results = await vectorStore.similaritySearch(message, 4);

    const prevMessages = await databases.listDocuments<Message>(
      DATABASE_ID,
      MESSAGES_ID,
      [
        Query.equal('fileId', fileId),
        Query.orderDesc('$createdAt'),
        Query.limit(6),
      ]
    );

    const formattedPrevMessages = prevMessages.documents.map((msg) => ({
      role: msg.isUserMessage ? ('user' as const) : ('assistant' as const),
      content: msg.text,
    }));

    const stream = streamText({
      model: openai('gpt-3.5-turbo'),
      temperature: 0,
      messages: [
        {
          role: 'system',
          content:
            'Use the following pieces of context (or previous conversaton if needed) to answer the users question in markdown format.',
        },
        {
          role: 'user',
          content: `Use the following pieces of context (or previous conversaton if needed) to answer the users question in markdown format. \nIf you don't know the answer, just say that you don't know, don't try to make up an answer.
        
  \n----------------\n
  
  PREVIOUS CONVERSATION:
  ${formattedPrevMessages.map((message) => {
    if (message.role === 'user') return `User: ${message.content}\n`;
    return `Assistant: ${message.content}\n`;
  })}
  
  \n----------------\n
  
  CONTEXT:
  ${results.map((r) => r.pageContent).join('\n\n')}
  
  USER INPUT: ${message}`,
        },
      ],
      onFinish: (completion) => {
        databases.createDocument(DATABASE_ID, MESSAGES_ID, ID.unique(), {
          text: completion.text,
          isUserMessage: false,
          userId: user.$id,
          fileId,
        });
      },
    });

    return stream.toDataStreamResponse();
  }
);

export default Messages;
