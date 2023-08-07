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

export async function getAllProducts() {
  try {
    const products = await Product.find();
    return products;
  } catch (error) {
    throw new Error(error);
  }
}

export async function getAllProductsOfVendor(userId) {
  try {
    const products = await Product.find({ userId }).exec(); // Populate the userId field with the user details
    return products;
  } catch (error) {
    console.log("error", error);
    throw new Error(error);
  }
}

//========== Function to get all products of all vendors========
export async function getProductsByQuery(searchQuery) {
  try {
    let query = {}; // Empty query by default

    if (searchQuery) {
      // If a search query is provided, create a regular expression to perform a case-insensitive search
      const searchRegex = new RegExp(searchQuery, "i");
      query = { name: searchRegex }; // Modify the field name ('name' in this case) according to your data model
    }

    const products = await Product.find(query);
    return products;
  } catch (error) {
    throw new Error(error);
  }
}

// =======Function to delete a product by id======
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
