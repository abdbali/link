'use client';

import { UploadButton } from '@uploadthing/react';
import type { UploadRouter } from '@/lib/uploadthing';

export function UploadAvatar() {
  return (
    <UploadButton<UploadRouter, 'avatarUploader'>
      endpoint="avatarUploader"
      onClientUploadComplete={(res) => {
        console.log('Uploaded avatar URL', res?.[0]?.url);
      }}
      onUploadError={(error: Error) => {
        console.error(error.message);
      }}
    />
  );
}
