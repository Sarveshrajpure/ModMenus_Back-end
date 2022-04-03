const express = require("express");
const menucardController = require("../controllers/menucard.controller");
const router = express.Router();
const auth = require("../middlewares/auth");

//--------------------------------Category Apis---------------------------------

///api/menucard/createCategories
router.post("/createcategory", auth(), menucardController.createCategories);

///api/menucard/updatecategories
router.patch("/updatecategory", auth(), menucardController.updateCategory);

//api/menucard/deletecategory
router.delete("/deletecategory", auth(), menucardController.deleteCategory);

//--------------------------------Food item Apis---------------------------------

///api/menucard/createfoodItem
router.post("/createfoodItem", auth(), menucardController.createFoodItems);

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
