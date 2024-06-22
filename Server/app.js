const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

const populateDatabase = require("./populate");
const transactionsRouter = require("./routes/transactions");
const statisticsRouter = require("./routes/statisticsRouter");
const barChartRouter = require("./routes/barChartRouter");
const getAllCategoriesRouter = require("./routes/getAllCategoriesRouter");
const pieChartDataRouter = require("./routes/pieChartDataRouter");
const combinedDataRouter = require("./routes/combinedDataRouter");

app.use(express.json());
app.use(cors());

console.log(process.env.MONGODB_URI);
mongoose
  .connect(process.env.MONGODB_URI, {})
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// app.get("/populate", async (req, res) => {
//   try {
//     await populateDatabase();
//     res.send("Database populated successfully!");
//   } catch (error) {
//     console.log(error);
//     res.status(500).send("Error populating the database");
//   }
// });

app.use("/transactions", transactionsRouter);
app.use("/statistics", statisticsRouter);
app.use("/bar-chart", barChartRouter);
app.use("/categories", getAllCategoriesRouter);
app.use("/pie-chart-data", pieChartDataRouter);
app.use("/combined-data", combinedDataRouter);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
