
const express = require("express");
const router = express.Router();
const pieChartDataController = require("../controllers/pieChartDataController");

router.get("/", pieChartDataController.getPieChartData);

module.exports = router;
