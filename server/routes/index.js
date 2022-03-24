const express = require("express");
const authRoute = require("./auth.route");
const userRoute = require("./user.route");
const menucardRoute = require("./menucard.route");
const guestRoute = require("./guest.route");
const router = express.Router();

const routesIndex = [
  {
    path: "/auth",
    route: authRoute,
  },
  {
    path: "/user",
    route: userRoute,
  },
  {
    path: "/menucard",
    route: menucardRoute,
  },
  {
    path: "/guest",
    route: guestRoute,
  },
];

routesIndex.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
