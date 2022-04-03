const express = require("express");
const menucardController = require("../controllers/menucard.controller");
const router = express.Router();
const auth = require("../middlewares/auth");

//--------------------------------Category Apis---------------------------------

///api/menucard/createcategories
router.post("/createcategory", auth(), menucardController.createCategories);

///api/menucard/updatecategories
router.patch("/updatecategory", auth(), menucardController.updateCategory);

//api/menucard/deletecategory
router.delete("/deletecategory", auth(), menucardController.deleteCategory);

///api/menucard/getcategories
router.get("/getcategories/:menuId", menucardController.getCategories);

//--------------------------------Food item Apis---------------------------------

///api/menucard/createfoodItem
router.post("/createfoodItem", auth(), menucardController.createFoodItems);

///api/menucard/getfoodItem
router.get("/getfoodItem/:categoryId", auth(), menucardController.getFoodItems);

///api/menucard/updatefoodItem
router.patch("/updatefooditem", auth(), menucardController.updateFoodItem);

///api/menucard/deletefoodItems
router.delete("/deletefooditem", auth(), menucardController.deleteFooditem);

///api/menucard/deleteallfoodItems
router.delete(
  "/deleteallfooditem",
  auth(),
  menucardController.deleteAllFooditem
);

//--------------------------------Menu Apis-----------------------------------------

///api/menucard/getmenu/:menuReference
router.get("/getmenu/:menuReference", menucardController.getmenucard);

//router.get("getQrLink",menu)

module.exports = router;
