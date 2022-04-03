const {
  categoryService,
  foodItemService,
  menuService,
  cloudinaryservice,
} = require("../services");
const {
  categorySchema,
  updateCategorySchema,
  deleteCategorySchema,
} = require("../helpers/categoryValidations.js");
const {
  foodItemSchema,
  updateFoodItemSchema,
  deleteFoodItemSchema,
} = require("../helpers/foodItemValidations.js");
const { ApiError } = require("../middlewares/apiError");
const httpStatus = require("http-status");

const menucardController = {
  //CREATE apis
  async createCategories(req, res, next) {
    try {
      let businessId = req.user.id;

      let value = await categorySchema.validateAsync(req.body);

      let categoryCreated = await categoryService.createCategory(
        value.name,
        value.time,
        value.menuId
      );
      res.status(httpStatus.CREATED).send(categoryCreated);
    } catch (error) {
      next(error);
    }
  },
  async createFoodItems(req, res, next) {
    try {
      let value = await foodItemSchema.validateAsync(req.body);
      let imageInBase64 = value.image;
      let imgLink = "";
      console.log(imageInBase64.length);
      if (imageInBase64) {
        console.log("in image upload");
        let uploadImg = await cloudinaryservice.uploadFoodItemImgToCouldinary(
          imageInBase64
        );

        imgLink = uploadImg.secure_url;
      }

      let foodItemCreated = await foodItemService.CreateFoodItem(
        value.name,
        value.description,
        value.categoryId,
        value.price,
        imgLink
      );

      res.status(httpStatus.CREATED).send(foodItemCreated);
    } catch (error) {
      next(error);
    }
  },

  //FETCH apis
  async getmenucard(req, res, next) {
    try {
      let menuCardData = [{ menuData: "", categoryAndFoodItemData: "" }];

      //Finding menu by menyu reference
      let menuDetails = await menuService.findMenuByReference(
        req.params.menuReference
      );

      let menuId = menuDetails.id;
      menuCardData[0].menuData = menuDetails;

      //Finding categories by menuId
      let categoriesData = await categoryService.fetchCategoriesByMenuID(
        menuId
      );
      let fAndcInfo = [];
      for (let i = 0; i < categoriesData.length; i++) {
        let categoryId = categoriesData[i].id;
        //Finding food items by categoryId
        let foodItemData = await foodItemService.fetchFoodItemsByCategoryId(
          categoryId
        );

        fAndcInfo.push({
          categoriesData: categoriesData[i],
          foodItemData: foodItemData,
        });
      }
      menuCardData[0].categoryAndFoodItemData = fAndcInfo;

      res.status(httpStatus.OK).send(menuCardData);
    } catch (error) {
      next(error);
    }
  },

  //Update Apis

  async updateCategory(req, res, next) {
    try {
      let value = await updateCategorySchema.validateAsync(req.body);

      let updateCategory = await categoryService.updateCategory(
        value.name,
        value.time,
        value.categoryId
      );

      if (updateCategory) {
        res
          .status(httpStatus.OK)
          .send({ message: "Category Updated Successfully!" });
      }
    } catch (error) {
      next(error);
    }
  },
  async updateFoodItem(req, res, next) {
    try {
      let value = await updateFoodItemSchema.validateAsync(req.body);

      let updateFoodItem = await foodItemService.updateFoodItem(
        value.name,
        value.description,
        value.foodItemId
      );

      if (updateFoodItem) {
        res
          .status(httpStatus.OK)
          .send({ message: "Food Item Updated Successfully!" });
      }
    } catch (error) {
      next(error);
    }
  },

  //Delete Apis

  async deleteCategory(req, res, next) {
    try {
      let value = await deleteCategorySchema.validateAsync(req.body);

      let getFooditemsForCategory =
        await foodItemService.fetchFoodItemsByCategoryId(value.categoryId);
      if (getFooditemsForCategory.length > 0) {
        let foodItemsCount = getFooditemsForCategory.length;
        res.status(httpStatus.METHOD_NOT_ALLOWED).send({
          message: `Category cannot be delete as it containes ${foodItemsCount} food items,consider deleting these food items before deleting category.`,
        });
      }

      let deleteCategory = await categoryService.deleteCategory(
        value.categoryId
      );

      if (deleteCategory) {
        res
          .status(httpStatus.OK)
          .send({ message: "Category delete sucessfully!" });
      }
    } catch (error) {
      next(error);
    }
  },
  async deleteFooditem(req, res, next) {
    try {
      let value = await deleteFoodItemSchema.validateAsync(req.body);

      let deleteFoodItem = await foodItemService.deleteSingleFoodItem(
        value.foodItemId
      );

      if (deleteFoodItem) {
        res
          .status(httpStatus.OK)
          .send({ message: "Food item deleted successfully!" });
      }
    } catch (error) {
      next(error);
    }
  },

  async deleteAllFooditem(req, res, next) {
    try {
      let value = await deleteCategorySchema.validateAsync(req.body);

      let deleteAllFooditems = await foodItemService.deleteAllFoodItems(
        value.categoryId
      );
      if (deleteAllFooditems) {
        res
          .status(httpStatus.OK)
          .send({ message: "All food items delted for this category" });
      }
    } catch (error) {
      next(error);
    }
  },
};

module.exports = menucardController;
