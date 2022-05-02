const { Category } = require("../models/category");
const ApiError = require("../middlewares/apiError");
const httpStatus = require("http-status");

const createCategory = async (name, time, menuId) => {
  try {
    const categoryCreated = new Category({ name, time, menuId });

    await categoryCreated.save();

    return categoryCreated;
  } catch (error) {
    throw error;
  }
};

const updateCategory = async (name, time, id) => {
  try {
    let updateCategory = await Category.findByIdAndUpdate(id, {
      name: name,
      time: time,
    });
    return updateCategory;
  } catch (error) {
    throw error;
  }
};

const fetchCategoriesByMenuID = async (menuId) => {
  try {
    let findCategoriesByMenuId = await Category.find({ menuId: menuId });
    return findCategoriesByMenuId;
  } catch (error) {
    throw error;
  }
};
const fetchCategoriesByID = async (categoryId) => {
  try {
    let findCategoriesById = await Category.find({ _id: categoryId });
    return findCategoriesById;
  } catch (error) {
    throw error;
  }
};

const deleteCategory = async (categoryId) => {
  try {
    let deletedCategory = await Category.deleteOne({ _id: categoryId });
    return deletedCategory;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createCategory,
  fetchCategoriesByMenuID,
  fetchCategoriesByID,
  updateCategory,
  deleteCategory,
};
