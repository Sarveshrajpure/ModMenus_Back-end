const express = require("express");
const guestController = require("../controllers/guest.controller");
const orderController = require("../controllers/order.controller");
const router = express.Router();
const auth = require("../middlewares/auth");

///api/guest/register
router.post("/register", guestController.register);

///api/guest/addToCart
router.post("/addToCart", guestController.addToCart);

///api/guest/fetchCart
router.get("/fetchCart/:id", guestController.fetchCart);

///api/guest/placeOrder
router.post("/placeOrder", orderController.placeOrder);

///api/guest/fetchGuests
router.get("/fetchGuests", auth(), guestController.fetchGuests);

module.exports = router;
