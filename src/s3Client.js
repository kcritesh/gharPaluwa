/* eslint-disable import/prefer-default-export */
import { S3 } from '@aws-sdk/client-s3';
import dotenv from 'dotenv';

dotenv.config();
const s3Client = new S3({
  forcePathStyle: false, // Configures to use subdomain/virtual calling format.
  endpoint: process.env.SPACES_END_POINT,
  region: 'blr1',
  credentials: {
    accessKeyId: process.env.SPACES_ACCESS,
    secretAccessKey: process.env.SPACES_SECRET,
  },
  signatureVersion: 'v4',
});

export { s3Client };
