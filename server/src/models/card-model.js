const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;

const cardSchema = new Schema({
  front: {
    type: String,
    required: true,
  },
  back: {
    type: String,
    required: true,
  },
  stackId: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Card", cardSchema);
