import { createUploadthing, type FileRouter } from 'uploadthing/next';

const f = createUploadthing();

export const uploadRouter = {
  avatarUploader: f({ image: { maxFileSize: '4MB', maxFileCount: 1 } })
    .middleware(async () => ({ uploadedBy: 'authenticated-user' }))
    .onUploadComplete(async ({ file }) => ({ url: file.url }))
} satisfies FileRouter;

export type UploadRouter = typeof uploadRouter;
