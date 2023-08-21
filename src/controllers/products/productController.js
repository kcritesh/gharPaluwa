import * as ProductService from "../../services/products/productService.js";

export async function createProduct(req, res) {
  const { name, price, description } = req.body;
  const { username, userId } = req.User; // from the authenticateToken middleware

  let imagePath = null; // Initialize imagePath with null

  if (req.file) {
    imagePath = req.file.path; // Set imagePath if a file was uploaded
  }
  try {
    const product = await ProductService.createProduct(
      name,
      price,
      description,
      imagePath,
      userId,
      username
    );
    res.status(201).json({ message: "Product created successfully", product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function getAllProducts(req, res) {
  try {
    const products = await ProductService.getAllProducts();
    res.status(200).json({ products });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
export async function getProductsByQuery(req, res) {
  const { query } = req.body;
  try {
    const products = await ProductService.getProductsByQuery(query);
    res.status(200).json({ products });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function getProductsById(req, res) {
  const { id } = req.params;
  try {
    const product = await ProductService.getProductsById(id);
    res.status(200).json({ product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function getAllProductsOfVendor(req, res) {
  try {
    const { userId } = req.User;
    const products = await ProductService.getAllProductsOfVendor(userId);
    res.status(200).json({ products });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function deleteProduct(req, res) {
  try {
    const { id } = req.params;
    const { userId } = req.User;
    const product = await ProductService.deleteProduct(id, userId);
    res.status(200).json({ message: "Product deleted successfully", product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function updateProduct(req, res) {
  try {
    const { id } = req.params;
    const { userId } = req.User;
    const { name, price, description } = req.body;

    let imagePath = null; // Initialize imagePath with null

    if (req.file) {
      imagePath = req.file.path; // Set imagePath if a file was uploaded
    }

    const product = await ProductService.updateProduct(
      id,
      name,
      price,
      description,
      imagePath,
      userId
    );

    res.status(200).json({ message: "Product updated successfully", product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
