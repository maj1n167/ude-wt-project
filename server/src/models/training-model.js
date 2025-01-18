const mongoose = require("mongoose");
const { Schema } = mongoose;

const trainingSchema = new Schema({
  rating: {
    type: Number,
    default: 0,
    min: [0, "Rating cannot be negative"],
    max: [3, "Rating cannot exceed 3"],
  },
  userId: {
    type: String,
    required: [true, "User ID is required"],
  },
  stackId: {
    type: String,
    required: [true, "Stack ID is required"],
  },
  cardId: {
    type: String,
    required: [true, "Card ID is required"],
  },
});

module.exports = mongoose.model("Training", trainingSchema);
