
const express = require("express");
const router = express.Router();
const barChartDataController = require("../controllers/barChartDataController");


router.get("/", barChartDataController.getBarChartData);

module.exports = router;
