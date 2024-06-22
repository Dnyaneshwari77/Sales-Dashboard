const ProductTransaction = require("../models/ProductTransactionSchema");

exports.getPieChartData = async (req, res) => {
  try {
    const { month } = req.query;

    const aggregationPipeline = [];

    if (month) {
      aggregationPipeline.push({
        $match: {
          $expr: {
            $eq: [{ $month: { $toDate: "$dateOfSale" } }, Number(month)],
          },
        },
      });
    }

    aggregationPipeline.push(
      {
        $group: {
          _id: "$category",
          count: { $sum: 1 },
        },
      },
      {
        $sort: { _id: 1 },
      }
    );

    const result = await ProductTransaction.aggregate(aggregationPipeline);

    res.json(result);
  } catch (error) {
    console.error("Error fetching pie chart data:", error);
    res.status(500).send("Error fetching pie chart data");
  }
};
