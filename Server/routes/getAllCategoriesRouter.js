
const express = require("express");
const router = express.Router();
const getAllCategories = require("../controllers/getAllCategories");


router.get("/", getAllCategories.getAllCategories);

module.exports = router;
