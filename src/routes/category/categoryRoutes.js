import express from 'express';
import {
  getCategories,
  getCategoryById,
  createCategory,
  getSubcategories,
  getCategoriesExcludeSubcategories,
  getCategoryByName,
  getSubcategoryByName,
  deleteCategory,
  updateCategory,
} from '../../controllers/category/categoryController.mjs';

import { authenticateToken } from '../../middleware/auth/authenticatetoken.js';

const router = express.Router();

router.get('/listAll', getCategories);
router.get('/listAll/categoryOnly', getCategoriesExcludeSubcategories);
router.get('/getById/:id', getCategoryById);
router.post('/create', authenticateToken, createCategory);
router.get('/subCategories/:id', getSubcategories); // get subcategories of a category, id = parentCategory
router.get('/getByName/:name', getCategoryByName);
router.get(
  '/getSubcategoryByName/:name/:parentCategoryId',
  getSubcategoryByName
);
router.delete('/delete/:id', authenticateToken, deleteCategory);
router.post('/update/:id', authenticateToken, updateCategory);

export default router;
