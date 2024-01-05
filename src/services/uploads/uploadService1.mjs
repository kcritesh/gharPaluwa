/* eslint-disable import/prefer-default-export */
import dotenv from "dotenv";

// Imports your configured client and any necessary S3 commands.
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { s3Client } from "../../s3Client.js";

dotenv.config();

// Generates the URL.
export const getPresignedUrl = async (type, domain) => {
  const today = new Date().toISOString().split("T")[0];
  const objectKey = `${type}/${today}/gharpaluwaImage_${Date.now()}_${Math.random().toFixed(3)}`;
  const bucketParams = {
    Bucket: `${domain}`,
    Key: objectKey,
    ContentType: "application/octet-stream",
    ACL: "public-read",
  };
  try {
    const url = await getSignedUrl(
      s3Client,
      new PutObjectCommand(bucketParams),
      { expiresIn: 15 * 60 }
    ); // Adjustable expiration.
    // console.log("URL:", url);
    return { url, objectKey };
  } catch (err) {
    // console.log("Error", err);
    throw new Error(`Could not get signed URL: ${err.message}`);
  }
};
