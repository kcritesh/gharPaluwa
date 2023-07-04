import Product from "../../models/Product.js";
import { uploadImage } from "../cloudinary/ImageUploadService.js";

export async function createProduct(
  name,
  price,
  description,
  img,
  userId,
  username
) {
  try {
    const existingProduct = await Product.findOne({ name });
    if (existingProduct) {
      throw new Error("Product with the same name already exists");
    }

    const imgUrl = await uploadImage(img);

    const product = new Product({
      name,
      price,
      description,
      imgUrl,
      userId,
      username,
    });

    await product.save();

    return product;
  } catch (error) {
    throw new Error(error);
  }
}

export async function getProducts() {
  try {
    const products = await Product.find();
    return products;
  } catch (error) {
    throw new Error(error);
  }
}

export async function deleteProduct(id) {
  try {
    const product = await Product.findByIdAndDelete(id);
    return product;
  } catch (error) {
    throw new Error(error);
  }
}

export async function updateProduct(id, name, price, description, img) {
  try {
    const product = await Product.findById(id);
    if (!product) {
      throw new Error("Product not found");
    }
    const imgUrl = await uploadImage(img);
    product.name = name;
    product.price = price;
    product.description = description;
    product.imgUrl = imgUrl;
    await product.save();
    return product;
  } catch (error) {
    throw new Error(error);
  }
}
