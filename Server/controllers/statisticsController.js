const ProductTransaction = require("../models/ProductTransactionSchema");

exports.getStatistics = async (req, res) => {
  try {
    const { month } = req.query; 

    let matchCondition = {};

    if (month) {
  
      matchCondition = {
        $expr: {
          $eq: [{ $month: "$dateOfSale" }, Number(month)],
        },
      };
    }


    const statistics = await ProductTransaction.aggregate([
      {
        $match: matchCondition,
      },
      {
        $group: {
          _id: null,
          totalSaleAmount: { $sum: "$price" }, 
          totalSoldItems: { $sum: { $cond: { if: { $eq: ["$sold", true] }, then: 1, else: 0 } } }, 
          totalNotSoldItems: { $sum: { $cond: { if: { $eq: ["$sold", false] }, then: 1, else: 0 } } }, 
        },
      },
    ]);

   
    const [result] = statistics;

    res.json(result || { totalSaleAmount: 0, totalSoldItems: 0, totalNotSoldItems: 0 });
  } catch (error) {
    console.error("Error fetching statistics:", error);
    res.status(500).send("Error fetching statistics");
  }
};
