const express = require("express");
const path = require("path");
const cors = require("cors");
require("dotenv").config();

// create routers here like example
// const exampleRouter = require("./routes/example-routes");
const cardRouter = require("./routes/card-routes");
const stackRouter = require("./routes/stack-routes");
const userRouter = require("./routes/user-routes");
const forumRouter = require("./routes/forum-routes");

const auth = require("./middlewares/auth-middleware");
const errorHandler = require("./middlewares/error-handler-middleware");
const connectDB = require("./database/connectDB");

PORT = process.env.PORT | 3000;

const app = express();

app.use(express.json());

app.use(cors());

app.use(auth.authenticateToken);

// add routes here like example
// app.use("/example", exampleRouter);
app.use("/cards", cardRouter);
app.use("/stacks", stackRouter);
app.use("/users", userRouter);
app.use("/forum", forumRouter);

app.use(errorHandler);

// * Task 4: Continues from server/src/database/connectDB.js (B)
app.use(express.static("../client/dist/client/browser"));
app.get("*", (req, res) => {
  res.sendFile(express.static("../client/dist/client/browser/index.html"));
});
// * Task 4: Ends here

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  connectDB();
});
