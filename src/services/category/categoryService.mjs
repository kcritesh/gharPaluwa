// categoryService.mjs

import Category from '../../models/Category.js';

export async function createCategory(name, description, parentCategory = null) {
  const categoryByName = await Category.findOne({ name });
  if (categoryByName) {
    throw new Error('Category with the same name already exists');
  }
  const category = new Category({
    name,
    description,
    parentCategory,
  });
  await category.save();
  return category;
}

export async function getCategories() {
  return Category.find();
}

export async function getCategoriesExcludeSubcategories() {
  return Category.find({ parentCategory: null });
}

export async function getCategoryById(categoryId) {
  return Category.findById(categoryId);
}

export async function getSubcategories(parentCategoryId) {
  return Category.find({ parentCategory: parentCategoryId });
}

export async function getCategoryByName(categoryName) {
  if (!categoryName) {
    throw new Error('Category name is required');
  }
  let query = {};
  if (categoryName) {
    const searchRegex = new RegExp(categoryName, 'i');
    query = { name: searchRegex, parentCategory: null };
  }
  return Category.findOne(query);
}

export async function getSubcategoryByName(name, parentCategoryId) {
  if (!name) {
    throw new Error('subCategory name is required');
  }
  if (!parentCategoryId) {
    throw new Error('Parent category id is required');
  }
  let query = {};
  if (name) {
    const searchRegex = new RegExp(name, 'i');
    query = { name: searchRegex, parentCategory: parentCategoryId };
  }
  return Category.findOne(query);
}

export async function deleteCategory(id) {
  const categoryToDelete = await Category.findById(id);
  if (!categoryToDelete) {
    throw new Error('Category not found');
  }
  const subcategories = await Category.find({
    parentCategory: categoryToDelete.id,
  });
  if (subcategories.length) {
    throw new Error('Category has subcategories! Please delete them first');
  }
  return Category.findByIdAndDelete(id);
}

export async function updateCategory(id, name, description) {
  const categoryToUpdate = await Category.findById(id);
  if (!categoryToUpdate) {
    throw new Error('Category not found');
  }
  return Category.findByIdAndUpdate(id, { name, description }, { new: true });
}
