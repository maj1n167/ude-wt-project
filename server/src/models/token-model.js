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
});

const Token = mongoose.model("Token", tokenSchema);

module.exports = Token;
