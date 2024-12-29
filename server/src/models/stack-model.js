const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;

const stackSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  private: {
    type: Boolean,
    default: true,
  },
  creator: {
    type: ObjectId,
    ref: "User",
    required: false, // todo: change to true when user auth is implemented
  },
});

module.exports = mongoose.model("Stack", stackSchema);
