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
  return { message: 'Category Created Succesfully', category };
}

export async function getCategories(pageNumber = 1, pageSize = 9) {
  try {
    const totalCount = await Category.countDocuments();
    const totalPages = Math.ceil(totalCount / pageSize);
    const offset = (pageNumber - 1) * pageSize;
    const categories = await Category.find()
      .sort({ createdAt: -1 }) // Sort in descending order (latest first)
      .skip(offset)
      .limit(pageSize)
      .lean()
      .exec();
    return {
      count: totalCount,
      perPage: pageSize,
      currentPage: pageNumber,
      totalPages,
      data: categories,
    };
  } catch (error) {
    throw new Error(error);
  }
}

export async function getCategoriesExcludeSubcategories(
  pageNumber = 1,
  pageSize = 10
) {
  try {
    const offset = (pageNumber - 1) * pageSize;
    const categories = await Category.find({ parentCategory: null })
      .sort({ createdAt: -1 }) // Sort in descending order (latest first)
      .skip(offset)
      .limit(pageSize)
      .lean()
      .exec();
    const totalCount = await Category.countDocuments({ parentCategory: null });
    const totalPages = Math.ceil(totalCount / pageSize);
    return {
      count: totalCount,
      perPage: pageSize,
      currentPage: pageNumber,
      totalPages,
      data: categories,
    };
  } catch (error) {
    throw new Error(error);
  }
}

export async function getCategoryById(categoryId) {
  return Category.findById(categoryId);
}

export async function getSubcategories(
  parentCategoryId,
  pageNo = 1,
  pageSize = 10
) {
  try {
    const offset = (pageNo - 1) * pageSize;
    const categories = await Category.find({ parentCategory: parentCategoryId })
      .sort({
        createdAt: -1, // Sort in descending order (latest first)
      })
      .skip(offset) // Skip the first n items
      .limit(pageSize) // Limit the number of items returned
      .lean() // Return a plain JavaScript object instead of a mongoose document
      .exec(); // Execute the query
    const totalCount = await Category.countDocuments({
      parentCategory: parentCategoryId,
    });
    const totalPages = Math.ceil(totalCount / pageSize);
    return {
      count: totalCount,
      perPage: pageSize,
      currentPage: pageNo,
      totalPages,
      data: categories,
    };
  } catch (error) {
    throw new Error(error);
  }
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

export async function deleteCategories(categoryIds) {
  return Category.deleteMany({ _id: { $in: categoryIds } });
}

export async function updateCategory(id, name, description) {
  const categoryToUpdate = await Category.findById(id);
  if (!categoryToUpdate) {
    throw new Error('Category not found');
  }
  return Category.findByIdAndUpdate(id, { name, description }, { new: true });
}
