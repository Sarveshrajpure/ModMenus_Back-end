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
  fetchCategorySchema,
  fetchCategoryByIdSchema,
} = require("../helpers/categoryValidations.js");
const {
  foodItemSchema,
  updateFoodItemSchema,
  deleteFoodItemSchema,
  fetchFoodItemSchema,
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
      //console.log(imageInBase64);
      let imgLink = "";
      let cloudinary_id = "";
      //console.log(imageInBase64.length);
      if (imageInBase64) {
        let uploadFolder = "ModMenus_Fooditem_imgs";

        let uploadImg = await cloudinaryservice.uploadImgToCouldinary(
          imageInBase64,
          uploadFolder
        );

        imgLink = uploadImg.secure_url;
        cloudinary_id = uploadImg.public_id;
      }

      let foodItemCreated = await foodItemService.CreateFoodItem(
        value.name,
        value.description,
        value.categoryId,
        value.price,
        imgLink,
        cloudinary_id
      );

      res.status(httpStatus.CREATED).send(foodItemCreated);
    } catch (error) {
      next(error);
    }
  },

  async getCategories(req, res, next) {
    try {
      let value = await fetchCategorySchema.validateAsync(req.params);
      let categories = await categoryService.fetchCategoriesByMenuID(
        value.menuId
      );
      res.status(httpStatus.OK).send(categories);
    } catch (error) {
      next(error);
    }
  },
  async getCategoryById(req, res, next) {
    try {
      let value = await fetchCategoryByIdSchema.validateAsync(req.params);

      let category = await categoryService.fetchCategoriesByID(
        value.categoryId
      );

      res.status(httpStatus.OK).send(category);
    } catch (error) {
      next(error);
    }
  },

  async getFoodItems(req, res, next) {
    try {
      let value = await fetchFoodItemSchema.validateAsync(req.params);
      let foodItemData = await foodItemService.fetchFoodItemsByCategoryId(
        value.categoryId
      );
      res.status(httpStatus.OK).send(foodItemData);
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
        value.foodItemId,
        value.price,
        value.image
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
      } else {
        let deleteCategory = await categoryService.deleteCategory(
          value.categoryId
        );
        if (deleteCategory.deletedCount > 0) {
          res
            .status(httpStatus.OK)
            .send({ message: "Category delete sucessfully!" });
        } else {
          res
            .status(httpStatus.OK)
            .send({ message: "Category does not exist" });
        }
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
