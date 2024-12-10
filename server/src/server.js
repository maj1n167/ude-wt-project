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

app.use(cors());

app.use("/users", userRouter);

app.use(errorHandler);

// * Task 4: Continues from server/src/database/connectDB.js (B)
app.use(express.static("../client/dist/client/browser"));
app.get('*', (req, res) => {
  res.sendFile(
      path.resolve(
          __dirname,
          '../../client/dist/client/browser/index.html'
      )
  );
});
// * Task 4: Ends here

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  connectDB();
});
