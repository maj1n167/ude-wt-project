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
    userId: {
      type: String,
      required: true,
    },
    stackId: {
      type: String,
      required: true,
    },
    cardId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Training", trainingSchema);
