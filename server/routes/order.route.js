const express = require("express");
const orderController = require("../controllers/order.controller");
const router = express.Router();
const auth = require("../middlewares/auth");

//-------------------------order routes------------------------------------------------

///api/orders/placeOrder
router.post("/placeOrder", orderController.placeOrder);

///api/orders/findorderbybusinessid
router.get(
  "/findorderbybusinessid",
  orderController.getActiveOrdersByBusinessId
);

///api/orders/findorderbyguestid
router.get("/findorderbyguestid", orderController.getActiveOrdersByGuestId);

module.exports = router;
