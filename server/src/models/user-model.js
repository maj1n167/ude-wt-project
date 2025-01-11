const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Erstelle das Modell, indem du das benannte Schema verwendest
const User = mongoose.model("User", userSchema);

module.exports = User;
