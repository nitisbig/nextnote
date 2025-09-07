import { Client, Databases } from 'appwrite';

const client = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || '')
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT || '')
  .setKey(process.env.NEXT_PUBLIC_APPWRITE_API_KEY || '');

export const databases = new Databases(client);
export const databaseId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || '';
export const collectionId = process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID || '';
