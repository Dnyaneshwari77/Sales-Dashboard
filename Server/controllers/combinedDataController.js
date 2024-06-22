const axios = require("axios");

async function fetchTransactions(params) {
  try {
    const response = await axios.get("http://localhost:5000/transactions", {
      params,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching transactions:", error);
    throw error;
  }
}

async function fetchStatistics(month, year) {
  try {
    const response = await axios.get("http://localhost:5000/statistics", {
      params: { month, year },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching statistics:", error);
    throw error;
  }
}

async function fetchBarChartData(month) {
  try {
    const response = await axios.get("http://localhost:5000/bar-chart", {
      params: { month },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching bar chart data:", error);
    throw error;
  }
}

exports.getCombinedData = async (req, res) => {
  try {
    const { page, per_page, title, description, min_price, max_price } =
      req.query;
    const { month, year } = req.query;
    const { categories } = req.query;

    const [transactions, statistics, barChartData] = await Promise.all([
      fetchTransactions({
        page,
        per_page,
        title,
        description,
        min_price,
        max_price,
      }),
      fetchStatistics(month, year),
      fetchBarChartData(month),
    ]);

    const combinedData = {
      transactions,
      statistics,
      barChartData,
    };

    res.json(combinedData);
  } catch (error) {
    console.error("Error fetching combined data:", error);
    res.status(500).send("Error fetching combined data");
  }
};
