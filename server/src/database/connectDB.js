const mongoose = require("mongoose");

const connectToDatabase = () => {
// * Task 4: Continues from server/.env (A)
  const mongoURI = "mongodb://127.0.0.1:27017/mean-mern-hands-on";
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
