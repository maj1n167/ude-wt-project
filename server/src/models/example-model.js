const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;

const exampleSchema = new Schema({
  // here you add your schema
});

module.exports = mongoose.model("Example", exampleSchema);
