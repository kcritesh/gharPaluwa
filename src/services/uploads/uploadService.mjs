import AWS from "aws-sdk";
import * as dotenv from "dotenv";
dotenv.config();

// Set your DigitalOcean Spaces credentials
const spacesEndpoint = new AWS.Endpoint(process.env.SPACES_END_POINT); // replace with your space endpoint
const s3 = new AWS.S3({
  forcePathStyle: false, // Configures to use subdomain/virtual calling format.
  signatureVersion: "v4",
  endpoint: spacesEndpoint,
  region: "us-east-1",
  credentials: {
    accessKeyId: process.env.SPACES_ACCESS, // replace with your Spaces access key
    secretAccessKey: process.env.SPACES_SECRET, // replace with your Spaces secret key
  },
});

const getPresignedUrl = (type, domain) => {
  const params = {
    Bucket: `${domain}`, // replace with your bucket naming convention
    Key: `${type}/${Date.now()}_${Math.random()}`, // replace with your key naming convention
    ContentType: "application/octet-stream", // adjust content type as needed
    ACL: "public-read", // adjust ACL as needed
    Expires: 60, // presigned URL expiration time in seconds
  };

  return s3.getSignedUrlPromise("putObject", params);
};

export { getPresignedUrl };
