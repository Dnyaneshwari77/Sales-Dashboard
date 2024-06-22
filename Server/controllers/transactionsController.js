const ProductTransaction = require("../models/ProductTransactionSchema");

const getAllTransactions = async (req, res) => {
  const {
    page = 1,
    per_page = 10,
    title,
    description,
    min_price,
    max_price,
  } = req.query;

  const query = {};

  if (title) {
    query.title = { $regex: title, $options: "i" };
  }

  if (description) {
    query.description = { $regex: description, $options: "i" };
  }

  if (min_price && max_price) {
    query.price = { $gte: Number(min_price), $lte: Number(max_price) };
  } else if (min_price) {
    query.price = { $gte: Number(min_price) };
  } else if (max_price) {
    query.price = { $lte: Number(max_price) };
  }

  try {
    const transactions = await ProductTransaction.find(query)
      .skip((page - 1) * per_page)
      .limit(Number(per_page));

    const total = await ProductTransaction.countDocuments(query);

    console.log(query);
    res.json({
      transactions,
      total,
      page: Number(page),
      per_page: Number(per_page),
      total_pages: Math.ceil(total / per_page),
    });
  } catch (error) {
    console.error("Error fetching transactions:", error);
    res.status(500).send("Error fetching transactions");
  }
};

module.exports = {
  getAllTransactions,
};
