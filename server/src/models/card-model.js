const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cardSchema = new Schema({
  front: {
    type: String,
    required: true,
  },
  back: {
    type: String,
    required: true,
  },
  stack: { type: Schema.Types.ObjectId, ref: "Stack" },
});

module.exports = mongoose.model("Card", cardSchema);
