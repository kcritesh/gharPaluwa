// categoryController.mjs

import categoryService from '../../services/category/categoryService.mjs';

class CategoryController {
  static async createCategory(req, res) {
    try {
      const { name, description, parentCategory } = req.body;
      const category = await categoryService.createCategory(
        name,
        description,
        parentCategory
      );
      res.status(201).json(category);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  static async getCategories(req, res) {
    try {
      const categories = await categoryService.getCategories();
      res.json(categories);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  static async getCategoryById(req, res) {
    try {
      const categoryId = req.params.id;
      const category = await categoryService.getCategoryById(categoryId);
      if (!category) {
        res.status(404).json({ error: 'Category not found' });
      }
      res.json(category);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  static async getSubcategories(req, res) {
    try {
      const parentCategoryId = req.params.id;
      const subcategories = await categoryService.getSubcategories(
        parentCategoryId
      );
      res.json(subcategories);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  // Add more methods as needed for update and delete operations.
}

export default new CategoryController();
