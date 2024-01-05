import { v2 as cloudinary } from "cloudinary";
import * as dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default async function uploadImage(imageUrl) {
  try {
    // Upload the image to Cloudinary
    const result = await cloudinary.uploader.upload(imageUrl);

    // Extract the CDN link from the Cloudinary response
    const cdnUrl = result.secure_url;

    return cdnUrl;
  } catch (error) {
    throw new Error(error);
  }
}
