const ProductTransaction = require("../models/ProductTransactionSchema");

exports.getBarChartData = async (req, res) => {
  try {
    const { month } = req.query;

    // Define price ranges
    const priceRanges = [
      { min: 0, max: 100 },
      { min: 101, max: 200 },
      { min: 201, max: 300 },
      { min: 301, max: 400 },
      { min: 401, max: 500 },
      { min: 501, max: 600 },
      { min: 601, max: 700 },
      { min: 701, max: 800 },
      { min: 801, max: 900 },
      { min: 901, max: Infinity },
    ];

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
        $addFields: {
          priceRange: {
            $switch: {
              branches: priceRanges.map((range) => ({
                case: {
                  $and: [
                    { $gte: ["$price", range.min] },
                    { $lt: ["$price", range.max] },
                  ],
                },
                then: `${range.min}-${range.max}`,
              })),
              default: "Unknown",
            },
          },
        },
      },
      {
        $group: {
          _id: "$priceRange",
          count: { $sum: 1 },
        },
      }
    );

    const result = await ProductTransaction.aggregate(aggregationPipeline);

    res.json(result);
  } catch (error) {
    console.error("Error fetching bar chart data:", error);
    res.status(500).send("Error fetching bar chart data");
  }
};
