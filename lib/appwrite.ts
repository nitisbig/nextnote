import { Client, Databases, Account } from 'appwrite';

const client = new Client();

client
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || '')
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT || '');

if (process.env.NEXT_PUBLIC_APPWRITE_API_KEY && (client as any).setKey) {
  (client as any).setKey(process.env.NEXT_PUBLIC_APPWRITE_API_KEY);
}

export const account = new Account(client);

if (
  typeof window !== 'undefined' &&
  process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT &&
  process.env.NEXT_PUBLIC_APPWRITE_PROJECT
) {
  account.get().catch(() => {
    account.createAnonymousSession().catch(() => {});
  });
}

export const databases = new Databases(client);
export const databaseId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || '';
export const collectionId = process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID || '';
