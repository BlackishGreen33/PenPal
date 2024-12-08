import { createSessionClient } from '../appwrite';

export const getDatabases = async () => {
  try {
    const { databases } = await createSessionClient();

    return databases;
  } catch {
    return null;
  }
};
