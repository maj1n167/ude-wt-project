const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const stackSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: "",
  },
  published: {
    type: Boolean,
    default: false,
  },
  creator: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Stack", stackSchema);
