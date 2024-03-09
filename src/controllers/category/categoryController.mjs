// categoryController.mjs

import * as categoryService from '../../services/category/categoryService.mjs';

export const createCategory = async (req, res) => {
  try {
    const { name, description, parentCategory } = req.body;
    const data = await categoryService.createCategory(
      name,
      description,
      parentCategory
    );
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getCategories = async (req, res) => {
  try {
    const { page, pageSize } = req.query;
    const categories = await categoryService.getCategories(page, pageSize);
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getCategoriesExcludeSubcategories = async (req, res) => {
  try {
    const { page, pageSize } = req.query;
    const categories = await categoryService.getCategoriesExcludeSubcategories(
      page,
      pageSize
    );
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getCategoryById = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const category = await categoryService.getCategoryById(categoryId);
    if (!category) {
      res.status(404).json({ error: 'Category not found' });
    } else {
      res.json(category);
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getSubcategories = async (req, res) => {
  try {
    const parentCategoryId = req.params.id;
    const subcategories = await categoryService.getSubcategories(
      parentCategoryId
    );
    if (!subcategories.length) {
      res.status(404).json({ error: 'Subcategories not found' });
    } else {
      res.json({ count: subcategories.length, subcategories });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getCategoryByName = async (req, res) => {
  try {
    const categoryName = req.params.name;
    const category = await categoryService.getCategoryByName(categoryName);
    if (!category) {
      res.status(404).json({ error: 'Category not found' });
    } else {
      res.json({ category });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getSubcategoryByName = async (req, res) => {
  try {
    const { name, parentCategoryId } = req.params;
    const subcategory = await categoryService.getSubcategoryByName(
      name,
      parentCategoryId
    );
    if (!subcategory) {
      res.status(404).json({ error: 'Subcategory not found' });
    } else {
      res.json({ subcategory });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;
    await categoryService.deleteCategory(categoryId);
    res.json({ message: 'Category deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteCategories = async (req, res) => {
  try {
    const { categoriesToDelete } = req.body;
    await categoryService.deleteCategories(categoriesToDelete);
    res.json({ message: 'Categories deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;
    const category = await categoryService.updateCategory(
      id,
      name,
      description
    );
    res.status(201).json({ category });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
