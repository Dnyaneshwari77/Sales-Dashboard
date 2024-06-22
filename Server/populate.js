const axios = require("axios");
const mongoose = require("mongoose");
const ProductTransaction = require("./models/ProductTransactionSchema");
require("dotenv").config();

const populateDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const response = await axios.get(
      "https://s3.amazonaws.com/roxiler.com/product_transaction.json"
    );
    const transactions = response.data;

    const formattedTransactions = transactions.map((transaction) => ({
      id: transaction.id,
      title: transaction.title,
      price: transaction.price,
      description: transaction.description,
      category: transaction.category,
      image: transaction.image,
      sold: transaction.sold,
      dateOfSale: transaction.dateOfSale
        ? new Date(transaction.dateOfSale)
        : null,
    }));

    await ProductTransaction.insertMany(formattedTransactions);
    console.log("Database populated successfully!");
  } catch (error) {
    console.error("Error populating the database:", error);
  } finally {
    await mongoose.disconnect();
  }
};

module.exports = populateDatabase;
