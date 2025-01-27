const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
  username: { type: String, required: true },
  content: { type: String, required: true },
  date: { type: Date, default: Date.now },
  replies: [{ type: Schema.Types.ObjectId, ref: "Reply" }],
  creator: { type: Schema.Types.ObjectId, ref: "User", required: true }, // Ensure creator field is required
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
