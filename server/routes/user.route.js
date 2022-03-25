const express = require("express");
const userController = require("../controllers/user.controller");
const router = express.Router();
const auth = require("../middlewares/auth");

///api/user/profile

router
  .route("/profile")
  .get(auth(), userController.profile)
  .patch(auth(), userController.updateProfile);

router.get("/verify", userController.verifyAccount);

module.exports = router;
