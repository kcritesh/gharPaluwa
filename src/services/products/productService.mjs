import Product from '../../models/Product.js';
import { updateImgUrl } from '../../utils/Image.js';
// import uploadImage from '../cloudinary/ImageUploadService.mjs';

const primaryProductFields =
  'name price description quantity imgUrl categoryId';

export async function createProduct(
  name,
  price,
  description,
  quantity,
  mainImg,
  userId,
  username,
  categoryId
) {
  try {
    const existingProduct = await Product.findOne({ name });
    if (existingProduct) {
      throw new Error('Product with the same name already exists');
    }

    // let imgUrl = null; // Initialize imgUrl with null

    // if (img) {
    //   imgUrl = await uploadImage(img);
    // }
    // const imgUrl = `${process.env.CDN_ENPOINT}`;

    const product = new Product({
      name,
      price,
      description,
      quantity,
      imgUrl: mainImg,
      userId,
      username,
      categoryId,
    }).select(primaryProductFields);

    await product.save();
    const savedProduct = await Product.findById(product.id).select('-reviews');

    savedProduct.imgUrl = `${process.env.CDN_ENPOINT}/${savedProduct.imgUrl}`;

    return savedProduct;
  } catch (error) {
    throw new Error(error);
  }
}

export async function updateProduct({
  id,
  name,
  price,
  description,
  quantity,
  imgUrl,
  userId,
  categoryId,
}) {
  try {
    const product = await Product.findById(id);
    if (!product) {
      throw new Error('Product not found');
    }

    if (product.userId.toString() !== userId) {
      throw new Error('You are not authorized to update this product.');
    }

    // let imgUrl;

    // if (img) {
    //   imgUrl = await uploadImage(img);
    // }

    const updateFields = {
      ...(imgUrl && { imgUrl }),
      ...(name && { name }),
      ...(price && { price }),
      ...(description && { description }),
      ...(quantity && { quantity }),
      ...(categoryId && { categoryId }),
    };

    const updatedProduct = await Product.findByIdAndUpdate(id, updateFields, {
      new: true, // Return the updated document
      runValidators: true, // Run validators for update operations
    }).select(primaryProductFields);

    if (!updatedProduct) {
      throw new Error('Failed to update product');
    }

    return updatedProduct;
  } catch (error) {
    throw new Error(error);
  }
}

export async function getAllProducts(pageNumber, pageSize) {
  try {
    const totalCount = await Product.countDocuments();
    const totalPages = Math.ceil(totalCount / pageSize);
    const offset = (pageNumber - 1) * pageSize;

    const products = await Product.find()
      .sort({ createdAt: -1 }) // Sort in descending order (latest first)
      .skip(offset)
      .limit(pageSize)
      .lean()
      .exec()
      .then((productsList) => updateImgUrl(productsList));

    // const updatedProducts = updateImgUrl(products);

    return {
      products,
      totalPages,
      currentPage: pageNumber,
      totalProducts: totalCount,
    };
  } catch (error) {
    throw new Error(error);
  }
}

export async function getAllProductsOfVendor(userId) {
  try {
    const products = await Product.find({ userId })
      .lean()
      .exec()
      .then((productsList) => updateImgUrl(productsList)); // Populate the userId field with the user details

    return products;
  } catch (error) {
    throw new Error(error);
  }
}

// ========== Function to get all products of all vendors========
export async function getProductsByQuery(searchQuery) {
  try {
    let query = {}; // Empty query by default

    if (searchQuery) {
      // If a search query is provided, create a regular expression to perform a case-insensitive search
      const searchRegex = new RegExp(searchQuery, 'i');
      query = { name: searchRegex }; // Modify the field name ('name' in this case) according to your data model
    }

    const products = await Product.find(query);
    return products;
  } catch (error) {
    throw new Error(error);
  }
}

export async function getProductsById(id) {
  try {
    const product = await Product.findById(id);
    return product;
  } catch (error) {
    throw new Error(error);
  }
}

// =======Function to delete a product by id======
export async function deleteProduct(id, userId) {
  try {
    const product = await Product.findById(id);

    if (!product) {
      throw new Error(`Product with ID ${id} not found.`);
    }

    if (product.userId.toString() !== userId) {
      throw new Error('You are not authorized to delete this product.');
    }

    await Product.findByIdAndDelete(id);
    return product;
  } catch (error) {
    throw new Error(error); // Re-throw the original error
  }
}
