import { Pinecone } from '@pinecone-database/pinecone';

const getPineconeClient = async () => {
  const client = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY!,
  });

  return client;
};

export default getPineconeClient;
