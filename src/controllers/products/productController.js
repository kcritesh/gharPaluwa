import * as ProductService from "../../services/products/productService.js";

export async function createProduct(req, res) {
  const { name, price, description } = req.body;
  const { username, userId } = req.User; // from the authenticateToken middleware
  try {
    const product = await ProductService.createProduct(
      name,
      price,
      description,
      req.file.path,
      userId,
      username
    );
    res.status(201).json({ message: "Product created successfully", product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function getProducts(req, res) {
  try {
    const products = await ProductService.getProducts();
    res.status(200).json({ products });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
