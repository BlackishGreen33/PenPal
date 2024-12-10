import { PDFLoader } from '@langchain/community/document_loaders/fs/pdf';
import { OpenAIEmbeddings } from '@langchain/openai';
import { PineconeStore } from '@langchain/pinecone';
import { ID, Query } from 'node-appwrite';
import { createUploadthing, type FileRouter } from 'uploadthing/next';

import { DATABASE_ID, FILES_ID } from '@/common/configs';
import { getCurrent } from '@/common/libs/actions/auth.actions';
import { getWorkspaces } from '@/common/libs/actions/workspaces.action';
import { createAdminClient } from '@/common/libs/appwrite';
import getPineconeClient from '@/common/libs/pinecone';
import { type File } from '@/common/types/files';
// import { PLANS } from '@/config/stripe'
// import { getUserSubscriptionPlan } from '@/common/libs/stripe'

const f = createUploadthing();

const middleware = async () => {
  const user = await getCurrent();

  if (!user) throw new Error('Unauthorized');

  const workspaces = await getWorkspaces();

  // const subscriptionPlan = await getUserSubscriptionPlan();

  // return { subscriptionPlan, userId: user.$id };
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
}) => {
  console.log('Upload complete for userId:', metadata.userId);
  console.log('file url', file.url);

  const { databases } = await createAdminClient();

  const files = await databases.listDocuments<File>(DATABASE_ID, FILES_ID, [
    Query.equal('key', file.key),
  ]);

  console.log('files', files);

  const isFileExist = files.documents[0];

  console.log('isFileExist', isFileExist);

  if (isFileExist) return;

  const createdFile = await databases.createDocument(
    DATABASE_ID,
    FILES_ID,
    ID.unique(),
    {
      key: file.key,
      name: file.name,
      workspaceId: metadata.workspaceId,
      url: file.url,
      uploadStatus: 'PROCESSING',
    }
  );

  console.log('createdFile', createdFile);

  try {
    const response = await fetch(file.url);

    const blob = await response.blob();

    const loader = new PDFLoader(blob);

    const pageLevelDocs = await loader.load();

    const pagesAmt = pageLevelDocs.length;

    // const { subscriptionPlan } = metadata;
    // const { isSubscribed } = subscriptionPlan;

    // const isProExceeded =
    //   pagesAmt > PLANS.find((plan) => plan.name === 'Pro')!.pagesPerPdf;
    // const isFreeExceeded =
    //   pagesAmt > PLANS.find((plan) => plan.name === 'Free')!.pagesPerPdf;

    // if ((isSubscribed && isProExceeded) || (!isSubscribed && isFreeExceeded)) {
    //   await databases?.updateDocument(DATABASE_ID, FILES_ID, createdFile.id, {
    //     uploadStatus: 'FAILED',
    //   });
    // }

    const pinecone = await getPineconeClient();
    const pineconeIndex = pinecone.Index('penpal');

    const embeddings = new OpenAIEmbeddings({
      configuration: {
        baseURL: process.env.OPENAI_API_URL,
      },
      openAIApiKey: process.env.OPENAI_API_KEY,
    });

    await PineconeStore.fromDocuments(pageLevelDocs, embeddings, {
      pineconeIndex,
      namespace: createdFile?.id,
    });

    await databases.updateDocument(
      DATABASE_ID,
      FILES_ID,
      createdFile.data.$id,
      {
        uploadStatus: 'SUCCESS',
      }
    );
  } catch (err) {
    await databases.updateDocument(
      DATABASE_ID,
      FILES_ID,
      createdFile.data.$id,
      {
        uploadStatus: 'FAILED',
      }
    );
  }
};

export const ourFileRouter = {
  freePlanUploader: f({ pdf: { maxFileSize: '4MB' } })
    .middleware(middleware)
    .onUploadComplete(onUploadComplete),
  proPlanUploader: f({ pdf: { maxFileSize: '16MB' } })
    .middleware(middleware)
    .onUploadComplete(onUploadComplete),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
