// categoryService.mjs

import Category from '../../models/Category.js';

class CategoryService {
  static async createCategory(name, description, parentCategory = null) {
    const category = new Category({
      name,
      description,
      parentCategory,
    });
    await category.save();
    return category;
  }

  static async getCategories() {
    return Category.find();
  }

  static async getCategoryById(categoryId) {
    return Category.findById(categoryId);
  }

  static async getSubcategories(parentCategoryId) {
    return Category.find({ parentCategory: parentCategoryId });
  }

  // Add more methods as needed for update and delete operations.
}

export default new CategoryService();
