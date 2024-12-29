const mongoose = require("mongoose");

const connectToDatabase = () => {
  // * Task 4: Continues from server/.env (A)
  require("dotenv").config();
  const mongoURI = process.env.MONGO_URI;
  // * Task 4: Continues to server/src/server.js (B)

  mongoose
    .connect(mongoURI)
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((error) => {
      console.error("Error connecting to MongoDB", error);
      process.exit(1);
    });
};

module.exports = connectToDatabase;
