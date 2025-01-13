// models/Training.js

const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const sessionSchema = new Schema(
  {
    rating: {
      type: Number,
      default: 0,
      min: [0, "Rating cannot be negative"],
      max: [5, "Rating cannot exceed 5"],
    },
    cardId: {
      type: Schema.Types.ObjectId,
      ref: "Card",
      required: [true, "Card ID is required"],
    },
  },
  { _id: false },
);

const trainingSchema = new Schema(
  {
    sessions: {
      type: [sessionSchema],
      default: [],
      validate: [arrayLimit, "Training must have at least one session"],
    },
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
  },
  { timestamps: true },
);

module.exports = model("Training", trainingSchema);
