const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;

const stackSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Stack", stackSchema);
