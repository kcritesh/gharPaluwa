import Product from "../../models/Product.js";
// import ImageUploadService from "../cloudinary/ImageUploadService.js";

export async function createProduct(
  name,
  price,
  description,
  imageUrl,
  userId,
  username
) {
  try {
    const existingProduct = await Product.findOne({ name });
    if (existingProduct) {
      throw new Error("Product with the same name already exists");
    }

    // const cloudinaryImageUrl = await ImageUploadService.uploadImage(imageUrl);

    const product = new Product({
      name,
      price,
      description,
      imageUrl,
      userId,
      username,
    });

    await product.save();

    return product;
  } catch (error) {
    throw new Error(error);
  }
}

// Add other functions as needed, e.g., getProduct, updateProduct, deleteProduct
