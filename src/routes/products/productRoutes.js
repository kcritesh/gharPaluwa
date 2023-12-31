import express from 'express';
const router = express.Router();
import { upload } from '../../utils/Multer.js';

// Import the relevant controllers
import {
  createProduct,
  getAllProducts,
  getProductsByQuery,
  deleteProduct,
  updateProduct,
  getAllProductsOfVendor,
  getProductsById,
} from '../../controllers/products/productController.mjs';
import { authenticateToken } from '../../middleware/index.js';
// Multer Configuration

// Define the routes

router.post('/', authenticateToken, upload.single('img'), createProduct);
router.get('/getallproducts', getAllProducts);
router.get('/getallproducts/vendor', authenticateToken, getAllProductsOfVendor);
router.post('/search', getProductsByQuery);
router.get('/:id', getProductsById);
router.delete('/:id', authenticateToken, deleteProduct);
router.put('/:id', authenticateToken, upload.single('img'), updateProduct);

export default router;
