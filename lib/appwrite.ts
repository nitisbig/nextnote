import { Client, Databases } from 'appwrite';

const client = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT as string)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID as string)
  .setKey(
    process.env.NEXT_PUBLIC_APPWRITE_API_KEY ||
      'standard_d4e4a21a3858b2908637ea4529add8092bed484309637569f03a404132c9ad874a7e55e6db8d755d9876691e39' +
      '475055e69e4255e20d019abb13150fe3dce15425351de67b8ac40fb42e4093d97' +
      'b765731ca1c694bac91dc610fb0d06cd0ce4ab8ef4a50ebbb15597c7982e274' +
      '981e6b3f3607f97f95f3d9c9ba0a3eb9613f75'
  );

export const databases = new Databases(client);

export default client;
