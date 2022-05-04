const express = require("express");
const statisticsController = require("../controllers/statistics.controller");
const router = express.Router();
const auth = require("../middlewares/auth");

///api/stats/getStats
router.get("/getStats/:businessId", auth(), statisticsController.fetchStats);

module.exports = router;
