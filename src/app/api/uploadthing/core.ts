// import { PDFLoader } from 'langchain/document_loaders/fs/pdf'
// import { OpenAIEmbeddings } from 'langchain/embeddings/openai'
// import { PineconeStore } from 'langchain/vectorstores/pinecone'
import { ID, Query } from 'node-appwrite';
import { createUploadthing, type FileRouter } from 'uploadthing/next';

import { DATABASE_ID, FILES_ID } from '@/common/configs';
import { getCurrent } from '@/common/libs/actions/auth.actions';
import { getDatabases } from '@/common/libs/actions/file.actions';
import { type File } from '@/common/types/files';
// import { PLANS } from '@/config/stripe'
// import { getPineconeClient } from '@/common/libs/pinecone';
// import { getUserSubscriptionPlan } from '@/common/libs/stripe'

const f = createUploadthing();

const middleware = async () => {
  const user = await getCurrent();

  if (!user) throw new Error('Unauthorized');

  // const subscriptionPlan = await getUserSubscriptionPlan();

  // return { subscriptionPlan, userId: user.$id };
  return { userId: user.$id };
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
  const databases = await getDatabases();

  const isFileExist = databases?.listDocuments<File>(DATABASE_ID, FILES_ID, [
    Query.equal('key', file.key),
  ]);

  if (isFileExist) return;

  const createdFile = await databases?.createDocument(
    DATABASE_ID,
    FILES_ID,
    ID.unique(),
    {
      key: file.key,
      name: file.name,
      userId: metadata.userId,
      url: `https://uploadthing-prod.s3.us-west-2.amazonaws.com/${file.key}`,
      uploadStatus: 'PROCESSING',
    }
  );

  try {
    const response = await fetch(
      `https://uploadthing-prod.s3.us-west-2.amazonaws.com/${file.key}`
    );

    const blob = await response.blob();

    // const loader = new PDFLoader(blob);

    // const pageLevelDocs = await loader.load();

    // const pagesAmt = pageLevelDocs.length;

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

    // const pinecone = await getPineconeClient();
    // const pineconeIndex = pinecone.Index('PenPal');

    // const embeddings = new OpenAIEmbeddings({
    //   openAIApiKey: process.env.OPENAI_API_KEY,
    // });

    // await PineconeStore.fromDocuments(pageLevelDocs, embeddings, {
    //   pineconeIndex,
    //   namespace: createdFile?.id,
    // });

    await databases?.updateDocument(DATABASE_ID, FILES_ID, createdFile?.id, {
      uploadStatus: 'SUCCESS',
    });
  } catch (err) {
    await databases?.updateDocument(DATABASE_ID, FILES_ID, createdFile?.id, {
      uploadStatus: 'FAILED',
    });
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
