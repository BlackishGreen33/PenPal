'use client';

import { ChevronLeft, Loader2, XCircle } from 'lucide-react';
import Link from 'next/link';

import { useGetUploadStatus } from '@/common/api/files';

import ChatInput from './ChatInput';
import Messages from './Messages';
// import { PLANS } from '@/config/stripe'
import { buttonVariants } from '../ui/button';

interface ChatWrapperProps {
  fileId: string;
  // isSubscribed: boolean;
}

const ChatWrapper: React.FC<ChatWrapperProps> = ({ fileId }) => {
  const { data: status, isLoading } = useGetUploadStatus({ fileId });

  if (isLoading)
    return (
      <div className="relative flex min-h-full flex-col justify-between gap-2 divide-y divide-zinc-200 bg-zinc-50">
        <div className="mb-28 flex flex-1 flex-col items-center justify-center">
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
            <h3 className="text-xl font-semibold">载入中...</h3>
            <p className="text-sm text-zinc-500">我们正在准备您的文档</p>
          </div>
        </div>
        <ChatInput fileId={fileId} isDisabled />
      </div>
    );

  if (status === 'PROCESSING')
    return (
      <div className="relative flex min-h-full flex-col justify-between gap-2 divide-y divide-zinc-200 bg-zinc-50">
        <div className="mb-28 flex flex-1 flex-col items-center justify-center">
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
            <h3 className="text-xl font-semibold">处里 PDF...</h3>
            <p className="text-sm text-zinc-500">这不会花很长时间。</p>
          </div>
        </div>
        <ChatInput fileId={fileId} isDisabled />
      </div>
    );

  if (status === 'FAILED')
    return (
      <div className="relative flex min-h-full flex-col justify-between gap-2 divide-y divide-zinc-200 bg-zinc-50">
        <div className="mb-28 flex flex-1 flex-col items-center justify-center">
          <div className="flex flex-col items-center gap-2">
            <XCircle className="h-8 w-8 text-red-500" />
            <h3 className="text-xl font-semibold">Too many pages in PDF</h3>
            <p className="text-sm text-zinc-500">
              Your{' '}
              <span className="font-medium">
                {/* {isSubscribed ? 'Pro' : 'Free'} */}
              </span>{' '}
              plan supports up to{' '}
              {/* {isSubscribed
                ? PLANS.find((p) => p.name === 'Pro')?.pagesPerPdf
                : PLANS.find((p) => p.name === 'Free')?.pagesPerPdf}{' '} */}
              pages per PDF.
            </p>
            <Link
              href="/dashboard"
              className={buttonVariants({
                variant: 'secondary',
                className: 'mt-4',
              })}
            >
              <ChevronLeft className="mr-1.5 h-3 w-3" />
              返回
            </Link>
          </div>
        </div>
        <ChatInput fileId={fileId} isDisabled />
      </div>
    );

  return (
    <div className="relative flex min-h-full flex-col justify-between gap-2 divide-y divide-zinc-200 bg-zinc-50">
      <div className="mb-28 flex flex-1 flex-col justify-between">
        <Messages fileId={fileId} />
      </div>
      <ChatInput fileId={fileId} />
    </div>
  );
};

export default ChatWrapper;
