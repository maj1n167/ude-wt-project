const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;

const tokenSchema = new Schema({
  token: { type: String, required: true, unique: true },
  userId: {
    type: ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 3600 * 24 * 7, // 1 week
  },
});

const Token = mongoose.model("Token", tokenSchema);

module.exports = Token;
