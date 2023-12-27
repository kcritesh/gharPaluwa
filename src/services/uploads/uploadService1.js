import dotenv from "dotenv";
dotenv.config();
// Imports your configured client and any necessary S3 commands.
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { s3Client } from "../../s3Client.js";

// Specifies path, file, and content type.

// Generates the URL.
export const getPresignedUrl = async (type, domain) => {
  const bucketParams = {
    Bucket: `${domain}`,
    Key: `${type}/${Date.now()}_${Math.random()}`,
    ContentType: "application/octet-stream",
    ACL: "public-read",
  };
  try {
    const url = await getSignedUrl(
      s3Client,
      new PutObjectCommand(bucketParams),
      { expiresIn: 15 * 60 }
    ); // Adjustable expiration.
    console.log("URL:", url);
    return url;
  } catch (err) {
    console.log("Error", err);
  }
};
