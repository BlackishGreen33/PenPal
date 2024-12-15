import { createUploadthing, type FileRouter } from 'uploadthing/next';

import { getCurrent } from '@/common/libs/actions/auth.actions';
import { getWorkspaces } from '@/common/libs/actions/workspaces.action';
// import { PLANS } from '@/config/stripe'
// import { getUserSubscriptionPlan } from '@/common/libs/stripe'

const f = createUploadthing();

const middleware = async () => {
  const user = await getCurrent();

  if (!user) throw new Error('Unauthorized');

  const workspaces = await getWorkspaces();

  return { userId: user.$id, workspaceId: workspaces.documents[0].$id };
};

const onUploadComplete = async ({
  metadata,
  file,
}: {
  metadata: Awaited<ReturnType<typeof middleware>>;
  file: {
    key: string;
    name: string;
    url: string;
  };
}) => {};

export const ourFileRouter = {
  freePlanUploader: f({ pdf: { maxFileSize: '4MB' } })
    .middleware(middleware)
    .onUploadComplete(() => {}),
  proPlanUploader: f({ pdf: { maxFileSize: '16MB' } })
    .middleware(middleware)
    .onUploadComplete(() => {}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
