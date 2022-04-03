const { FoodItem } = require("../models/foodItem");
const ApiError = require("../middlewares/apiError");
const httpStatus = require("http-status");

const CreateFoodItem = async (name, description, categoryId, price, image) => {
  try {
    let foodItemsCreated = await FoodItem.create({
      name,
      description,
      categoryId,
      price,
      image,
    });
    return foodItemsCreated;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const fetchFoodItemsByCategoryId = async (categoryId) => {
  try {
    let findFoodItemsByCategoryId = await FoodItem.find({
      categoryId: categoryId,
    });
    return findFoodItemsByCategoryId;
  } catch (error) {
    throw error;
  }
};

const updateFoodItem = async (name, description, fooItemId) => {
  try {
    let updatedFoodItem = await FoodItem.findByIdAndUpdate(fooItemId, {
      name: name,
      description: description,
    });
    return updatedFoodItem;
  } catch (error) {
    throw error;
  }
};

const deleteSingleFoodItem = async (foodItemId) => {
  try {
    let deletdFoodItem = await FoodItem.deleteOne({ _id: foodItemId });
    return deletdFoodItem;
  } catch (error) {
    throw error;
  }
};

const deleteAllFoodItems = async (categoryId) => {
  try {
    let deletedFoodItems = await FoodItem.deleteMany({
      categoryId: categoryId,
    });
    return deletedFoodItems;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  CreateFoodItem,
  fetchFoodItemsByCategoryId,
  updateFoodItem,
  deleteSingleFoodItem,
  deleteAllFoodItems,
};
