const express = require("express");
const path = require("path");
const cors = require("cors");
require("dotenv").config();
const userRouter = require("./routes/user-routes");
const errorHandler = require("./middleware/error-handler-middleware");
const connectDB = require("./database/connectDB");

PORT = process.env.PORT | 3000;

const app = express();

app.use(express.json());

if (process.env.NODE_ENV !== "production") {
  console.log("NODE_ENV", process.env.NODE_ENV);
  app.use(
    cors({
      origin: ["http://localhost:4200"],
    })
  );
}

app.use("/users", userRouter);

app.use(errorHandler);

// * Task 4: Continues from server/src/database/connectDB.js (B)

// * Task 4: Ends here

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  connectDB();
});
