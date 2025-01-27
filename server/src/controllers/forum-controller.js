const Post = require("../models/post-model");
const Reply = require("../models/reply-model");

exports.createPost = async (req, res) => {
  try {
    const { username, content, creator } = req.body;
    const newPost = new Post({ username, content, creator });
    const savedPost = await newPost.save();
    res
      .status(201)
      .json({ message: "Post created successfully", data: savedPost });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate({
      path: "replies",
      populate: {
        path: "replies",
        model: "Reply",
        populate: {
          path: "replies",
          model: "Reply",
        },
      },
    });
    res
      .status(200)
      .json({ message: "Posts retrieved successfully", data: posts });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.addReply = async (req, res) => {
  try {
    const { username, content, creator, parentReplyId } = req.body;
    const { postId } = req.params;
    const newReply = new Reply({
      username,
      content,
      creator,
      postId,
      parentReplyId,
    });
    const savedReply = await newReply.save();

    if (parentReplyId) {
      await Reply.findByIdAndUpdate(parentReplyId, {
        $push: { replies: savedReply._id },
      });
    } else {
      await Post.findByIdAndUpdate(postId, {
        $push: { replies: savedReply._id },
      });
    }

    res
      .status(201)
      .json({ message: "Reply added successfully", data: savedReply });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const { postId } = req.params;
    await Post.findByIdAndDelete(postId);
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteComment = async (req, res) => {
  try {
    const { postId, commentId } = req.params;
    await Reply.findByIdAndDelete(commentId);
    await Post.findByIdAndUpdate(postId, { $pull: { replies: commentId } });
    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
