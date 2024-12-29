const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    unique: true,
    maxLength: 30,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  todos: [
    {
      type: ObjectId,
      ref: "Todo",
    },
  ],
});

module.exports = mongoose.model("User", userSchema);
