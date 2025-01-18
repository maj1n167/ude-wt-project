const mongoose = require("mongoose");
const { Schema } = mongoose;

const trainingSchema = new Schema({
  rating: {
    type: Number,
    default: 0,
    min: [0, "Rating cannot be negative"],
    max: [5, "Rating cannot exceed 5"],
  },
  userId: {
    type: Schema.Types.ObjectId,
    required: [true, "User ID is required"],
    ref: "User",
  },
  stackId: {
    type: Schema.Types.ObjectId,
    ref: "Stack",
    required: [true, "Stack ID is required"],
  },
  cardId: {
    type: Schema.Types.ObjectId,
    ref: "Card",
    required: [true, "Card ID is required"],
  },
});

module.exports = mongoose.model("Training", trainingSchema);
