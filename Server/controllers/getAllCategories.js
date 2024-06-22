const ProductTransaction = require("../models/ProductTransactionSchema");

exports.getAllCategories = async (req, res) => {
  try {
    const categories = await ProductTransaction.distinct("category");

    res.json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).send("Error fetching categories");
  }
};
