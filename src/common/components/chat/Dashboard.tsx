'use client';

import { format } from 'date-fns';
import { Ghost, Loader2, MessageSquare, Plus, Trash } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import Skeleton from 'react-loading-skeleton';

import useGetWorkspaceFiles from '@/common/api/files/useGetWorkspaceFiles';
import { Button } from '@/common/components/ui/button';
import { useWorkspaceId } from '@/common/hooks';

// import { getUserSubscriptionPlan } from '@/common/libs/stripe';

// interface DashboardProps {
// subscriptionPlan: Awaited<ReturnType<typeof getUserSubscriptionPlan>>;
// }

const Dashboard: React.FC = () => {
  // const Dashboard: React.FC<DashboardProps> = ({ subscriptionPlan }) => {
  const [currentlyDeletingFile, setCurrentlyDeletingFile] = useState<
    string | null
  >(null);

  const workspaceId = useWorkspaceId();
  const { data: files, isLoading } = useGetWorkspaceFiles({
    workspaceId,
  });

  // const { mutate: deleteFile } = trpc.deleteFile.useMutation({
  //   onSuccess: () => {
  //     utils.getUserFiles.invalidate();
  //   },
  //   onMutate({ id }) {
  //     setCurrentlyDeletingFile(id);
  //   },
  //   onSettled() {
  //     setCurrentlyDeletingFile(null);
  //   },
  // });

  return (
    <main className="mx-auto max-w-7xl md:p-10">
      <div className="mt-8 flex flex-col items-start justify-between gap-4 border-b border-gray-200 pb-5 sm:flex-row sm:items-center sm:gap-0">
        <h1 className="mb-3 text-5xl font-bold text-gray-900">文档库</h1>
        {/* <UploadButton isSubscribed={subscriptionPlan.isSubscribed} /> */}
      </div>
      {files && files.total !== 0 ? (
        <ul className="mt-8 grid grid-cols-1 gap-6 divide-y divide-zinc-200 md:grid-cols-2 lg:grid-cols-3">
          {files.documents
            .sort(
              (a, b) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
            )
            .map((file) => (
              <li
                key={file.$id}
                className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow transition hover:shadow-lg"
              >
                <Link
                  href={`/dashboard/${file.$id}`}
                  className="flex flex-col gap-2"
                >
                  <div className="flex w-full items-center justify-between space-x-6 px-6 pt-6">
                    <div className="h-10 w-10 flex-shrink-0 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500" />
                    <div className="flex-1 truncate">
                      <div className="flex items-center space-x-3">
                        <h3 className="truncate text-lg font-medium text-zinc-900">
                          {file.name}
                        </h3>
                      </div>
                    </div>
                  </div>
                </Link>
                <div className="mt-4 grid grid-cols-3 place-items-center gap-6 px-6 py-2 text-xs text-zinc-500">
                  <div className="flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    {format(new Date(file.createdAt), 'MMM yyyy')}
                  </div>
                  <div className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4" />
                    mocked
                  </div>
                  <Button
                    // onClick={() => deleteFile({ id: file.$id })}
                    size="sm"
                    className="w-full"
                    variant="destructive"
                  >
                    {currentlyDeletingFile === file.id ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Trash className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </li>
            ))}
        </ul>
      ) : isLoading ? (
        <Skeleton height={100} className="my-2" count={3} />
      ) : (
        <div className="mt-16 flex flex-col items-center gap-2">
          <Ghost className="h-8 w-8 text-zinc-800" />
          <h3 className="text-xl font-semibold">这里空空一片</h3>
          <p>上传一些 PDF 吧！</p>
        </div>
      )}
    </main>
  );
};

export default Dashboard;