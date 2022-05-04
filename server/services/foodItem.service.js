const { FoodItem } = require("../models/foodItem");
const cloudinaryService = require("./cloudinary.service");
const ApiError = require("../middlewares/apiError");
const httpStatus = require("http-status");

const CreateFoodItem = async (
  name,
  description,
  categoryId,
  menuId,
  price,
  image,
  cloudinary_id
) => {
  try {
    let foodItemsCreated = await FoodItem.create({
      name,
      description,
      categoryId,
      menuId,
      price,
      image,
      cloudinary_id,
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

const fetchFoodItemsByMenuIdAndName = async (menuId, name) => {
  try {
    let findFoodItemsByCategoryId = await FoodItem.find({
      menuId: menuId,
      name: name,
    });
    return findFoodItemsByCategoryId;
  } catch (error) {
    throw error;
  }
};

const updateFoodItem = async (name, description, foodItemId, price, image) => {
  try {
    if (image) {
      if (image.length > 0) {
        let findFoodItemsByCategoryId = await FoodItem.findById({
          _id: foodItemId,
        });

        let uploadFolder = "ModMenus_Fooditem_imgs";
        let uploadNewImage = await cloudinaryService.uploadImgToCouldinary(
          image,
          uploadFolder
        );

        let imgUrl = uploadNewImage.secure_url;
        let public_id = uploadNewImage.public_id;

        let updatedFoodItem = await FoodItem.findByIdAndUpdate(foodItemId, {
          name: name,
          description: description,
          price,
          image: imgUrl,
          cloudinary_id: public_id,
        });

        if (findFoodItemsByCategoryId.cloudinary_id) {
          let deletePreviousImg = await cloudinaryService.deleteCloudinaryImg(
            findFoodItemsByCategoryId.cloudinary_id
          );
        }

        return updatedFoodItem;
      }
    } else {
      if (image === null) {
        let findFoodItemsByCategoryId = await FoodItem.findById({
          _id: foodItemId,
        });
        let updatedFoodItem = await FoodItem.findByIdAndUpdate(foodItemId, {
          name: name,
          description: description,
          price,
          image: null,
          cloudinary_id: null,
        });

        if (findFoodItemsByCategoryId.cloudinary_id) {
          let deletePreviousImg = await cloudinaryService.deleteCloudinaryImg(
            findFoodItemsByCategoryId.cloudinary_id
          );
        }

        return updatedFoodItem;
      }

      let updatedFoodItem = await FoodItem.findByIdAndUpdate(foodItemId, {
        name: name,
        description: description,
        price,
      });
      return updatedFoodItem;
    }
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
  fetchFoodItemsByMenuIdAndName,
  updateFoodItem,
  deleteSingleFoodItem,
  deleteAllFoodItems,
};
