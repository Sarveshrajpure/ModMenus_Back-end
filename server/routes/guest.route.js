const express = require("express");
const guestController = require("../controllers/guest.controller");
const router = express.Router();
const auth = require("../middlewares/auth");

///api/guest/register
router.post("/register", guestController.register);

///api/guest/register
router.get("/fetchGuests", auth(), guestController.fetchGuests);

module.exports = router;
