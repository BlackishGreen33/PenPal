import { NextPage } from 'next';
import { redirect } from 'next/navigation';

import { getCurrent } from '@/common/libs/actions/auth.actions';
import { ragChat } from '@/common/libs/rag-chat';
import { redis } from '@/common/libs/redis';

import ChatClient from './client';

interface PageProps {
  params: Promise<{
    fileId: string;
    fileUrl: string | string[] | undefined;
  }>;
}

const reconstructUrl = ({ url }: { url: string[] }) => {
  const decodedComponents = url.map((component) =>
    decodeURIComponent(component)
  );

  return decodedComponents.join('//');
};

const Page: NextPage<PageProps> = async ({ params }) => {
  const user = await getCurrent();
  if (!user) redirect('/sign-in');

  const fileId = (await params).fileId;
  const fileUrl = (await params).fileUrl;
  const reconstructedUrl = reconstructUrl({ url: fileUrl as string[] });

  const isAlreadyIndexed = await redis.sismember(
    'indexed-urls',
    reconstructedUrl
  );

  const initialMessages = await ragChat.history.getMessages({
    amount: 10,
    sessionId: fileId,
  });

  if (!isAlreadyIndexed) {
    await ragChat.context.add({
      type: 'pdf',
      fileSource: reconstructedUrl,
      config: { chunkOverlap: 50, chunkSize: 200 },
    });

    await redis.sadd('indexed-urls', reconstructedUrl);
  }

  return <ChatClient sessionId={fileId} initialMessages={initialMessages} />;
};

export default Page;
