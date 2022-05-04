const express = require("express");
const orderController = require("../controllers/order.controller");
const router = express.Router();
const auth = require("../middlewares/auth");

//-------------------------order routes------------------------------------------------

///api/orders/placeOrder
router.post("/placeOrder", orderController.placeOrder);

///api/orders/findorderbybusinessid
router.get(
  "/findorderbybusinessid/:businessId",
  orderController.getActiveOrdersByBusinessId
);

///api/orders/findorderbyguestid
router.get(
  "/findorderbyguestid/:guestId",
  orderController.getActiveOrdersByGuestId
);

module.exports = router;
