const mongoose = require("mongoose");
const { Schema } = mongoose;

const trainingSchema = new Schema(
  {
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 3,
    },
    user: { type: Schema.Types.ObjectId, ref: "User" },
    stack: { type: Schema.Types.ObjectId, ref: "Stack" },
    card: { type: Schema.Types.ObjectId, ref: "Card" },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Training", trainingSchema);
