const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tokenSchema = new Schema({
  token: { type: String, required: true, unique: true },
  userId: {
    type: String,
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
