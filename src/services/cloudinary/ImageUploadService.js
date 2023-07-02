import cloudinary from "cloudinary";

cloudinary.config({
  cloud_name: "your_cloudinary_cloud_name",
  api_key: "your_cloudinary_api_key",
  api_secret: "your_cloudinary_api_secret",
});

export default class ImageUploadService {
  static async uploadImage(imageUrl) {
    try {
      // Upload the image to Cloudinary
      const result = await cloudinary.uploader.upload(imageUrl);

      // Extract the CDN link from the Cloudinary response
      const cdnUrl = result.secure_url;

      return cdnUrl;
    } catch (error) {
      throw new Error("Failed to upload image");
    }
  }
}
