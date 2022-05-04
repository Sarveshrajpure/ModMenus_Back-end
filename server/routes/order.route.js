const express = require("express");
const orderController = require("../controllers/order.controller");
const router = express.Router();
const auth = require("../middlewares/auth");

//-------------------------order routes------------------------------------------------

router.get(
  "/findorderbybusinessid/:businessId",
  orderController.getActiveOrdersByBusinessId
);

router.get(
  "/findorderbyguestid/:guestId",
  orderController.getActiveOrdersByGuestId
);

module.exports = router;
