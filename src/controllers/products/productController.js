import * as ProductService from "../../services/products/productService.js";

export async function createProduct(req, res) {
  const { name, price, description, imageUrl } = req.body;
  const { username, userId } = req.User; // from the authenticateToken middleware
  try {
    const product = await ProductService.createProduct(
      name,
      price,
      description,
      imageUrl,
      userId,
      username
    );
    res.status(201).json({ message: "Product created successfully", product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
