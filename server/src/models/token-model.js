const mongoose = require("mongoose");

const tokenSchema = new mongoose.Schema({
  token: { type: String, required: true, unique: true },
  user_id: { type: String, required: true },
});

const Token = mongoose.model("Token", tokenSchema);

module.exports = Token;
