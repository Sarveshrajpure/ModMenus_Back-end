const express = require("express");
const orderController = require("../controllers/order.controller");
const router = express.Router();
const auth = require("../middlewares/auth");

//-------------------------order routes------------------------------------------------

router.get(
  "/findorderbybusinessid",
  orderController.getActiveOrdersByBusinessId
);

router.get("/findorderbyguestid", orderController.getActiveOrdersByGuestId);

module.exports = router;
